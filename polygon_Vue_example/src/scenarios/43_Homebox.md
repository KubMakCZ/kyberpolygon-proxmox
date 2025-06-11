# Návod: Instalace Homebox na Debian Linux

**Homebox** je self-hosted webová aplikace pro evidenci a organizaci majetku – ideální pro domácnosti nebo firmy.

---

## 1. Instalace Dockeru a Docker Compose

```bash
sudo apt update && sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
sudo systemctl start docker
```

---

## 2. Vytvoření adresáře a `docker-compose.yml`

```bash
mkdir -p ~/homebox
cd ~/homebox
nano docker-compose.yml
```

Obsah:

```yaml
version: "3.3"

services:
  homebox:
    image: hay-kot/homebox:latest
    container_name: homebox
    ports:
      - "7745:7745"
    volumes:
      - ./data:/data
    restart: unless-stopped
```

---

## 3. Spuštění služby

```bash
docker-compose up -d
```

---

## 4. Přístup do rozhraní

Otevři:

```
http://IP_adresa_serveru:7745
```

Vytvoř si administrátorský účet a začni přidávat položky inventáře.

---

## 5. Shrnutí

Gratulujeme! Homebox je připraven pro správu a evidenci tvého majetku.

---

## Co můžeš dělat dál?

- Třídit věci podle místností, kategorií nebo štítků
- Přidávat poznámky, hodnotu, umístění a další vlastnosti
- Exportovat nebo zálohovat databázi

Homebox je jednoduchý a přehledný nástroj pro inventarizaci domácnosti či kanceláře.
