import * as exports from './script.js';

// Expose all exports to the global scope so that they can be accessed from the
// inline script in the HTML file.
Object.entries(exports).forEach(([key, value]) => {
    window[key] = value;
});