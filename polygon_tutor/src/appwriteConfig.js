// src/appwriteConfig.js
import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('http://localhost/v1') // ZDE ZADEJTE URL VAŠEHO APPWRITE SERVERU
    .setProject('ID_VAŠEHO_PROJEKTU');   // ZDE ZADEJTE ID PROJEKTU Z NASTAVENÍ APPWRITE

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);