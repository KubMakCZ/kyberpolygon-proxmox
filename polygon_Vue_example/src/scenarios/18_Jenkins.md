# Návod: Instalace Jenkins na Debian Linux

**Jenkins** je automatizační server pro CI/CD – pomáhá s automatickým spouštěním testů, buildů a nasazováním projektů.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Javy

Jenkins vyžaduje Java 11 nebo vyšší. Instaluj OpenJDK:

```bash
sudo apt install openjdk-17-jdk -y
```

Zkontroluj verzi:

```bash
java -version
```

---

## 3. Přidání oficiálního repozitáře Jenkins

```bash
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee   /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]   https://pkg.jenkins.io/debian-stable binary/ | sudo tee   /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
```

---

## 4. Instalace Jenkins

```bash
sudo apt install jenkins -y
```

---

## 5. Spuštění Jenkins

```bash
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

Zkontroluj stav:

```bash
sudo systemctl status jenkins
```

---

## 6. Přístup do webového rozhraní

Jenkins běží na portu **8080**.  
Získej IP adresu:

```bash
hostname -I
```

Pak otevři:

```
http://IP_adresa_serveru:8080
```

---

## 7. První přihlášení

Získej dočasné heslo:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Zadej heslo do webového rozhraní a postupuj podle průvodce:

- Zvol instalaci doporučených pluginů
- Vytvoř si admin účet
- Dokonči instalaci

---

## 8. Shrnutí

Gratulujeme! Jenkins je připraven pro automatizaci testů, buildů, nasazení a dalších vývojových úloh.

---

## Co můžeš dělat dál?

- Propojit s Gitea, GitHub nebo GitLab
- Spouštět skripty, kompilace, testy
- Naplánovat joby nebo spouštět na základě webhooku
- Instalovat pluginy pro Docker, Kubernetes, SSH, Email apod.

Jenkins je robustní a rozšiřitelný nástroj pro správu vývojového cyklu.
