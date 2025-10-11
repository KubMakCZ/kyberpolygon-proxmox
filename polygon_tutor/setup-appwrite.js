/**
 * Automatický setup skript pro Appwrite
 * Tento skript vytvoří všechny potřebné struktury v Appwrite projektu
 */

import { Client, Databases, Storage, Teams, ID } from 'node-appwrite';
import * as readline from 'readline';

// Konfigurace - UPRAVTE PODLE VAŠICH HODNOT
const CONFIG = {
    endpoint: 'http://172.26.37.102/v1',
    projectId: '68ea4d860037ebf15232',
    apiKey: '', // API klíč vyplníš při spuštění
};

// Vytvoření readline interface pro vstup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper funkce pro prompt
function prompt(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// Inicializace Appwrite klienta (budou inicializovány po získání API klíče)
let client;
let databases;
let storage;
let teams;

// Úložiště pro vygenerovaná ID
const generatedIds = {
    databaseId: '',
    collections: {},
    buckets: {},
    teams: {}
};

/**
 * Hlavní setup funkce
 */
async function setup() {
    console.log('🚀 Appwrite Auto-Setup Script');
    console.log('================================\n');

    // Získání API klíče
    console.log('📝 Pro spuštění tohoto skriptu potřebuješ API klíč s následujícími oprávněními:');
    console.log('   - databases.write');
    console.log('   - collections.write');
    console.log('   - attributes.write');
    console.log('   - buckets.write');
    console.log('   - teams.write\n');
    console.log('🔑 Jak získat API klíč:');
    console.log('   1. Jdi do Appwrite konzole: http://172.26.37.102');
    console.log('   2. Vyber projekt');
    console.log('   3. Jdi na Settings → API Keys');
    console.log('   4. Klikni "Create API Key"');
    console.log('   5. Název: "Setup Script"');
    console.log('   6. Scopes: zaškrtni všechny výše uvedené');
    console.log('   7. Zkopíruj vygenerovaný klíč\n');

    const apiKey = await prompt('Vlož API klíč: ');

    if (!apiKey) {
        console.error('❌ API klíč je povinný!');
        rl.close();
        process.exit(1);
    }

    CONFIG.apiKey = apiKey;

    // Nastavení klienta s node-appwrite SDK
    client = new Client();
    client
        .setEndpoint(CONFIG.endpoint)
        .setProject(CONFIG.projectId)
        .setKey(CONFIG.apiKey);

    // Inicializace služeb
    databases = new Databases(client);
    storage = new Storage(client);
    teams = new Teams(client);

    console.log('\n✅ Připojeno k Appwrite\n');

    try {
        // Krok 1: Vytvoření databáze
        await createDatabase();

        // Krok 2: Vytvoření kolekcí
        await createCollections();

        // Krok 3: Vytvoření týmů
        await createTeams();

        // Krok 4: Vytvoření storage bucketů
        await createStorageBuckets();

        // Krok 5: Výpis výsledků
        printResults();

        console.log('\n✅ Setup dokončen!');
        console.log('\n📋 Nyní aktualizuj soubor src/config.js s novými ID (viz výše)');

    } catch (error) {
        console.error('\n❌ Chyba při setupu:', error.message);
        console.error('Detail:', error);
    } finally {
        rl.close();
    }
}

/**
 * Vytvoření databáze
 */
async function createDatabase() {
    console.log('📦 Vytvářím databázi...');

    try {
        const database = await databases.create(
            ID.unique(),
            'kyberpolygon_db',
            true // enabled
        );

        generatedIds.databaseId = database.$id;
        console.log(`   ✅ Databáze vytvořena: ${database.$id}`);
    } catch (error) {
        console.error('   ❌ Chyba při vytváření databáze:', error.message);
        throw error;
    }
}

/**
 * Vytvoření všech kolekcí
 */
async function createCollections() {
    console.log('\n📚 Vytvářím kolekce...');

    // Kolekce 1: Manuals
    await createManualsCollection();

    // Kolekce 2: VMs
    await createVmsCollection();

    // Kolekce 3: Scenarios
    await createScenariosCollection();

    // Kolekce 4: Assignments
    await createAssignmentsCollection();

    // Kolekce 5: Settings
    await createSettingsCollection();
}

/**
 * Kolekce: Manuals
 */
async function createManualsCollection() {
    console.log('\n   📄 Vytvářím kolekci: manuals');

    try {
        const collection = await databases.createCollection(
            generatedIds.databaseId,
            ID.unique(),
            'manuals',
            undefined, // permissions (použijeme document security)
            true // documentSecurity enabled
        );

        generatedIds.collections.manuals = collection.$id;
        console.log(`      ✅ Kolekce vytvořena: ${collection.$id}`);

        // Přidání atributů
        console.log('      📝 Přidávám atributy...');

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'title',
            255,
            true // required
        );
        console.log('         ✅ title');
        await sleep(1000); // Počkáme mezi atributy

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'description',
            1000,
            false // not required
        );
        console.log('         ✅ description');
        await sleep(1000);

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'markdownFileId',
            50,
            true // required
        );
        console.log('         ✅ markdownFileId');

    } catch (error) {
        console.error('      ❌ Chyba:', error.message);
        throw error;
    }
}

