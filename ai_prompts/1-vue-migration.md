Cíl: Kompletní modernizace a zabezpečení projektu "polygon_Vue_example". 
Aktuální stav: Projekt je napsán ve Vue 3, ale pro build používá silně zastaralé "vue-cli" a jeho staré pluginy, což způsobuje desítky bezpečnostních zranitelností v npm závislostech (např. node-forge, postcss, serialize-javascript).

Úkoly pro tebe:
1. Převeď celý projekt z "vue-cli" na moderní buildovací nástroj "Vite".
2. Smaž staré konfigurační soubory (babel.config.js, vue.config.js apod., pokud tam jsou) a vytvoř nový `vite.config.js`.
3. Uprav `package.json`: odeber všechny `@vue/cli-*` závislosti a přidej nejnovější verze `vite`, `@vitejs/plugin-vue`.
4. Aktualizuj Vue (na nejnovější 3.x), `vue-router` a `bootstrap`.
5. Přesuň/uprav `index.html` podle standardů Vite (přesunutí z `public/` do rootu a přidání `<script type="module" src="/src/main.js"></script>`).
6. Zkontroluj zdrojové kódy v `/src` a ujisti se, že kód odpovídá nejlepším bezpečnostním praktikám (např. bezpečné renderování markdownu přes knihovnu `marked` – ochrana proti XSS).
7. Vygeneruj stručný návod v Markdownu, jak projekt odteď spouštět a builidit.
