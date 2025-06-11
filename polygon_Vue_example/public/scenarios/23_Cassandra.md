# Návod: Instalace Apache Cassandra na Debian Linux

**Apache Cassandra** je distribuovaná NoSQL databáze navržená pro vysokou dostupnost, škálovatelnost a odolnost vůči chybám.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Java (OpenJDK 11)

```bash
sudo apt install openjdk-11-jdk -y
java -version
```

---

## 3. Přidání repozitáře Apache Cassandra

### Import GPG klíče:

```bash
curl https://downloads.apache.org/cassandra/KEYS | gpg --dearmor | sudo tee /usr/share/keyrings/cassandra.gpg > /dev/null
```

### Přidání repozitáře:

```bash
echo "deb [signed-by=/usr/share/keyrings/cassandra.gpg] https://downloads.apache.org/cassandra/debian 40x main" | sudo tee /etc/apt/sources.list.d/cassandra.list
```

### Aktualizace seznamu balíčků:

```bash
sudo apt update
```

---

## 4. Instalace Cassandra

```bash
sudo apt install cassandra -y
```

---

## 5. Spuštění a povolení služby

```bash
sudo systemctl start cassandra
sudo systemctl enable cassandra
```

Zkontroluj stav:

```bash
sudo systemctl status cassandra
```

---

## 6. Test základní funkčnosti

Spusť Cassandra shell (`cqlsh`):

```bash
cqlsh
```

Zobraz základní informace:

```sql
DESCRIBE keyspaces;
```

Vytvoř si vlastní keyspace (databázi):

```sql
CREATE KEYSPACE priklad
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
```

Opusť shell:

```sql
EXIT;
```

---

## 7. Shrnutí

Gratulujeme! Apache Cassandra je úspěšně nainstalována a připravena k použití jako NoSQL databázové úložiště.

---

## Co můžeš dělat dál?

- Vytvářet tabulky a vkládat data přes `cqlsh` nebo aplikace
- Monitorovat Cassandra pomocí nástrojů jako Prometheus + Grafana
- Nastavit víceserverové clustery pro škálování

Apache Cassandra je ideální řešení pro aplikace vyžadující extrémní výkon a vysokou dostupnost.
