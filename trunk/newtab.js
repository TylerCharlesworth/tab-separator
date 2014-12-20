chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		document.title = request;
});

window.addEventListener('load', function () {

	chrome.tabs.getCurrent(function(tab) {
		chrome.pageAction.show(tab.id);
	});

	chrome.storage.sync.get({fun: false, def: '. . .'}, function (items) {
		if (items.fun) {
			document.getElementById('title').className = "f" + Math.floor(Math.random() * 15);
		}
		if(items.def !== "") document.title = items.def;
	});

}, false);
