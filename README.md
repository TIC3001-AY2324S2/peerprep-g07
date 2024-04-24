# PeerPrep G7

### Ensure that the services can connect to mongoDB on your network when starting the service

## User Service (1)
### Quick Start
1. Navigate to `cd user-service`
2. Install npm packages using `npm install`.
3. Run User Service using `node index.js`.

### Complete User Service Guide: [User Service Guide](./user-service/README.md)

## Question Service (2)
### Quick Start
1. Navigate to `cd question-service\backend`
2. Install npm packages using `npm install`
3. Run Question Service using `node index.js`.

## Matching Service (3)
### Quick Start
1. Navigate to `cd matching-service`
2. Install npm packages using `npm install`
3. Run Question Service using `node index.js`.

## Collaboration Service (4)
### Quick Start
1. Navigate to `cd collaboration-service/collaborative-editor-backend`
2. Install npm packages using `npm install`
3. Run Question Service using `node server.js`.

## Frontend Django Backend (5)
### Quick Start
1. Ensure you have Python 3.10.2. You can download it [here](https://www.python.org/downloads/release/python-3102/).
2. Navigate to the `cd frontend` directory
3. Create the virtual environment with the command `python -m venv env`
4. Activate the environment with the command `source env/bin/activate`(Linux) or `.\env\Scripts\Activate`(Windows)
5. Install dependencies with the command `pip install -r requirements.txt`
6. Run the frontend using `python manage.py runserver`
Use the command `deactivate` to exit the virtual environment when done.

## Frontend React Client (6)
### Quick Start
1. Navigate to app `cd frontend/frontend_app` directory
2. Install npm packages using `npm install`
3. Run the webpack using `npm run dev`
4. Access the frontend from your web browser at this url `http://127.0.0.1:8000/peerprep`

## Rabbit MQ (7)
Run Rabbit MQ
### Quick Setup and Installation

1. Pull the official RabbitMQ image from Docker Hub:

   ```
   docker pull rabbitmq:3-management
   ```

2. Run a RabbitMQ container with the management plugin enabled:

   ```
   docker run -d --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```

   The management plugin provides a web-based UI for managing and monitoring the RabbitMQ server. You can now access the RabbitMQ management dashboard in your web browser at http://localhost:15672. Use the default credentials: username "guest" and password "guest".

