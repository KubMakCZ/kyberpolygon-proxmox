# Návod: Instalace Vaultwarden (self-hosted správce hesel) na Debian Linux

**Vaultwarden** je lehký, komunitou spravovaný klon Bitwarden serveru, ideální pro vlastní hostování správce hesel.  
Je postavený na Rustu a běží v Dockeru.

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

## 3. Vytvoření adresáře pro Vaultwarden

```bash
mkdir -p ~/vaultwarden
cd ~/vaultwarden
```

---

## 4. Vytvoření `docker-compose.yml` souboru

```bash
nano docker-compose.yml
```

Obsah:

```yaml
version: "3"

services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    ports:
      - 8080:80
    volumes:
      - ./vw-data:/data
    environment:
      WEBSOCKET_ENABLED: "true"
      SIGNUPS_ALLOWED: "false"   # nebo true, pokud chceš povolit registrace
```

---

## 5. Spuštění kontejneru

```bash
docker-compose up -d
```

---

## 6. Přístup do Vaultwarden rozhraní

Otevři:

```
http://IP_adresa_serveru:8080
```

Vytvoř si administrátorský účet a heslo.

---

## 7. Povolení HTTPS (volitelné)

Lze nastavit reverzní proxy (např. s Nginx nebo Traefik) a Let's Encrypt certifikát.

---

## 8. Shrnutí

Gratulujeme! Vaultwarden je připraven jako bezpečný a self-hosted správce hesel kompatibilní s Bitwarden klienty.

---

## Co můžeš dělat dál?

- Nainstalovat mobilní, desktopové a webové klienty Bitwarden
- Aktivovat 2FA, E-mail server, TLS
- Nastavit zálohování dat (`vw-data`)
- Nastavit SMTP pro obnovu hesla

Vaultwarden je výkonné, soukromé a lehké řešení pro bezpečné ukládání a sdílení přihlašovacích údajů.
