# -*- coding: utf-8 -*-
from .config import config_json
from .radio import Radio
import requests
import re


class Core:
    """core class, decorate many static functions"""

    # unique music queue
    queue = Radio()

    def __init__(self):
        raise Exception("Cannot Init")

    @staticmethod
    def search_sogou_music(name):
        if len(name) == 0:
            return None
        else:
            req_url = (config_json['sogou_head_link'] +
                       config_json['sogou_search_link'] % name)
            response = requests.get(req_url, timeout=1)
            response.encoding = response.apparent_encoding
            res_data = response.text

            link_regex = re.compile('linkPre: \"(.*?)\"')
            pageNum_regex = re.compile('pageNum: (\d*)')

            link_list = link_regex.findall(res_data)
            pageNums = pageNum_regex.findall(res_data)
            page = 1

            if len(link_list) != len(pageNums):
                return None

            music_list = {"musics": []}
            req_url = config_json['sogou_head_link'] + \
                link_list[0] + "&page=%d" % page
            response = requests.get(req_url, timeout=1)
            response.encoding = response.apparent_encoding
            res_data = response.text

            music_link_regex = re.compile('#(http://.*?)#')
            song_info_regex = re.compile('title=\"(.*?)\"')

            music_links = music_link_regex.findall(res_data)
            song_infos = song_info_regex.findall(res_data)

            if len(music_links) // 2 != len(song_infos) // 3:
                return None

            for i in range(len(music_links) // 2):
                song = {}
                song['type'] = 'sogou'
                song['link'] = music_links[i * 2]
                song['title'] = song_infos[i * 3]
                song['singer'] = song_infos[1 + i * 3]
                song['album'] = song_infos[2 + i * 3]

                music_list['musics'].append(song)
            return music_list

    @staticmethod
    def add_music(music):
        t = music['type']
        if t == 'sogou':
            Core.queue.add_music(url=music['link'], by_user=True, info=music)
            return True
        else:
            return False

    @staticmethod
    def get_music_list():
        music_list = Core.queue.get_music_list()
        music_list_obj = {"musics": []}
        for music in music_list:
            music_obj = {}
            music_obj['link'] = music[0]
            music_obj["title"] = music[1]['title']
            music_obj['type'] = music[1]['type']
            music_obj['singer'] = music[1]['singer']
            music_obj['album'] = music[1]['album']
            music_list_obj['musics'].append(music_obj)
        return music_list
