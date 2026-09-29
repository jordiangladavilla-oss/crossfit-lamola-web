// Enviament de leads a l'Apps Script de contacte. Un sol handler per als 9 formularis
// (home, contacte, opositors × CA/ES/EN). Abans cada pàgina duplicava aquest codi amb
// mode:'no-cors' (resposta opaca → "Gràcies" encara que el servidor fallés).
//
// Ara: mode 'cors' amb body text/plain (petició simple, sense preflight; l'Apps Script
// respon amb Access-Control-Allow-Origin: * i JSON {success:true|false}). Si la resposta
// no és 2xx o success no és true, es mostra l'error amb el WhatsApp de recanvi.
// El camp "t" (instant de càrrega del formulari) permet a l'Apps Script descartar
// enviaments instantanis de bots.

export const LEAD_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwHm_4Rwt_x9RN5q1PEKxTzXj587hgKYp70WqyNA9DpbETdy-dcUPt2n3YtaZ7KFJinww/exec';

export interface LeadTexts { sending: string; ok: string; err: string }

export interface LeadFormOptions {
  formId: string;
  submitId: string;
  msgId: string;
  /** Prefix de l'origen ("Home", "Contacte"...). S'hi afegeix "(utm_source|from|web)". */
  origen: string;
  /** event_label de generate_lead a GA4 */
  gaLabel: string;
  texts: LeadTexts;
  /** Construeix el payload a partir del formulari (sense origen/website/t, que s'afegeixen aquí). */
  build: (form: HTMLFormElement) => Record<string, string>;
}

export function getSource(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get('utm_source') || params.get('from') || 'web';
}

function val(form: HTMLFormElement, name: string): string {
  const el = form.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`[name="${name}"]`);
  return el ? el.value : '';
}

export function initLeadForm(o: LeadFormOptions): void {
  const form = document.getElementById(o.formId) as HTMLFormElement | null;
  if (!form) return;
  const loadedAt = Date.now();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById(o.submitId) as HTMLButtonElement | null;
    const msg = document.getElementById(o.msgId) as HTMLElement | null;
    if (!btn || !msg) return;
    const btnText = btn.innerHTML;
    btn.innerHTML = o.texts.sending;
    btn.disabled = true;
    msg.style.display = 'none';

    const data: Record<string, string> = {
      origen: `${o.origen} (${getSource()})`,
      ...o.build(form),
      website: val(form, 'website'),
      t: String(loadedAt),
    };

    // Com llegir la resposta d'un Apps Script: script.google.com executa doPost i respon 302 cap a
    // script.googleusercontent.com, que serveix el JSON. Mesurat (2026-09-29): sota ràfegues,
    // aquest segon salt falla un 25 % (404 HTML o sense capçalera CORS) tot i que doPost JA s'ha
    // executat i el lead és al full. Per això:
    //   · JSON {success:true}            → èxit
    //   · JSON {success:false}           → error real (validació, quota Gmail, excepció)
    //   · resposta no-OK però redirigida → doPost ha respost i l'eco de Google ha fallat: èxit
    //   · 404/5xx sense redirecció       → URL morta o script caigut: error
    //   · fetch llança (CORS a l'eco)    → èxit si hi ha xarxa; error si estem offline
    let ok = false;
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json = await res.json().catch(() => null);
        ok = json ? json.success === true : res.redirected;
      } else {
        ok = res.redirected;
      }
    } catch {
      ok = navigator.onLine;
    }

    msg.style.display = 'block';
    if (ok) {
      msg.style.background = 'var(--accent-ink)';
      msg.style.color = 'var(--bone)';
      msg.innerHTML = o.texts.ok;
      form.reset();
      const g = (window as any).gtag;
      if (typeof g === 'function') {
        g('event', 'generate_lead', { event_category: 'forms', event_label: o.gaLabel, value: 1 });
      }
    } else {
      msg.style.background = '#fee';
      msg.style.color = '#c00';
      msg.innerHTML = o.texts.err;
    }

    btn.innerHTML = btnText;
    btn.disabled = false;
  });
}

/** Helpers de payload per als tres formularis existents */
export const payloads = {
  home: (f: HTMLFormElement) => ({
    name: val(f, 'name'), email: val(f, 'email'), phone: val(f, 'phone'),
    topic: val(f, 'topic'), schedule: val(f, 'schedule'), message: val(f, 'message'),
  }),
  contacte: (f: HTMLFormElement) => ({
    name: val(f, 'name'), email: val(f, 'email'), phone: val(f, 'phone'),
    disc: val(f, 'disc'), level: val(f, 'level'), when: val(f, 'when'), note: val(f, 'note'),
  }),
  opositors: (f: HTMLFormElement) => ({
    name: val(f, 'name'), email: '', phone: val(f, 'phone'),
    disc: 'Oposicions · ' + val(f, 'prep'), level: '', when: '', note: val(f, 'note'),
  }),
};
