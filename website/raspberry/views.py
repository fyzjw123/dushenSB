from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def index(request):
    if request.method == 'POST':
        return HttpResponse("Post")
    if request.method == 'GET':
        return HttpResponse("Get")
    else:
        return HttpResponse("else")
