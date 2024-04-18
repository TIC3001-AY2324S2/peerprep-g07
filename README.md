# CS3219-AY22-23-Project-Skeleton

## Run containerised services

1. Navigate to the folder containing the `docker-compose.yaml` file
2. Run the command `docker-compose up -d`. This should spin up containers for User Service, Question Service, the Frontend application and MongoDB
3. Access the Peerprep site at `http://127.0.0.1:8000/peerprep`

## User Service

### Quick Start
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm install`.
5. Run User Service using `npm start`.

### Complete User Service Guide: [User Service Guide](./user-service/README.md)

## Question Service

### Quick Start
1. Install npm packages using `npm install`
2. Run Question Service using `npm run dev`.

## Matching Service

### Quick Start
1. Install npm packages using `npm install`
2. Pull the official RabbitMQ image from Docker Hub: `docker pull rabbitmq:3-management`
3. Run a RabbitMQ container with the management plugin enabled: `docker run -d --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management`
4. Run Matching Service using `npm run dev`.

## Frontend

### Quick Start
1. Ensure you have Python 3.10.2. You can download it [here](https://www.python.org/downloads/release/python-3102/).
2. Navigate to the `frontend` directory
3. Create the virtual environment with the command `python3 -m venv env`
4. Activate the environment with the command `source env/bin/activate`
5. Install dependencies with the command `pip install -r requirements.txt`
6. Run the frontend using `python manage.py runserver`
7. Access the frontend from your web browser at this url `http://127.0.0.1:8000/peerprep`
8. Use the command `deactivate` to exit the virtual environment when done.
