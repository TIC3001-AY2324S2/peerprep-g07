# Question Service Guide

## Setting-up

1. The `.env` file has set the service port to 8080 and uses a local MongoDB URI. If you wish to change the port number or the MongoDB URI, please update the `.env` file.

2. No other extra setup is needed.

## Running Question Service

1. Open your Command Line Interface and navigate into the `question-service/backend` directory.

2. Run `npm install` to install all the necessary dependencies listed in the package.json file.

3. Run `npm dev run` to start the Question Service.

## Question Service API Guide

### Get One Question

- Retrieve data for one specific question from the database via the question ID.

- HTTP Method: `GET`

- Endpoint: http://localhost:8080/api/questions/:id

- Body: Not Required

- Example API call with sample id:
```
http://localhost:8080/api/questions/661cc57a673825c313856a50
```

### Get All Questions

- Retrieve the data of all the questions from the database.

- HTTP Method: `GET`

- Endpoint: http://localhost:8080/api/questions

- Body: Not Required


### Create Question

- Create a new question and its related data in the database.

- HTTP Method: `POST`

- Endpoint: http://localhost:8080/api/questions

- Body: Required: title (string), description (string), category (array), complexity (string)

```json
{
  "title": "SampleQuestion",
  "description": "Sample Question Description",
  "category": ["SampleCat1", "SampleCat2"],
  "complexity": "Easy"
}
```

### Update Question

- Update a specific question and its related data in the database via the question id.

- HTTP Method: `PUT`

- Endpoint: http://localhost:8080/api/questions/:id

- Example API call with sample id:
```
http://localhost:8080/api/questions/661cc57a673825c313856a50
```

- Body: Required: title (string), description (string), category (array), complexity (string)

```json
{
  "title": "SampleQuestion",
  "description": "Sample Question Description",
  "category": ["SampleCat1", "SampleCat2"],
  "complexity": "Easy"
}
```

### Delete Question

- Delete a question and its related data in the database via question id.

- HTTP Method: `DELETE`

- Endpoint: http://localhost:8080/api/questions/:id

- Body: Not Required

- Example API call with sample id:
```
http://localhost:8080/api/questions/661cc57a673825c313856a50
```

