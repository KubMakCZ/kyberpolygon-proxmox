# Návod: Instalace e-mailového serveru Postfix + Dovecot na Debian Linux

Tento návod ti ukáže, jak nainstalovat vlastní e-mail server s Postfix (odesílání) a Dovecot (příjem), pomocí protokolů SMTP, IMAP a POP3.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace balíčků

```bash
sudo apt install postfix dovecot-core dovecot-imapd dovecot-pop3d -y
```

### Během instalace Postfixu:

- Zvol typ: **Internet Site**
- Zadej název domény (např. `mojedomena.cz`)

---

## 3. Vytvoření e-mailového uživatele

```bash
sudo adduser emailuser
```

---

## 4. Konfigurace Postfix

Otevři hlavní konfigurační soubor:

```bash
sudo nano /etc/postfix/main.cf
```

Zkontroluj nebo doplň:

```conf
myhostname = mail.mojedomena.cz
mydomain = mojedomena.cz
myorigin = /etc/mailname
inet_interfaces = all
inet_protocols = ipv4
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
home_mailbox = Maildir/
smtpd_tls_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
smtpd_tls_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
smtpd_use_tls=yes
smtpd_tls_session_cache_database = btree:${data_directory}/smtpd_scache
smtp_tls_session_cache_database = btree:${data_directory}/smtp_scache
```

---

## 5. Konfigurace Dovecot

```bash
sudo nano /etc/dovecot/conf.d/10-mail.conf
```

Najdi a změň:

```conf
mail_location = maildir:~/Maildir
```

Poté:

```bash
sudo nano /etc/dovecot/conf.d/10-auth.conf
```

Odkomentuj:

```conf
disable_plaintext_auth = yes
auth_mechanisms = plain login
```

---

## 6. Spuštění služeb

```bash
sudo systemctl restart postfix
sudo systemctl restart dovecot
sudo systemctl enable postfix
sudo systemctl enable dovecot
```

---

## 7. Testování

### Odeslání testovacího e-mailu z terminálu:

```bash
echo "Test e-mailu" | mail -s "Předmět" user@example.com
```

### Přístup přes Thunderbird nebo jiný e-mailový klient:

- IMAP: `mail.mojedomena.cz`, port 143
- SMTP: `mail.mojedomena.cz`, port 25 nebo 587
- Uživatelské jméno a heslo = systémový uživatel

---

## 8. Shrnutí

Gratulujeme! E-mailový server s Postfix + Dovecot je spuštěn.

---

## Co můžeš dělat dál?

- Nastavit SPF, DKIM a DMARC pro ochranu před spamem
- Přidat TLS certifikáty (např. Let’s Encrypt)
- Nasadit webmail (např. Roundcube)
- Monitorovat logy: `/var/log/mail.log`

Toto řešení je vhodné pro testovací i produkční účely s minimálními náklady.
