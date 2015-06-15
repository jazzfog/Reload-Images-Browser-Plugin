chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.instruction === 'reloadFailedImages') {
			reloadImages();
		}
	}
);

function isImageLoaded(img) {
	
	// Pull DOM element from jQuery object
	img = img.get(0);
	
	// Do not check extension images
	if (img.src.indexOf('chrome-extension://') !== -1) {
		return true;
	}
	
	if (!img.complete) {
		return false;
	}

	//noinspection RedundantIfStatementJS
	if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth == 0) {
		return false;
	}

	return true;
}

function reloadImages() {
	
	notificator.setIcon('loader').show('Loading...', false);

	var counterLoaded = 0;
	var counterFailed = 0;
	
	var failedImgArray = [];
	
	var images = $('IMG');
	
	// Get list of failed images
	$.each(images, function (key, img) {
		img = $(img);
		if (!isImageLoaded(img)) {
			failedImgArray.push(img);
		}
	});
	
	// Check for failed images
	if (!failedImgArray.length) {
		notificator.setIcon('done').show('Nothing to reload - all loaded');
		return;
	}
	
	// Show loading indicator
	var msg = failedImgArray.length === 1 ? 'Loading 1 image...' : 'Loading ' + failedImgArray.length + ' images...';
	notificator.show(msg, false);
	
	var onImgComplete = function (event) {
		
		// Increase one of the counters - `loaded` or `failed again`
		if (event.type === 'load') {
			counterLoaded++;
		} else if (event.type === 'error') {
			counterFailed++;
		}
		
		// Check are all of the images processed
		if (counterLoaded + counterFailed === failedImgArray.length) {
			
			if (counterFailed) {
				notificator.setIcon('warning').show('Loaded: ' + counterLoaded + ', Failed: ' + counterFailed + '. Try again.');
			} else {
				notificator.setIcon('done').show('All loaded');
			}
		}
	};
	
	// Trigger images reload
	$.each(failedImgArray, function (key, img) {
		img.one('load', onImgComplete);
		img.one('error', onImgComplete);
		img.attr('src', img.attr('src'));
	});
}

