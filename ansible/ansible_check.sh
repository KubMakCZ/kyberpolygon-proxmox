export ANSIBLE_HOST_KEY_CHECKING=False
ansible-playbook -i inventory.yml update_proxmox.yml --check