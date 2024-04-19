# PeerPrep G7

### Ensure that the services can connect to mongoDB on your network when starting the service

## User Service
### Quick Start
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm install`.
5. Run User Service using `node server.js`.

### Complete User Service Guide: [User Service Guide](./user-service/README.md)

## Question Service
### Quick Start
1. Navigate to `cd question-service\backend`
2. Install npm packages using `npm install`
3. Run Question Service using `node index.js`.

## Matching Service
### Quick Start
1. Navigate to `cd matching-service`
2. Install npm packages using `npm install`
3. Run Question Service using `node index.js`.

## Collaboration Service
### Quick Start
1. Navigate to `cd collaboration-service/collaborative-editor-backend`
2. Install npm packages using `npm install`
3. Run Question Service using `node server.js`.

## Frontend Django Backend
### Quick Start
1. Ensure you have Python 3.10.2. You can download it [here](https://www.python.org/downloads/release/python-3102/).
2. Navigate to the `frontend` directory
3. Create the virtual environment with the command `python -m venv env`
4. Activate the environment with the command `source env/bin/activate`
5. Install dependencies with the command `pip install -r requirements.txt`
6. Run the frontend using `python manage.py runserver`
Use the command `deactivate` to exit the virtual environment when done.

## Frontend React Client
### Quick Start
1. Navigate to the `frontend` directory
2. Navigate to app `cd /frontend_app` directory
3. Install npm packages using `npm install`
4. Run the webpack using `npm run dev`
5. Access the frontend from your web browser at this url `http://127.0.0.1:8000/peerprep`