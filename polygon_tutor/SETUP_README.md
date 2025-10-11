# 🚀 Rychlý Setup - Automatický Skript

Tento návod ti ukáže, jak automaticky nastavit celý Appwrite projekt pomocí připraveného skriptu.

## 📋 Prerekvizity

1. **Běžící Appwrite instance**: `http://172.26.37.102`
2. **Node.js nainstalovaný** (skript vyžaduje Node.js)
3. **Přístup do Appwrite konzole**

---

## 🔑 Krok 1: Získání API klíče

Před spuštěním skriptu musíš vytvořit API klíč v Appwrite:

### 1.1 Přihlášení do Appwrite
1. Otevři prohlížeč
2. Jdi na: `http://172.26.37.102`
3. Přihlaš se svými admin údaji
4. Vyber projekt: `68ea4d860037ebf15232`

### 1.2 Vytvoření API klíče
1. V levém menu klikni na **"Settings"** (ozubené kolečko)
2. V submenu klikni na **"API Keys"**
3. Klikni na tlačítko **"Create API Key"** (vpravo nahoře)
4. Vyplň formulář:
   - **Name**: `Setup Script` (nebo jiný název)
   - **Expiration**: Nech prázdné (nebo nastav na pár hodin)

5. **Scopes (oprávnění)** - zaškrtni následující:
   ```
   ✅ databases.read
   ✅ databases.write
   ✅ collections.read
   ✅ collections.write
   ✅ attributes.read
   ✅ attributes.write
   ✅ indexes.read
   ✅ indexes.write
   ✅ buckets.read
   ✅ buckets.write
   ✅ files.read
   ✅ files.write
   ✅ teams.read
   ✅ teams.write
   ```

6. Klikni **"Create"**
7. **⚠️ DŮLEŽITÉ**: API klíč se zobrazí pouze jednou!
8. **Zkopíruj celý klíč** a ulož si ho někam (např. do Notepadu)

**Příklad API klíče:**
```
standard_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0...
```

---

## ⚡ Krok 2: Spuštění automatického setupu

### 2.1 Otevři terminál
Otevři terminál/příkazový řádek v kořenovém adresáři projektu:
```bash
cd C:\gitprojekty\kyberpolygon-proxmox\polygon_tutor
```

### 2.2 Spusť setup skript
```bash
npm run setup-appwrite
```

### 2.3 Zadej API klíč
Skript se tě zeptá na API klíč:
```
Vlož API klíč:
```
Vlož API klíč, který jsi zkopíroval v kroku 1, a stiskni Enter.

### 2.4 Počkej na dokončení
Skript automaticky vytvoří:
- ✅ Databázi
- ✅ 5 kolekcí s atributy (manuals, vms, scenarios, assignments, settings)
- ✅ 2 týmy (Students, Admins)
- ✅ 1 storage bucket (manuals)

**To bude trvat cca 1-2 minuty** (kvůli čekání mezi vytvářením atributů).

Uvidíš výstup podobný tomuto:
```
🚀 Appwrite Auto-Setup Script
================================

✅ Připojeno k Appwrite

📦 Vytvářím databázi...
   ✅ Databáze vytvořena: 6a7b8c9d0e1f2g3h

📚 Vytvářím kolekce...
   📄 Vytvářím kolekci: manuals
      ✅ Kolekce vytvořena: 1a2b3c4d5e6f7g8h
      📝 Přidávám atributy...
         ✅ title
         ✅ description
         ✅ markdownFileId
...
```

---

## 📋 Krok 3: Zkopírování ID do config.js

Po dokončení skriptu uvidíš výstup s vygenerovanými ID:

```javascript
═══════════════════════════════════════════════════════
📋 VYGENEROVANÁ ID - ZKOPÍRUJ DO src/config.js
═══════════════════════════════════════════════════════

export const AppwriteConfig = {
    DATABASE_ID: "6a7b8c9d0e1f2g3h",

    MANUALS_COLLECTION_ID: "1a2b3c4d5e6f7g8h",
    VMS_COLLECTION_ID: "2b3c4d5e6f7g8h9i",
    SCENARIOS_COLLECTION_ID: "3c4d5e6f7g8h9i0j",
    ASSIGNMENTS_COLLECTION_ID: "4d5e6f7g8h9i0j1k",
    SETTINGS_COLLECTION_ID: "5e6f7g8h9i0j1k2l",

    MANUALS_BUCKET_ID: "6f7g8h9i0j1k2l3m",

    STUDENTS_TEAM_ID: "7g8h9i0j1k2l3m4n",
    ADMINS_TEAM_ID: "8h9i0j1k2l3m4n5o",

    GET_STUDENTS_FUNCTION_ID: "TODO",
    GET_MANUAL_CONTENT_FUNCTION_ID: "TODO"
};
```

