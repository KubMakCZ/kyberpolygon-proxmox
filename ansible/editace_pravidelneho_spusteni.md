# Spustit kontrolu a aktualizaci Proxmox nodů každý den v 3:05
`crontab -e`
 ⬇️
`5 3 * * * cd /kyberpolygon-proxmox/ansible && /usr/bin/ansible-playbook -i /kyberpolygon-proxmox/ansible/appwrite_inventory.py /kyberpolygon-proxmox/ansible/update_proxmox.yml >> /var/log/ansible_proxmox_update.log 2>&1`