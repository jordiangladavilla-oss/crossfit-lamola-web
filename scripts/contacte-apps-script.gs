/**
 * CrossFit La Mola · Formulari de Contacte — Google Apps Script (doPost)
 * ----------------------------------------------------------------------------
 * Rep els POST dels formularis de leads (home, contacte, opositors × CA/ES/EN) i:
 *   1. Descarta bots: honeypot "website", ompliment massa ràpid ("fill") i payloads gegants.
 *   2. Evita duplicats (mateix telèfon/email en 2 minuts) i limita el volum global
 *      (màx. LEADS_PER_HOUR emails/hora; per sobre, s'apunta al full però no s'envia email).
 *   3. Envia l'email de notificació a NOTIFY_TO. L'EMAIL ÉS EL PRIMER: si el full falla, el lead
 *      arriba igualment per correu (amb un avís) i mai es perd.
 *   4. Escriu el lead al Google Sheet de leads (vegeu LEADS_SHEET_ID).
 *
 * ▶ LEADS_SHEET_ID: enganxa aquí l'ID del full de càlcul on han d'anar els leads (el tros de la URL
 *   entre /d/ i /edit). Si es deixa buit, l'script intenta el full "actiu" (només funciona si l'script
 *   està lligat al full) i, si no n'hi ha, en crea un de nou anomenat "La Mola · Leads" i en guarda
 *   l'ID a les propietats del projecte. Així cap lead es perd mai per culpa del full.
 *
 * Resposta: JSON {success:true} o {success:false, error:"codi"} (mai el text de l'excepció).
 * El client (src/scripts/lead-form.ts) envia amb mode 'cors' i body text/plain.
 *
 * DESPLEGAR CANVIS: Desplega → Gestiona les implementacions → editar la implementació EXISTENT →
 * Versió nova → Desplega. (MAI "Nova implementació": canviaria la URL /exec de la web.)
 *
 * Versió 2   (2026-09-29): límit horari, dedupe, comprovació de temps, errors genèrics.
 * Versió 2.1 (2026-09-30): dedupe després d'escriure al full.
 * Versió 2.2 (2026-09-30): temps d'ompliment mesurat al client ("fill"); dedupe 2 min.
 * Versió 2.3 (2026-09-30): CORRECCIÓ CRÍTICA. La v2 assumia un full "actiu" (SpreadsheetApp.getActiveSpreadsheet)
 *   i en un script no lligat al full això llança una excepció → cap lead desat ni enviat. Ara: email primer,
 *   full per ID (LEADS_SHEET_ID) amb find-or-create de recanvi, i l'error del full no atura l'enviament.
 */

var LEADS_SHEET_ID = '';          // ▶ ID del full de leads (entre /d/ i /edit a la URL). Buit = automàtic.
var LEADS_SHEET_NAME = 'La Mola · Leads';
var NOTIFY_TO = 'hola@crossfitlamola.com';
var MAX_FIELD_LEN = 500;
var MAX_PAYLOAD_LEN = 20000;
var LEADS_PER_HOUR = 30;          // per sobre: al full sí, email no
var DEDUPE_SECONDS = 120;         // mateix telèfon/email en 2 min → descartat en silenci
var MIN_FILL_MS = 3000;           // formulari omplert en menys de 3 s → bot

function clean_(v) {
  if (v === undefined || v === null) return '';
  var s = String(v).slice(0, MAX_FIELD_LEN);
  if (/^[=+\-@]/.test(s)) s = "'" + s;   // anti formula injection
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Full de leads: per ID → actiu (script lligat) → guardat a propietats → crear-ne un de nou.
function getLeadsSheet_() {
  var props = PropertiesService.getScriptProperties();
  var ss = null;
  var id = LEADS_SHEET_ID || props.getProperty('LEADS_SHEET_ID');
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
  if (!ss) { try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) { ss = null; } }
  if (!ss) {
    ss = SpreadsheetApp.create(LEADS_SHEET_NAME);
    props.setProperty('LEADS_SHEET_ID', ss.getId());
    ss.getSheets()[0].appendRow(['Data', 'Origen', 'Nom', 'Email', 'Telèfon', 'Tema', 'Disciplina', 'Nivell', 'Quan', 'Horari', 'Missatge']);
  }
  return ss.getActiveSheet();
}

