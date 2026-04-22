import { ui, defaultLang, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key] || key;
  }
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  const parts = pathname.split('/').filter(Boolean);

  // Remove language prefix if present
  if (parts[0] in ui) {
    parts.shift();
  }

  return '/' + parts.join('/');
}

export function getLocalizedPath(path: string, lang: Lang): string {
  const cleanPath = path.startsWith('/') ? path : '/' + path;

  if (lang === defaultLang) {
    return cleanPath;
  }

  return `/${lang}${cleanPath}`;
}

export { defaultLang, type Lang } from './ui';
export { languages } from './ui';
