# Teorie

## co je potřeba mít

- Proxmox servery
- NAS uložiště pro ISO & CT Templates
- síťově prvky


### proxmox

- musí mít 2 uložiště
  - pro Disk images
  - ZFS pro HA
- HA
- Clusters
- při VM proxmoxu použít `--cpu host`

### NAS

- TrueNAS
- jaky share? SMB nebo NFS
  - nfs potřebuje opravnění a manualní nastavení protože proxmox používá root 


### sítové prvky

- jake prvky?
  - routery
  - switche
  - AP
  - firewally
  - NVR?
- jake značky
  - UNIFI
  - turris
  - microtik
  - cisco