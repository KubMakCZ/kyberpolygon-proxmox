# 🚀 Návod na nastavení Appwrite projektu

Tento návod tě provede kompletním nastavením Appwrite projektu pro aplikaci Kybernetický Polygon.

## 📌 Prerekvizity

- Běžící Appwrite instance na: `http://172.26.37.102`
- Administrátorský přístup do Appwrite konzole
- Project ID: `68ea4d860037ebf15232`

---

## 1️⃣ VYTVOŘENÍ DATABÁZE

### Krok 1.1: Přihlášení
1. Otevři prohlížeč a jdi na `http://172.26.37.102`
2. Přihlaš se svými administrátorskými údaji
3. Vyber projekt `68ea4d860037ebf15232`

### Krok 1.2: Vytvoření databáze
1. V levém menu klikni na **"Databases"**
2. Klikni na tlačítko **"Create database"** (vpravo nahoře)
3. Zadej název: `kyberpolygon_db`
4. Klikni **"Create"**
5. ✅ **DŮLEŽITÉ**: Zkopíruj si **Database ID** (zobrazí se nahoře) a ulož ho stranou
68ea4f3100165ba02213

---

## 2️⃣ VYTVOŘENÍ KOLEKCÍ

V nově vytvořené databázi budeš vytvářet 5 kolekcí.

---

### 📄 Kolekce 1: MANUALS (Návody)

#### Vytvoření kolekce:
1. V databázi klikni **"Create collection"**
2. **Collection Name**: `manuals`
3. Klikni **"Create"**
4. ✅ Zkopíruj si **Collection ID**
68ea4f4a0005928a5cbe

#### Přidání atributů:
Klikni na záložku **"Attributes"** a přidej následující:

| Atribut | Typ | Velikost | Povinné | Default |
|---------|-----|----------|---------|---------|
| `title` | String | 255 | ✅ Ano | - |
| `description` | String | 1000 | ❌ Ne | - |
| `markdownFileId` | String | 50 | ✅ Ano | - |

**Postup pro každý atribut:**
1. Klikni **"Create attribute"**
2. Vyber typ (String)
3. Zadej název atributu (např. `title`)
4. Zadej velikost (např. `255`)
5. Zaškrtni "Required" pokud je povinný
6. Klikni **"Create"**
7. Počkej na dokončení (status změní na "Available")

#### Nastavení oprávnění:
1. Klikni na záložku **"Settings"**
2. V sekci **"Permissions"** najdi **"Document Security"**
3. Ujisti se, že je **Document Security** = **Enabled** ✅

---

### 🖥️ Kolekce 2: VMS (Virtuální stroje)

#### Vytvoření kolekce:
1. Vrať se zpět do databáze (breadcrumbs nahoře)
2. Klikni **"Create collection"**
3. **Collection Name**: `vms`
4. Klikni **"Create"**
5. ✅ Zkopíruj si **Collection ID**

#### Přidání atributů:

| Atribut | Typ | Velikost | Povinné | Default |
|---------|-----|----------|---------|---------|
| `name` | String | 255 | ✅ Ano | - |
| `description` | String | 1000 | ❌ Ne | - |
| `proxmox_vmid` | Integer | - | ✅ Ano | - |
| `status` | String | 50 | ✅ Ano | `available` |

**Poznámka pro Integer:**
- Pro `proxmox_vmid` vyber typ **"Integer"**
- Min: `100`, Max: `999999` (nebo podle potřeby)

**Poznámka pro default hodnotu:**
- U atributu `status` zadej default value: `available`

#### Nastavení oprávnění:
- **Document Security** = **Enabled** ✅

---

### 📋 Kolekce 3: SCENARIOS (Scénáře)

#### Vytvoření kolekce:
1. Vrať se zpět do databáze
2. Klikni **"Create collection"**
3. **Collection Name**: `scenarios`
4. Klikni **"Create"**
5. ✅ Zkopíruj si **Collection ID**

#### Přidání atributů:

| Atribut | Typ | Velikost | Povinné | Default | Array |
|---------|-----|----------|---------|---------|-------|
| `name` | String | 255 | ✅ Ano | - | ❌ |
| `description` | String | 1000 | ❌ Ne | - | ❌ |
| `manualId` | String | 50 | ✅ Ano | - | ❌ |
| `requiredVmIds` | String | 50 | ✅ Ano | - | ✅ ANO |

