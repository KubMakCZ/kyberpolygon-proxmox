1. Vytvoř Ansible Control Node (LXC Kontejner):
    - Na jednom z tvých Proxmox nodů si vytvoř nový LXC kontejner. Můžeš použít nějakou lehkou distribuci jako Debian nebo Alpine.
    - V tomto kontejneru nainstaluj Ansible (apt update && apt install ansible nebo ekvivalent).
    - Nainstaluj i případné další potřebné nástroje nebo Ansible kolekce (např. pip install requests pokud budeš psát inventář v Pythonu, nebo kolekce pro notifikace ansible-galaxy collection install community.general).

2. Dynamický Inventář (Klíčová část):
    - Ansible potřebuje vědět, na které stroje (aktivní studentské VM) se má připojit. Protože se seznam VM bude neustále měnit, potřebuješ dynamický inventář.
    - Vytvoř skript (např. v Pythonu nebo Bashi) přímo uvnitř tvého Ansible LXC kontejneru.
    Tento skript:
        - Bude obsahovat přístupové údaje k Appwrite API (Project ID, API klíč s právem číst kolekci active_scenario_vms - ulož je bezpečně, např. jako proměnné prostředí nebo v konfiguračním souboru v kontejneru).
        - Připojí se k Appwrite API a načte seznam dokumentů z kolekce active_scenario_vms. Z těchto dokumentů získá potřebné informace, hlavně IP adresy aktivních VM. (Předpokládá to, že IP adresy se do této kolekce nějak dostanou - např. je tam zapíše Node.js backend po vytvoření VM, i když neprovede Ansible konfiguraci, nebo je zjistí guest agent).
        - Vygeneruje výstup ve formátu, kterému rozumí Ansible jako dynamický inventář (typicky JSON).

3. Ansible Playbook (check_updates.yml):
    - V Ansible kontejneru vytvoř playbook, jak jsme probírali – použije apt/dnf/yum moduly s check_mode: yes pro zjištění dostupných aktualizací.

4. Notifikace:
    - Do playbooku přidej úlohy, které se spustí podmíněně (když jsou nalezeny aktualizace) a použijí Ansible moduly (community.general.mail, community.general.slack, community.general.discord...) k odeslání zprávy adminům. API klíče k notifikačním službám ulož bezpečně v kontejneru (ideálně pomocí Ansible Vault).

5. SSH Přístup (Důležité):
    - Ansible LXC kontejner musí mít síťovou konektivitu ke všem potenciálním studentským VM.
    - Na studentských VM musí běžet SSH server a musí povolovat připojení z IP adresy Ansible LXC kontejneru.
    - Musíš vyřešit autentizaci. Nejlepší je použít SSH klíče:
        - Vygeneruj SSH klíč bez hesla v Ansible LXC kontejneru (ssh-keygen).
        - Veřejnou část tohoto klíče (id_rsa.pub) přidej do tvých "minimálních šablon" v Proxmoxu do souboru /root/.ssh/authorized_keys (nebo pro jiného uživatele, pod kterým se bude Ansible připojovat). Tím zajistíš, že Ansible kontejner se bude moci připojit k jakékoliv VM vytvořené z této šablony bez hesla. Privátní klíč zůstane bezpečně v Ansible kontejneru.
    - Poznámka: I když scénář "Instalace SSH" vyžaduje manuální instalaci, pro účely této automatické kontroly by SSH server a klíč musely být už v té "minimální šabloně" přítomny. Pokud bys chtěl kontrolovat i VM, kde studenti SSH teprve instalují, tato kontrola by na ně nefungovala, dokud SSH nenainstalují a nenakonfigurují (což je ale v pořádku). Kontrola by prostě přeskočila VM, ke kterým se nemůže připojit.

6. Naplánování (Cron):
    - Uvnitř Ansible LXC kontejneru nastav cron job, který jednou denně spustí tvůj Ansible playbook s použitím dynamického inventárního skriptu.
    - Příklad řádku v crontabu (např. pro spuštění každý den ve 3:00 ráno):
Fragment kódu
```bash
0 3 * * * /usr/bin/ansible-playbook -i /cesta/k/vasemu/dynamic_inventory_script.py /cesta/k/playbooku/check_updates.yml >> /var/log/ansible_update_check.log 2>&1
``` 