/**
 * Kolekce: VMs
 */
async function createVmsCollection() {
    console.log('\n   🖥️  Vytvářím kolekci: vms');

    try {
        const collection = await databases.createCollection(
            generatedIds.databaseId,
            ID.unique(),
            'vms',
            undefined,
            true
        );

        generatedIds.collections.vms = collection.$id;
        console.log(`      ✅ Kolekce vytvořena: ${collection.$id}`);

        console.log('      📝 Přidávám atributy...');

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'name',
            255,
            true
        );
        console.log('         ✅ name');
        await sleep(1000);

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'description',
            1000,
            false
        );
        console.log('         ✅ description');
        await sleep(1000);

        await databases.createIntegerAttribute(
            generatedIds.databaseId,
            collection.$id,
            'proxmox_vmid',
            true, // required
            100, // min
            999999, // max
            undefined // default
        );
        console.log('         ✅ proxmox_vmid');
        await sleep(1000);

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'status',
            50,
            false, // změněno na false (není required)
            'available' // default value
        );
        console.log('         ✅ status');

    } catch (error) {
        console.error('      ❌ Chyba:', error.message);
        throw error;
    }
}

/**
 * Kolekce: Scenarios
 */
async function createScenariosCollection() {
    console.log('\n   📋 Vytvářím kolekci: scenarios');

    try {
        const collection = await databases.createCollection(
            generatedIds.databaseId,
            ID.unique(),
            'scenarios',
            undefined,
            true
        );

        generatedIds.collections.scenarios = collection.$id;
        console.log(`      ✅ Kolekce vytvořena: ${collection.$id}`);

        console.log('      📝 Přidávám atributy...');

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'name',
            255,
            true
        );
        console.log('         ✅ name');
        await sleep(1000);

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'description',
            1000,
            false
        );
        console.log('         ✅ description');
        await sleep(1000);

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'manualId',
            50,
            true
        );
        console.log('         ✅ manualId');
        await sleep(1000);

        // Array atribut pro requiredVmIds
        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'requiredVmIds',
            50,
            true,
            undefined,
            true // array
        );
        console.log('         ✅ requiredVmIds (array)');

    } catch (error) {
        console.error('      ❌ Chyba:', error.message);
        throw error;
    }
}

/**
 * Kolekce: Assignments
 */
async function createAssignmentsCollection() {
    console.log('\n   📌 Vytvářím kolekci: assignments');

    try {
        const collection = await databases.createCollection(
            generatedIds.databaseId,
            ID.unique(),
            'assignments',
            undefined,
            true
        );

        generatedIds.collections.assignments = collection.$id;
        console.log(`      ✅ Kolekce vytvořena: ${collection.$id}`);

        console.log('      📝 Přidávám atributy...');

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'userId',
            50,
            true
        );
        console.log('         ✅ userId');
        await sleep(1000);

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'scenarioId',
            50,
            true
        );
        console.log('         ✅ scenarioId');
        await sleep(1000);

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'assigned_at',
            50,
            true
        );
        console.log('         ✅ assigned_at');
        await sleep(1000);

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'status',
            50,
            true
        );
        console.log('         ✅ status');

    } catch (error) {
        console.error('      ❌ Chyba:', error.message);
        throw error;
    }
}

