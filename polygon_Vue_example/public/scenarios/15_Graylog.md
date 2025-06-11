# Návod: Instalace Graylog na Debian Linux

**Graylog** je výkonná open-source platforma pro sběr, analýzu a správu logů z různých systémů a zařízení.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace závislostí

Graylog potřebuje Java, MongoDB a Elasticsearch (nebo OpenSearch).

### Java (OpenJDK 17):

```bash
sudo apt install openjdk-17-jre-headless -y
```

---

## 3. Instalace MongoDB

```bash
sudo apt install mongodb -y
sudo systemctl enable mongodb
sudo systemctl start mongodb
```

---

## 4. Instalace OpenSearch (alternativa k Elasticsearch)

Doporučuje se použít OpenSearch kvůli licencím. Stáhni a rozbal:

```bash
cd /opt
wget https://artifacts.opensearch.org/releases/bundle/opensearch/2.14.0/opensearch-2.14.0-linux-x64.tar.gz
tar -xzf opensearch-2.14.0-linux-x64.tar.gz
mv opensearch-2.14.0 opensearch
```

### Vytvoření systemd služby:

```bash
sudo nano /etc/systemd/system/opensearch.service
```

Obsah:

```ini
[Unit]
Description=OpenSearch
After=network.target

[Service]
Type=simple
User=root
ExecStart=/opt/opensearch/opensearch-tar-install.sh
Restart=always

[Install]
WantedBy=multi-user.target
```

Spusť:

```bash
sudo systemctl daemon-reload
sudo systemctl start opensearch
sudo systemctl enable opensearch
```

---

## 5. Instalace Graylog

### Přidání repozitáře:

```bash
wget https://packages.graylog2.org/repo/packages/graylog-5.2-repository_latest.deb
sudo dpkg -i graylog-5.2-repository_latest.deb
sudo apt update
```

### Instalace Graylog serveru:

```bash
sudo apt install graylog-server -y
```

---

## 6. Nastavení Graylog

Vygeneruj tajný klíč:

```bash
pwgen -N 1 -s 96
```

Vygeneruj hash hesla pro webové rozhraní:

```bash
echo -n 'TvojeSuperHeslo' | sha256sum
```

Uprav konfiguraci:

```bash
sudo nano /etc/graylog/server/server.conf
```

Nastav:
- `password_secret = (vygenerovaný klíč)`
- `root_password_sha2 = (vygenerovaný hash)`
- `http_bind_address = 0.0.0.0:9000`

---

## 7. Spuštění Graylog serveru

```bash
sudo systemctl daemon-reload
sudo systemctl start graylog-server
sudo systemctl enable graylog-server
```

---

## 8. Přístup do Graylog rozhraní

V prohlížeči:

```
http://IP_adresa_serveru:9000
```

### Přihlášení:

- Uživatelské jméno: `admin`
- Heslo: (to, které jsi použil k vytvoření hashe)

---

## 9. Shrnutí

Graylog je nyní připraven pro přijímání a analýzu logů ze serverů, aplikací a zařízení.

---

## Co můžeš dělat dál?

- Nastavit přijímání logů přes Syslog, GELF nebo Beats
- Vytvořit alerty
- Napojit další servery a aplikace
- Integrovat s LDAP, Active Directory, atd.

Graylog je skvělý nástroj pro centrální správu logů a detekci problémů v síti a systému.
