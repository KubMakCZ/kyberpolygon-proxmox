# Návod: Instalace WireGuard VPN na Debian Linux

**WireGuard** je moderní a rychlý VPN protokol zaměřený na jednoduchost, výkon a bezpečnost. Je ideální volbou pro vlastní VPN server.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace WireGuard

```bash
sudo apt install wireguard -y
```

---

## 3. Generování klíčů

Vytvoř složku pro klíče:

```bash
mkdir -p ~/wgkeys && cd ~/wgkeys
umask 077
wg genkey | tee privatekey | wg pubkey > publickey
```

---

## 4. Nastavení serveru

Vytvoř konfigurační soubor:

```bash
sudo nano /etc/wireguard/wg0.conf
```

Obsah:

```ini
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = (vlož obsah souboru privatekey)

# Povolit přesměrování provozu
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
```

---

## 5. Povolení IP forwardingu

```bash
sudo nano /etc/sysctl.conf
```

Odkomentuj nebo přidej:

```
net.ipv4.ip_forward=1
```

Pak načti:

```bash
sudo sysctl -p
```

---

## 6. Spuštění WireGuard

```bash
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0
```

---

## 7. Konfigurace klienta (příklad)

Na klientovi vytvoř:

```ini
[Interface]
PrivateKey = (klientův privátní klíč)
Address = 10.0.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = (serverův veřejný klíč)
Endpoint = serverova.ip.adresa:51820
AllowedIPs = 0.0.0.0/0
```

---

## 8. Přidání klienta na server

Na serveru přidej veřejný klíč klienta:

```bash
sudo wg set wg0 peer (klientův_public_key) allowed-ips 10.0.0.2/32
```

---

## 9. Shrnutí

Gratulujeme! WireGuard je připraven jako moderní, bezpečný a výkonný VPN server.

---

## Co můžeš dělat dál?

- Automatizovat přidávání klientů
- Připojit mobilní zařízení
- Omezit přístup pomocí firewallu
- Monitorovat provoz pomocí `wg show`

WireGuard je vhodný pro domácí i firemní VPN s minimálními nároky.
