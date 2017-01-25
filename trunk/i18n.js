/**
 * From https://bugs.chromium.org/p/chromium/issues/detail?id=115800# for supporting localization in HTML.
 *
 * Usage: <span data-i18n="message"/>
 */

document.addEventListener('DOMContentLoaded', function() {
	[].forEach.call(document.querySelectorAll('[data-i18n]'), function(el) {
		el.innerText = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
	});
});
