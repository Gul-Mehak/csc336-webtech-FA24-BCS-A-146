// Task 3 - Live Search, Price Sorting and Premium Badges

const searchInput = document.getElementById("searchInput");
const sortButton = document.getElementById("sortButton");
const productGrid = document.querySelector(".product-grid");
const noProducts = document.getElementById("noProducts");

const products = Array.from(productGrid.children);

let ascending = true;

// Get price from existing product card
function getPrice(product) {
	const priceText = product.querySelector(".card-text").textContent;

	// Remove Rs., commas and other non-numeric characters
	const price = priceText.replace(/[^0-9]/g, "");

	return Number(price);
}

// Update visible products using search and category together
function updateProducts() {
	const searchText = searchInput.value.toLowerCase().trim();

	const selectedCategory = document.querySelector(
		'input[name="category"]:checked'
	).id;

	let visibleCount = 0;

	products.forEach(function(product) {
		const productName = product.querySelector(".card-title")
			.textContent.toLowerCase();

		const matchesSearch = productName.includes(searchText);

		const matchesCategory = selectedCategory === "all" ||
			product.classList.contains(selectedCategory);

		// JavaScript handles search only.
		// Task 1 CSS still handles category filtering.
		product.classList.toggle("search-hidden", !matchesSearch);

		if (matchesSearch && matchesCategory) {
			visibleCount++;
		}
	});

	// Show message instead of grid if nothing matches
	const noMatches = visibleCount === 0;

	productGrid.hidden = noMatches;
	noProducts.hidden = !noMatches;
}

// Search as user types
searchInput.addEventListener("input", updateProducts);

// Update message when category changes
document.querySelectorAll('input[name="category"]').forEach(function(radio) {
	radio.addEventListener("change", updateProducts);
});

// Sort existing product cards by price
sortButton.addEventListener("click", function() {
	products.sort(function(a, b) {
		if (ascending) {
			return getPrice(a) - getPrice(b);
		}

		return getPrice(b) - getPrice(a);
	});

	products.forEach(function(product) {
		productGrid.appendChild(product);
	});

	ascending = !ascending;

	updateProducts();
});

// Add Premium badge to products above Rs. 4600
products.forEach(function(product) {
	if (getPrice(product) > 4600) {
		const badge = document.createElement("span");

		badge.className = "premium-badge";
		badge.textContent = "Premium";

		product.querySelector(".card-body").prepend(badge);
	}
});

// Initial update
updateProducts();