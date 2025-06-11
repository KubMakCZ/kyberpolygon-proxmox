# Návod: Instalace Filebrowser na Debian Linux

**Filebrowser** je jednoduché webové rozhraní pro správu souborů na serveru.  
Umožňuje nahrávání, mazání, sdílení a správu souborů odkudkoliv přes prohlížeč.

---

## 1. Instalace Dockeru (pokud není)

```bash
sudo apt update && sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
sudo systemctl start docker
```

---

## 2. Vytvoření adresáře a `docker-compose.yml`

```bash
mkdir -p ~/filebrowser
cd ~/filebrowser
nano docker-compose.yml
```

Obsah:

```yaml
version: '3'

services:
  filebrowser:
    image: filebrowser/filebrowser:latest
    container_name: filebrowser
    ports:
      - "8081:80"
    volumes:
      - ./data:/srv
      - ./config:/config
    restart: unless-stopped
```

---

## 3. Spuštění Filebrowser

```bash
docker-compose up -d
```

---

## 4. Přístup do rozhraní

Otevři v prohlížeči:

```
http://IP_adresa_serveru:8081
```

### Výchozí přihlašovací údaje:

- **Uživatel:** `admin`
- **Heslo:** `admin`

Při prvním přihlášení budeš vyzván ke změně hesla.

---

## 5. Shrnutí

Gratulujeme! Filebrowser je spuštěn a připraven ke správě souborů přes prohlížeč.

---

## Co můžeš dělat dál?

- Vytvořit více uživatelů s různými oprávněními
- Přizpůsobit vzhled a přístupové cesty
- Nahrávat, stahovat, sdílet a upravovat soubory online

Filebrowser je výkonný nástroj pro jednoduchou práci se soubory bez nutnosti SSH přístupu.
