# Návod: Instalace Joomla na Debian Linux

**Joomla** je populární open-source CMS pro správu obsahu, vhodný pro firemní stránky, e-shopy a komunitní portály.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Apache, PHP a závislostí

```bash
sudo apt install apache2 php libapache2-mod-php php-mysql php-xml php-curl php-zip php-mbstring php-gd php-intl unzip wget -y
```

---

## 3. Instalace MariaDB a vytvoření databáze

```bash
sudo apt install mariadb-server -y
sudo mysql_secure_installation
```

### Vytvoření databáze a uživatele:

```bash
sudo mariadb -u root -p
```

```sql
CREATE DATABASE joomla;
CREATE USER 'joomlauser'@'localhost' IDENTIFIED BY 'silneheslo';
GRANT ALL PRIVILEGES ON joomla.* TO 'joomlauser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 4. Stažení Joomla

```bash
cd /tmp
wget https://downloads.joomla.org/cms/joomla5/5-0-2/Joomla_5-0-2-Stable-Full_Package.zip?format=zip -O joomla.zip
sudo unzip joomla.zip -d /var/www/html/joomla
```

---

## 5. Nastavení oprávnění

```bash
sudo chown -R www-data:www-data /var/www/html/joomla
sudo chmod -R 755 /var/www/html/joomla
```

---

## 6. Nastavení Apache

Vytvoř nový konfigurační soubor:

```bash
sudo nano /etc/apache2/sites-available/joomla.conf
```

Obsah:

```apache
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/joomla
    ServerName tvoje-domena.cz

    <Directory /var/www/html/joomla>
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/joomla_error.log
    CustomLog ${APACHE_LOG_DIR}/joomla_access.log combined
</VirtualHost>
```

Aktivuj konfiguraci:

```bash
sudo a2ensite joomla.conf
sudo a2enmod rewrite
sudo systemctl restart apache2
```

---

## 7. Dokončení instalace přes webové rozhraní

Otevři v prohlížeči:

```
http://IP_adresa_serveru
```

Vyplň:
- Název webu
- Uživatelský účet
- Připojení k databázi (joomla, joomlauser, heslo)

---

## 8. Shrnutí

Gratulujeme! Joomla je připravena pro správu obsahu a tvorbu webových stránek.

---

## Co můžeš dělat dál?

- Instalovat šablony a rozšíření
- Přidávat články, sekce a uživatele
- Nastavit vícejazyčný web nebo e-shop

Joomla nabízí vysokou flexibilitu a přizpůsobení i pro náročné weby.
