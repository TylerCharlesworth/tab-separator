chrome.runtime.onInstalled.addListener(function() {
	// hide page action by default
	chrome.declarativeContent.onPageChanged.removeRules(undefined, undefined);
});