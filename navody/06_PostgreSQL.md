# Návod: Instalace PostgreSQL na Debian Linux

Tento návod tě provede instalací a základním nastavením databázového systému **PostgreSQL** – pokročilé a výkonné relační databáze vhodné pro malé i rozsáhlé projekty.

---

## 1. Aktualizace systému

Začni aktualizací systému:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace PostgreSQL

Spusť instalaci PostgreSQL a doplňkových nástrojů:

```bash
sudo apt install postgresql postgresql-contrib -y
```

Po dokončení zkontroluj stav služby:

```bash
sudo systemctl status postgresql
```

---

## 3. Základní ovládání PostgreSQL

PostgreSQL používá vlastního systémového uživatele `postgres`.

### Přihlášení do databáze:

```bash
sudo -i -u postgres
psql
```

V databázové konzoli můžeš spouštět SQL příkazy.

---

## 4. Vytvoření nové databáze a uživatele

V konzoli `psql` spusť:

```sql
CREATE DATABASE mojedb;
CREATE USER mujuzivatel WITH ENCRYPTED PASSWORD 'mojeheslo';
GRANT ALL PRIVILEGES ON DATABASE mojedb TO mujuzivatel;
```

Pak se z konzole odhlaš:

```sql
\q
```

A z příkazové řádky:

```bash
exit
```

---

## 5. Připojení k databázi jako nový uživatel

```bash
psql -U mujuzivatel -d mojedb -h localhost -W
```

Zadej heslo `mojeheslo`.

---

## 6. Shrnutí

Gratulujeme! PostgreSQL je připraven k použití.  
Databáze i uživatelé mohou být spravováni přes příkazovou řádku nebo nástroje jako **pgAdmin**.

---

## Co můžeš dělat dál?

- Nainstalovat **pgAdmin** (webové rozhraní pro PostgreSQL)
- Nastavit denní zálohování
- Používat PostgreSQL s aplikacemi jako WordPress, Nextcloud, Redmine, GitLab atd.

PostgreSQL je ideální volbou pro náročné projekty i vývojové prostředí.
