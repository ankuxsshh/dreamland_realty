document.addEventListener('DOMContentLoaded', () => {
  const locationBtn = document.querySelector('.location-btn');
  const barsBtn = document.querySelector('.bars-btn');
  const locationOverlay = document.querySelector('.location-overlay');
  const filterOverlay = document.querySelector('.filter-overlay');
  const closeFilterBtn = document.getElementById('clear-filter');
  const locationContainer = document.querySelector('.location-container');
  const filterContainer = document.querySelector('.filter-container');

  // Toggle visibility of a container with its respective overlay
  function toggleOverlay(overlay, container) {
    overlay.classList.toggle('active');
    container.classList.toggle('active');
  }

  // Close overlay and container
  function closeOverlay(overlay, container) {
    overlay.classList.remove('active');
    container.classList.remove('active');
  }

  // Event Listeners
  locationBtn.addEventListener('click', () => toggleOverlay(locationOverlay, locationContainer));
  barsBtn.addEventListener('click', () => toggleOverlay(filterOverlay, filterContainer));

  // Close Filter when 'Clear' button is clicked
  closeFilterBtn.addEventListener('click', () => closeOverlay(filterOverlay, filterContainer));

  // Close Location Overlay on clicking the overlay
  locationOverlay.addEventListener('click', (event) => {
    if (event.target === locationOverlay) closeOverlay(locationOverlay, locationContainer);
  });

  // Close Filter Overlay on clicking the overlay
  filterOverlay.addEventListener('click', (event) => {
    if (event.target === filterOverlay) closeOverlay(filterOverlay, filterContainer);
  });
});


function initializeRangeSliders() {
  // Square Footage Elements
  const sqftDisplay = document.getElementById('sqft-display')
  const minSqft = document.getElementById('min-sqft')
  const maxSqft = document.getElementById('max-sqft')

  // Price Elements
  const priceDisplay = document.getElementById('price-display')
  const minPrice = document.getElementById('min-price')
  const maxPrice = document.getElementById('max-price')

  // Function to format numbers as currency
  function formatCurrency(value) {
    return `$${Number(value).toLocaleString()}`
  }

  // Function to update the display for square footage
  function updateSqftDisplay() {
    const min = parseInt(minSqft.value, 10)
    const max = parseInt(maxSqft.value, 10)

    // Ensure min does not exceed max
    if (min > max) minSqft.value = max
    sqftDisplay.textContent = `${minSqft.value} - ${maxSqft.value} sqft`
  }

  // Function to update the display for price range
  function updatePriceDisplay() {
    const min = parseInt(minPrice.value, 10)
    const max = parseInt(maxPrice.value, 10)

    // Ensure min does not exceed max
    if (min > max) minPrice.value = max
    priceDisplay.textContent = `${formatCurrency(minPrice.value)} - ${formatCurrency(maxPrice.value)}`
  }

  // Attach event listeners for Square Footage sliders
  minSqft.addEventListener('input', updateSqftDisplay)
  maxSqft.addEventListener('input', updateSqftDisplay)

  // Attach event listeners for Price sliders
  minPrice.addEventListener('input', updatePriceDisplay)
  maxPrice.addEventListener('input', updatePriceDisplay)

  // Clear filters and reset values
  document.getElementById('clear-filter').addEventListener('click', () => {
    minSqft.value = minSqft.min
    maxSqft.value = maxSqft.max
    minPrice.value = minPrice.min
    maxPrice.value = maxPrice.max
    updateSqftDisplay()
    updatePriceDisplay()
  })

  // Initial update of displays
  updateSqftDisplay()
  updatePriceDisplay()
}

document.addEventListener('DOMContentLoaded', initializeRangeSliders)

function handlePropertyTypeChange() {
  const propertyType = document.getElementById("property-type").value
  const propertySubtypes = document.getElementById("property-subtypes")
  const subtypeOptions = document.getElementById("subtype-options")

  // Clear previous options
  subtypeOptions.innerHTML = ""

  // Populate options based on selected property type
  let options = []
  if (propertyType === "residential") {
    options = ["Villas", "Apartments", "Independent Houses"]
  } else if (propertyType === "commercial") {
    options = ["Office", "Industries", "Shopping Complexes"]
  } else if (propertyType === "agriculture") {
    options = ["Land", "Farm Houses"]
  }

  // Display options dynamically
  options.forEach(option => {
    const checkbox = document.createElement("div")
    checkbox.className = "form-check form-check-inline"
    checkbox.innerHTML = `
      <input class="form-check-input" type="checkbox" value="${option}" id="${option.toLowerCase().replace(/\s+/g, '-')}">
      <label class="form-check-label" for="${option.toLowerCase().replace(/\s+/g, '-')}">${option}</label>
    `
    subtypeOptions.appendChild(checkbox)
  })

  // Show or hide the subtype section
  propertySubtypes.style.display = options.length > 0 ? "block" : "none"
}
