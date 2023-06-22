---
sidebar_position: 2
---

# Install Ternoa

## How to setup validator node ? 

Once you choose your cloud service provider and set-up your new server, the first thing you will do is install Ternoa.

**To install Ternoa, use this command line:**
```bash 
curl -sf -L https://packages.ternoa.network/ternoa/installer -o installer.sh
sudo chmod +x installer.sh
sudo ./installer.sh
```

We've created a script for easy set-up.

## Installed 🎉

Once Ternoa is installed, let’s check to make sure that it’s working correctly: 
```bash 
ternoa --version
```
You can also restart the Ternoa service using.
```bash 
systemctl restart ternoa 
```
or you if you would like to stop it, you should run : 
```bash 
systemctl stop ternoa
```
to troubleshoot, and check the logs in real-time, you can run the following command:
```bash 
journalctl -f -u ternoa.service
```

Binary installs are available in the following directory: **https://packages.ternoa.network/ternoa/**