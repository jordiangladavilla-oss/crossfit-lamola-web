/**
 * CrossFit La Mola · Formulari de Contacte — Google Apps Script (doPost)
 * ----------------------------------------------------------------------------
 * Rep els POST dels formularis de leads (home, contacte, opositors × CA/ES/EN) i:
 *   1. Descarta bots: honeypot "website", enviaments instantanis (camp "t") i payloads gegants.
 *   2. Evita duplicats (mateix telèfon/email en 10 minuts) i limita el volum global
 *      (màx. LEADS_PER_HOUR emails/hora; per sobre, s'apunta al Sheet però no s'envia email,
 *      així un flood no esgota la quota diària de Gmail i els leads reals segueixen arribant).
 *   3. Escriu el lead al Google Sheet actiu del projecte.
 *   4. Envia email de notificació a hola@crossfitlamola.com.
 *
 * Resposta: JSON {success:true} o {success:false, error:"codi"} (mai el text de l'excepció).
 * El client (src/scripts/lead-form.ts) envia amb mode 'cors' i body text/plain: Apps Script
 * respon amb Access-Control-Allow-Origin: * i el navegador pot llegir la resposta.
 *
 * AQUEST FITXER ÉS LA CÒPIA VERSIONADA del doPost desplegat a script.google.com.
 * Si es canvia allà, actualitzar també aquí — i viceversa.
 *
 * DESPLEGAR CANVIS: Desplega → Gestiona les implementacions → editar la
 * implementació EXISTENT → Versió nova → Desplega. (MAI "Nova implementació":
 * canviaria la URL /exec i els formularis de la web deixarien de funcionar.)
 * Versió 2 (2026-09-29): límit horari, dedupe, comprovació de temps, errors genèrics.
 * Versió 2.1 (2026-09-30): clau de dedupe només després d'escriure al full.
 * Versió 2.2 (2026-09-30): temps d'ompliment mesurat al client ("fill"), sense dependre del rellotge; dedupe 2 min. PENDENT DE REDESPLEGAR.
 */

var MAX_FIELD_LEN = 500;
var MAX_PAYLOAD_LEN = 20000;
var LEADS_PER_HOUR = 30;        // per sobre: al Sheet sí, email no
var DEDUPE_SECONDS = 120;       // mateix telèfon/email en 2 min → descartat en silenci (doble clic / reenviament)
var MIN_FILL_MS = 3000;         // formulari enviat abans de 3 s des de la càrrega → bot
var MAX_FILL_MS = 24 * 3600e3;  // (reservat)
var NOTIFY_TO = 'hola@crossfitlamola.com';

function clean_(v) {
  if (v === undefined || v === null) return '';
  var s = String(v).slice(0, MAX_FIELD_LEN);
  if (/^[=+\-@]/.test(s)) s = "'" + s;   // anti formula injection
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
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

    // Temps d'ompliment mesurat al client ("fill", ms). NO es compara amb el rellotge del servidor:
    // la v2 feia Date.now() - t i un dispositiu amb l'hora avançada feia descartar leads reals.
    // Sense "fill" (client antic en caché) s'accepta; amb "fill" < 3 s → bot, silenci.
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

    // Validació mínima: nom i (telèfon o email). Sense això no és un lead.
    if (!name || !(phone || email)) return json_({success: false, error: 'missing_fields'});

    var cache = CacheService.getScriptCache();

    // Dedupe: mateix telèfon/email en DEDUPE_SECONDS → no repetir (l'usuari pot haver reenviat).
    // La clau es posa DESPRÉS d'escriure al full: si appendRow falla, el reintent no es perd.
    var key = 'lead:' + (phone || email).replace(/\s+/g, '').toLowerCase();
    if (cache.get(key)) return json_({success: true});

    // Límit global per hora (protegeix la quota de Gmail).
    var hourKey = 'leads:' + Math.floor(Date.now() / 3600e3);
    var n = Number(cache.get(hourKey) || 0) + 1;
    cache.put(hourKey, String(n), 3700);
    var rateLimited = n > LEADS_PER_HOUR;

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date().toLocaleString('ca-ES'),
      origen + (rateLimited ? ' [SENSE EMAIL: límit horari]' : ''),
      name, email, phone, topic, disc, level, when, schedule, message
    ]);
    cache.put(key, '1', DEDUPE_SECONDS);

    if (!rateLimited) {
      var subject = '🏋️ Nou lead CrossFit La Mola - ' + (name || 'Sense nom');
      var body = 'Nou contacte des de: ' + (origen || 'Web') + '\n\n' +
                 'Nom: ' + (name || '-') + '\n' +
                 'Email: ' + (email || '-') + '\n' +
                 'Telèfon: ' + (phone || '-') + '\n' +
                 'Tema: ' + (topic || disc || '-') + '\n' +
                 'Nivell: ' + (level || '-') + '\n' +
                 'Quan: ' + (when || schedule || '-') + '\n' +
                 'Missatge: ' + (message || '-') + '\n\n' +
                 '---\nEnviat automàticament des del web';
      GmailApp.sendEmail(NOTIFY_TO, subject, body);
    }

    return json_({success: true});

  } catch (error) {
    console.error('doPost error: ' + error);   // al registre d'execucions, no al client
    return json_({success: false, error: 'server_error'});
  }
}

// Health-check: GET https://script.google.com/macros/s/.../exec → {ok:true}
function doGet() {
  return json_({ok: true, service: 'lamola-leads', version: 2.2});
}
