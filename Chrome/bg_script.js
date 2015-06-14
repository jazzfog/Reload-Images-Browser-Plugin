// Just to suppress IDE error reporting
if (typeof chrome === 'undefined') {
	var chrome = {};
}

chrome.browserAction.onClicked.addListener(function (tab) {
		
	var message = {
		instruction: 'reloadFailedImages'
	};
	
	chrome.tabs.sendMessage(tab.id, message);
});