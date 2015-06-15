var notificator = {
	
	boxId: 'imlnb',
	autoHideHandler: 0,
	
	opacity: .8,
	animationTime: 250,
	closeTimeout: 5000,
	
	
	show: function (text, autoHide) {
		
		autoHide = typeof autoHide === 'boolean' ? autoHide : true;
		
		var box = this.getBox();
		box.stop();
		
		box.find('.imlnbContent').text(text);
		
		box.animate({
			opacity: this.opacity
		}, this.animationTime);
		
		clearTimeout(this.autoHideHandler);
		
		if (autoHide) {
			this.autoHideHandler = setTimeout(function () {
				this.hide();
			}.bind(this), this.closeTimeout);
		}
		
		return this;
	},
	
	getIconBox: function () {
		return this.getBox().find('DIV.imlnbIcon');
	},
	
	setIcon: function (ident) {
		
		if (ident !== 'loader' && ident !== 'done' && ident !== 'warning') {
			console.error('Invalid icon identifier: ' + ident);
			return;
		}
		
		var imgUrl = chrome.extension.getURL('img/' + ident + '.gif');
		
		this.getIconBox().show();
		this.getIconBox().find('IMG').attr('src', imgUrl);
		
		return this;
	},
	
	hideIcon: function () {
		this.getIconBox().hide();
	},
	
	hide: function () {
		this.getBox().animate({
			opacity: 0
		},
		this.animationTime,
		function () {
			this.remove();
		});
	},
	
	getBox: function () {

		var box = $('#' + this.boxId);
		
		if (box.length) {
			return box;
		}
		
		return this.createBox();
	},
	
	isBoxVisible: function () {
		this.getBox().is(':visible');
	},
	
	createBox: function () {
		
		var element = $(
			'<div id="' + this.boxId + '"> \
			<div class="imlnbIcon">\
				<img src="/img/1x1.gif">\
			</div> \
			<div class="imlnbContent"></div>\
			</div>'
		);
		
		element.css({
			opacity: 0
		});
		
		var body = $('body');
		if (!body.length) {
			return null;
		}
		
		body.append(element);
		
		return element;
	}
};