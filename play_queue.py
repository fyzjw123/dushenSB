class PlayQueue:

	def __init__(self):
		self.head=None
		self.insert_pos=None

	def insert_music(self, url, by_user):
		music = Node(url, by_user)
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
	def get_music(self):
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

class Node:

	def __init__(self, url, by_user):
		self.url = url
		self.by_user = by_user
		self.before = None
		self.next = None

if __name__ == "__main__":
	que =PlayQueue()
	que.insert_music("a",False)
	que.insert_music("b",False)
	que.insert_music("c",True)
	print(que.get_music())
	que.insert_music("d",False)
	print(que.get_music())
	que.insert_music("e",True)
	print(que.get_music())
	print(que.get_music())
	print(que.get_music())
	print(que.get_music())
	print(que.get_music())
	print(que.get_music())