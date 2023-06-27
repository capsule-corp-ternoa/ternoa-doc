---
sidebar_position: 2
---

# Install Ternoa

## Validator node quickstart 

There are two ways to run a Ternoa node:
- For a quick setup follow the steps below
- For a more detailed look into running Ternoa nodes, view our guide **[here](https://docs.ternoa.network/for-node-operators/how-to-run-a-validator-node)**

**To install Ternoa, use this command line:**
```bash 
curl -sf -L https://packages.ternoa.network/ternoa/installer -o installer.sh
sudo chmod +x installer.sh
sudo ./installer.sh
```

We've created a script for easy setup.

## Installed

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

For more detailed instructions, view our workshop on setting up a validator node **[here](https://docs.ternoa.network/for-node-operators/how-to-run-a-validator-node)**. 