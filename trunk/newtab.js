chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	document.title = request;
});

window.addEventListener('load', function() {

	chrome.tabs.getCurrent(function(tab) {
		chrome.pageAction.show(tab.id);
	});

	chrome.storage.sync.get({font: true, title: chrome.i18n.getMessage("default_title"), content: chrome.i18n.getMessage("default_content")}, function(items) {
		// set page title
		document.title = (items.title !== "") ?
			 items.title :
			'\u200E';

		var contentNode = document.getElementById('content');
		// set page content randomly
		var content = items.content.split('\n');
		contentNode.innerText = (content.length > 1) ?
			content[Math.floor(Math.random() * content.length)] :
			items.content;
		// style the page
		if(items.font) {
			contentNode.className = "f" + Math.floor(Math.random() * 14);
		}
	});

}, false);
