function checkSelection() {
	chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
		var title = tabs[0].title;
		var defaults = document.getElementsByClassName("default");
		var i = 0;
		for(; i < defaults.length; i++) {
			if(defaults[i].getAttribute("longtext") === title) {
				var selected = defaults[i];
				selected.checked = "checked";
				selected.focus();
				disableCustom(title);
				break;
			}
		}
		if(i === defaults.length) { // no matching title found
			enableCustom(title);
		}
	});
}

/**
 * Update custom input field value but leave it "disabled"
 * @param title current string shown as page title
 */
function disableCustom(title) {
	document.getElementById("custominput").className = "disabled";
	document.getElementById("custominput").value = title;
}
/**
 * Update custom input field value and "enable" it for entry
 * @param title current string shown as page title
 */
function enableCustom(title) {
	document.getElementById("custom").checked = "checked";
	var custominput = document.getElementById("custominput");
	custominput.className = "";
	custominput.focus();
	if(title) custominput.value = title;
}

/**
 * Update current tab page title
 * @param title string to set as page title
 */
function setTitle(title) {
	console.log(title);
	var newtitle = title || chrome.i18n.getMessage("default_title");
	console.log(title);
	chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, newtitle);
	});
}
document.addEventListener('DOMContentLoaded', function() {

	// add extension id to the end of desired links
	[].forEach.call(document.getElementsByClassName("append_extension_id"), function(el) {
		el.href += chrome.i18n.getMessage("@@extension_id");
	});

	// links from the popup should open in the tab
	// preferred approach over adding target="_blank" to the links as this supports "chrome://" URLs
	window.addEventListener('click',function(e) {
		if(e.target.href!==undefined){
			chrome.tabs.update({url: e.target.href});
			window.close(); // close popup
		}
	});

	checkSelection();

	for(radio of document.getElementsByClassName("default")) {
		radio.addEventListener("change", function() {
			this.focus();
			var title = this.getAttribute("longtext");
			if(title) {
				setTitle(title);
				disableCustom(title);
			} else {
				enableCustom();
			}
		});
	}

	document.getElementById("custominput").addEventListener("focus", function() {
		enableCustom();
	});

	document.getElementById("custominput").addEventListener("blur", function() {
		window.setTimeout(function() {
			checkSelection();
		}, 200);
	});

	document.getElementById("custominput").addEventListener("keyup", function() {
		setTitle(this.value);
	});

	document.forms[0].addEventListener("submit", function() {
		window.close();
	});

});
