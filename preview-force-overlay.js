(function forceSlinkOverlayForPreview() {
	const STORAGE_KEY = "slink_nav_history";
	const pathParts = window.location.pathname.split("/").filter((p) => p !== "");
	const currentSite = pathParts[0] || "Home";

	let fakePreviousSite = "PreviewPrevious";
	if (fakePreviousSite === currentSite) {
		fakePreviousSite = "PreviewPreviousSite";
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify([fakePreviousSite]));
})();
