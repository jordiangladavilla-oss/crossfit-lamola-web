/**
 * CrossFit La Mola · Formulari de Contacte — Google Apps Script (doPost)
 * ----------------------------------------------------------------------------
 * Rep els POST dels formularis de contacte (contacte.astro + home) i:
 *   1. Descarta bots (honeypot "website").
 *   2. Escriu el lead al Google Sheet actiu del projecte.
 *   3. Envia email de notificació a hola@crossfitlamola.com.
 *
 * AQUEST FITXER ÉS LA CÒPIA VERSIONADA del doPost desplegat a script.google.com
 * (el projecte real pot tenir altres funcions; aquí només es documenta doPost).
 * Si es canvia allà, actualitzar també aquí — i viceversa.
 *
 * DESPLEGAR CANVIS: Desplega → Gestiona les implementacions → editar la
 * implementació EXISTENT → Versió nova → Desplega. (MAI "Nova implementació":
 * canviaria la URL /exec i els formularis de la web deixarien de funcionar.)
 */

// Límits anti-spam.
var MAX_FIELD_LEN = 500;
var MAX_PAYLOAD_LEN = 20000;

// Trunca cada camp i neutralitza fórmules: prefixa amb ' els valors que
// comencen per = + - @ (anti formula injection — sense això, un camp com
// "=HYPERLINK(...)" s'executaria en obrir el Sheet).
function clean_(v) {
  if (v === undefined || v === null) return '';
  var s = String(v).slice(0, MAX_FIELD_LEN);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function doPost(e) {
  try {
    // Descarta payloads gegants.
    if (!e.postData || e.postData.contents.length > MAX_PAYLOAD_LEN) {
      return ContentService
        .createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);

    // Honeypot: si aquest camp té valor, és un bot. Es respon success igualment
    // perquè el bot no sàpiga que s'ha descartat.
    if (data.website && data.website.length > 0) {
      return ContentService
        .createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Valors nets, reutilitzats al Sheet i a l'email.
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

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      new Date().toLocaleString('ca-ES'),
      origen, name, email, phone, topic, disc, level, when, schedule, message
    ]);

    // Email de notificació.
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

    GmailApp.sendEmail('hola@crossfitlamola.com', subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
