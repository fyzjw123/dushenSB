import subprocess
from play_queue import PlayQueue
class Radio:
	@staticmethod
	def start_play():
		PlayQueue.insert_music();
		PlayQueue.insert_music();
		PlayQueue.insert_music();
		PlayQueue.insert_music();
		while(true){
			music = PlayQueue.get_head_music()
			__play_music(music)
		}

	@staticmethod
	def __play_music(url):
		p1 = subprocess.Popen(
			"sudo sox -t mp3 %s -t wav -" % url, 
			shell=True, 
			stdout=subprocess.PIPE
		)
        p2 = subprocess.Popen(
            "sudo pi_fm_rds -freq 80.0 -audio -",
            shell=True,
            stdin=self.p1.stdout,
            stdout=subprocess.PIPE
        )
        p1.wait()

	@staticmethod
	def add_music(url):
		PlayQueue.insert_music(url);