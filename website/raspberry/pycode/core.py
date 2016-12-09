# -*- coding: <encoding name> -*-
from config import config_json


class Core:
    """core class, decorate many static functions"""

    @staticmethod
    def search_music(name):
        if len(name) == 0:
            return None
        else:

