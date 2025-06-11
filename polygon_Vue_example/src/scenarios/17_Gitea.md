# Návod: Instalace Gitea na Debian Linux

**Gitea** je lehký a výkonný Git server s webovým rozhraním, ideální pro správu vlastních repozitářů.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace závislostí

```bash
sudo apt install git sqlite3 -y
```

---

## 3. Vytvoření uživatele pro Gitea

```bash
sudo adduser   --system   --shell /bin/bash   --gecos 'Git Version Control'   --group   --disabled-password   --home /home/git   git
```

---

## 4. Stažení Gitea

```bash
wget -O gitea https://dl.gitea.io/gitea/1.21.4/gitea-1.21.4-linux-amd64
chmod +x gitea
sudo mv gitea /usr/local/bin/
```

---

## 5. Vytvoření adresářů a oprávnění

```bash
sudo mkdir -p /var/lib/gitea/{custom,data,log}
sudo chown -R git:git /var/lib/gitea/
sudo chmod -R 750 /var/lib/gitea/
sudo mkdir /etc/gitea
sudo chown root:git /etc/gitea
sudo chmod 770 /etc/gitea
```

---

## 6. Vytvoření systemd služby

```bash
sudo nano /etc/systemd/system/gitea.service
```

Obsah:

```ini
[Unit]
Description=Gitea (Git with a cup of tea)
After=network.target

[Service]
RestartSec=2s
Type=simple
User=git
Group=git
WorkingDirectory=/var/lib/gitea/
ExecStart=/usr/local/bin/gitea web --config /etc/gitea/app.ini
Restart=always
Environment=USER=git HOME=/home/git GITEA_WORK_DIR=/var/lib/gitea/

[Install]
WantedBy=multi-user.target
```

---

## 7. Spuštění Gitea

```bash
sudo systemctl daemon-reload
sudo systemctl enable gitea
sudo systemctl start gitea
```

---

## 8. Přístup do webového rozhraní

V prohlížeči:

```
http://IP_adresa_serveru:3000
```

Vyplň instalační formulář:
- Nastav databázi (SQLite doporučeno pro testování)
- Nastav admin účet
- Ulož konfiguraci

---

## 9. Shrnutí

Gratulujeme! Gitea je připraven k použití jako vlastní Git server s pohodlným webovým rozhraním.

---

## Co můžeš dělat dál?

- Vytvářet repozitáře, týmy, organizace
- Nastavit SSH přístup
- Povolit registrace nebo omezit na pozvané
- Nasadit HTTPS pomocí reverzní proxy

Gitea je skvělá alternativa k GitHubu, GitLabu nebo Bitbucketu pro vlastní použití.
