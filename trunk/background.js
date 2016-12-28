chrome.runtime.onInstalled.addListener(function() {
	// hide page action by default
	chrome.declarativeContent.onPageChanged.removeRules(undefined, undefined);

  // Set default blank status
  chrome.storage.sync.set({'blank': true}, function() {});
});

chrome.tabs.onCreated.addListener(function (tab) {
  // Check that a tab ID has been set
  if (!tab.id) {
    return
  }

  if (tab.url != "chrome://newtab/") {
    return
  }

  // Check the user's preference
	chrome.storage.sync.get('blank', function(items) {
    if (!items['blank']) {
      return
    }

    updateProps = {url: "newtab.htm"}
    chrome.tabs.update(tab.id, updateProps, function(tab) {})
  });
});
