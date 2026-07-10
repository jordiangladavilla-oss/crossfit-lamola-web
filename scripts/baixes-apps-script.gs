/**
 * CrossFit La Mola · Formulari de Baixes — Google Apps Script
 * ----------------------------------------------------------------------------
 * Rep els POST del formulari /baixa i els escriu a un Google Sheet PROPI
 * anomenat "La Mola · Baixes" (independent del Sheet de reserves).
 *
 * COM DESPLEGAR (copiar-enganxar, sense modificar res):
 *   1. Ves a https://script.google.com  →  Nou projecte.
 *   2. Esborra el contingut i enganxa TOT aquest fitxer.
 *   3. Desa.  Desplega  →  Nova implementació  →  Tipus: "Aplicació web".
 *        - Executa com a:           Jo mateix
 *        - Qui hi té accés:         Qualsevol  (necessari pel formulari públic)
 *   4. Autoritza els permisos quan ho demani.
 *   5. Copia la URL del Web App (acaba en /exec) i enganxa-la a SCRIPT_URL
 *      dins src/pages/baixa.astro.
 *
 * El Sheet "La Mola · Baixes" es crea automàticament la primera vegada i
 * el seu ID queda guardat a les propietats del projecte (no es torna a crear).
 * El trobaràs al teu Google Drive amb aquest nom.
 */

var SHEET_NAME = 'La Mola · Baixes';

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

// Límit de mida per camp i per payload sencer (anti-spam).
var MAX_FIELD_LEN = 500;
var MAX_PAYLOAD_LEN = 20000;

// Neteja cada valor abans d'escriure'l al Sheet:
//  - trunca a MAX_FIELD_LEN
//  - prefixa amb ' els valors que comencen per = + - @ (anti formula injection:
//    sense això, un camp com "=IMPORTRANGE(...)" s'executaria en obrir el Sheet)
function clean_(v) {
  if (Array.isArray(v)) v = v.join(', ');
  if (v === undefined || v === null) return '';
  var s = String(v).slice(0, MAX_FIELD_LEN);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function doPost(e) {
  try {
    if (!e.postData || e.postData.contents.length > MAX_PAYLOAD_LEN) {
      return json_({ result: 'ok' });
    }
    var data = JSON.parse(e.postData.contents);

    // Honeypot: el camp "website" és invisible al formulari; si arriba ple, és un bot.
    // Es respon 'ok' igualment perquè el bot no sàpiga que s'ha descartat.
    if (data.website) {
      return json_({ result: 'ok' });
    }

    var sheet = getSheet_();

    var row = FIELDS.map(function (f) {
      return clean_(data[f[0]]);
    });

    sheet.appendRow(row);

    return json_({ result: 'ok' });
  } catch (err) {
    return json_({ result: 'error', error: String(err) });
  }
}

// Petita resposta perquè puguis comprovar la URL al navegador.
function doGet() {
  return json_({ status: 'CrossFit La Mola · Baixes — endpoint actiu' });
}

// Find-or-create del Sheet propi. Guarda l'ID a les propietats del projecte.
function getSheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('BAIXES_SHEET_ID');
  var ss = null;

  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create(SHEET_NAME);
    props.setProperty('BAIXES_SHEET_ID', ss.getId());
  }

  var sheet = ss.getSheets()[0];

  // Capçalera la primera vegada.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(FIELDS.map(function (f) { return f[1]; }));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, FIELDS.length).setFontWeight('bold');
  }

  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
