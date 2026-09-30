/**
 * CrossFit La Mola · Formulari de Baixes — Google Apps Script
 * ----------------------------------------------------------------------------
 * Rep els POST del formulari /baixa i els escriu a un Google Sheet PROPI
 * anomenat "La Mola · Baixes" (independent del Sheet de reserves i del de leads).
 *
 * Versió 2 (2026-09-30): límit horari (MAX_PER_HOUR) amb descart silenciós, resposta
 * d'error genèrica (sense text de l'excepció), i el client llegeix la resposta (mode cors).
 *
 * DESPLEGAR CANVIS: Desplega → Gestiona les implementacions → editar la implementació
 * EXISTENT → Versió nova → Desplega. (MAI "Nova implementació": canviaria la URL /exec que
 * porta src/pages/baixa.astro.)
 *
 * El Sheet "La Mola · Baixes" es crea automàticament la primera vegada i el seu ID queda
 * guardat a les propietats del projecte.
 */

var SHEET_NAME = 'La Mola · Baixes';
var MAX_PER_HOUR = 20;      // per sobre: es descarta en silenci (el formulari és de baixes reals: mai n'hi ha 20/h)
var MAX_FIELD_LEN = 500;
var MAX_PAYLOAD_LEN = 20000;

// Ordre de columnes (clau del payload + etiqueta de capçalera llegible).
var FIELDS = [
  ['data',                  'Data'],
  ['motius',                'Motius'],
  ['altreMotiu',            'Altre motiu (text)'],
  ['tipusBaixa',            'Tipus de baixa'],
  ['alternativa',           'Alternativa'],
  ['scoreGlobal',           'Score global'],
  ['scoreEntrenaments',     'Score entrenaments'],
  ['scoreCoaches',          'Score coaches'],
  ['scoreComunitat',        'Score comunitat'],
  ['scoreInstalacions',     'Score instal·lacions'],
  ['scoreMaterial',         'Score material'],
  ['scoreNeteja',           'Score neteja'],
  ['scorePreu',             'Score preu'],
  ['nps',                   'NPS'],
  ['milloresSeleccionades', 'Millores seleccionades'],
  ['milloresAltres',        'Millores altres (text)'],
  ['comentariMillora',      'Comentari millora'],
  ['recoveryInfo',          'Recovery — coneixement'],
  ['recoveryIntent',        'Recovery — intenció'],
  ['volContacte',           'Vol contacte'],
  ['nom',                   'Nom'],
  ['email',                 'Email'],
  ['horitzoTornada',        'Horitzó tornada'],
  ['comentariFinal',        'Comentari final']
];

// Neteja cada valor: trunca i neutralitza fórmules (= + - @ al començament).
function clean_(v) {
  if (Array.isArray(v)) v = v.join(', ');
  if (v === undefined || v === null) return '';
  var s = String(v).slice(0, MAX_FIELD_LEN);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents || e.postData.contents.length > MAX_PAYLOAD_LEN) {
      return json_({ result: 'ok' });
    }
    var data;
    try { data = JSON.parse(e.postData.contents); } catch (err) { return json_({ result: 'error', error: 'bad_json' }); }

    // Honeypot: camp invisible; si arriba ple, és un bot. Es respon 'ok' igualment.
    if (data.website) return json_({ result: 'ok' });

    // Límit horari: protegeix el Sheet d'una inundació.
    var cache = CacheService.getScriptCache();
    var hourKey = 'baixes:' + Math.floor(Date.now() / 3600e3);
    var n = Number(cache.get(hourKey) || 0) + 1;
    cache.put(hourKey, String(n), 3700);
    if (n > MAX_PER_HOUR) return json_({ result: 'ok' });

    var sheet = getSheet_();
    sheet.appendRow(FIELDS.map(function (f) { return clean_(data[f[0]]); }));
    return json_({ result: 'ok' });

  } catch (err) {
    console.error('baixes doPost error: ' + err);   // al registre d'execucions, no al client
    return json_({ result: 'error', error: 'server_error' });
  }
}

// Health-check: GET .../exec
function doGet() {
  return json_({ ok: true, service: 'lamola-baixes', version: 2 });
}

// Find-or-create del Sheet propi. Guarda l'ID a les propietats del projecte.
function getSheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('BAIXES_SHEET_ID');
  var ss = null;
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
  if (!ss) { ss = SpreadsheetApp.create(SHEET_NAME); props.setProperty('BAIXES_SHEET_ID', ss.getId()); }
  var sheet = ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(FIELDS.map(function (f) { return f[1]; }));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, FIELDS.length).setFontWeight('bold');
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