**⚠️ DŮLEŽITÉ pro `requiredVmIds`:**
1. Při vytváření tohoto atributu zaškrtni **"Array"**
2. To umožní uložit více VM ID
3. Zadej velikost položky: `50`

#### Nastavení oprávnění:
- **Document Security** = **Enabled** ✅

---

### 📌 Kolekce 4: ASSIGNMENTS (Přiřazení)

#### Vytvoření kolekce:
1. Vrať se zpět do databáze
2. Klikni **"Create collection"**
3. **Collection Name**: `assignments`
4. Klikni **"Create"**
5. ✅ Zkopíruj si **Collection ID**

#### Přidání atributů:

| Atribut | Typ | Velikost | Povinné | Default |
|---------|-----|----------|---------|---------|
| `userId` | String | 50 | ✅ Ano | - |
| `scenarioId` | String | 50 | ✅ Ano | - |
| `assigned_at` | String | 50 | ✅ Ano | - |
| `status` | String | 50 | ✅ Ano | - |

#### Nastavení oprávnění:
- **Document Security** = **Enabled** ✅

---

### ⚙️ Kolekce 5: SETTINGS (Nastavení)

#### Vytvoření kolekce:
1. Vrať se zpět do databáze
2. Klikni **"Create collection"**
3. **Collection Name**: `settings`
4. Klikni **"Create"**
5. ✅ Zkopíruj si **Collection ID**

#### Přidání atributů:
- Zatím ponech prázdnou (bude použita v budoucnu)
- Nebo přidej základní pole:

| Atribut | Typ | Velikost | Povinné |
|---------|-----|----------|---------|
| `key` | String | 100 | ✅ Ano |
| `value` | String | 1000 | ✅ Ano |

#### Nastavení oprávnění:
- **Document Security** = **Enabled** ✅

---

## 3️⃣ VYTVOŘENÍ TÝMŮ

### Krok 3.1: Přejdi na Teams
1. V levém menu klikni na **"Auth"**
2. Klikni na záložku **"Teams"**

### Krok 3.2: Vytvoření týmu Students
1. Klikni **"Create team"** (vpravo nahoře)
2. **Team name**: `Students`
3. Klikni **"Create"**
4. ✅ **DŮLEŽITÉ**: Zkopíruj si **Team ID** (zobrazí se v seznamu)

### Krok 3.3: Vytvoření týmu Admins
1. Klikni **"Create team"**
2. **Team name**: `Admins`
3. Klikni **"Create"**
4. ✅ **DŮLEŽITÉ**: Zkopíruj si **Team ID**

### Krok 3.4: Přidání administrátora
1. Klikni na tým **"Admins"** v seznamu
2. Klikni **"Create membership"**
3. Zadej svůj email
4. **Role**: ponech prázdné nebo `owner`
5. Klikni **"Create"**
6. Zkontroluj email a přijmi pozvánku (pokud je třeba)

---

## 4️⃣ VYTVOŘENÍ STORAGE BUCKETU

### Krok 4.1: Přejdi na Storage
1. V levém menu klikni na **"Storage"**

### Krok 4.2: Vytvoření bucketu
1. Klikni **"Create bucket"** (vpravo nahoře)
2. **Bucket name**: `manuals`
3. **Bucket ID**: nech auto-generate nebo zadej vlastní
4. Klikni **"Create"**

### Krok 4.3: Nastavení bucketu
Po vytvoření klikni na bucket a nastav:

1. **Settings** záložka:
   - **File Security**: **Enabled** ✅ (velmi důležité!)
   - **Maximum file size**: `10485760` (10 MB)
   - **Allowed file extensions**: `md` (nebo prázdné pro všechny)
   - **Compression**: můžeš zapnout
   - **Encryption**: můžeš zapnout

2. ✅ **DŮLEŽITÉ**: Zkopíruj si **Bucket ID** (nahoře na stránce)

---

## 5️⃣ VYTVOŘENÍ FUNCTIONS (VOLITELNÉ)

### ⚠️ Poznámka
Functions jsou pokročilá funkce a pro základní běh aplikace nejsou nutné.
Můžeš je přeskočit a dodat později.

