# Návod: Instalace Mailcow (e-mailový server) na Debian Linux

**Mailcow** je kompletní self-hosted e-mailové řešení postavené na Dockeru.  
Obsahuje Postfix, Dovecot, Rspamd, SoGo, webmail, webové rozhraní pro správu a mnoho dalšího.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Dockeru a Docker Compose

```bash
sudo apt install docker.io docker-compose git -y
sudo systemctl enable docker
sudo systemctl start docker
```

---

## 3. Stažení Mailcow

```bash
cd /opt
sudo git clone https://github.com/mailcow/mailcow-dockerized
cd mailcow-dockerized
sudo ./generate_config.sh
```

Zadej doménu, např.: `mail.tvojedomena.cz`

---

## 4. Úprava nastavení (volitelné)

Otevři `.env` soubor:

```bash
sudo nano mailcow.conf
```

Zkontroluj či uprav:
- Hostname
- Timezone
- IPv6

---

## 5. Spuštění Mailcow

```bash
sudo docker-compose pull
sudo docker-compose up -d
```

---

## 6. Přístup do rozhraní

V prohlížeči otevři:

```
https://mail.tvojedomena.cz
```

### Přihlašovací údaje:

- Uživatelské jméno: `admin`
- Heslo: `moohoo` *(výchozí, lze změnit)*

---

## 7. Konfigurace domény

Na svém DNS správci nastav tyto záznamy:
- MX záznam na `mail.tvojedomena.cz`
- A záznam `mail.tvojedomena.cz` → IP serveru
- SPF, DKIM, DMARC záznamy (vygeneruje Mailcow)
- PTR záznam (reverzní DNS)

---

## 8. Shrnutí

Gratulujeme! Mailcow je připraven jako plnohodnotný e-mailový server.

---

## Co můžeš dělat dál?

- Přidat domény, schránky, aliasy
- Nastavit SoGo webmail, autodiscover/autoconfig
- Aktivovat 2FA pro administrátory
- Spravovat spam filtry, greylisting, logy

Mailcow je profesionální řešení, které zvládne správu e-mailů, kalendářů a kontaktů v jednom rozhraní.
