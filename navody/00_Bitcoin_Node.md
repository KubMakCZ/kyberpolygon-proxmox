# Návod: Instalace Bitcoin Full Node (Bitcoin Core) na Debian Linux

**Bitcoin Node** je plnohodnotný uzel sítě Bitcoin, který ověřuje transakce, bloky a přispívá k decentralizaci sítě.  
Budeš provozovat vlastní kopii blockchainu bez nutnosti důvěřovat třetí straně.

---

## 1. Požadavky

- Minimálně 500 GB volného místa (ideálně SSD)
- Stabilní připojení k internetu (aspoň 50 KB/s upload)
- Debian 11 nebo novější

---

## 2. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 3. Instalace závislostí

```bash
sudo apt install wget gnupg unzip -y
```

---

## 4. Stažení a ověření Bitcoin Core

Přejdi na [https://bitcoincore.org/en/download/](https://bitcoincore.org/en/download/) a stáhni nejnovější verzi.

```bash
cd /tmp
wget https://bitcoincore.org/bin/bitcoin-core-26.0/bitcoin-26.0-x86_64-linux-gnu.tar.gz
wget https://bitcoincore.org/bin/bitcoin-core-26.0/SHA256SUMS
wget https://bitcoincore.org/bin/bitcoin-core-26.0/SHA256SUMS.asc
```

Ověř SHA256:

```bash
sha256sum -c SHA256SUMS 2>&1 | grep bitcoin-26.0-x86_64-linux-gnu.tar.gz
```

Ověř podpis (volitelné):

```bash
gpg --keyserver hkps://keyserver.ubuntu.com --recv-keys 01EA5486DE18A882D4C2684590C8019E36C2E964
gpg --verify SHA256SUMS.asc
```

---

## 5. Instalace Bitcoin Core

```bash
tar -xzf bitcoin-26.0-x86_64-linux-gnu.tar.gz
sudo install -m 0755 -o root -g root -t /usr/local/bin bitcoin-26.0/bin/*
```

Zkontroluj instalaci:

```bash
bitcoind --version
```

---

## 6. Vytvoření konfiguračního souboru

```bash
mkdir ~/.bitcoin
nano ~/.bitcoin/bitcoin.conf
```

Příklad nastavení:

```conf
server=1
daemon=1
txindex=1
rpcuser=uzivatel
rpcpassword=silneheslo
```

---

## 7. Spuštění Bitcoin Node

```bash
bitcoind
```

Sledování stavu:

```bash
bitcoin-cli getblockchaininfo
```

---

## 8. Automatické spouštění (volitelné)

Přidej do `crontab`:

```bash
crontab -e
```

A vlož:

```
@reboot /usr/local/bin/bitcoind
```

---

## 9. Shrnutí

Gratulujeme! Tvůj Bitcoin Node je spuštěn a synchronizuje celý blockchain.

---

## Co můžeš dělat dál?

- Propojit s Lightning Node (např. LND, Core Lightning)
- Ověřovat vlastní peněženky bez třetí strany
- Používat jako backend pro BTC Pay Server nebo Electrum
- Pomáhat decentralizaci sítě Bitcoin

Provoz Bitcoin Node je krok k větší svobodě a suverenitě v kryptosvětě.
