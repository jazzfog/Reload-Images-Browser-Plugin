chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	// console.log("Content script: message received", request);
	if (request.instruction === 'reloadFailedImages') {
		// console.log("Content script: reloadImages function called");
		reloadImages();
		sendResponse({
			status: 'success'
		}); // Ensure this line is executed
	} else {
		sendResponse({
			status: 'unknown instruction'
		});
	}
});


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

	let counterLoaded = 0;
	let counterFailed = 0;

	const failedImgArray = [];

	const images = $('IMG');

	// Get list of failed images
	$.each(images, (key, img) => {
		img = $(img);
		if (img.attr('src') && !isImageLoaded(img)) {
			failedImgArray.push(img);
		}
	});

	// Check for failed images
	if (!failedImgArray.length) {
		notificator.setIcon('done').show('Nothing to reload - all loaded');
		return;
	}

	// Show loading indicator
	const msg = failedImgArray.length === 1 ? 'Loading 1 image...' : `Loading ${failedImgArray.length} images...`;
	notificator.show(msg, false);

	const onImgComplete = (event) => {
		// Increase one of the counters - `loaded` or `failed again`
		if (event.type === 'load') {
			counterLoaded++;
		} else if (event.type === 'error') {
			counterFailed++;
		}

		// Check are all of the images processed
		if (counterLoaded + counterFailed === failedImgArray.length) {
			if (counterFailed) {
				notificator.setIcon('warning').show(`Loaded: ${counterLoaded}, Failed: ${counterFailed}. Try again.`);
			} else {
				notificator.setIcon('done').show('All loaded');
			}
		}
	};

	// Trigger images reload
	$.each(failedImgArray, (key, img) => {
		img.one('load', onImgComplete);
		img.one('error', onImgComplete);
		img.attr('src', img.attr('src'));
	});
}
