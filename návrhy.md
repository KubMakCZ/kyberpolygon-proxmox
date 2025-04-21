# Návrh Platformy pro Výuku IT na Proxmoxu

Tento dokument shrnuje návrhy pro vytvoření interaktivní výukové platformy postavené na Proxmox VE, Node.js a Appwrite, inspirované projektem "Kybernetický polygon pro výukové účely" a dokumentem "Moderní škola 4.0".

## 1. Proxmox - Nastavení a Automatizace

### Šablony (Templates)
* Vytvořit standardizované šablony VM a CT pro různé OS (Windows Server, Linux distribuce - Debian, Ubuntu, CentOS) a předkonfigurované aplikace [Source: 9].
* Pravidelně aktualizovat šablony (OS, software).

### Automatizace pomocí Proxmox API
* Využít Proxmox REST API (knihovny např. `proxmox-api` pro Node.js, `proxmoxer` pro Python).
* **Klíčové automatizace:**
    * **Klonování VM/CT:** Pro rychlé vytváření instancí scénářů ze šablon.
    * **Správa uživatelů a práv:** Integrace s Appwrite; automatické přidělování práv na VM/CT/Pooly na základě uživatele/scénáře. Využití Proxmox rolí.
    * **Resource Pools:** Vytváření poolů pro scénáře/uživatele pro lepší organizaci a správu práv.
    * **Síťová konfigurace:** Automatické přiřazování VM/CT do správných VLAN/bridge, včetně propojení na fyzické porty.
    * **Ovládání VM:** Start/Stop/Reset VM pro uživatele nebo automatizaci.
    * **Časově omezený přístup:** Automatizace ukončení scénáře (odebrání práv, smazání/archivace VM).
    * **Monitoring:** Získávání stavu VM, IP adres atd. pro webovou aplikaci.

### Vysoká Dostupnost (HA) a Ceph
* Využívat nastavené HA a Ceph pro odolnost a rychlou migraci [Source: 14].

### Zálohování
* Zálohovat šablony a konfiguraci Proxmoxu (např. pomocí Proxmox Backup Server).
* Zálohování dat v rámci scénářů může být úkolem pro studenty [Source: 6].

## 2. Webová Aplikace (Node.js)

### Uživatelské Rozhraní
* **Dashboard:** Přehled pro studenty (aktivní scénáře, čas) a adminy (stav systému, aktivita).
* **Katalog Scénářů:** Procházení scénářů (popis, cíle, trvání).
* **Spuštění Scénáře:** Tlačítko pro aktivaci scénáře (volá Proxmox API).
* **Zobrazení Scénáře:**
    * Integrovaný prohlížeč Markdownu pro tutoriál/zadání.
    * Zobrazení přístupových údajů k VM (bezpečně).
    * Časovač.
    * Možnost základního ovládání VM (volitelně).

### Administrátorské Rozhraní
* Správa uživatelů a skupin (propojení s Appwrite).
* Správa scénářů (CRUD, nahrávání Markdown, výběr šablon, časové limity).
* Přehled běžících scénářů a zdrojů.
* Možnost manuálního zásahu.

### Technologie
* **Backend:** Node.js (např. Express.js).
* **Frontend:** Moderní framework (React, Vue, Angular).
* **Markdown Parser:** Např. `marked`, `markdown-it`.
* **Komunikace:** Proxmox API, Appwrite API.

## 3. Backend (Appwrite v Docker CT)

### Autentizace a Autorizace
* Správa uživatelů (student, učitel, admin), registrace, login, role, týmy (Appwrite Teams).

### Databáze
* Ukládání definic scénářů, stavu aktivních scénářů, uživatelských dat, logů.

### Storage
* Ukládání Markdown souborů, dalších assetů pro scénáře.

### Appwrite Functions
* Pro spouštění automatizačních skriptů (volání Proxmox API).
* Pro logiku push notifikací.
* Jako "webhooky" reagující na události v databázi.

### Realtime
* Pro živé aktualizace na dashboardu (stav scénářů apod.).

## 4. Mobilní Aplikace

* **Primární účel:** Příjem Push Notifikací.
* **Integrace:** Připojení k Appwrite pro příjem notifikací.
* **Typy notifikací:** Nový scénář, údržba, obnova serveru, varování před vypršením času, obecné info.
* **Volitelně:** Základní přehled aktivních scénářů.

## 5. Návrh Scénářů

* **Zaměření:** Virtualizace, Sítě, OS, Kybernetická bezpečnost [Source: 2, 3, 4].
* **Příklady:**
    * Instalace/konfigurace OS.
    * Konfigurace síťových služeb (DHCP, DNS, Firewall, VPN) [Source: 3].
    * Nasazení web serveru/databáze.
    * Bezpečnostní úlohy (skenování zranitelností, analýza logů, hardening, zálohování/obnova) [Source: 5, 6, 7].
    * Automatizace (Ansible, skriptování) [Source: 8].
    * Práce s fyzickým HW (konfigurace switche/routeru).
* **Struktura:** Jasné cíle, kroky (Markdown), ověření výsledků.

## 6. Integrace s Hardwarem

* Využít dedikované síťové karty v Proxmox nodech.
* Propojit je s fyzickými zařízeními (switche, routery).
* Vytvořit specifické bridge/VLAN v Proxmoxu.
* Přiřazovat VM ve scénářích do těchto sítí pro přístup k HW.

## 7. Strategie Nasazení (à la Proxmox Helper Scripts)

* **Cíl:** Jednoduchá instalace pomocí jednoho skriptu a `.env` souboru.
* **Nástroje:** Bash, Ansible, nebo Python.
* **Kroky skriptu:**
    1.  Kontrola/instalace závislostí.
    2.  Klonování repozitáře.
    3.  Načtení `.env` (API klíče, IP adresy, doména...).
    4.  Nasazení Appwrite (Docker Compose).
    5.  Konfigurace Appwrite projektu (Appwrite CLI/API).
    6.  Nasazení Node.js aplikace (Docker Compose / PM2).
    7.  Nastavení reverzního proxy (Nginx/Caddy).
    8.  (Volitelně) Základní konfigurace Proxmoxu (role, tokeny).
* **Kontejnerizace:** Zvážit kontejnerizaci Node.js aplikace.

## 8. Budoucí Rozšíření

### Systém Zpráv
* Využít Appwrite Realtime pro chat/oznámení v aplikaci.

### CTF Platforma
* Inspirace CTFd.
* Vyžaduje moduly pro: challenges, flags, scoreboard.
* Dynamické nasazování CTF prostředí (Proxmox API).
* Důraz na izolaci prostředí.