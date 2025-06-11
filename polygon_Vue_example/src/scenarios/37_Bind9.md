# Návod: Instalace Bind9 DNS serveru na Debian Linux

**BIND9** je tradiční a výkonný DNS server pro provoz vlastních domén, přesměrování, lokálních zón a reverzního DNS.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Bind9

```bash
sudo apt install bind9 bind9utils bind9-doc dnsutils -y
```

---

## 3. Konfigurace zóny (příklad pro lokální doménu `example.lan`)

### Hlavní konfigurační soubor

```bash
sudo nano /etc/bind/named.conf.local
```

Přidej:

```conf
zone "example.lan" {
    type master;
    file "/etc/bind/zones/db.example.lan";
};
```

### Vytvoření složky a souboru pro zónu

```bash
sudo mkdir /etc/bind/zones
sudo cp /etc/bind/db.local /etc/bind/zones/db.example.lan
sudo nano /etc/bind/zones/db.example.lan
```

Příklad obsahu:

```zone
$TTL    604800
@       IN      SOA     ns1.example.lan. admin.example.lan. (
                              2         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
@       IN      NS      ns1.example.lan.
ns1     IN      A       192.168.1.1
www     IN      A       192.168.1.100
```

---

## 4. Kontrola konfigurace

```bash
sudo named-checkconf
sudo named-checkzone example.lan /etc/bind/zones/db.example.lan
```

---

## 5. Restart služby

```bash
sudo systemctl restart bind9
sudo systemctl enable bind9
```

---

## 6. Nastavení DNS na klientovi

Uprav `/etc/resolv.conf` a nastav DNS:

```
nameserver 192.168.1.1
```

---

## 7. Test funkčnosti

```bash
dig @192.168.1.1 www.example.lan
```

---

## 8. Shrnutí

Gratulujeme! Bind9 je spuštěn jako vlastní DNS server pro lokální nebo veřejnou doménu.

---

## Co můžeš dělat dál?

- Přidat reverzní zóny pro PTR dotazy
- Používat Bind jako forwarding resolver
- Nastavit ACL, logging a rekurzi
- Zabezpečit server pomocí DNSSEC

Bind9 je stabilní a profesionální DNS server pro firemní i domácí sítě.
