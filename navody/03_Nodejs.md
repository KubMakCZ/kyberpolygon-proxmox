# Návod: Instalace Node.js na Debian Linux

Tento návod tě krok za krokem provede instalací **Node.js** – oblíbeného nástroje pro spouštění JavaScriptu mimo webový prohlížeč.  
Node.js se často používá pro vývoj moderních webových aplikací a API serverů.

---

## 1. Aktualizace systému

Nejprve aktualizuj balíčky systému:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Node.js a npm

Node.js je dostupný přímo v repozitáři Debianu:

```bash
sudo apt install nodejs npm -y
```

### Ověření instalace

Zkontroluj verze:

```bash
node -v
npm -v
```

Měl bys vidět např.:

```
v18.x.x
9.x.x
```

---

## 3. (Volitelné) Instalace konkrétní verze přes NVM

Chceš-li spravovat více verzí Node.js, můžeš nainstalovat **NVM (Node Version Manager)**:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

---

## 4. Vytvoření jednoduché Node.js aplikace

### Krok 1: Vytvoř adresář

```bash
mkdir ~/myapp
cd ~/myapp
```

### Krok 2: Inicializuj projekt

```bash
npm init -y
```

### Krok 3: Vytvoř soubor `app.js`

```bash
nano app.js
```

A vlož následující kód:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Ahoj ze serveru Node.js!');
});

server.listen(3000, () => {
  console.log('Server běží na http://localhost:3000');
});
```

Ulož a spusť:

```bash
node app.js
```

Pak navštiv v prohlížeči:

```
http://IP_adresa_serveru:3000
```

---

## 5. Shrnutí

Gratulujeme! Node.js je úspěšně nainstalován a funguje.

Můžeš začít vyvíjet:
- Webové aplikace (např. s frameworky jako Express.js)
- API služby
- Real-time aplikace (např. chaty)

---

## Co můžeš dělat dál?

- Nainstalovat Express.js: `npm install express`
- Používat `nodemon` pro automatické restartování serveru
- Vytvářet REST API
- Používat frontend frameworky jako React, Vue, Angular s backendem v Node.js
