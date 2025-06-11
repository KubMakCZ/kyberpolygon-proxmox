# Návod: Instalace Portainer na Debian Linux

**Portainer** je webové rozhraní pro správu Docker kontejnerů.  
Umožňuje snadnou správu kontejnerů, sítí, obrazů a svazků bez potřeby psaní příkazů.

---

## 1. Aktualizace systému

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalace Dockeru (pokud není nainstalován)

```bash
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
```

---

## 3. Stažení a spuštění Portaineru (CE verze)

```bash
sudo docker volume create portainer_data

sudo docker run -d -p 8000:8000 -p 9443:9443   --name portainer   --restart=always   -v /var/run/docker.sock:/var/run/docker.sock   -v portainer_data:/data   portainer/portainer-ce:latest
```

---

## 4. Přístup do webového rozhraní

Otevři v prohlížeči:

```
https://IP_adresa_serveru:9443
```

Můžeš obdržet varování kvůli samopodepsanému SSL certifikátu – potvrď výjimku.

---

## 5. První přihlášení

- Nastav administrátorské heslo
- Vyber správu místního Docker prostředí („local“)
- Pokračuj do dashboardu

---

## 6. Co můžeš v Portaineru dělat?

- Spouštět nové kontejnery
- Spravovat běžící instance
- Vytvářet sítě a svazky
- Spravovat Docker image
- Nastavovat stacky, šablony, uživatele

---

## 7. Shrnutí

Gratulujeme! Portainer je nainstalován a připraven spravovat tvé kontejnery.

---

## Co můžeš dělat dál?

- Připojit vzdálené Docker hosty
- Nastavit uživatele, oprávnění a týmy
- Vytvářet šablony pro vlastní aplikace
- Používat se Swarm nebo Kubernetes backendem

Portainer výrazně zjednodušuje správu Docker prostředí pro začátečníky i pokročilé.
