# Teorie

## co je potřeba mít

- Proxmox servery
- NAS uložiště pro ISO & CT Templates
- síťově prvky


### proxmox

- musí mít 2 uložiště
  - pro Disk images
  - Ceph pro HA
- HA
- Cluster
- při VM proxmoxu použít `--cpu host`
- v datacenter v options -> HA options na **shutdown-policy=MIGRATE**
  - pak máme možnosti při vypnutí proxmox node (třeba kvůli aktualizacím) tak přesunout virtuálku na jiný node a tím "nezabít" VM

### NAS

- TrueNAS nebo OpenMediaVault
- jaky share? SMB nebo NFS
  - nfs potřebuje opravnění a manualní nastavení protože proxmox používá root 
- NAS na uložiště ISO a CT kontejnerů 


### sítové prvky

-  Ubiquiti UniFi Switch Enterprise XG 24 