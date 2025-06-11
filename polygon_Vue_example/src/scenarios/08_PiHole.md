# Návod: Instalace Pi-hole na Debian Linux

**Pi-hole** je nástroj pro blokování reklam a sledovacích skriptů na úrovni celé sítě.  
Po instalaci se chová jako DNS server a filtruje nechtěný obsah pro všechna zařízení ve tvé síti.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Pi-hole

Pi-hole lze snadno nainstalovat přes oficiální skript:

```bash
curl -sSL https://install.pi-hole.net | bash
```

Skript tě provede interaktivní instalací – doporučené volby:

- Vyber správné síťové rozhraní
- Použij výchozí DNS (např. Cloudflare, Google)
- Ponech výchozí seznamy blokovaných domén
- Povolit webové rozhraní: **Ano**
- Povolit webové rozhraní s přístupem k protokolům: **Ano**
- Zobrazit IP a jména v rozhraní: **Ano**

---

## 3. Přístup do webového rozhraní

Po instalaci získej IP adresu serveru:

```bash
hostname -I
```

Otevři webové rozhraní v prohlížeči:

```
http://IP_adresa/admin
```

Přihlas se pomocí hesla zobrazeného na konci instalace (lze kdykoliv změnit):

```bash
pihole -a -p
```

---

## 4. Nastavení zařízení nebo routeru

Aby zařízení ve tvé síti využívala Pi-hole, musí používat jeho IP adresu jako DNS.

### Možnosti:
- Ručně nastavit DNS na každém zařízení
- Nastavit DNS na routeru (doporučeno)
- Použít DHCP server Pi-hole místo routeru

---

## 5. Blokování reklam na celé síti

Jakmile je DNS přesměrování hotové, zařízení začnou využívat Pi-hole a blokování se projeví automaticky.

Statistiky a seznamy můžeš sledovat na:

```
http://IP_adresa/admin
```

---

## 6. Shrnutí

Gratulujeme! Pi-hole je úspěšně nainstalován a aktivně blokuje reklamy a trackery v síti.

---

## Co můžeš dělat dál?

- Přidat vlastní blacklisty a whitelisty
- Změnit vzhled rozhraní (např. pomocí webových skinů)
- Použít spolu s Unbound pro rekurzivní DNS
- Nastavit vlastní doménu pro interní síť

Pi-hole zvyšuje soukromí a bezpečnost pro všechna zařízení v síti – bez nutnosti rozšíření v prohlížeči.
