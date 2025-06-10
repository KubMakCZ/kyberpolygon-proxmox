# Návod: Instalace Apache Web Serveru na Debian Linux

**Apache HTTP Server** (známý jako Apache) je jeden z nejpoužívanějších webových serverů na světě.  
Tento návod popisuje jeho instalaci a základní nastavení na Debian Linuxu.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Apache

Spusť instalaci webového serveru:

```bash
sudo apt install apache2 -y
```

---

## 3. Kontrola spuštění služby

Po instalaci by měl být Apache automaticky spuštěn. Zkontroluj stav:

```bash
sudo systemctl status apache2
```

Pokud neběží, spusť jej:

```bash
sudo systemctl start apache2
sudo systemctl enable apache2
```

---

## 4. Přístup přes webový prohlížeč

Získej IP adresu serveru:

```bash
hostname -I
```

Otevři v prohlížeči:

```
http://IP_adresa_serveru
```

Měla by se zobrazit výchozí stránka Apache.

---

## 5. Umístění webových souborů

Apache načítá soubory z adresáře:

```
/var/www/html
```

Můžeš tam vložit vlastní `index.html` nebo `index.php`.  
Příklad:

```bash
echo "<h1>Moje webová stránka</h1>" | sudo tee /var/www/html/index.html
```

---

## 6. Konfigurace Virtual Hosts (volitelné)

Pro víc webů na jednom serveru lze nastavit tzv. Virtual Hosts.

Vytvoř soubor:

```bash
sudo nano /etc/apache2/sites-available/mujweb.conf
```

Např.:

```apache
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName mujweb.lan
    DocumentRoot /var/www/mujweb

    <Directory /var/www/mujweb>
        AllowOverride All
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Pak aktivuj web:

```bash
sudo mkdir /var/www/mujweb
sudo a2ensite mujweb
sudo systemctl reload apache2
```

---

## 7. Shrnutí

Gratulujeme! Apache je nainstalován a připraven na hostování webových stránek.

---

## Co můžeš dělat dál?

- Nainstalovat PHP pro dynamické stránky
- Nasadit WordPress nebo jiné CMS
- Nastavit HTTPS pomocí Let’s Encrypt
- Aktivovat moduly: `rewrite`, `ssl`, `headers`

Apache je výkonný a flexibilní webový server vhodný pro osobní i produkční použití.
