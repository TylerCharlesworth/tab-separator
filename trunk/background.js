chrome.runtime.onInstalled.addListener(function() {
// hide page action by default
	chrome.declarativeContent.onPageChanged.removeRules(undefined, undefined);
});

chrome.tabs.onCreated.addListener(function(tab) {
	// if tab is initialized and is new tab page
	if(tab.id && tab.url == "chrome://newtab/") {
		// don't update if user has temporarily disabled
		chrome.storage.local.get('disabled', function(items) {
			if(!items['disabled']) {
				chrome.tabs.update(tab.id, {url: "newtab.htm"})
			}
		});


		setTimeout(function() {
			chrome.pageAction.show(tab.id);
		}, 100);
	}
});
