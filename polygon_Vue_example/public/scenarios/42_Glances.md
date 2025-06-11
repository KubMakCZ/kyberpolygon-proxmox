# Návod: Instalace Glances na Debian Linux

**Glances** je multiplatformní nástroj pro monitorování systému v reálném čase v terminálu.  
Zobrazuje CPU, paměť, disk, síť, procesy, senzory a další metriky.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace pomocí pip

Nejaktuálnější verze Glances je dostupná přes Python pip:

```bash
sudo apt install python3-pip -y
sudo pip3 install glances[all]
```

---

## 3. Spuštění Glances

### Lokální režim:

```bash
glances
```

### Webový server:

```bash
glances -w
```

Otevři v prohlížeči:

```
http://IP_adresa_serveru:61208
```

---

## 4. Automatické spouštění jako služba (volitelné)

Vytvoř systemd službu:

```bash
sudo nano /etc/systemd/system/glances.service
```

Obsah:

```ini
[Unit]
Description=Glances in Web Mode
After=network.target

[Service]
ExecStart=/usr/local/bin/glances -w
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Aktivuj a spusť:

```bash
sudo systemctl daemon-reload
sudo systemctl enable glances
sudo systemctl start glances
```

---

## 5. Shrnutí

Gratulujeme! Glances je připraven jako rychlý a přehledný nástroj pro sledování systému.

---

## Co můžeš dělat dál?

- Instalovat na více strojů a připojit se vzdáleně (`glances -c IP`)
- Používat s API a JSON výstupem
- Monitorovat teploty, I/O, senzory
- Spustit jako daemon pro sběr dat

Glances je jednoduchý, přehledný a ideální pro rychlou diagnostiku systému.
