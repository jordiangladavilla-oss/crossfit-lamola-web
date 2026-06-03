/**
 * GA4 · Tracking de LEADS des del servidor (Measurement Protocol)
 * ----------------------------------------------------------------------------
 * PROBLEMA: GA4 marcava 0 leads tot i que SÍ que n'arribaven (web + Instagram).
 * Causa: el GA del web només carrega DESPRÉS d'acceptar cookies, així que
 * l'esdeveniment 'generate_lead' del navegador gairebé mai disparava.
 *
 * SOLUCIÓ: enviar l'esdeveniment des de l'Apps Script que ja rep el formulari
 * de contacte → captura el 100% dels leads, amb o sense consentiment de cookies
 * (no posa cap cookie a l'usuari; és una conversió de servidor).
 *
 * ─── COM INSTAL·LAR ─────────────────────────────────────────────────────────
 * 1) GA4 → Admin → Fluxos de dades → (el web) → "Protocol de mesura" →
 *    "Crear secret d'API". Copia el valor i posa'l a API_SECRET, aquí sota.
 * 2) Obre l'Apps Script ACTUAL del formulari de contacte (el de SCRIPT_URL a
 *    contacte.astro / index.astro) i enganxa-hi aquesta funció.
 * 3) Dins del seu doPost(e), DESPRÉS d'escriure la fila al Sheet, afegeix:
 *        trackLeadGA4_(data);
 *    (on 'data' és l'objecte amb els camps del formulari: origen, name, disc…)
 * 4) Desa i torna a desplegar (Gestiona implementacions → edita → nova versió).
 * 5) GA4 → Admin → Esdeveniments → marca 'generate_lead' com a "Esdeveniment
 *    clau" (key event) perquè compti com a conversió.
 *
 * Per provar-ho: envia un lead de prova i mira GA4 → Informes → Temps real;
 * l'esdeveniment 'generate_lead' hauria d'aparèixer en pocs segons.
 */

function trackLeadGA4_(data) {
  var MEASUREMENT_ID = 'G-19HS7P4XHP';
  var API_SECRET = 'PEGA_AQUI_EL_SECRET_DAPI'; // ← del pas 1

  // client_id aleatori (lead de servidor, sense cookie de navegador)
  var clientId = Math.floor(Math.random() * 1e10) + '.' + Math.floor(Date.now() / 1000);

  var origen = String((data && data.origen) || 'web');
  var esES = origen.toLowerCase().indexOf('es') > -1; // "Contacto ES (web)" → castellà

  var payload = {
    client_id: clientId,
    events: [{
      name: 'generate_lead',
      params: {
        origen: origen,                                  // Contacte (web/instagram), Contacto ES (web)…
        disciplina: String((data && data.disc) || ''),   // WOD, Hybrid Club…
        idioma: esES ? 'es' : 'ca',
        currency: 'EUR',
        value: 1
      }
    }]
  };

  try {
    UrlFetchApp.fetch(
      'https://www.google-analytics.com/mp/collect?measurement_id=' +
        MEASUREMENT_ID + '&api_secret=' + API_SECRET,
      {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      }
    );
  } catch (e) {
    // No bloquejar mai el guardat del lead si GA4 falla.
  }
}
