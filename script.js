document.addEventListener("DOMContentLoaded", function () {
	console.log(
		"This website is a part of Slink! Learn more here https://github.com/Somebud0180/slink",
	);

	const pathParts = window.location.pathname.split("/").filter((p) => p !== "");
	const currentSite = pathParts[0] || "Home";

	let navHistory = JSON.parse(localStorage.getItem("slink_nav_history")) || [];

	const previousSite =
		navHistory.length > 0 ? navHistory[navHistory.length - 1] : null;

	if (previousSite && previousSite !== currentSite) {
		console.log("[Slink] Winding the slink");
		createOverlay();
	} else if (previousSite && previousSite === currentSite) {
		console.log("[Slink] Unwinding the slink");
		navHistory.pop(); // Remove current site from history
		localStorage.setItem("slink_nav_history", JSON.stringify(navHistory));
	}
});

// Call this before opening a new page to save the current site in history
function saveCurrentSite() {
	const pathParts = window.location.pathname.split("/").filter((p) => p !== "");
	const currentSite = pathParts[0] || "Home";

	navHistory.push(currentSite);

	if (navHistory.length > 5) {
		navHistory.shift();
	}

	localStorage.setItem("slink_nav_history", JSON.stringify(navHistory));
}

function createOverlay() {
	const overlay = document.createElement("div");
	overlay.id = "slink-overlay";
	overlay.style.position = "fixed";
	overlay.style.bottom = "0";
	overlay.style.left = "0";
	overlay.style.width = "100%";
	overlay.style.height = "4rem + env(safe-area-inset-bottom)";
	overlay.style.backgroundColor = "rgba(35, 26, 38, 0.8)";
	overlay.style.display = "flex";
	overlay.style.justifyContent = "space-between";
	overlay.style.alignItems = "center";
	overlay.style.zIndex = "9999";
	overlay.style.padding =
		"0.5rem 1rem calc(0.5rem + env(safe-area-inset-bottom)) 1rem";
	overlay.style.backdropFilter = "blur(10px)";

	const backButton = document.createElement("button");
	backButton.textContent = "← Back to " + previousSite;
	backButton.style.padding = "0.5rem 1rem";
	backButton.style.fontSize = "1rem";
	backButton.style.backgroundColor = "#fff";
	backButton.style.border = "none";
	backButton.style.borderRadius = "4px";
	backButton.style.cursor = "pointer";
	backButton.addEventListener("click", goBack);

	const title = document.createElement("div");
	title.textContent = currentSite;
	title.style.color = "#f3f3f3";
	title.style.fontSize = "2rem";

	const sideFooter = document.createElement("div");
	sideFooter.textContent = "© Somebud 2026";
	sideFooter.style.color = "#f3f3f3";
	sideFooter.style.fontSize = "0.8rem";

	overlay.appendChild(backButton);
	overlay.appendChild(title);
	overlay.appendChild(sideFooter);
	document.body.appendChild(overlay);
}

function goBack() {
	const navHistory =
		JSON.parse(localStorage.getItem("slink_nav_history")) || [];
	if (navHistory.length > 1) {
		navHistory.pop(); // Remove current site
		const previousSite = navHistory.pop(); // Get previous site
		localStorage.setItem("slink_nav_history", JSON.stringify(navHistory));
		window.location.href = `/${previousSite}`;
	} else {
		window.location.href = "/"; // Go to home if no history
	}
}
