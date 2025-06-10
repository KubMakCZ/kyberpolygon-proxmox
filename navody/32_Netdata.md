# Návod: Instalace Netdata na Debian Linux

**Netdata** je real-time monitorovací nástroj, který zobrazuje systémové metriky v přehledném a interaktivním webovém rozhraní.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Netdata (oficiální skript)

Doporučený způsob instalace:

```bash
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

Tento skript automaticky:

- Zjistí potřebné balíčky
- Vytvoří systemd službu
- Spustí Netdata

---

## 3. Přístup do rozhraní

Po dokončení instalace otevři:

```
http://IP_adresa_serveru:19999
```

Zobrazí se dashboard s metrikami:

- CPU, RAM, disk, síť
- Procesy, systémová zátěž
- Webové služby, databáze a další (pokud jsou přítomny)

---

## 4. Povolení služby při startu

```bash
sudo systemctl enable netdata
```

---

## 5. Aktualizace Netdata (volitelné)

Netdata se automaticky aktualizuje přes vlastní systém.  
Ručně lze spustit update:

```bash
sudo /usr/libexec/netdata/netdata-updater.sh
```

---

## 6. Shrnutí

Gratulujeme! Netdata je spuštěna a poskytuje přehled o systému v reálném čase.

---

## Co můžeš dělat dál?

- Nastavit upozornění (e-mail, Telegram…)
- Monitorovat další zařízení v síti
- Vytvořit centralizovaný Netdata Cloud (volitelné)
- Rozšířit o pluginy pro Docker, webservery, databáze…

Netdata je rychlý, přehledný a výkonný nástroj pro sledování výkonu systému.
