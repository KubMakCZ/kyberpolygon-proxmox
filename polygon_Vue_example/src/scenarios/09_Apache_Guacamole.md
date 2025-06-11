# Návod: Instalace Apache Guacamole na Debian Linux

**Apache Guacamole** je klient bez potřeby pluginů, který umožňuje vzdálený přístup přes webový prohlížeč (RDP, SSH, VNC).  
Tento návod popisuje instalaci pomocí Dockeru, což je nejjednodušší a doporučený způsob.

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

## 3. Vytvoření adresáře pro Guacamole

```bash
mkdir ~/guacamole
cd ~/guacamole
```

---

## 4. Vytvoření `docker-compose.yml` souboru

Vytvoř soubor:

```bash
nano docker-compose.yml
```

A vlož následující obsah:

```yaml
version: '3'
services:
  guacamole:
    image: guacamole/guacamole
    restart: always
    ports:
      - "8080:8080"
    links:
      - guacd
      - mysql
    environment:
      MYSQL_DATABASE: guacamole_db
      MYSQL_USER: guacamole_user
      MYSQL_PASSWORD: silneheslo
      MYSQL_ROOT_PASSWORD: rootheslo

  guacd:
    image: guacamole/guacd
    restart: always

  mysql:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootheslo
      MYSQL_DATABASE: guacamole_db
      MYSQL_USER: guacamole_user
      MYSQL_PASSWORD: silneheslo
```

---

## 5. Stažení a spuštění kontejnerů

```bash
sudo docker-compose up -d
```

Služby se stáhnou a spustí na pozadí.

---

## 6. První přihlášení do Guacamole

Otevři v prohlížeči:

```
http://IP_adresa_serveru:8080/guacamole
```

### Přihlašovací údaje:
- Uživatelské jméno: `guacadmin`
- Heslo: `guacadmin`

Při prvním přihlášení změň heslo.

---

## 7. Přidání připojení (RDP, SSH…)

Po přihlášení můžeš přidat nové připojení:

1. Otevři menu vpravo nahoře → **Settings**
2. Přejdi do záložky **Connections**
3. Klikni na **New Connection**
4. Vyplň potřebné údaje – IP adresa, typ připojení (RDP, SSH, VNC), jméno a heslo

---

## 8. Shrnutí

Apache Guacamole umožňuje pohodlný vzdálený přístup k různým zařízením přímo z webového prohlížeče – bez nutnosti klientských aplikací.

---

## Co můžeš dělat dál?

- Vytvořit další uživatele a skupiny
- Připojit více serverů (Windows, Linux)
- Přidat dvoufaktorové ověření
- Omezit přístup pomocí firewallu

Guacamole je ideální řešení pro bezpečný a flexibilní přístup ke vzdáleným stanicím a serverům.
