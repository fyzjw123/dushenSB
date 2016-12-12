from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from django.http import HttpResponseBadRequest
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .pycode.core import Core
import json

# Create your views here.


@csrf_exempt
def music(request):
    if request.method == 'GET':
        return HttpResponse("OK: GET")
    elif request.method == 'PUT':
        music_json = json.loads(request.body.decode("utf-8"))
        music_flag = Core.add_music(music_json['link'], music_json, True)
        if music_flag:
            info = {}
            info['type'] = music_json['type']
            info['status'] = '200'
            return JsonResponse(info)
        else:
            err = {}
            err['type'] = music_json['type']
            err['status'] = '500'
            return JsonResponse(err)
    else:
        return HttpResponseBadRequest("RequestError")


def search_music(request):
    if request.method == 'GET':
        music_name = request.GET.get("music_name")
        if music_name is not None:
            music_list = Core.search_sogou_music(music_name)
            if music_list is None:
                return Http404("Music Not Find.")
            else:
                return JsonResponse(music_list)
        else:
            return Http404("Music Not Find.")
    else:
        return HttpResponseBadRequest("RequestError")


def get_music_list(request):
    if request.method == 'GET':
        music_list = Core.get_music_list()
        return JsonResponse(music_list)
    else:
        return HttpResponseBadRequest("RequestError")


def get_main(request):
    if request.method == 'GET':
        return render(request, "raspberry/main.html", None)
    else:
        return HttpResponseBadRequest("RequestError")