/**
 * Kolekce: Settings
 */
async function createSettingsCollection() {
    console.log('\n   ⚙️  Vytvářím kolekci: settings');

    try {
        const collection = await databases.createCollection(
            generatedIds.databaseId,
            ID.unique(),
            'settings',
            undefined,
            true
        );

        generatedIds.collections.settings = collection.$id;
        console.log(`      ✅ Kolekce vytvořena: ${collection.$id}`);

        console.log('      📝 Přidávám základní atributy...');

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'key',
            100,
            true
        );
        console.log('         ✅ key');
        await sleep(1000);

        await databases.createStringAttribute(
            generatedIds.databaseId,
            collection.$id,
            'value',
            1000,
            true
        );
        console.log('         ✅ value');

    } catch (error) {
        console.error('      ❌ Chyba:', error.message);
        throw error;
    }
}

/**
 * Vytvoření týmů
 */
async function createTeams() {
    console.log('\n👥 Vytvářím týmy...');

    try {
        // Team: Students
        const studentsTeam = await teams.create(
            ID.unique(),
            'Students'
        );
        generatedIds.teams.students = studentsTeam.$id;
        console.log(`   ✅ Tým Students vytvořen: ${studentsTeam.$id}`);

        // Team: Admins
        const adminsTeam = await teams.create(
            ID.unique(),
            'Admins'
        );
        generatedIds.teams.admins = adminsTeam.$id;
        console.log(`   ✅ Tým Admins vytvořen: ${adminsTeam.$id}`);

    } catch (error) {
        console.error('   ❌ Chyba při vytváření týmů:', error.message);
        throw error;
    }
}

/**
 * Vytvoření storage bucketů
 */
async function createStorageBuckets() {
    console.log('\n💾 Vytvářím storage buckety...');

    try {
        const bucket = await storage.createBucket(
            ID.unique(),
            'manuals',
            undefined, // permissions (použijeme file security)
            true, // fileSecurity enabled
            true, // enabled
            10485760, // maxFileSize (10MB)
            ['md'], // allowedFileExtensions
            undefined, // compression
            undefined, // encryption
            undefined // antivirus
        );

        generatedIds.buckets.manuals = bucket.$id;
        console.log(`   ✅ Bucket manuals vytvořen: ${bucket.$id}`);

    } catch (error) {
        console.error('   ❌ Chyba při vytváření bucketu:', error.message);
        throw error;
    }
}

/**
 * Výpis výsledků
 */
function printResults() {
    console.log('\n');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📋 VYGENEROVANÁ ID - ZKOPÍRUJ DO src/config.js');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('export const AppwriteConfig = {');
    console.log(`    // ID Databáze`);
    console.log(`    DATABASE_ID: "${generatedIds.databaseId}",\n`);

    console.log(`    // ID Kolekcí`);
    console.log(`    MANUALS_COLLECTION_ID: "${generatedIds.collections.manuals}",`);
    console.log(`    VMS_COLLECTION_ID: "${generatedIds.collections.vms}",`);
    console.log(`    SCENARIOS_COLLECTION_ID: "${generatedIds.collections.scenarios}",`);
    console.log(`    ASSIGNMENTS_COLLECTION_ID: "${generatedIds.collections.assignments}",`);
    console.log(`    SETTINGS_COLLECTION_ID: "${generatedIds.collections.settings}",\n`);

    console.log(`    // ID Storage Bucketů`);
    console.log(`    MANUALS_BUCKET_ID: "${generatedIds.buckets.manuals}",\n`);

    console.log(`    // ID Týmů`);
    console.log(`    STUDENTS_TEAM_ID: "${generatedIds.teams.students}",`);
    console.log(`    ADMINS_TEAM_ID: "${generatedIds.teams.admins}",\n`);

    console.log(`    // ID Funkcí (zatím nevytvořeny)`);
    console.log(`    GET_STUDENTS_FUNCTION_ID: "TODO",`);
    console.log(`    GET_MANUAL_CONTENT_FUNCTION_ID: "TODO"`);
    console.log('};\n');

    console.log('═══════════════════════════════════════════════════════\n');
}

/**
 * Helper: Sleep funkce
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Spuštění setupu
setup();
