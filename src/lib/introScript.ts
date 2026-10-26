/**
 * The boot intro plays once per session, on the home page only. This inline <head>
 * script sets data-intro="skip" before first paint when it must not play, so the
 * preloader never flashes.
 */
export const INTRO_SKIP_SCRIPT = `(function(){try{var s=sessionStorage.getItem('intro-seen')||location.pathname!=='/'||matchMedia('(prefers-reduced-motion: reduce)').matches;if(s)document.documentElement.dataset.intro='skip';}catch(e){document.documentElement.dataset.intro='skip';}})()`;
