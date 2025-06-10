# Návod: Instalace DNSCrypt-Proxy na Debian Linux

**DNSCrypt-Proxy** šifruje DNS dotazy a chrání před sledováním, manipulací nebo cenzurou DNS provozu.  
Je vhodný jako doplněk k Pi-hole, AdGuard Home nebo jako samostatný DNS resolver.

---

## 1. Instalace závislostí

```bash
sudo apt update && sudo apt install curl tar -y
```

---

## 2. Stažení a rozbalení DNSCrypt-Proxy

```bash
cd /opt
sudo curl -L https://github.com/DNSCrypt/dnscrypt-proxy/releases/latest/download/dnscrypt-proxy-linux_x86_64-3.tar.gz -o dnscrypt.tar.gz
sudo tar -xzf dnscrypt.tar.gz
sudo mv dnscrypt-proxy-linux_x86_64-3 dnscrypt-proxy
cd dnscrypt-proxy
```

---

## 3. Konfigurace

Uprav hlavní konfigurační soubor:

```bash
sudo nano dnscrypt-proxy.toml
```

Změň podle potřeby:
- `listen_addresses = ['127.0.0.1:53']`
- `server_names = ['cloudflare', 'google', 'quad9-dnscrypt']`

Lze aktivovat blokování domén, whitelist, cache atd.

---

## 4. Spuštění DNSCrypt-Proxy

```bash
sudo ./dnscrypt-proxy -config dnscrypt-proxy.toml
```

---

## 5. Automatické spouštění (systemd)

Vytvoř službu:

```bash
sudo nano /etc/systemd/system/dnscrypt-proxy.service
```

Obsah:

```ini
[Unit]
Description=DNSCrypt Proxy
After=network.target

[Service]
ExecStart=/opt/dnscrypt-proxy/dnscrypt-proxy -config /opt/dnscrypt-proxy/dnscrypt-proxy.toml
Restart=on-failure
User=nobody
Group=nogroup

[Install]
WantedBy=multi-user.target
```

Aktivuj službu:

```bash
sudo systemctl daemon-reload
sudo systemctl enable dnscrypt-proxy
sudo systemctl start dnscrypt-proxy
```

---

## 6. Nastavení systému na používání lokálního DNS

Nastav `127.0.0.1` jako DNS server v `/etc/resolv.conf` nebo pomocí NetworkManageru:

```bash
sudo nano /etc/resolv.conf
```

A vlož:

```
nameserver 127.0.0.1
```

---

## 7. Shrnutí

Gratulujeme! DNSCrypt-Proxy je aktivní a chrání tvé DNS dotazy šifrováním a anonymizací.

---

## Co můžeš dělat dál?

- Kombinovat s Pi-hole nebo AdGuard Home
- Používat blokovací seznamy (blacklist/whitelist)
- Aktivovat DNS-over-HTTPS (DoH) nebo DNS-over-QUIC

DNSCrypt-Proxy zvyšuje soukromí i bezpečnost při surfování na internetu.
