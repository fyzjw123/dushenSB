# -*- coding: utf-8 -*-
from config import config_json
import requests
import re


class Core:
    """core class, decorate many static functions"""

    @staticmethod
    def search_sogou_music(name):
        if len(name) == 0:
            return None
        else:
            req_url = config_json['sogou_link'] % "name"
            response = requests.get(req_url, timeout=0.1)
            response.encoding = response.apparent_encoding
            res_data = response.text
            regex = re.compile()
