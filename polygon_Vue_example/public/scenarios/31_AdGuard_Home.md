# Návod: Instalace AdGuard Home na Debian Linux

**AdGuard Home** je self-hosted DNS server pro blokování reklam, trackerů a škodlivých domén v celé síti.  
Snadná instalace a moderní webové rozhraní jej činí ideálním řešením pro domácí i firemní sítě.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Stažení a spuštění instalačního skriptu

```bash
cd /opt
sudo curl -s -S -L https://static.adguard.com/adguardhome/release/AdGuardHome_linux_amd64.tar.gz -o adguard.tar.gz
sudo tar -xzf adguard.tar.gz
cd AdGuardHome
sudo ./AdGuardHome -s install
```

---

## 3. První spuštění a konfigurace

Po instalaci se AdGuard Home spustí a běží na:

```
http://IP_adresa_serveru:3000
```

### V prohlížeči projdi počátečním průvodcem:

- Nastav přihlašovací údaje
- Vyber síťové rozhraní a DNS port (výchozí: 53)
- Nastav blokovací seznamy (výchozí jsou vhodné)
- Zkontroluj stav a dokonči instalaci

---

## 4. Přístup do administračního rozhraní

Po dokončení je rozhraní dostupné na:

```
http://IP_adresa_serveru
```

---

## 5. Nastavení DNS v síti

### Možnosti:

- Nastavit ručně na jednotlivých zařízeních
- Nastavit DNS server v routeru
- Použít AdGuard Home i jako DHCP server

---

## 6. Správa blokování

V administraci můžeš:

- Přidávat a spravovat blokovací seznamy
- Whitelistovat nebo blacklistovat domény
- Nastavovat statistiky a notifikace

---

## 7. Shrnutí

Gratulujeme! AdGuard Home je nyní aktivní a filtruje DNS požadavky v síti.

---

## Co můžeš dělat dál?

- Přepnout přístup na HTTPS
- Zabezpečit rozhraní přístupem jen z LAN
- Nastavit přesměrování portu 53 na server (iptables nebo v routeru)

AdGuard Home poskytuje vysokou úroveň soukromí a kontroly bez nutnosti rozšíření v prohlížeči.