### 3.1 Otevři config.js
Otevři soubor: `src/config.js`

### 3.2 Nahraď obsah
Smaž starý obsah a **vlož celý výstup** ze skriptu (včetně `export const AppwriteConfig = {...}`).

### 3.3 Ulož soubor
Ulož soubor (Ctrl+S).

---

## 🎉 Krok 4: Spuštění aplikace

### 4.1 Spusť dev server
```bash
npm run dev
```

### 4.2 Otevři aplikaci
Aplikace poběží na: `http://localhost:5173`

### 4.3 Registrace
1. Klikni na **"Register"**
2. Vytvoř si účet:
   - Jméno: Tvé jméno
   - Email: Tvůj email
   - Heslo: Silné heslo
3. Klikni **"Registrovat"**

---

## 👤 Krok 5: Přidání do Admin týmu

Aby jsi měl přístup k admin sekci, musíš se přidat do týmu Admins:

### 5.1 Vrať se do Appwrite konzole
1. Jdi na: `http://172.26.37.102`
2. Vyber projekt
3. V levém menu klikni **"Auth"** → **"Teams"**

### 5.2 Přidej se do týmu Admins
1. Klikni na tým **"Admins"**
2. Klikni **"Create membership"** (vpravo nahoře)
3. Zadej svůj email (se kterým jsi se registroval v aplikaci)
4. Klikni **"Create"**

### 5.3 Ověření v aplikaci
1. Vrať se do aplikace
2. Odhlaš se a přihlaš se znovu
3. Nyní bys měl vidět odkaz **"Admin"** v navigaci
4. Klikni na **"Admin"** nebo jdi na: `http://localhost:5173/admin`

---

## ✅ Hotovo!

Aplikace je nyní plně funkční! Můžeš začít:

### Přidat první manuál
1. Jdi na `/admin/manuals`
2. Vytvoř nový návod s markdown souborem

### Přidat virtuální stroje
1. Jdi na `/admin/vms`
2. Přidej Proxmox VM ID

### Vytvořit scénář
1. Jdi na `/admin/scenarios`
2. Vytvoř scénář kombinací návodu a VM

### Přiřadit scénář
1. Jdi na `/admin/assignments`
2. Přiřaď scénář studentovi

---

## 🆘 Řešení problémů

### Problém: "Cannot find module 'appwrite'"
**Řešení**: Spusť `npm install` před spuštěním setupu

### Problém: "Invalid API key"
**Řešení**:
1. Zkontroluj, že jsi správně zkopíroval celý API klíč (bez mezer na začátku/konci)
2. Zkontroluj, že API klíč má správná oprávnění (viz Krok 1.2)
3. Zkontroluj, že API klíč nevypršel

### Problém: Skript spadne uprostřed
**Řešení**:
1. Zkontroluj chybovou zprávu
2. Pravděpodobně jsi nezaškrtl všechna potřebná oprávnění API klíče
3. Smaž vytvořenou databázi v Appwrite konzoli
4. Vytvoř nový API klíč se všemi oprávněními
5. Spusť skript znovu

### Problém: "Document Security must be enabled"
**Řešení**: Skript to řeší automaticky, ale pokud vidíš tuto chybu:
1. Jdi do Appwrite konzole
2. Pro každou kolekci: Settings → Document Security = Enabled

### Problém: Aplikace stále zobrazuje bílou obrazovku
**Řešení**:
1. Zkontroluj konzoli v prohlížeči (F12)
2. Zkontroluj, že `.env` soubor obsahuje správné hodnoty
3. Zkontroluj, že `config.js` obsahuje správná ID ze skriptu
4. Restartuj dev server (Ctrl+C a pak `npm run dev`)

---

## 🗑️ Vymazání API klíče

**⚠️ DŮLEŽITÉ**: Po dokončení setupu **vymaž API klíč** z bezpečnostních důvodů!

1. Jdi do Appwrite konzole
2. Settings → API Keys
3. Najdi API klíč "Setup Script"
4. Klikni na ikonu koše (Delete)
5. Potvrd smazání

API klíč byl potřeba jen pro setup a už ho nebudeš potřebovat.

---

## 📚 Alternativní metoda: Manuální setup

Pokud automatický skript nefunguje, můžeš použít manuální návod:
👉 Viz soubor: **APPWRITE_SETUP.md**

---

## 📞 Potřebuješ pomoc?

Pokud narazíš na problém:
1. Zkontroluj chybovou hlášku v terminálu
2. Zkontroluj browser konzoli (F12)
3. Zkontroluj Network tab v browser konzoli
4. Podívej se do Appwrite logs (Settings → Logs)

Hodně štěstí! 🚀
