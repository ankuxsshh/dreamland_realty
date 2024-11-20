document.addEventListener('DOMContentLoaded', () => {
  const locationBtn = document.querySelector('.location-btn')
  const barsBtn = document.querySelector('.bars-btn')
  const overlay = document.querySelector('.overlay')
  const locationContainer = document.querySelector('.location-container')
  const filterContainer = document.querySelector('.filter-container')
  const closeFilterBtn = document.getElementById('clear-filter')

  // Helper function to toggle visibility of a container with overlay effect
  function toggleOverlay(container) {
    container.classList.toggle('active')
    overlay.classList.toggle('active')
  }

  // Location button click event
  locationBtn.addEventListener('click', () => toggleOverlay(locationContainer))

  // Filter button click event
  barsBtn.addEventListener('click', () => toggleOverlay(filterContainer))

  // Close filter when 'Clear' button is clicked
  closeFilterBtn.addEventListener('click', () => {
    filterContainer.classList.remove('active')
    overlay.classList.remove('active')
  })

  // Close any open overlay when the background overlay is clicked
  overlay.addEventListener('click', () => {
    document.querySelectorAll('.active').forEach((container) => container.classList.remove('active'))
    overlay.classList.remove('active')
  })
})

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
