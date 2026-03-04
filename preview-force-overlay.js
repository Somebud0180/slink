(function forceSlinkOverlayForPreview() {
	const NAV_STORAGE_KEY = "slink_nav_history";
	const pathParts = window.location.pathname.split("/").filter((p) => p !== "");
	const currentSite = pathParts[0] || "Home";

	let fakePreviousSite = "PreviewPrevious";
	if (fakePreviousSite === currentSite) {
		fakePreviousSite = "PreviewPreviousSite";
	}

	localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify([fakePreviousSite]));

	const URL_STORAGE_KEY = "slink_url_history";
	localStorage.setItem(URL_STORAGE_KEY, JSON.stringify([window.location.href]));
})();
