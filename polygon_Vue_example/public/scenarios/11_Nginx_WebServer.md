# Návod: Instalace Nginx Web Serveru na Debian Linux

**Nginx** je výkonný, rychlý a efektivní webový server vhodný pro statické weby, reverzní proxy a zátěžově náročné aplikace.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Nginx

```bash
sudo apt install nginx -y
```

---

## 3. Spuštění a povolení služby

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Kontrola stavu:

```bash
sudo systemctl status nginx
```

---

## 4. Přístup přes webový prohlížeč

Získej IP adresu serveru:

```bash
hostname -I
```

Otevři v prohlížeči:

```
http://IP_adresa_serveru
```

Měla by se zobrazit výchozí uvítací stránka Nginx.

---

## 5. Umístění webových souborů

Výchozí složka pro web je:

```
/var/www/html
```

Vlož vlastní soubory (např. `index.html`):

```bash
echo "<h1>Vítejte na mém Nginx serveru</h1>" | sudo tee /var/www/html/index.html
```

---

## 6. Konfigurace serveru (volitelné)

Konfigurace serverů (tzv. server blocks) se nachází zde:

```
/etc/nginx/sites-available/
```

Příklad vlastního serveru:

```bash
sudo nano /etc/nginx/sites-available/mujweb
```

Obsah:

```nginx
server {
    listen 80;
    server_name mujweb.lan;
    root /var/www/mujweb;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Aktivace serveru:

```bash
sudo mkdir /var/www/mujweb
sudo ln -s /etc/nginx/sites-available/mujweb /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. Shrnutí

Gratulujeme! Nginx je připraven jako výchozí webserver nebo jako reverzní proxy.

---

## Co můžeš dělat dál?

- Nastavit HTTPS pomocí Let's Encrypt a certbot
- Používat jako proxy pro Node.js, PHP, Docker apod.
- Vytvořit víc virtuálních serverů
- Nastavit Gzip kompresi a cachování pro vyšší výkon

Nginx je výkonný nástroj vhodný pro moderní webové aplikace i statické stránky.
