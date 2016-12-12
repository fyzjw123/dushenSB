#coding:utf-8
import threading
import time
import subprocess
from .play_queue import PlayQueue
import os

MUSIC_DIR = "/home/pi/KeChuang/dushenSB/music"

init_music = [
	["黄祖波\ -\ 平凡之路\ -\ 铃声版.mp3", "平凡之路", "黄祖波", "后会无期"],
	["金南玲\ -\ 逆流成河\ -\ 铃声版.mp3", "逆流成河", "金南玲", "来生"],
	["田馥甄\ -\ 小幸运\ -\ 铃声版.mp3", "小幸运", "田馥甄", "我的少女时代"],
	["庄心妍\ -\ 走着走着就散了\ -\ 铃声版.mp3", "走着走着就散了", "庄心妍", "走着走着就散了"]
]
class Radio:

	def __init__(self):
		self.play_queue=PlayQueue()
		self.playing_music=None
		for music in init_music:
			link = os.path.join(MUSIC_DIR, music[0])
			info = {
				'type':'local',
				'title':music[1],
				'singer':music[2],
				'album':music[3],
				'link':link
			}
			self.add_music(link, info, False)
		threading.Thread(target = self.__start_play, name = "Radio.__start_play").start()

	def __start_play(self):
		while True:
			self.playing_music = self.play_queue.get_music()
			self.__play_music(self.playing_music[0])

	def __play_music(self, url):
		p1 = subprocess.Popen("sudo ffmpeg -i %s -f wav pipe:" % url,
			shell=True, 
			stdout=subprocess.PIPE)
		p2 = subprocess.Popen("sudo pi_fm_rds -freq 80.0 -audio -", 
			shell=True, 
			stdin=p1.stdout, 
			stdout=subprocess.PIPE)
		p1.wait()
		p2.wait()

	'''
	Input:
		url, url of music
		info, [name, title, ...]
		by_user, true of false
	'''
	def add_music(self, url, info, by_user):
		self.play_queue.insert_music(url, info, by_user)

	'''
	Output:
		array of [url, info, by user]
		url is url of music
		info is raw data like [name, title, url...]
		by user is true or false
	'''
	def get_music_list(self):
		music_list = self.play_queue.get_music_list()
		if self.playing_music is not None:
			music_list.insert(0, self.playing_music)
		return music_list


if __name__ == "__main__":
	radio = Radio()
	print(radio.get_music_list())