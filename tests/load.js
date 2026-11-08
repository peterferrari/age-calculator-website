// Loads the site's browser scripts into a sandbox with a tiny fake DOM, so their
// date and zodiac logic can be tested in Node without a browser.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');

function loadSite() {
    const ctx = {
        console, Intl, Date, Math, JSON, setTimeout, clearTimeout, setInterval, clearInterval,
        document: { addEventListener() {}, dispatchEvent() {}, querySelectorAll() { return []; }, getElementById() { return null; } },
        CustomEvent: class CustomEvent { constructor(type, init) { this.type = type; this.detail = init && init.detail; } },
        localStorage: { getItem() { return null; }, setItem() {} },
        navigator: { language: 'en-US' },
        matchMedia: () => ({ matches: false })
    };
    ctx.window = ctx;
    vm.createContext(ctx);
    const files = [
        'data/famous-people.js', 'data/historical-events.js', 'data/academy-awards.js', 'data/zodiac-info.js',
        'data/zodiac-info-extra.js', 'data/birth-year.js', 'i18n.js', 'script.js', 'fun.js', 'extras.js'
    ];
    // `const` declarations stay global across scripts when run in the same context.
    for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
    return ctx;
}

module.exports = { loadSite, root };
