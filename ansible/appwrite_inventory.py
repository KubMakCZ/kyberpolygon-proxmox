#!/usr/bin/env python3

import os
import sys
import json
import argparse
from appwrite.client import Client
from appwrite.services.databases import Databases
from appwrite.query import Query
from dotenv import load_dotenv

# Načti proměnné z .env souboru do prostředí os.environ
load_dotenv() # <--- Zavolat tuto funkci zde


# --- Konfigurace ---
# Čtení z proměnných prostředí (nyní mohou pocházet z .env)
APPWRITE_ENDPOINT = os.environ.get('APPWRITE_ENDPOINT')
APPWRITE_PROJECT_ID = os.environ.get('APPWRITE_PROJECT_ID')
APPWRITE_API_KEY = os.environ.get('APPWRITE_API_KEY')

# ID vaší databáze a kolekce v Appwrite (může být také v .env a čteno přes os.environ.get)
DATABASE_ID = os.environ.get('APPWRITE_DATABASE_ID', 'HlavniDatabaze') # Příklad s výchozí hodnotou
COLLECTION_ID = os.environ.get('APPWRITE_COLLECTION_ID', 'active_scenario_vms') # Příklad

# Název skupiny v Ansible inventáři
ANSIBLE_GROUP_NAME = 'student_vms'
# --- Konec Konfigurace ---

def get_appwrite_client():
    """Inicializuje a vrátí Appwrite klienta."""
    if not all([APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY]):
        print("Chyba: Nastavte prosím proměnné prostředí APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID a APPWRITE_API_KEY.", file=sys.stderr)
        sys.exit(1)

    client = Client()
    client.set_endpoint(APPWRITE_ENDPOINT)
    client.set_project(APPWRITE_PROJECT_ID)
    client.set_key(APPWRITE_API_KEY)
    return client

def get_active_vms(databases):
    """Načte seznam aktivních VM s IP adresami z Appwrite."""
    vms = []
    try:
        # Pokusíme se načíst všechny dokumenty najednou (limit 100 je maximum per request)
        # Přidáváme dotazy pro filtrování: status musí být 'running' a ip_address nesmí být null nebo prázdná
        # Upravte 'status' a 'ip_address' podle skutečných názvů vašich atributů
        queries = [
            Query.equal('status', 'running'),
            Query.is_not_null('ip_address'),
            Query.not_equal('ip_address', '')
            # Query.limit(100) # Appwrite SDK by mělo zvládat stránkování automaticky u novějších verzí,
                               # ale pro jistotu nebo starší verze můžete přidat limit a řešit stránkování manuálně
        ]

        result = databases.list_documents(DATABASE_ID, COLLECTION_ID, queries=queries)
        vms.extend(result['documents'])

        # TODO: Implementovat stránkování, pokud máte více než 100 aktivních VM
        # a vaše verze SDK to neřeší automaticky. Budete potřebovat cyklus
        # a používat 'offset' nebo kurzorové stránkování, pokud je podporováno.

    except Exception as e:
        print(f"Chyba při komunikaci s Appwrite API: {e}", file=sys.stderr)
        sys.exit(1)
    return vms

def format_ansible_inventory(vms):
    """Formátuje data VM do struktury JSON pro Ansible."""
    inventory = {
        ANSIBLE_GROUP_NAME: {
            "hosts": [],
            # Zde můžete přidat výchozí proměnné pro celou skupinu
            # "vars": {
            #    "ansible_user": "vychozi_ssh_uzivatel"
            # }
        },
        "_meta": {
            "hostvars": {}
        }
    }

    for vm in vms:
        ip = vm.get('ip_address')
        if ip: # Přidáme jen pokud máme IP adresu
            inventory[ANSIBLE_GROUP_NAME]["hosts"].append(ip)
            # Přidáme další data jako host specifické proměnné (volitelné)
            inventory["_meta"]["hostvars"][ip] = {
                "appwrite_doc_id": vm['$id'],
                "proxmox_vm_id": vm.get('proxmox_vm_id'),
                "vm_name": vm.get('vm_name'),
                # Můžete přidat jakákoli další data z Appwrite dokumentu
            }
        else:
             print(f"Varování: VM s Appwrite ID {vm['$id']} nemá platnou IP adresu.", file=sys.stderr)


    # Pokud nemáme žádné hosty, vrátíme prázdnou strukturu, aby Ansible neselhal
    if not inventory[ANSIBLE_GROUP_NAME]["hosts"]:
         return {"_meta": {"hostvars": {}}}

    return inventory

def main():
    """Hlavní funkce pro zpracování argumentů a výpis inventáře."""
    parser = argparse.ArgumentParser(description='Appwrite Dynamic Inventory for Ansible')
    parser.add_argument('--list', action='store_true', help='List all active VMs')
    parser.add_argument('--host', help='Get variables for a specific host (nepoužito)')
    args = parser.parse_args()

    if args.list:
        client = get_appwrite_client()
        databases = Databases(client)
        vms = get_active_vms(databases)
        inventory_data = format_ansible_inventory(vms)
        print(json.dumps(inventory_data, indent=4))
    elif args.host:
        # Tuto část pro jednoduchost neimplementujeme, Ansible si proměnné vezme z _meta
        print(json.dumps({}))
    else:
        parser.print_help()
        sys.exit(1)

if __name__ == '__main__':
    main()