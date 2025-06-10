# Návod: Instalace OpenVAS (Greenbone Vulnerability Management) na Debian Linux

**OpenVAS**, dnes známý jako součást **Greenbone Vulnerability Management (GVM)**, je nástroj pro skenování zranitelností v sítích a systémech.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace balíčků GVM

```bash
sudo apt install gvm -y
```

Po instalaci spusť základní konfiguraci:

```bash
sudo gvm-setup
```

Proces může trvat déle (stahuje aktualizace, inicializuje databázi atd.).

---

## 3. Dokončení konfigurace

Po úspěšné konfiguraci spusť:

```bash
sudo gvm-check-setup
```

Oprav případné chyby podle pokynů.

---

## 4. Spuštění GVM

```bash
sudo gvm-start
```

Zobrazí se adresa pro webové rozhraní, například:

```
https://127.0.0.1:9392
```

Zároveň se vypíše výchozí přihlašovací jméno a heslo – např. `admin / heslo`

---

## 5. Přístup přes prohlížeč

Otevři:

```
https://IP_adresa_serveru:9392
```

Pokud je použit samopodepsaný certifikát, může být nutné potvrdit výjimku v prohlížeči.

---

## 6. První přihlášení

Použij uživatelské jméno a heslo z výstupu příkazu `gvm-start`.  
Po přihlášení heslo změň.

---

## 7. Spuštění prvního skenu

1. Vytvoř **target** – IP nebo doména, kterou chceš skenovat
2. Nastav **scan config** (např. Full and fast)
3. Spusť nový sken
4. Sleduj výsledky a doporučení

---

## 8. Shrnutí

Gratulujeme! OpenVAS (GVM) je připraven skenovat zranitelnosti ve tvé síti.

---

## Co můžeš dělat dál?

- Plánovat pravidelné skeny
- Exportovat reporty ve formátu PDF, HTML
- Připojit více uživatelů a skupiny
- Nastavit notifikace při nalezení kritických zranitelností

OpenVAS je jeden z nejvýkonnějších open-source skenerů zranitelností.
