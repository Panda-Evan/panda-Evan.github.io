/**
 * Intro typographique (compteur 000 → 100 puis rideau) jouée une fois par session,
 * uniquement sur l'accueil. Un script inline dans <head> pose data-intro="skip"
 * avant le premier rendu quand elle ne doit pas jouer : pas de flash.
 */
export const INTRO_SKIP_SCRIPT = `(function(){try{var s=sessionStorage.getItem('intro-seen')||location.pathname!=='/'||matchMedia('(prefers-reduced-motion: reduce)').matches;if(s)document.documentElement.dataset.intro='skip';}catch(e){document.documentElement.dataset.intro='skip';}})()`;
