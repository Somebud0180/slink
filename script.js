// Slink - A linking overlay for my websites
/* Variables */
window.overlayPadding = "calc(4rem + env(safe-area-inset-bottom))";

let navHistory = JSON.parse(localStorage.getItem("slink_nav_history")) || [];
const pathParts = window.location.pathname.split("/").filter((p) => p !== "");
const currentSite = pathParts[0] || "Home";
const previousSite =
	navHistory.length > 0 ? navHistory[navHistory.length - 1] : null;

document.addEventListener("DOMContentLoaded", function () {
	console.log(
		"This website is a part of Slink! Learn more here https://github.com/Somebud0180/slink",
	);

	console.log(
		"[Slink] Debug Stats: " + navHistory.length + " " + navHistory.pop(),
	);

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
	overlay.style.height = overlayPadding;
	overlay.style.backgroundColor = "rgba(35, 26, 38, 0.8)";
	overlay.style.display = "flex";
	overlay.style.justifyContent = "space-between";
	overlay.style.alignItems = "center";
	overlay.style.zIndex = "9999";
	overlay.style.padding =
		"0.5rem 1rem calc(0.5rem + env(safe-area-inset-bottom)) 1rem";
	overlay.style.backdropFilter = "blur(10px)";
	overlay.style.transition = "transform 0.2s ease-out";

	const backButton = document.createElement("button");
	backButton.textContent = "← Back to " + previousSite;
	backButton.style.width = "fit-content";
	backButton.style.maxWidth = "35vw";
	backButton.style.textWrap = "auto";
	backButton.style.textAlign = "left";
	backButton.style.padding = "0.75rem";
	backButton.style.fontSize = "clamp(0.65rem, 1.5vw, 0.9rem)";
	backButton.style.background = "#f2d36b";
	backButton.style.color = "#1a1a1a";
	backButton.style.border = "none";
	backButton.style.borderRadius = "999px";
	backButton.style.cursor = "pointer";
	backButton.addEventListener("click", goBack);

	const title = document.createElement("div");
	title.style.position = "absolute";
	title.style.left = "50%";
	title.textContent = currentSite;
	title.style.color = "#f3f3f3";
	title.style.fontSize = "clamp(1rem, 2.5vw, 2rem)";
	title.style.fontWeight = "bold";

	const sideFooter = document.createElement("div");
	sideFooter.textContent = "© Somebud 2026";
	sideFooter.style.color = "#f3f3f3";
	sideFooter.style.fontSize = "clamp(0.45rem, 1.2vw, 0.65rem)";

	const toggleButton = document.createElement("button");
	toggleButton.style.width = "5rem";
	toggleButton.style.height = "1.8rem";
	toggleButton.style.position = "absolute";
	toggleButton.style.bottom = window.overlayPadding;
	toggleButton.style.right = "1rem";
	toggleButton.style.padding = "0.25rem 0.5rem";
	toggleButton.style.justifyContent = "center";
	toggleButton.style.border = "1px solid rgba(255, 255, 255, 0.16)";
	toggleButton.style.borderBottomWidth = "0";
	toggleButton.style.borderRadius = "0.6rem 0.6rem 0 0";
	toggleButton.style.background = "rgba(35, 26, 38, 0.8)";
	toggleButton.style.backdropFilter = "blur(10px)";
	toggleButton.style.cursor = "pointer";
	toggleButton.addEventListener("click", toggleOverlay);

	const toggleIcon = document.createElement("img");
	toggleIcon.className = "toggle-icon";
	toggleIcon.src = "chevron-down.png";
	toggleIcon.style.width = "1rem";
	toggleIcon.style.height = "1rem";
	toggleButton.appendChild(toggleIcon);

	overlay.appendChild(backButton);
	overlay.appendChild(title);
	overlay.appendChild(sideFooter);
	overlay.appendChild(toggleButton);
	document.body.appendChild(overlay);
}

function toggleOverlay() {
	const overlay = document.getElementById("slink-overlay");
	if (overlay.style.transform === `translateY(${window.overlayPadding})`) {
		const toggleIcon = this.querySelector(".toggle-icon");
		toggleIcon.src = "chevron-up.gif";
		overlay.style.transform = "translateY(0)";
	} else {
		const toggleIcon = this.querySelector(".toggle-icon");
		toggleIcon.src = "chevron-down.gif";
		overlay.style.transform = `translateY(${window.overlayPadding})`;
	}
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
