# Návod: Instalace MySQL na Debian Linux

Tento návod tě krok za krokem provede instalací databázového systému **MySQL** na čistém Debianu.  
MySQL se používá k ukládání dat pro webové aplikace, redakční systémy, e-shopy a další.

---

## 1. Aktualizace systému

Než začneš, aktualizuj balíčky systému:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace MySQL serveru

Spusť instalaci pomocí:

```bash
sudo apt install mysql-server -y
```

Po dokončení ověř, že služba běží:

```bash
sudo systemctl status mysql
```

Měla by být aktivní (running).

---

## 3. Zabezpečení instalace

Spusť bezpečnostní skript:

```bash
sudo mysql_secure_installation
```

### Doporučené volby:
- Nastavit root heslo: **Ano**
- Odstranit anonymní uživatele: **Ano**
- Zakázat vzdálený přístup pro root: **Ano**
- Odstranit testovací databázi: **Ano**
- Znovu načíst oprávnění: **Ano**

---

## 4. Přihlášení do MySQL

Po instalaci a zabezpečení se přihlas do MySQL:

```bash
sudo mysql -u root -p
```

Zadej heslo, které jsi nastavil v předchozím kroku.

---

## 5. Vytvoření nové databáze a uživatele

Příklady základních příkazů v MySQL:

```sql
CREATE DATABASE mojedb;
CREATE USER 'mojeuzivatel'@'localhost' IDENTIFIED BY 'mojeheslo';
GRANT ALL PRIVILEGES ON mojedb.* TO 'mojeuzivatel'@'localhost';
FLUSH PRIVILEGES;
```

Pak můžeš odejít z konzole:

```sql
EXIT;
```

---

## 6. Shrnutí

Gratulujeme! MySQL server je nainstalován a připraven pro použití.

Můžeš:
- Spravovat databáze přes příkazovou řádku
- Připojit MySQL ke svému webu nebo aplikaci
- Používat nástroje jako **phpMyAdmin** pro pohodlnou správu přes webové rozhraní

---

## Co můžeš dělat dál?

- Nainstalovat **phpMyAdmin** pro správu přes web
- Vytvářet zálohy databází pomocí `mysqldump`
- Nastavit pravidelné zálohování a monitoring výkonu

MySQL je robustní databáze připravená i pro náročné projekty.