function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents || e.postData.contents.length > MAX_PAYLOAD_LEN) {
      return json_({success: true}); // gegant: descartat en silenci
    }
    var data;
    try { data = JSON.parse(e.postData.contents); } catch (err) { return json_({success: false, error: 'bad_json'}); }

    // Honeypot: si té valor, és un bot. Es respon success igualment.
    if (data.website && String(data.website).length > 0) return json_({success: true});

    // Temps d'ompliment mesurat al client (ms). No es compara amb cap rellotge del servidor.
    var fill = Number(data.fill);
    if (data.fill !== undefined && data.fill !== '' && (!isFinite(fill) || fill < MIN_FILL_MS)) return json_({success: true});

    var origen   = clean_(data.origen);
    var name     = clean_(data.name);
    var email    = clean_(data.email);
    var phone    = clean_(data.phone);
    var topic    = clean_(data.topic);
    var disc     = clean_(data.disc);
    var level    = clean_(data.level);
    var when     = clean_(data.when);
    var schedule = clean_(data.schedule);
    var message  = clean_(data.message || data.note);

    if (!name || !(phone || email)) return json_({success: false, error: 'missing_fields'});

    var cache = CacheService.getScriptCache();
    var key = 'lead:' + (phone || email).replace(/\s+/g, '').toLowerCase();
    if (cache.get(key)) return json_({success: true});   // duplicat en 2 min

    var hourKey = 'leads:' + Math.floor(Date.now() / 3600e3);
    var n = Number(cache.get(hourKey) || 0) + 1;
    cache.put(hourKey, String(n), 3700);
    var rateLimited = n > LEADS_PER_HOUR;

    // 1) EMAIL PRIMER: el lead arriba encara que el full falli.
    var sheetError = '';
    var sent = false;
    if (!rateLimited) {
      try {
        GmailApp.sendEmail(NOTIFY_TO, '🏋️ Nou lead CrossFit La Mola - ' + name,
          'Nou contacte des de: ' + (origen || 'Web') + '\n\n' +
          'Nom: ' + name + '\n' +
          'Email: ' + (email || '-') + '\n' +
          'Telèfon: ' + (phone || '-') + '\n' +
          'Tema: ' + (topic || disc || '-') + '\n' +
          'Nivell: ' + (level || '-') + '\n' +
          'Quan: ' + (when || schedule || '-') + '\n' +
          'Missatge: ' + (message || '-') + '\n\n' +
          '---\nEnviat automàticament des del web');
        sent = true;
      } catch (err) { console.error('sendEmail: ' + err); }
    }

    // 2) FULL: si falla, s'apunta al registre i s'avisa per email, però NO es perd el lead.
    try {
      getLeadsSheet_().appendRow([
        new Date().toLocaleString('ca-ES'),
        origen + (rateLimited ? ' [SENSE EMAIL: límit horari]' : ''),
        name, email, phone, topic, disc, level, when, schedule, message
      ]);
    } catch (err) {
      sheetError = String(err);
      console.error('appendRow: ' + err);
      if (sent) { try { GmailApp.sendEmail(NOTIFY_TO, '⚠️ Lead NO desat al full - ' + name, 'El lead anterior s\'ha enviat per email però no s\'ha pogut escriure al full de càlcul.\nError: ' + sheetError + '\n\nRevisa LEADS_SHEET_ID a l\'Apps Script.'); } catch (e2) {} }
    }

    if (!sent && sheetError) return json_({success: false, error: 'server_error'});
    cache.put(key, '1', DEDUPE_SECONDS);
    return json_({success: true});

  } catch (error) {
    console.error('doPost error: ' + error);
    return json_({success: false, error: 'server_error'});
  }
}

// Health-check: GET .../exec → versió i estat del full
function doGet() {
  var sheetOk = false, sheetName = '';
  try { var sh = getLeadsSheet_(); sheetOk = true; sheetName = sh.getParent().getName(); } catch (e) { sheetName = String(e); }
  return json_({ok: true, service: 'lamola-leads', version: 2.3, sheet: sheetOk ? sheetName : 'ERROR: ' + sheetName});
}
