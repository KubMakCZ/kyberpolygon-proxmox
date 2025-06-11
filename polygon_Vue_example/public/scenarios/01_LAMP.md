# Návod: Instalace LAMP na Debian Linux

Tento návod tě krok za krokem provede instalací **LAMP stacku** na čisté instalaci Debianu.  
LAMP znamená: **Linux, Apache, MySQL, PHP** — základní kombinace pro provoz webových stránek.

---

## 1. Aktualizace systému

Než začneš, ujisti se, že máš aktuální balíčky:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Apache (webový server)

Apache slouží k zobrazování webových stránek.

```bash
sudo apt install apache2 -y
```

Po instalaci můžeš zkontrolovat, zda běží:

```bash
sudo systemctl status apache2
```

Měl bys vidět hlášku, že služba je „active (running)“.

### Test Apache v prohlížeči

Otevři v prohlížeči adresu:
```
http://IP_adresa_tvého_serveru
```
Měl by se zobrazit výchozí testovací web Apache.

---

## 3. Instalace MySQL (databázový server)

MySQL se postará o ukládání dat, např. pro WordPress nebo jiné CMS.

```bash
sudo apt install mysql-server -y
```

Po instalaci spusť bezpečnostní skript:

```bash
sudo mysql_secure_installation
```

Doporučené odpovědi:
- Nastav root heslo: **Ano**
- Odstranit anonymní uživatele: **Ano**
- Zakázat vzdálený přístup pro root: **Ano**
- Odstranit testovací databázi: **Ano**
- Načíst oprávnění znovu: **Ano**

---

## 4. Instalace PHP

PHP je jazyk, který umožňuje dynamické weby (např. WordPress, redakční systémy…).

```bash
sudo apt install php libapache2-mod-php php-mysql -y
```

### Test PHP

Vytvoř testovací soubor:
```bash
echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php
```

Pak v prohlížeči navštiv:
```
http://IP_adresa_tvého_serveru/info.php
```

Pokud vidíš fialovou stránku s „PHP info“, vše funguje.

Nezapomeň soubor po testu smazat:

```bash
sudo rm /var/www/html/info.php
```

---

## 5. Shrnutí

Gratuluji! Na svém Debian serveru máš:

- **Apache** jako webový server
- **MySQL** jako databázi
- **PHP** jako jazyk pro webové aplikace

Tato kombinace je ideální např. pro instalaci WordPressu nebo jiných CMS.

---

## Co můžeš dělat dál?

- Nainstalovat **phpMyAdmin** pro správu MySQL přes web
- Nainstalovat **WordPress** (viz další návod)
- Nastavit **SSL certifikát** pomocí Let's Encrypt
- Přesměrovat port 80 na HTTPS

