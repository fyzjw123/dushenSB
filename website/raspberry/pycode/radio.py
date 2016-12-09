#coding:utf-8
import threading
import time
import subprocess
from play_queue import PlayQueue

MUSIC_DIR = "/home/pi/KeChuang/dushenSB/music"

class Radio:

	def __init__(self):
		self.play_queue=PlayQueue()
		self.play_queue.insert_music("%s/黄祖波\ -\ 平凡之路\ -\ 铃声版.mp3" % MUSIC_DIR, "平凡之路", False);
		self.play_queue.insert_music("%s/金南玲\ -\ 逆流成河\ -\ 铃声版.mp3" % MUSIC_DIR, "逆流成河", False);
		self.play_queue.insert_music("%s/田馥甄\ -\ 小幸运\ -\ 铃声版.mp3" % MUSIC_DIR, "小幸运", False);
		self.play_queue.insert_music("%s/庄心妍\ -\ 走着走着就散了\ -\ 铃声版.mp3" % MUSIC_DIR, "走着走着就散了", False);
		threading.Thread(target = self.__start_play, name = "Radio.__start_play").start()

	def __start_play(self):
		while True:
			music = self.play_queue.get_music()
			print(music)
			self.__play_music(music)

	def __play_music(self, url):
		p1 = subprocess.Popen("sudo sox -t mp3 %s -t wav -" % url, 
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
		url, music's url
		name, music's name
		by_user, true of false
	'''
	def add_music(self, url, name, by_user):
		self.play_queue.insert_music(url, name, by_user)

	'''
	Output:
		array of [music_url, music_name]
	'''
	def get_music_list(self):
		return self.play_queue.get_music_list()


if __name__ == "__main__":
	radio = Radio()
	print(radio.get_music_list())
	radio.add_music("www.djfe.com/jd.mp3", "hello123", True)