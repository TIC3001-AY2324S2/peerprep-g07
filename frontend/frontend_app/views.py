from django.shortcuts import render
import requests

# QUESTION_SERVICE_ENDPOINT = 'http://localhost:8080/api/questions'
QUESTION_SERVICE_ENDPOINT = 'http://localhost:8765/question-service/api/questions'

def render_frontend(request):
    response = requests.get(QUESTION_SERVICE_ENDPOINT)
    if response.status_code == 200:
        data = response.json()
        for item in data:
            item['id'] = item['_id']
    else:
        print(f'Error occurred connecting to question-service API: {response.status_code}')
        print(response)
        
    return render(request, 'peerprep.html', {'questions': data})