### Funkce 1: getStudents

**Účel**: Načtení seznamu studentů z týmu

#### Vytvoření funkce:
1. V levém menu klikni na **"Functions"**
2. Klikni **"Create function"**
3. **Name**: `getStudents`
4. **Runtime**: `Node.js 18.0` (nebo novější)
5. **Execute access**: `Team: Admins`
6. Klikni **"Create"**
7. ✅ Zkopíruj si **Function ID**

#### Deploy kódu:
1. Klikni na nově vytvořenou funkci
2. Jdi na záložku **"Source"**
3. Nahraj následující soubor `index.js`:

```javascript
import { Client, Teams } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const teams = new Teams(client);

  try {
    // Získej ID týmu Students z environment variables nebo z requestu
    const teamId = process.env.STUDENTS_TEAM_ID || req.body.teamId;

    if (!teamId) {
      throw new Error('Team ID není specifikováno');
    }

    const memberships = await teams.listMemberships(teamId);

    return res.json({
      success: true,
      data: {
        memberships: memberships.memberships.map(m => ({
          userId: m.userId,
          userName: m.userName,
          userEmail: m.userEmail,
          joined: m.joined
        }))
      }
    });
  } catch (err) {
    error(err.message);
    return res.json({
      success: false,
      message: err.message
    });
  }
};
```

4. Přidej **Environment Variables**:
   - `STUDENTS_TEAM_ID` = (ID týmu Students)

5. Klikni **"Deploy"**

---

### Funkce 2: getManualContent

**Účel**: Načtení obsahu markdown souborů

#### Vytvoření funkce:
1. Klikni **"Create function"**
2. **Name**: `getManualContent`
3. **Runtime**: `Node.js 18.0`
4. **Execute access**: `Team: Students` + `Team: Admins`
5. Klikni **"Create"**
6. ✅ Zkopíruj si **Function ID**

#### Deploy kódu:
```javascript
import { Client, Storage } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const storage = new Storage(client);

  try {
    const { bucketId, fileId } = req.body;

    if (!bucketId || !fileId) {
      throw new Error('bucketId a fileId jsou povinné');
    }

    const file = await storage.getFileDownload(bucketId, fileId);

    return res.text(file.toString('utf-8'));
  } catch (err) {
    error(err.message);
    return res.json({
      success: false,
      message: err.message
    });
  }
};
```

---

## 6️⃣ AKTUALIZACE KONFIGURACE

### Krok 6.1: Otevři config.js
Otevři soubor `src/config.js` ve svém projektu

### Krok 6.2: Nahraď všechna ID
Použij ID, která jsi si poznamenal:

```javascript
// src/config.js

export const AppwriteConfig = {
    // ID Databáze
    DATABASE_ID: "TVOJE_DATABASE_ID",

    // ID Kolekcí
    MANUALS_COLLECTION_ID: "TVOJE_MANUALS_COLLECTION_ID",
    VMS_COLLECTION_ID: "TVOJE_VMS_COLLECTION_ID",
    SCENARIOS_COLLECTION_ID: "TVOJE_SCENARIOS_COLLECTION_ID",
    ASSIGNMENTS_COLLECTION_ID: "TVOJE_ASSIGNMENTS_COLLECTION_ID",
    SETTINGS_COLLECTION_ID: "TVOJE_SETTINGS_COLLECTION_ID",

    // ID Storage Bucketů
    MANUALS_BUCKET_ID: "TVUJ_MANUALS_BUCKET_ID",

    // ID Týmů
    STUDENTS_TEAM_ID: "TVUJ_STUDENTS_TEAM_ID",
    ADMINS_TEAM_ID: "TVUJ_ADMINS_TEAM_ID",

    // ID Funkcí (pokud jsi je vytvořil)
    GET_STUDENTS_FUNCTION_ID: "TVOJE_GET_STUDENTS_FUNCTION_ID",
    GET_MANUAL_CONTENT_FUNCTION_ID: "TVOJE_GET_MANUAL_CONTENT_FUNCTION_ID"
};
```

### Krok 6.3: Ulož soubor

---

## 7️⃣ SPUŠTĚNÍ APLIKACE

