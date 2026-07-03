/**
 * Build pipeline for My-Resume
 * ---------------------------------------------------------------
 *  1. Images  -> WebP + resize (sharp)
 *  2. CSS     -> bundle + PurgeCSS + minify  -> css/app.min.css
 *  3. JS      -> bundle + minify (terser)    -> js/app.min.js
 *
 *  Run with: npm run build
 *  Output files are committed to the repo (the host runs `node server.js`,
 *  not necessarily a build step).
 */

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const CleanCSS = require('clean-css');
const postcss = require('postcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const { minify } = require('terser');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'images');
const CSS_DIR = path.join(ROOT, 'css');
const JS_DIR = path.join(ROOT, 'js');

const read = (p) => fs.readFileSync(p, 'utf8');
const kb = (n) => (n / 1024).toFixed(1) + ' KB';

/* ─────────────────────────────────────────────────────────────
   1. IMAGES → WebP + resize
   ───────────────────────────────────────────────────────────── */

// maxWidth overrides by filename (default applies to everything else).
const IMAGE_MAX_WIDTH = {
    'img_bg_1.jpg': 1920,
    'img_bg_2.jpg': 1920,
    'cover_bg_1.jpg': 1920,
    'emon(1).png': 600,
    'gmail-logo.png': 120,
    'kaggle-icon.png': 96,
    'medium-icon.png': 96,
    'blog-1.png': 900,
    'blog-2.png': 900,
    'blog-3.png': 900,
};
const DEFAULT_MAX_WIDTH = 900; // project cards & cert thumbs
const QUALITY = 80;

async function buildImages() {
    console.log('\n▶ Images → WebP');
    const files = fs.readdirSync(IMAGES_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));
    let before = 0, after = 0;
    for (const file of files) {
        const src = path.join(IMAGES_DIR, file);
        const base = file.replace(/\.(png|jpe?g)$/i, '');
        const out = path.join(IMAGES_DIR, base + '.webp');
        const maxW = IMAGE_MAX_WIDTH[file] || DEFAULT_MAX_WIDTH;
        const srcSize = fs.statSync(src).size;
        before += srcSize;
        const meta = await sharp(src).metadata();
        let pipe = sharp(src);
        if (meta.width && meta.width > maxW) pipe = pipe.resize({ width: maxW });
        await pipe.webp({ quality: QUALITY }).toFile(out);
        const outSize = fs.statSync(out).size;
        after += outSize;
        console.log(`   ${file.padEnd(24)} ${kb(srcSize).padStart(10)} → ${kb(outSize).padStart(10)}  (${base}.webp)`);
    }
    console.log(`   ── total ${kb(before)} → ${kb(after)}  (saved ${kb(before - after)})`);

    // Favicon (PNG) generated from the author avatar — fixes the 404 favicon.ico.
    const avatar = path.join(IMAGES_DIR, 'emon(1).png');
    if (fs.existsSync(avatar)) {
        for (const size of [32, 180]) {
            const name = size === 180 ? 'apple-touch-icon.png' : 'favicon-32.png';
            await sharp(avatar).resize(size, size, { fit: 'cover' }).png().toFile(path.join(IMAGES_DIR, name));
        }
        console.log('   favicon-32.png + apple-touch-icon.png generated');
    }
}

/* ─────────────────────────────────────────────────────────────
   2. CSS → bundle + purge + minify
   ───────────────────────────────────────────────────────────── */

const CSS_FILES = [
    'animate.css',
    'icomoon.css',
    'bootstrap.css',
    'flexslider.css',
    'style.css',
    'scroll-animations.css',
];

