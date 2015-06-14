
function getCurrentTab(callback) {

	var queryInfo = {
		active: true,
		currentWindow: true
	};

	//noinspection JSUnresolvedVariable
	chrome.tabs.query(queryInfo, function (tabs) {
		callback(tabs[0]);
	});
}

chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
		
	var message = {
		instruction: 'reloadFailedImages'
	};
	
	//noinspection JSUnresolvedVariable
	chrome.tabs.sendMessage(tab.id, message);
});