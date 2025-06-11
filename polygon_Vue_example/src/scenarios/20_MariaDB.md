# Návod: Instalace MariaDB na Debian Linux

**MariaDB** je výkonná a otevřená alternativa k MySQL, plně kompatibilní a často používaná v moderních aplikacích.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace MariaDB

```bash
sudo apt install mariadb-server -y
```

---

## 3. Spuštění a povolení služby

```bash
sudo systemctl start mariadb
sudo systemctl enable mariadb
```

Zkontroluj stav:

```bash
sudo systemctl status mariadb
```

---

## 4. Zabezpečení databázového serveru

Spusť interaktivní skript:

```bash
sudo mysql_secure_installation
```

### Doporučené odpovědi:
- Nastavit root heslo: **ano**
- Odstranit anonymní uživatele: **ano**
- Zakázat vzdálený přístup pro root: **ano**
- Odstranit testovací databázi: **ano**
- Načíst oprávnění: **ano**

---

## 5. Přihlášení do MariaDB

```bash
sudo mariadb -u root -p
```

---

## 6. Vytvoření nové databáze a uživatele

Příklad:

```sql
CREATE DATABASE mojedb;
CREATE USER 'uzivatel'@'localhost' IDENTIFIED BY 'mojeheslo';
GRANT ALL PRIVILEGES ON mojedb.* TO 'uzivatel'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 7. Shrnutí

Gratulujeme! MariaDB je nainstalována a připravena k použití jako výkonná relační databáze.

---

## Co můžeš dělat dál?

- Připojit MariaDB k aplikacím jako WordPress, Ghost, Nextcloud
- Používat phpMyAdmin pro správu přes webové rozhraní
- Automatizovat zálohy databází

MariaDB je výborná volba pro seriózní databázové projekty.
