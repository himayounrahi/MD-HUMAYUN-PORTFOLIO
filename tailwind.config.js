/** @type {import('tailwindcss').Config} */

// ---------------------------------------------------------------------------
// COLOURS ARE NOT DEFINED HERE.
// Every colour below points at a CSS variable declared in src/index.css.
// That is what makes dark mode work without duplicating class names.
// To change a colour, edit src/index.css (or src/config/site.js which
// documents the same values) -- not this file.
// ---------------------------------------------------------------------------
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--c-bg)',
        surface: 'var(--c-surface)',
        fg: 'var(--c-fg)',
        accent: 'var(--c-accent)',
        'accent-soft': 'var(--c-accent-soft)',
        muted: 'var(--c-grey-500)',
        line: 'var(--c-grey-200)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Modular scale, ratio 1.25 (major third), 17px base.
      fontSize: {
        micro: ['0.8125rem', { lineHeight: '1.5' }],   // 13
        small: ['0.9375rem', { lineHeight: '1.6' }],   // 15
        base: ['1.0625rem', { lineHeight: '1.65' }],   // 17
        lead: ['1.3125rem', { lineHeight: '1.55' }],   // 21
        h4: ['1.625rem', { lineHeight: '1.3' }],       // 26
        h3: ['2.0625rem', { lineHeight: '1.2' }],      // 33
        h2: ['2.5625rem', { lineHeight: '1.12' }],     // 41
        h1: ['3.1875rem', { lineHeight: '1.05' }],     // 51
      },
      // Spacing scale used for section rhythm.
      spacing: {
        section: '7rem',
        'section-sm': '4.5rem',
      },
      maxWidth: {
        prose: '68ch',
        shell: '78rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
