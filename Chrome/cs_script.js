function isImageLoaded(img) {

	if (!img.complete) {
		return false;
	}

	//noinspection RedundantIfStatementJS
	if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth == 0) {
		return false;
	}

	return true;
}

function getImages() {
	return document.getElementsByTagName('IMG');
}

function reloadImages() {

	var images = getImages();

	for (var i = 0; i < images.length; i++) {
		
		var img = images[i];
		
		if (!isImageLoaded(img)) {
			//noinspection SillyAssignmentJS
			img.src = img.src; // Should trigger image reload
		}
	}
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.instruction === 'reloadFailedImages') {
			
			//notificator.setIcon('loader').show('Loading...', false);
			//setTimeout(function () {
			//	notificator.setIcon('done').show('All loaded!');
			//}, 1000);
			
			notificator.setIcon('loader').show('Loading...');
			
			reloadImages();
		}
	}
);
