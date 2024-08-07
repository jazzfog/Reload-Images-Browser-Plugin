chrome.action.onClicked.addListener((tab) => {
	console.log("Background script: action clicked");

	chrome.tabs.sendMessage(tab.id, {
		instruction: 'reloadFailedImages'
	}, (response) => {
		if (chrome.runtime.lastError) {
			console.error("Error in background script:", chrome.runtime.lastError);
		} else {
			console.log("Background script: message sent, response:", response);
		}
	});
});
