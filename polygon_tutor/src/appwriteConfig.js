// src/appwriteConfig.js
import { Client, Account, Databases, Storage, Teams, Functions, ID, Query, Permission, Role } from 'appwrite';

// Načtení proměnných z .env souboru
const appwriteEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

// Kontrola, zda jsou proměnné nastaveny
if (!appwriteEndpoint || !appwriteProjectId) {
    throw new Error("Chybí Appwrite endpoint nebo project ID v .env souboru!");
}

export const client = new Client();

client
    .setEndpoint(appwriteEndpoint)
    .setProject(appwriteProjectId);

// Inicializace služeb zůstává stejná
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);
export const functions = new Functions(client); // <-- 2. PŘIDÁNA INICIALIZACE SLUŽBY FUNCTIONS

export { ID, Query, Permission, Role };

