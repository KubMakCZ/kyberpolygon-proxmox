# Návod: Instalace Ghost CMS na Debian Linux

**Ghost** je moderní CMS platforma zaměřená na rychlost, jednoduchost a skvělý zážitek z psaní. Je ideální pro blogy, magazíny a osobní weby.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Node.js (doporučovaná verze LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

Zkontroluj verzi:

```bash
node -v
```

---

## 3. Instalace dalších závislostí

```bash
sudo apt install nginx mysql-server zip unzip -y
```

---

## 4. Vytvoření databáze pro Ghost

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE ghost;
CREATE USER 'ghost'@'localhost' IDENTIFIED BY 'silneheslo';
GRANT ALL PRIVILEGES ON ghost.* TO 'ghost'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 5. Vytvoření uživatele a adresáře pro Ghost

```bash
sudo adduser --system --group ghost
sudo mkdir -p /var/www/ghost
sudo chown ghost:ghost /var/www/ghost
```

---

## 6. Instalace Ghost CLI

```bash
sudo npm install -g ghost-cli
```

---

## 7. Instalace Ghost

```bash
sudo su - ghost
cd /var/www/ghost
ghost install
```

### Během instalace odpověz na dotazy:

- Použít MySQL: **ano**
- Adresa webu: `http://domena.cz` nebo `http://IP_adresa`
- Nastavit systémový uživatel: `ghost`
- Použít nginx: **ano**
- Nastavit SSL (Let's Encrypt): podle potřeby
- Spustit Ghost jako službu: **ano**

---

## 8. Přístup do administrace

Po úspěšné instalaci otevři:

```
http://IP_adresa/ghost
```

Zde vytvoříš admin účet a nastavíš svůj blog.

---

## 9. Shrnutí

Gratulujeme! Ghost CMS je nainstalován a připraven jako moderní, rychlý blogovací systém.

---

## Co můžeš dělat dál?

- Upravit šablonu nebo použít prémiovou
- Přidat vlastní doménu a HTTPS
- Spravovat uživatele a role
- Nastavit plánované publikace a emailové kampaně

Ghost je minimalistický a výkonný CMS systém ideální pro publikování obsahu.
