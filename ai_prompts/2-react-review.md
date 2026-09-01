Cíl: Bezpečnostní revize, refactoring a zhodnocení architektury v projektu "polygon_tutor".
Aktuální stav: Projekt je postaven na moderním React 19 a Vite, komunikuje s Appwrite backendem a používá react-markdown.

Úkoly pro tebe:
1. Zkontroluj celý adresář `polygon_tutor/src`. Zaměř se na bezpečnostní rizika (XSS, správné načítání Markdownu).
2. Zkontroluj inicializaci Appwrite SDK. Zabezpeč, že se nikde na frontendu nevyskytují citlivá tajemství (API klíče) a že se používají pouze veřejné endpointy a Project ID.
3. Zhodnoť strukturu routování (react-router-dom v7) a navrhni případnou optimalizaci (např. lazy loading pro větší komponenty).
4. Pokud najdeš nějaký zastaralý kód, anti-patterny, nebo neefektivní re-rendery, kód zrefaktoruj a napiš mi k tomu komentář.
