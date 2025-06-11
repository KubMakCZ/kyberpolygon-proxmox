# Návod: Instalace Cockpit na Debian Linux

**Cockpit** je webové rozhraní pro správu Linux serveru.  
Umožňuje sledovat systém, spravovat služby, uživatele, sítě a disky přímo z prohlížeče.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Cockpit

```bash
sudo apt install cockpit -y
```

---

## 3. Spuštění a povolení služby

```bash
sudo systemctl start cockpit
sudo systemctl enable cockpit
```

---

## 4. Přístup do webového rozhraní

Cockpit běží na portu **9090**.

V prohlížeči otevři:

```
https://IP_adresa_serveru:9090
```

### Přihlášení

Použij své systémové přihlašovací údaje. Uživatel musí mít oprávnění k sudo.

---

## 5. Funkce Cockpit

V rozhraní můžeš:

- Sledovat stav systému (CPU, RAM, disk, síť)
- Spravovat služby (systemd)
- Připojit a spravovat disky
- Přidávat a spravovat uživatele
- Spravovat síťová rozhraní a brány
- Aktualizovat balíčky
- Instalovat kontejnery, spravovat libvirt a další

---

## 6. Povolení přístupu z LAN (firewall)

Pokud máš aktivní `ufw`:

```bash
sudo ufw allow 9090/tcp
```

---

## 7. Shrnutí

Gratulujeme! Cockpit je spuštěn a připraven poskytovat přehlednou správu serveru přes webové rozhraní.

---

## Co můžeš dělat dál?

- Připojit více serverů přes jednu instanci Cockpit
- Aktivovat dvoufaktorové ověření (2FA)
- Spravovat kontejnery (Docker, Podman)
- Monitorovat výkon a logy v reálném čase

Cockpit je ideální pro administraci bez nutnosti neustálého používání terminálu.
