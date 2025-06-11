# Návod: Instalace OpenVPN na Debian Linux

**OpenVPN** je osvědčené a flexibilní řešení pro tvorbu VPN serveru.  
V tomto návodu použijeme skript **`openvpn-install`** pro snadnou a rychlou instalaci.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace požadovaných balíčků

```bash
sudo apt install curl -y
```

---

## 3. Stažení a spuštění instalačního skriptu

```bash
curl -O https://raw.githubusercontent.com/angristan/openvpn-install/master/openvpn-install.sh
chmod +x openvpn-install.sh
sudo ./openvpn-install.sh
```

---

## 4. Interaktivní průvodce

Skript se tě zeptá na:

- IP adresu serveru
- Protokol (doporučeno: UDP)
- Port (výchozí: 1194)
- DNS (např. Cloudflare)
- Název klienta

Po potvrzení skript nainstaluje OpenVPN, vytvoří certifikáty a vygeneruje konfigurační soubor.

---

## 5. Spuštění OpenVPN

Po instalaci by měl být server automaticky spuštěn:

```bash
sudo systemctl status openvpn-server@server
```

---

## 6. Přístup ke klientskému souboru

Po instalaci najdeš `.ovpn` soubor v domovském adresáři:

```
~/nazev_klienta.ovpn
```

Přeneste tento soubor do klientského zařízení (telefon, PC) a importuj jej do OpenVPN aplikace.

---

## 7. Přidání dalších klientů

Kdykoliv později spusť:

```bash
sudo ./openvpn-install.sh
```

Zvol možnost „přidat nového klienta“ a postupuj podle pokynů.

---

## 8. Shrnutí

Gratulujeme! OpenVPN je úspěšně nainstalován a připraven k bezpečnému připojení klientů odkudkoliv.

---

## Co můžeš dělat dál?

- Vyladit firewall pravidla
- Přidat autentizaci přes certifikáty nebo LDAP
- Monitorovat připojení a provoz
- Použít TCP fallback port

OpenVPN je flexibilní a široce podporovaná VPN technologie.
