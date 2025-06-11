# Návod: Instalace InfluxDB na Debian Linux

Tento návod popisuje, jak nainstalovat a zprovoznit **InfluxDB 2.x** – databázi určenou pro ukládání časových řad (např. metriky, senzory, monitoring).

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Přidání oficiálního repozitáře InfluxDB

InfluxDB není ve výchozím Debian repozitáři, proto je potřeba přidat oficiální zdroj.

```bash
wget -qO- https://repos.influxdata.com/influxdb.key | sudo gpg --dearmor -o /usr/share/keyrings/influxdb-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/influxdb-archive-keyring.gpg] https://repos.influxdata.com/debian stable main" | sudo tee /etc/apt/sources.list.d/influxdb.list
sudo apt update
```

---

## 3. Instalace InfluxDB

```bash
sudo apt install influxdb2 -y
```

---

## 4. Spuštění a povolení služby

```bash
sudo systemctl enable influxdb
sudo systemctl start influxdb
```

### Kontrola běhu služby:

```bash
sudo systemctl status influxdb
```

---

## 5. Otevření webového rozhraní

InfluxDB má vlastní uživatelské rozhraní dostupné na:

```
http://IP_adresa_serveru:8086
```

Zde můžeš:
- Vytvořit organizaci a bucket
- Nastavit tokeny a přístupy
- Sledovat data a dotazy

---

## 6. Přístup přes CLI (volitelný)

Pro použití příkazového nástroje `influx`:

```bash
influx setup
```

Postupuj podle instrukcí (nastavení organizace, bucketu a tokenu).

---

## 7. Shrnutí

Gratulujeme! InfluxDB běží a je připraveno pro ukládání dat z:
- IoT zařízení
- monitorovacích nástrojů (např. Telegraf, Grafana)
- custom aplikací

---

## Co můžeš dělat dál?

- Připojit InfluxDB ke Grafaně pro vizualizaci dat
- Automatizovat sběr metrik pomocí Telegraf
- Vytvářet vlastní dashboardy a dotazy v UI

InfluxDB je ideální nástroj pro jakékoliv projekty pracující s daty v čase.