### Krok 7.1: Ujisti se, že máš správný .env
Soubor `.env` by měl obsahovat:
```env
VITE_APPWRITE_ENDPOINT=http://172.26.37.102/v1
VITE_APPWRITE_PROJECT_ID=68ea4d860037ebf15232
```

### Krok 7.2: Spusť dev server
```bash
npm run dev
```

### Krok 7.3: Otevři aplikaci
Aplikace poběží na `http://localhost:5173` (nebo jiném portu)

---

## 8️⃣ VYTVOŘENÍ PRVNÍHO ADMIN ÚČTU

### Krok 8.1: Registrace
1. Otevři aplikaci v prohlížeči
2. Klikni na **"Register"** (nebo `/register`)
3. Zadej:
   - **Jméno**: Tvé jméno
   - **Email**: Tvůj email
   - **Heslo**: Silné heslo
4. Klikni **"Registrovat"**

### Krok 8.2: Přidání do týmu Admins
1. Vrať se do Appwrite konzole
2. Jdi na **Auth** → **Teams** → **Admins**
3. Klikni **"Create membership"**
4. Zadej email, se kterým jsi se registroval
5. Klikni **"Create"**

### Krok 8.3: Ověření
1. Odhlaš se z aplikace
2. Přihlaš se znovu
3. Měl bys mít přístup k admin sekci na `/admin`

---

## ✅ KONTROLNÍ SEZNAM

Použij tento checklist k ověření, že máš vše hotové:

- [ ] Databáze vytvořena
- [ ] Kolekce `manuals` vytvořena s atributy
- [ ] Kolekce `vms` vytvořena s atributy
- [ ] Kolekce `scenarios` vytvořena s atributy (včetně array `requiredVmIds`)
- [ ] Kolekce `assignments` vytvořena s atributy
- [ ] Kolekce `settings` vytvořena
- [ ] Všechny kolekce mají **Document Security = Enabled**
- [ ] Tým `Students` vytvořen
- [ ] Tým `Admins` vytvořen
- [ ] Storage bucket `manuals` vytvořen s **File Security = Enabled**
- [ ] Funkce `getStudents` vytvořena (volitelné)
- [ ] Funkce `getManualContent` vytvořena (volitelné)
- [ ] Soubor `config.js` aktualizován se všemi ID
- [ ] Soubor `.env` existuje a obsahuje správné hodnoty
- [ ] Aplikace se spouští bez chyb
- [ ] Admin účet vytvořen a přidán do týmu Admins

---

## 🆘 ŘEŠENÍ PROBLÉMŮ

### Problém: "Chybí Appwrite endpoint nebo project ID"
**Řešení**: Zkontroluj, že `.env` soubor existuje a obsahuje správné hodnoty

### Problém: "Document not found" při čtení dat
**Řešení**: Zkontroluj, že Collection ID v `config.js` odpovídají ID v Appwrite

### Problém: "Missing scope" nebo permission chyby
**Řešení**:
1. Zkontroluj, že Document Security je zapnutá
2. Ujisti se, že uživatel je v týmu Admins pro admin operace

### Problém: Nemohu nahrát soubory
**Řešení**: Zkontroluj, že File Security je zapnutá v bucket `manuals`

### Problém: Functions nefungují
**Řešení**:
1. Zkontroluj, že jsou správně deploynuté
2. Zkontroluj logy funkce v Appwrite konzoli
3. Pro začátek můžeš functions přeskočit - nejsou kritické

---

## 📚 DALŠÍ KROKY

Po dokončení nastavení můžeš:

1. **Přidat první manuál**:
   - Přihlaš se jako admin
   - Jdi na `/admin/manuals`
   - Vytvoř nový návod s markdown souborem

2. **Přidat virtuální stroje**:
   - Jdi na `/admin/vms`
   - Přidej Proxmox VM ID tvých virtuálních strojů

3. **Vytvořit scénář**:
   - Jdi na `/admin/scenarios`
   - Vytvoř scénář kombinací návodu a VM

4. **Přiřadit scénář studentovi**:
   - Jdi na `/admin/assignments`
   - Přiřaď scénář studentovi

---

## 📞 KONTAKT

Pokud narazíš na problémy, zapiš chybovou hlášku z:
- Browser konzole (F12)
- Network tab (F12 → Network)
- Appwrite logs

Hodně štěstí! 🚀
