#!/bin/bash

# Update the package manager and install necessary packages
sudo dnf update -y
sudo dnf module install -y nodejs:20 
sudo dnf install -y unzip

# Create a user for the application
sudo adduser csye6225 --user-group --shell /usr/sbin/nologin

# Define application directory
app_dir="/new/app"

# Create and navigate to the application directory
sudo mkdir -p "$app_dir"
cd "$app_dir"

# Extract the application files
sudo unzip -o /tmp/webapp.zip -d "$app_dir"

# Remove the temporary zip file
sudo rm /tmp/webapp.zip

# Set ownership of the application directory
sudo chown -R csye6225:csye6225 "$app_dir"
ls -al

# Install Node.js dependencies
sudo npm install

# Copy the systemd service file and reload systemd configuration
sudo cp /tmp/csye6225.service /etc/systemd/system/csye6225.service
sudo systemctl daemon-reload

# Enable the application service on boot
sudo systemctl enable csye6225.service

#Install ops agent 
sudo curl -O https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

# Copy the config yaml and restart google cloud ops agent
sudo cp /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml 

sudo chown -R csye6225:csye6225 /var/log/webapp