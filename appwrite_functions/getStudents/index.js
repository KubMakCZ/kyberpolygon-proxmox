// SOUBOR: index.js (Finální, produkční verze)
// ------------------------------------
// Tato verze spojuje naše poznatky: používá context, process.env a správně
// načítá členy týmu "Students".

const sdk = require('node-appwrite');

module.exports = async function (context) {
  context.log("Spouštím finální verzi funkce getStudents...");

  const client = new sdk.Client();

  // Zkontrolujeme, zda jsou všechny potřebné proměnné prostředí dostupné
  if (
    !process.env.APPWRITE_FUNCTION_ENDPOINT ||
    !process.env.APPWRITE_FUNCTION_API_KEY ||
    !process.env.APPWRITE_FUNCTION_PROJECT_ID ||
    !process.env.STUDENTS_TEAM_ID
  ) {
    const errorMessage = "Chyba: Některé proměnné prostředí pro funkci chybí. Zkontrolujte nastavení funkce v Appwrite konzoli.";
    context.error(errorMessage);
    return context.res.json({ success: false, message: errorMessage }, 500);
  }

  // Inicializace klienta pomocí proměnných prostředí
  client
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  const teams = new sdk.Teams(client);

  try {
    const teamId = process.env.STUDENTS_TEAM_ID;
    context.log(`Načítám členy z týmu s ID: ${teamId}`);
    
    // Provedeme volání Appwrite API pro získání členů týmu
    const result = await teams.listMemberships(teamId);

    context.log(`Úspěšně načteno ${result.total} členů.`);
    return context.res.json({ success: true, data: result });

  } catch (error) {
    context.error("Chyba při volání Appwrite API:", error);
    return context.res.json({ success: false, message: error.message }, 500);
  }
};
