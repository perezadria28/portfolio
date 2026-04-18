import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { initScroll } from './scroll.js';
import { initAnimations } from './animations.js';
import { initInteractions } from './interactions.js';
import { initUtils } from './utils.js';

document.documentElement.style.visibility = 'visible';

initTheme();
initNav();
initScroll();
initAnimations();
initInteractions();
initUtils();
