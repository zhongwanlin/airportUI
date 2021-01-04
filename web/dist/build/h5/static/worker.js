self.addEventListener('message', function (e) {
	let interval = null;
	if(e.data == "start") {
		interval = setInterval(() => {
			self.postMessage('倒计时');
		}, 1000);
	}
	if(e.data == "stop") {
		clearInterval(interval);
		self.close();
	}
}, false);