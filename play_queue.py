class PlayQueue:

	head = None
	insert_pos = None

	@staticmethod
	def insert_music(url, by_user):
		music = Node(url, by_user)
		if head == None:
			head = music
			insert_pos = music
			music.before = music
			music.next = music
		else:
			if music.by_user:
				if insert_pos==head:
					head=music
				__insert_music(music, insert_pos)
			else:
				tail=head.before
				__insert_music(music, tail)
				

	@staticmethod
	def __insert_music(music, pos):
		music.next=pos.next
		music.before=pos
		music.next.before=music
		music.before.next=music

	'''
	point to next music
	remove the music if it is added by the user and can only play once
	'''
	@staticmethod
	def get_music():
		if head == None:	return None
		url = head.url
		if head.by_user:
			__remove_music(head)
		return url

	
	@staticmethod
	def __remove_music(music):
		if music.before==music.next:
			head = None
			insert_pos = None
		else:
			music.before.next = music.next
			music.next.before = music.before 
			if music==head:
				head = head.next


class Node:

	def __init__(self, url, by_user):
		self.url = url
		self.by_user = by_user
