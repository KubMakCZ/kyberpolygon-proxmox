// SOUBOR: index.js (pro funkci getManualContent)
// --------------------------------------------------------
// Verze 2: Zkusíme číst fileId nejen z payloadu, ale i z hlaviček.

const sdk = require('node-appwrite');

module.exports = async function (context) {
  context.log("Start diagnostické funkce (verze 4)...");
  context.log("RAW Payload:", context.req.payload);
  context.log("RAW Headers:", context.req.headers);

  let fileId = null;

  try {
    // Pokusíme se načíst z payloadu
    const payload = JSON.parse(context.req.payload || '{}');
    if (payload.fileId) {
      fileId = payload.fileId;
      context.log(`Nalezeno fileId v PAYLOADU: ${fileId}`);
    } 
    // Pokud v payloadu není, zkusíme hlavičky
    else if (context.req.headers['x-file-id']) {
      fileId = context.req.headers['x-file-id'];
      context.log(`Nalezeno fileId v HLAVIČCE 'x-file-id': ${fileId}`);
    }

    if (!fileId) {
      throw new Error("Nebylo poskytnuto 'fileId' ani v payloadu, ani v hlavičce 'x-file-id'.");
    }
    
    // Zbytek funkce pro stažení souboru...
    const client = new sdk.Client();
    client
      .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

    const storage = new sdk.Storage(client);
    const resultBuffer = await storage.getFileDownload(process.env.MANUALS_BUCKET_ID, fileId);
    const fileContent = resultBuffer.toString('utf-8');

    return context.res.json({ success: true, content: fileContent });

  } catch (error) {
    context.error("CHYBA VE FUNKCI:", error.message);
    return context.res.json({ success: false, message: error.message }, 500);
  }
};
