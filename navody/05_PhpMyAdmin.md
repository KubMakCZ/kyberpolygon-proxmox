# Návod: Instalace phpMyAdmin na Debian Linux

Tento návod tě provede instalací a nastavením **phpMyAdmin** – webového rozhraní pro správu MySQL databází.

---

## 1. Předpoklady

- Musíš mít nainstalovaný **LAMP stack** (Linux, Apache, MySQL, PHP).
- MySQL musí být funkční a zabezpečené.

---

## 2. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 3. Instalace phpMyAdmin

Spusť instalaci:

```bash
sudo apt install phpmyadmin php-mbstring php-zip php-gd php-json php-curl -y
```

### Během instalace:

- Vyber **apache2** (mezerníkem) a potvrď Enter.
- Zvol **ano** pro automatické nastavení databáze s dbconfig-common.
- Zadej a zapamatuj si **heslo pro phpmyadmin uživatele** v MySQL.

---

## 4. Aktivace rozšíření PHP

```bash
sudo phpenmod mbstring
sudo systemctl restart apache2
```

---

## 5. Přidání phpMyAdmin do Apache

Pokud není automaticky připojen, přidej ho ručně:

```bash
echo 'Include /etc/phpmyadmin/apache.conf' | sudo tee -a /etc/apache2/apache2.conf
sudo systemctl restart apache2
```

---

## 6. Přístup do phpMyAdmin

Otevři v prohlížeči:

```
http://IP_adresa_serveru/phpmyadmin
```

Přihlas se pomocí:
- Uživatelského jména a hesla pro MySQL
- Např. uživatele `root` nebo `phpmyadmin`

---

## 7. Zvýšení bezpečnosti (volitelné)

### Zakázání přístupu zvenčí (např. jen z LAN):

```bash
sudo nano /etc/apache2/conf-available/phpmyadmin.conf
```

Uvnitř direktivy `<Directory /usr/share/phpmyadmin>` přidej:

```apache
Require ip 192.168.1.0/24
Require local
```

Pak ulož a restartuj Apache:

```bash
sudo systemctl restart apache2
```

---

## 8. Shrnutí

Gratulujeme! phpMyAdmin je nainstalován a připraven pro použití.

Můžeš:
- Vytvářet databáze, tabulky a uživatele
- Importovat a exportovat data
- Spravovat přístupová práva

---

## Co můžeš dělat dál?

- Povolit HTTPS pro zabezpečený přístup
- Nastavit dvoufázové přihlašování
- Zálohovat databáze pravidelně

phpMyAdmin je výkonný nástroj, který usnadňuje správu databází přímo z prohlížeče.
