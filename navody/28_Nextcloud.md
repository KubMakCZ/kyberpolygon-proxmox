# Návod: Instalace Nextcloud na Debian Linux

**Nextcloud** je self-hosted cloudové řešení pro synchronizaci a sdílení souborů, kalendářů, kontaktů a dalšího obsahu.  
Umožňuje mít plnou kontrolu nad svými daty podobně jako u Dropboxu, ale běží přímo na tvém serveru.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Apache, PHP a potřebných balíčků

```bash
sudo apt install apache2 mariadb-server libapache2-mod-php php php-mysql php-xml php-curl php-zip php-gd php-mbstring php-intl php-bcmath php-imagick unzip wget -y
```

---

## 3. Nastavení databáze

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE nextcloud;
CREATE USER 'nextclouduser'@'localhost' IDENTIFIED BY 'silneheslo';
GRANT ALL PRIVILEGES ON nextcloud.* TO 'nextclouduser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 4. Stažení Nextcloudu

```bash
cd /tmp
wget https://download.nextcloud.com/server/releases/latest.zip
unzip latest.zip
sudo mv nextcloud /var/www/html/
```

---

## 5. Nastavení oprávnění

```bash
sudo chown -R www-data:www-data /var/www/html/nextcloud
sudo chmod -R 755 /var/www/html/nextcloud
```

---

## 6. Nastavení Apache

Vytvoř nový konfigurační soubor:

```bash
sudo nano /etc/apache2/sites-available/nextcloud.conf
```

Obsah:

```apache
<VirtualHost *:80>
    DocumentRoot /var/www/html/nextcloud
    ServerName tvoje-domena.cz

    <Directory /var/www/html/nextcloud>
        Require all granted
        AllowOverride All
        Options FollowSymLinks MultiViews
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/nextcloud_error.log
    CustomLog ${APACHE_LOG_DIR}/nextcloud_access.log combined
</VirtualHost>
```

Aktivuj a restartuj:

```bash
sudo a2ensite nextcloud.conf
sudo a2enmod rewrite headers env dir mime setenvif ssl
sudo systemctl restart apache2
```

---

## 7. Dokončení instalace přes web

Otevři v prohlížeči:

```
http://IP_adresa_serveru
```

Zadej:
- Admin účet a heslo
- Přihlašovací údaje k databázi (`nextcloud`, `nextclouduser`, `heslo`)
- Cestu k datům (např. `/var/www/html/nextcloud/data`)

---

## 8. Shrnutí

Gratulujeme! Nextcloud je nainstalován a připraven pro použití jako tvůj vlastní cloudový server.

---

## Co můžeš dělat dál?

- Nastavit HTTPS pomocí Let's Encrypt
- Instalovat mobilní a desktopové aplikace
- Synchronizovat kontakty, kalendáře a soubory
- Instalovat rozšíření a aplikace z App Store

Nextcloud je skvělá alternativa k proprietárním cloudovým řešením a poskytuje plnou kontrolu nad daty.
