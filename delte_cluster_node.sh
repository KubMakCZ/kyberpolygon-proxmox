systemctl stop pve-cluster corosync
pmxcfs -l
rm -R /etc/corosync/*
rm -R /etc/pve/nodes
killall pmxcfs
systemctl start pve-cluster