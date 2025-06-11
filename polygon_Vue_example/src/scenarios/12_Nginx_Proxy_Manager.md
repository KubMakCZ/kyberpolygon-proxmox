# Návod: Instalace Nginx Proxy Manager na Debian Linux

**Nginx Proxy Manager (NPM)** je uživatelsky přívětivé rozhraní pro správu reverzních proxy pomocí Nginx.  
Umožňuje snadno přesměrovávat domény, nastavovat HTTPS certifikáty a přidávat pravidla pomocí webového rozhraní.

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

## 3. Vytvoření adresáře pro NPM

```bash
mkdir ~/nginx-proxy-manager
cd ~/nginx-proxy-manager
```

---

## 4. Vytvoření `docker-compose.yml` souboru

```bash
nano docker-compose.yml
```

A vlož:

```yaml
version: '3'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

---

## 5. Spuštění NPM

```bash
sudo docker-compose up -d
```

---

## 6. První přihlášení

Otevři v prohlížeči:

```
http://IP_adresa_serveru:81
```

### Výchozí přihlašovací údaje:

- **Email**: `admin@example.com`
- **Heslo**: `changeme`

Po přihlášení systém vyzve ke změně údajů.

---

## 7. Přidání proxy hosta

1. Klikni na „Proxy Hosts“
2. Vyber „Add Proxy Host“
3. Vyplň:
   - Doménu (např. `moje.domena.cz`)
   - IP adresu a port interní služby (např. 192.168.1.10:3000)
4. Volitelně aktivuj:
   - **Block Common Exploits**
   - **Websockets Support**
   - **SSL certifikát** (Let's Encrypt)

Klikni na **Save**.

---

## 8. Shrnutí

Gratulujeme! Nginx Proxy Manager je spuštěn a připraven pro přesměrování domén a správu HTTPS.

---

## Co můžeš dělat dál?

- Přidávat více proxy pravidel
- Přidávat a spravovat uživatele
- Připojit NPM k doménám a spravovat certifikáty Let’s Encrypt
- Přesměrovat aplikace jako Nextcloud, Home Assistant, Guacamole, apod.

Nginx Proxy Manager výrazně usnadňuje správu reverzních proxy i pro méně technicky zdatné uživatele.
