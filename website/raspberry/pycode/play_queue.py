#coding:utf-8
class PlayQueue:

	def __init__(self):
		self.head=None
		self.insert_pos=None

	def insert_music(self, url, info, by_user):
		music = Node(url, info, by_user)
		if self.head is None:
			self.head = music
			music.before = music
			music.next = music
			if music.by_user:
				self.insert_pos = music
		else:
			if music.by_user:
				self.__insert_music(music, self.insert_pos)
				self.insert_pos = music
			else:
				tail=self.head.before
				self.__insert_music(music, tail)
				
	def __insert_music(self, music, pos):
		if pos is None:
			music.next=self.head
			music.before=self.head.before
			self.head=music
			return
		music.next=pos.next
		music.before=pos
		music.next.before=music
		music.before.next=music

	'''
	point to next music
	remove the music if it is added by the user and can only play once
	!!!update self.insert_pos
	'''
	def get_music_url(self):
		if self.head is None:	return None
		url = self.head.url
		if self.head.by_user:
			if self.head==self.insert_pos:
				self.insert_pos=None
			self.__remove_music(self.head)
		else:
			self.head=self.head.next
		return url

	def __remove_music(self, music):
		if music.before==music.next:
			self.head = None
			self.insert_pos = None
		else:
			if music==self.head:
				self.head = self.head.next
			music.before.next = music.next
			music.next.before = music.before

	def get_music_list(self):
		pos = self.head
		music_list = [[pos.url, pos.info, pos.by_user]]
		pos=pos.next
		while pos!=self.head:
			music_list.append([pos.url, pos.info, pos.by_user])
			pos = pos.next
		return music_list

class Node:

	def __init__(self, url, info, by_user):
		self.url = url
		self.info = info
		self.by_user = by_user
		self.before = None
		self.next = None

if __name__ == "__main__":
	que =PlayQueue()
	MUSIC_DIR = "/home/pi/KeChuang/dushenSB/music"
	que.insert_music("%s/黄祖波\ -\ 平凡之路\ -\ 铃声版.mp3" % MUSIC_DIR, ["平凡之路", "黄祖波"], False)
	que.insert_music("%s/金南玲\ -\ 逆流成河\ -\ 铃声版.mp3" % MUSIC_DIR, ["逆流成河", "金南玲"], True)
	que.insert_music("%s/田馥甄\ -\ 小幸运\ -\ 铃声版.mp3" % MUSIC_DIR, ["小幸运", "田馥甄"], False)
	print(que.get_music_url())
	que.insert_music("%s/庄心妍\ -\ 走着走着就散了\ -\ 铃声版.mp3" % MUSIC_DIR, ["走着走着就散了", "庄心妍"], True)
	print(que.get_music_url())
	print(que.get_music_url())
	print(que.get_music_url())
	print(que.get_music_url())
	print(que.get_music_url())
	print(que.get_music_url())
	print(que.get_music_url())
	print(que.get_music_list())