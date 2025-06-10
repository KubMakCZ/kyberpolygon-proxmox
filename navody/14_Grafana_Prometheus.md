# Návod: Instalace Grafana a Prometheus na Debian Linux

**Grafana** je nástroj pro vizualizaci dat.  
**Prometheus** je systém pro sběr metrik.  
Společně tvoří výkonné řešení pro monitoring serverů, služeb i aplikací.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Promethea

### Stažení a rozbalení binárky

```bash
cd /opt
sudo wget https://github.com/prometheus/prometheus/releases/download/v2.52.0/prometheus-2.52.0.linux-amd64.tar.gz
sudo tar -xzf prometheus-2.52.0.linux-amd64.tar.gz
sudo mv prometheus-2.52.0.linux-amd64 prometheus
```

### Vytvoření systemd služby

```bash
sudo nano /etc/systemd/system/prometheus.service
```

Obsah:

```ini
[Unit]
Description=Prometheus
After=network.target

[Service]
User=nobody
ExecStart=/opt/prometheus/prometheus   --config.file=/opt/prometheus/prometheus.yml   --storage.tsdb.path=/opt/prometheus/data

[Install]
WantedBy=default.target
```

### Spuštění služby:

```bash
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
```

---

## 3. Přístup do Prometheus

V prohlížeči:

```
http://IP_adresa_serveru:9090
```

---

## 4. Instalace Grafany

```bash
sudo apt install -y apt-transport-https software-properties-common
sudo mkdir -p /etc/apt/keyrings
wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana -y
```

### Spuštění Grafany

```bash
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```

---

## 5. Přístup do Grafany

V prohlížeči:

```
http://IP_adresa_serveru:3000
```

### Přihlášení:

- Uživatelské jméno: `admin`
- Heslo: `admin` (změnit po přihlášení)

---

## 6. Přidání Promethea jako datového zdroje v Grafaně

1. Přejdi do „Settings → Data Sources“
2. Vyber „Prometheus“
3. URL nastav na:
```
http://localhost:9090
```
4. Klikni na „Save & Test“

---

## 7. Shrnutí

Gratulujeme! Máš funkční monitorovací řešení s Prometheus + Grafana.

---

## Co můžeš dělat dál?

- Přidat exportéry (např. Node Exporter, PostgreSQL Exporter)
- Vytvořit vlastní dashboardy
- Aktivovat alerty (upozornění)

Tato kombinace je ideální pro monitorování infrastruktury i aplikací v reálném čase.
