# Návod: Instalace Drupal na Debian Linux

**Drupal** je robustní a flexibilní open-source CMS (Content Management System) používaný pro rozsáhlé weby, komunitní portály a firemní prezentace.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Apache, PHP a rozšíření

```bash
sudo apt install apache2 php php-mysql libapache2-mod-php php-xml php-gd php-curl php-zip php-mbstring php-json unzip wget -y
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
CREATE DATABASE drupal;
CREATE USER 'drupaluser'@'localhost' IDENTIFIED BY 'silneheslo';
GRANT ALL PRIVILEGES ON drupal.* TO 'drupaluser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 4. Stažení Drupalu

```bash
cd /tmp
wget https://www.drupal.org/download-latest/tar.gz -O drupal.tar.gz
tar -xzvf drupal.tar.gz
sudo mv drupal-* /var/www/html/drupal
```

---

## 5. Nastavení oprávnění

```bash
sudo chown -R www-data:www-data /var/www/html/drupal
sudo chmod -R 755 /var/www/html/drupal
```

---

## 6. Nastavení Apache

Vytvoř konfigurační soubor:

```bash
sudo nano /etc/apache2/sites-available/drupal.conf
```

Obsah:

```apache
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/drupal
    ServerName tvoje-domena.cz

    <Directory /var/www/html/drupal>
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/drupal_error.log
    CustomLog ${APACHE_LOG_DIR}/drupal_access.log combined
</VirtualHost>
```

Aktivuj:

```bash
sudo a2ensite drupal.conf
sudo a2enmod rewrite
sudo systemctl restart apache2
```

---

## 7. Dokončení instalace přes web

Otevři v prohlížeči:

```
http://IP_adresa_serveru
```

Postupuj podle průvodce:
- Vyber jazyk
- Vyber typ instalace
- Zadej přihlašovací údaje do databáze
- Vytvoř administrátorský účet

---

## 8. Shrnutí

Gratulujeme! Drupal je nainstalován a připraven pro správu a tvorbu obsahu.

---

## Co můžeš dělat dál?

- Nainstalovat a spravovat moduly a šablony
- Nastavit vícejazyčnost, oprávnění a role
- Optimalizovat výkon a zabezpečení

Drupal je výkonný CMS s vysokou mírou přizpůsobení pro jakýkoliv typ webu.
