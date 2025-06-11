# Návod: Instalace PiVPN (WireGuard/OpenVPN) na Debian Linux

**PiVPN** je jednoduchý instalační nástroj pro nastavení VPN serveru pomocí **WireGuard** nebo **OpenVPN**.  
Je ideální pro domácí použití a začátečníky.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Stažení a spuštění instalačního skriptu

```bash
curl -L https://install.pivpn.io | bash
```

---

## 3. Interaktivní průvodce

Instalátor tě provede:

- Výběrem VPN (WireGuard nebo OpenVPN)
- Výběrem síťového rozhraní
- Konfigurací portu a přesměrování
- Výběrem DNS (např. Cloudflare, Google)
- Generováním klíčů a certifikátů
- Výběrem jména pro prvního klienta

Po instalaci bude VPN server připraven k použití.

---

## 4. Restart systému (doporučeno)

```bash
sudo reboot
```

---

## 5. Přidání nového klienta

Po restartu můžeš přidat další klienty:

```bash
pivpn add
```

Systém vygeneruje `.conf` (pro WireGuard) nebo `.ovpn` (pro OpenVPN) soubor ve složce `/home/uživatel/`.

---

## 6. Export klientského profilu

Pro přenos klientského profilu:

```bash
pivpn -qr
```

Tím se vygeneruje QR kód, který můžeš naskenovat přímo v aplikaci WireGuard pro mobil.

---

## 7. Smazání klienta

```bash
pivpn remove
```

---

## 8. Zobrazení připojených klientů

```bash
pivpn list
```

---

## 9. Shrnutí

Gratulujeme! PiVPN ti umožňuje snadno a rychle provozovat vlastní VPN server s minimem konfigurace.

---

## Co můžeš dělat dál?

- Vyladit firewall a NAT pravidla
- Nastavit reverzní proxy pro služby dostupné přes VPN
- Pravidelně aktualizovat systém a PiVPN

PiVPN je elegantní řešení pro jednoduché, bezpečné a funkční VPN připojení odkudkoliv.
