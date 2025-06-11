# Návod: Instalace Seafile na Debian Linux

**Seafile** je self-hosted cloudové úložiště s důrazem na rychlost, spolehlivost a verzování souborů.  
Je vhodné pro týmy i jednotlivce, kteří hledají alternativu k Dropboxu nebo Nextcloudu.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace závislostí

```bash
sudo apt install python3 python3-setuptools python3-pip python3-mysqldb mariadb-server unzip curl sqlite3 -y
```

---

## 3. Vytvoření uživatele pro Seafile

```bash
sudo adduser --disabled-login seafile
```

---

## 4. Stažení Seafile Community Edition

```bash
sudo su - seafile
mkdir seafile-server
cd seafile-server
wget https://s3.eu-central-1.amazonaws.com/download.seadrive.org/seafile-server_10.0.1_x86-64.tar.gz
tar -xzf seafile-server_10.0.1_x86-64.tar.gz
cd seafile-server-10.0.1
```

---

## 5. Spuštění instalačního skriptu

```bash
./setup-seafile-mysql.sh
```

### Při instalaci nastav:

- Název serveru (např. `My Seafile`)
- IP nebo doménu
- Porty (výchozí: 8082, 8080)
- Informace k databázi (nebo použij SQLite pro testování)

---

## 6. Spuštění Seafile serveru

```bash
./seafile.sh start
./seahub.sh start
```

Při prvním spuštění nastavíš admin účet pro webové rozhraní.

---

## 7. Přístup do rozhraní

V prohlížeči:

```
http://IP_adresa_serveru:8000
```

Přihlas se admin účtem, který jsi nastavil.

---

## 8. Nastavení služeb jako systemd (volitelné)

Můžeš přidat `seafile` a `seahub` jako služby. Dokumentace:

[https://manual.seafile.com](https://manual.seafile.com)

---

## 9. Shrnutí

Gratulujeme! Seafile je úspěšně nainstalován a připraven jako spolehlivé cloudové úložiště.

---

## Co můžeš dělat dál?

- Instalovat desktopové a mobilní klienty
- Sdílet složky a dokumenty
- Nastavit SSL certifikát
- Připojit LDAP, externí úložiště, nebo Office integraci

Seafile je rychlé, efektivní a škálovatelné řešení pro synchronizaci a sdílení souborů.
