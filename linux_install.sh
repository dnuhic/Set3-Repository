#!/bin/bash
echo "Starting server setup"

echo "Checking for docker enviroment..."

if [ -x "$(command -v docker)" ]; then
    echo "Docker installed"    
else
    echo "Installing docker..."
    sudo apt-get install docker-engine -y
fi

if [ -x "$(command -v docker-compose)" ]; then
    echo "Docker-compose installed"    
else
    echo "Installing docker-compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose
fi

sudo docker-compose build
sudo docker-compose up