async function buildCss() {
    console.log('\n▶ CSS → css/app.min.css');
    const bundle = CSS_FILES.map((f) => `/* ${f} */\n` + read(path.join(CSS_DIR, f))).join('\n');
    const rawSize = Buffer.byteLength(bundle);

    // PurgeCSS: keep only selectors used in the HTML / JS. The safelist covers
    // classes toggled dynamically by JS (main.js, flexslider, waypoints, GSAP).
    const purged = await postcss([
        purgecss({
            content: [
                path.join(ROOT, 'index.html'),
                path.join(JS_DIR, '*.js'),
            ],
            defaultExtractor: (content) => content.match(/[\w-/:%.]+(?<!:)/g) || [],
            safelist: {
                standard: [
                    'active', 'open', 'in', 'show', 'collapse', 'collapsing', 'fade',
                    'offcanvas-visible', 'menu-show', 'js-fullheight', 'sleep', 'awake',
                    'animated', 'preloader', 'loaded', 'to-animate', 'item-animate',
                    'colorlib-nav-toggle', 'dark-theme', 'light-theme',
                    'flex-active', 'flex-active-slide',
                ],
                greedy: [
                    /^animated/, /^fade/, /^bounce/, /^flash/, /^pulse/, /^rubberBand/,
                    /^shake/, /^swing/, /^tada/, /^wobble/, /^jello/, /^heartBeat/,
                    /^slide/, /^zoom/, /^roll/, /^flip/, /^lightSpeed/, /^rotate/, /^hinge/,
                    /^back/, /^flex-/, /^flexslider/, /^slides/, /^icon-/, /^glyphicon/,
                    /^col-/, /^row/, /^btn/, /^waypoint/, /scroll-animate/, /animate-/,
                    /^services/, /^color-/, /^cert-/, /^project/, /^chatbot/, /^terminal/,
                    /^particles/, /^tagcloud/, /^tilt/, /^odometer/, /^lenis/, /^spotlight/,
                    /^glitch/, /^morph/, /^scramble/, /^cursor/, /^magnetic/, /^blob/,
                    /* Dynamically toggled at runtime by JS — must never be purged:
                       dark-mode theming, offcanvas sidebar, and the Typed.js cursor. */
                    /data-theme/, /offcanvas/, /typed/,
                ],
            },
        }),
    ]).process(bundle, { from: undefined });

    const minified = new CleanCSS({ level: 2 }).minify(purged.css);
    if (minified.errors.length) console.warn('   clean-css errors:', minified.errors);
    fs.writeFileSync(path.join(CSS_DIR, 'app.min.css'), minified.styles);
    console.log(`   bundle ${kb(rawSize)} → purged ${kb(Buffer.byteLength(purged.css))} → minified ${kb(Buffer.byteLength(minified.styles))}`);
}

/* ─────────────────────────────────────────────────────────────
   3. JS → bundle + minify
   ───────────────────────────────────────────────────────────── */

// Order matters: jQuery first, then its plugins, then app code.
const JS_FILES = [
    'jquery.min.js',
    'jquery.easing.1.3.js',
    'bootstrap.min.js',
    'jquery.waypoints.min.js',
    'jquery.flexslider-min.js',
    'main.js',
    'scroll-animator.js',
];

async function buildJs() {
    console.log('\n▶ JS → js/app.min.js');
    const sources = {};
    let rawSize = 0;
    for (const f of JS_FILES) {
        const code = read(path.join(JS_DIR, f));
        sources[f] = code;
        rawSize += Buffer.byteLength(code);
    }
    const result = await minify(sources, {
        compress: true,
        mangle: true,
        // jQuery etc. are already minified; keep it robust.
        safari10: true,
    });
    if (result.error) throw result.error;
    fs.writeFileSync(path.join(JS_DIR, 'app.min.js'), result.code);
    console.log(`   bundle ${kb(rawSize)} → minified ${kb(Buffer.byteLength(result.code))}`);
}

/* ───────────────────────────────────────────────────────────── */

(async () => {
    const task = process.argv[2]; // optional: images | css | js
    try {
        if (!task || task === 'images') await buildImages();
        if (!task || task === 'css') await buildCss();
        if (!task || task === 'js') await buildJs();
        console.log('\n✔ Build complete\n');
    } catch (err) {
        console.error('\n✖ Build failed:', err);
        process.exit(1);
    }
})();
