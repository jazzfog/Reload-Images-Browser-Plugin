chrome.browserAction.onClicked.addListener(function (tab) {
		
	var message = {
		instruction: 'reloadFailedImages'
	};
	
	chrome.tabs.sendMessage(tab.id, message);
});