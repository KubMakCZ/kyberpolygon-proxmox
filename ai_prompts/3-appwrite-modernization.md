Cíl: Modernizace a zabezpečení serverless funkcí pro Appwrite v adresáři "appwrite_functions" (konkrétně getManualContent a getStudents).

Úkoly pro tebe:
1. Zkontroluj kód v obou funkcích. Aktuálně se balíček `node-appwrite` upgradoval z verze 12 na verzi 28. Ujisti se, že kód funkcí je s touto nejnovější verzí plně kompatibilní (breaking changes v inicializaci Clienta a databází).
2. Ujisti se, že funkce používají moderní syntaxi (ES Modules, async/await, moderní zpracování chyb try/catch).
3. Přidej robustní chybové hlášky (error handling) pro případ, že Appwrite databáze neodpoví, aby funkce nepadaly.
4. Přidej logování (např. pomocí Appwrite Context `log()` nebo `error()`), aby se funkce dobře debuggovaly v Appwrite konzoli.
5. Aktualizuj `package.json` v obou složkách, ať využívají pevných a aktuálních závislostí.
