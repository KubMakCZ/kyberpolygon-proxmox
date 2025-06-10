# Návod: Instalace Zabbix serveru na Debian Linux

**Zabbix** je výkonný open-source monitorovací systém určený pro sledování síťových zařízení, serverů a aplikací.  
Tento návod popisuje instalaci Zabbix serveru s frontendem a databází na Debian Linux.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace repozitáře Zabbix

```bash
wget https://repo.zabbix.com/zabbix/6.4/debian/pool/main/z/zabbix-release/zabbix-release_6.4-1+debian12_all.deb
sudo dpkg -i zabbix-release_6.4-1+debian12_all.deb
sudo apt update
```

---

## 3. Instalace Zabbix serveru, frontend webu, databáze a agenta

```bash
sudo apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent mysql-server -y
```

---

## 4. Konfigurace databáze

### Spusť MySQL a vytvoř databázi a uživatele:

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE zabbix CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE USER 'zabbix'@'localhost' IDENTIFIED BY 'zabbixheslo';
GRANT ALL PRIVILEGES ON zabbix.* TO 'zabbix'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Import počáteční struktury databáze:

```bash
zcat /usr/share/zabbix-sql-scripts/mysql/server.sql.gz | mysql -u zabbix -p zabbix
```

---

## 5. Nastavení Zabbix serveru

Uprav konfigurační soubor:

```bash
sudo nano /etc/zabbix/zabbix_server.conf
```

Najdi a uprav:

```
DBPassword=zabbixheslo
```

---

## 6. Spuštění služeb

```bash
sudo systemctl restart zabbix-server zabbix-agent apache2
sudo systemctl enable zabbix-server zabbix-agent apache2
```

---

## 7. Přístup do webového rozhraní

Otevři v prohlížeči:

```
http://IP_adresa_serveru/zabbix
```

### Přihlašovací údaje:

- Uživatelské jméno: `Admin`
- Heslo: `zabbix`

Po přihlášení doporučuji heslo změnit.

---

## 8. Shrnutí

Zabbix server je nyní nainstalován, běží a můžeš začít monitorovat své servery a zařízení.

---

## Co můžeš dělat dál?

- Přidat nové hosty (např. servery, routery)
- Nastavit upozornění (e-mail, webhook)
- Vizualizovat metriky pomocí dashboardů
- Instalovat Zabbix agenta na monitorované stroje

Zabbix je ideální nástroj pro robustní a škálovatelné monitorování infrastruktury.
