# Návod: Instalace Traefik na Debian Linux (pomocí Docker Compose)

**Traefik** je moderní reverzní proxy a load balancer s podporou automatického získávání SSL certifikátů a integrací s Dockerem.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Dockeru a Docker Compose

```bash
sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
sudo systemctl start docker
```

---

## 3. Vytvoření adresáře pro Traefik

```bash
mkdir -p ~/traefik
cd ~/traefik
```

---

## 4. Vytvoření `traefik.yml` konfiguračního souboru

```bash
nano traefik.yml
```

Obsah:

```yaml
entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

api:
  dashboard: true

providers:
  docker:
    exposedByDefault: false
```

---

## 5. Vytvoření `docker-compose.yml`

```bash
nano docker-compose.yml
```

Obsah:

```yaml
version: '3'

services:
  traefik:
    image: traefik:v2.11
    container_name: traefik
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080" # dashboard
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "./traefik.yml:/traefik.yml:ro"
```

---

## 6. Spuštění Traefik

```bash
sudo docker-compose up -d
```

---

## 7. Přístup do dashboardu

Otevři v prohlížeči:

```
http://IP_adresa_serveru:8080
```

Zobrazí se administrační dashboard.

---

## 8. Reverzní proxy pro jiný kontejner (ukázka)

Příklad `docker-compose.yml` pro službu napojenou na Traefik:

```yaml
version: '3'

services:
  whoami:
    image: containous/whoami
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.whoami.rule=Host(`example.local`)"
      - "traefik.http.routers.whoami.entrypoints=web"
```

Přidej `example.local` do `/etc/hosts` pro lokální test.

---

## 9. Shrnutí

Gratulujeme! Traefik je připraven jako reverzní proxy s webovým dashboardem a podporou automatického směrování.

---

## Co můžeš dělat dál?

- Získávat HTTPS certifikáty přes Let's Encrypt
- Používat middleware (redirecty, autentifikace, IP whitelist)
- Spravovat více domén a služeb přes jedno rozhraní

Traefik je výborná volba pro moderní správu reverzní proxy s jednoduchou konfigurací.
