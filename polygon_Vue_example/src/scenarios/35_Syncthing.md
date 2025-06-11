# Návod: Instalace Syncthing na Debian Linux

**Syncthing** je open-source nástroj pro synchronizaci složek mezi zařízeními bez potřeby cloudu.  
Data jsou šifrována, synchronizována v reálném čase a zůstávají pouze pod tvou kontrolou.

---

## 1. Přidání repozitáře a GPG klíče

```bash
curl -s https://syncthing.net/release-key.txt | sudo gpg --dearmor -o /usr/share/keyrings/syncthing-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable" | sudo tee /etc/apt/sources.list.d/syncthing.list

sudo apt update
```

---

## 2. Instalace Syncthing

```bash
sudo apt install syncthing -y
```

---

## 3. Spuštění Syncthing pro aktuálního uživatele

```bash
syncthing
```

Tím se spustí Syncthing a otevře webové rozhraní:

```
http://localhost:8384
```

---

## 4. Automatické spouštění při startu (systemd)

Pro současného uživatele:

```bash
systemctl --user enable syncthing
systemctl --user start syncthing
```

---

## 5. Přístup z jiného zařízení (v síti)

Povol přístup z IP adresy v konfiguraci:

1. Otevři v prohlížeči `http://localhost:8384`
2. Přejdi na „Actions → Settings → GUI“
3. Změň „GUI Listen Address“ na `0.0.0.0:8384` (pro všechny IP)
4. Restartuj Syncthing

---

## 6. Párování zařízení

1. Zkopíruj ID zařízení (vygenerované automaticky)
2. Na druhém zařízení vlož ID a přidej ho jako „Remote Device“
3. Odsouhlas párování
4. Vyber složky ke sdílení

---

## 7. Shrnutí

Gratulujeme! Syncthing je připraven k bezpečné synchronizaci souborů mezi zařízeními.

---

## Co můžeš dělat dál?

- Synchronizovat více složek mezi více zařízeními
- Omezit přístup pomocí hesla nebo IP whitelistu
- Nastavit synchronizaci jen v LAN
- Používat jako zálohovací řešení

Syncthing je výkonné a soukromí respektující řešení pro decentralizovanou synchronizaci.
