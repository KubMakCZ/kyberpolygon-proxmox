# Návod: Instalace ZeroTier na Debian Linux

**ZeroTier** je softwarová síť typu overlay, která propojuje zařízení napříč lokalitami jako by byla ve stejné LAN.  
Je vhodný pro přístup k serverům, NAS, IoT a vzdálenou správu.

---

## 1. Instalace ZeroTier

```bash
curl -s https://install.zerotier.com | sudo bash
```

Po instalaci se spustí démon `zerotier-one`.

---

## 2. Připojení ke síti

Získej ID své ZeroTier sítě z webu:

[https://my.zerotier.com](https://my.zerotier.com)

Poté se připoj:

```bash
sudo zerotier-cli join tvuje_netid
```

---

## 3. Schválení zařízení ve webovém rozhraní

Přejdi na `https://my.zerotier.com`, vyber síť a schval připojené zařízení (pokud je povoleno ruční schvalování).

Můžeš zde:

- Přiřadit statickou IP
- Změnit jméno
- Omezit přístup

---

## 4. Zobrazení informací o připojení

```bash
sudo zerotier-cli listnetworks
```

---

## 5. Povolení služby při startu

```bash
sudo systemctl enable zerotier-one
```

---

## 6. Nastavení firewallu (volitelné)

Povol přístup na porty v rámci ZeroTier sítě (např. SSH, HTTP).

---

## 7. Použití s dalšími zařízeními

Nainstaluj ZeroTier i na další stroje:

- Linux / Windows / macOS
- Android / iOS
- Routery (OpenWRT)

Připoj je do stejné sítě a komunikuj mezi nimi pomocí ZeroTier IP adresy.

---

## 8. Shrnutí

Gratulujeme! ZeroTier je aktivní a propojuje zařízení přes bezpečnou, šifrovanou síť, jako by byla v LAN.

---

## Co můžeš dělat dál?

- Vytvořit více sítí
- Použít jako VPN náhradu bez nutnosti port forwardingu
- Propojit heterogenní zařízení (server, notebook, telefon)

ZeroTier je ideální řešení pro vzdálený přístup, jednoduchou VPN a správu sítí bez složité konfigurace.
