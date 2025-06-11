# Návod: Instalace WordPressu na Debian Linux

Tento návod tě krok za krokem provede instalací **WordPressu** – populárního redakčního systému, který umožňuje snadno vytvářet webové stránky i bez znalosti programování.

---

## 1. Předpoklady

Než začneš, ujisti se, že máš na systému nainstalovaný **LAMP stack** – tedy Apache, MySQL a PHP.  
Pokud ještě nemáš, postupuj podle návodu pro instalaci LAMP.

---

## 2. Instalace potřebných PHP rozšíření

WordPress potřebuje k běhu několik PHP modulů:

```bash
sudo apt install php-curl php-gd php-mbstring php-xml php-xmlrpc php-soap php-intl php-zip -y
```

---

## 3. Vytvoření MySQL databáze pro WordPress

Přihlas se do MySQL:

```bash
sudo mysql -u root -p
```

A spusť tyto příkazy (nahraď `silneheslo` vlastním heslem):

```sql
CREATE DATABASE wordpress;
CREATE USER 'wpuser'@'localhost' IDENTIFIED BY 'silneheslo';
GRANT ALL PRIVILEGES ON wordpress.* TO 'wpuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 4. Stažení WordPressu

```bash
cd /tmp
wget https://wordpress.org/latest.tar.gz
tar xzvf latest.tar.gz
```

---

## 5. Přesun WordPressu do webového adresáře

```bash
sudo rm -rf /var/www/html/*
sudo mv wordpress/* /var/www/html/
```

---

## 6. Nastavení oprávnění

```bash
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

---

## 7. Nastavení Apache

Pokud chceš vytvořit samostatný virtual host (volitelné):

```bash
sudo nano /etc/apache2/sites-available/wordpress.conf
```

A vlož:

```apache
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html
    ServerName tvoje_domena.cz

    <Directory /var/www/html>
        AllowOverride All
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Pak aktivuj konfiguraci a mod_rewrite:

```bash
sudo a2ensite wordpress
sudo a2enmod rewrite
sudo systemctl restart apache2
```

---

## 8. Dokončení instalace ve webovém prohlížeči

Otevři v prohlížeči:

```
http://IP_adresa_serveru
```

Zobrazí se průvodce instalací WordPressu, kde zadáš:
- Název webu
- Uživatelské jméno a heslo
- Připojení k databázi (`wpuser`, `silneheslo`, databáze `wordpress`)

---

## 9. Shrnutí

Gratulujeme! WordPress je úspěšně nainstalován.

Můžeš se přihlásit do administrace na:

```
http://IP_adresa_serveru/wp-admin
```

---

## Co můžeš dělat dál?

- Vybrat a nainstalovat šablonu
- Přidat pluginy (např. SEO, bezpečnost, kontaktní formulář)
- Vytvářet stránky a články

WordPress je připraven pro použití!
