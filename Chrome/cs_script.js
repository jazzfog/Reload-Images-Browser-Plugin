chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.instruction === 'reloadFailedImages') {
			reloadImages();
		}
	}
);

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
	
	notificator.setIcon('loader').show('Loading...', false);

	var images = getImages();
	
	var failedCounter = 0;
	var loadingCounter = 0;

	for (var i = 0; i < images.length; i++) {
		
		var img = images[i];
		
		if (!isImageLoaded(img)) {
			failedCounter++;
			
			//noinspection SillyAssignmentJS
			img.src = img.src; // Should trigger image reload
			
			img.addEventListener('load', function () {
				console.log('LOAD');
			});
			img.addEventListener('error', function () {
				console.log('ERROR');
			});
			
		}
	}
	
	if (failedCounter) {
		var msg = failedCounter === 1 ? 'Loading 1 image...' : 'Loading ' + failedCounter + ' images...';
		notificator.show(msg, false);		
	} else {
		notificator.setIcon('done').show('All done!');
	}
	
	//noinspection SillyAssignmentJS
	//img.src = img.src; // Should trigger image reload
	
}

