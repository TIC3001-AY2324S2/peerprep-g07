from django.urls import path
from frontend_app import views

urlpatterns = [
    path('peerprep/', views.render_frontend, name='peerprep_frontend'),
]
