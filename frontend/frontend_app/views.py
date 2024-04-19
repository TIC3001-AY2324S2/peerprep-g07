from django.shortcuts import render
import requests
from dotenv import load_dotenv
import os

load_dotenv() 

QUESTION_SERVICE_ENDPOINT =  os.getenv('QUESTION_SERVICE_ENDPOINT')

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