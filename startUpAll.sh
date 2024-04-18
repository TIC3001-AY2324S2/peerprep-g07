# Prerequisites
# 1. Please have java installed
# 2. Run it in this directory

# To Run:
# 1: chmod +x startUpAll.sh
# 2: ./startUpAll.sh

#!/bin/bash


# Command 1: Run the service-discovery
echo "Running Command 1: java -jar service-discovery-0.0.1-SNAPSHOT.jar"
java -jar ./service-discovery/service-discovery-0.0.1-SNAPSHOT.jar &

# Command 2: Run the api-gateway
echo "Running Command 2: java -jar api-gateway-0.0.1-SNAPSHOT.jar"
java -jar ./api-gateway/api-gateway-0.0.1-SNAPSHOT.jar &

# Command 3: Start Docker Compose in detached mode
echo "Running Command 3: docker-compose up -d"
docker-compose up -d