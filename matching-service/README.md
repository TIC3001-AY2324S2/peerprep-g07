# Matching Service Guide

## Setting-up

1. The `.env` file has set the service port to 3002. If you wish to change the port number, please update the `.env` file.

2. No other extra setup is needed.

## Running Matching Service

1. Install npm packages using `npm install`

2. Pull the official RabbitMQ image from Docker Hub: `docker pull rabbitmq:3-management`

3. Run a RabbitMQ container with the management plugin enabled: `docker run -d --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management`

4. Run Matching Service using `npm run dev`.

## Matching Service API Guide

### Find a match

- Publishes user data to a queue and returns the user data for matched users if a match is found

- HTTP Method: `POST`

- Endpoint: http://localhost:3002/match

- Body: Required: userId (string), username (string), topic (string), difficulty (string)

```json
{
    "userId": "susan123",
    "username": "susan",
    "topic": "Algorithms",
    "difficulty": "Easy"
}
```