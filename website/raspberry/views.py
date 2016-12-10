from django.http import HttpResponse
from django.http import Http404
from django.http import HttpResponseBadRequest
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .pycode.core import Core

# Create your views here.


@csrf_exempt
def music(request):
    if request.method == 'GET':
        return HttpResponse("OK: GET")
    elif request.method == 'PUT':
        return HttpResponse("OK: PUT")
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
        return HttpResponse("OK: GET")
    else:
        return HttpResponseBadRequest("RequestError")
