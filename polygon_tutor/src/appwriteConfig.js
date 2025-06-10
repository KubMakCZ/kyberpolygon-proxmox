// SOUBOR 1: src/appwriteConfig.js
// ------------------------------------
// Tento soubor inicializuje klienta Appwrite a exportuje všechny potřebné služby,
// které budeme v aplikaci používat.

import { Client, Account, Databases, Storage, Teams, ID, Query } from 'appwrite'; // <-- 1. PŘIDÁN IMPORT 'Teams'

// Vytvoření nové instance klienta
export const client = new Client();

// Nastavení endpointu a ID projektu
// DŮLEŽITÉ: Nahraďte hodnoty vašimi skutečnými údaji z Appwrite konzole.
client
    .setEndpoint('http://172.26.37.126/v1') // ZDE ZADEJTE URL VAŠEHO APPWRITE SERVERU
    .setProject('684825cf003afcc83b74');   // ZDE ZADEJTE ID PROJEKTU Z NASTAVENÍ APPWRITE

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client); // <-- 2. PŘIDÁNA INICIALIZACE SLUŽBY TEAMS

// Exportujeme i ID a Query pro použití v jiných souborech
export { ID, Query };
    
