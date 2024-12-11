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

document.addEventListener('DOMContentLoaded', () => {
    const countryButtons = {
        dubai: document.getElementById('btn-dubai'),
        india: document.getElementById('btn-india')
    };

    const locationInput = document.getElementById('location');
    const propertyTypeSelect = document.getElementById('property-type');
    const propertySubtypeDiv = document.getElementById('property-subtypes');
    const subtypeSelect = document.getElementById('property-subtype');
    const conditionalFilters = document.getElementById('conditional-filters');
    const sqftRangeDiv = document.getElementById('sqft-range');
    const bhkDiv = document.getElementById('bhk-options');
    const priceDisplay = document.getElementById('price-display');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');

    let country = 'dubai';

    // Update filter options dynamically based on the country
    function updateCountryFilters() {
        if (country === 'dubai') {
            locationInput.placeholder = 'Search properties in Dubai';
            propertyTypeSelect.innerHTML = `
                <option value="residential">Residential</option>
            `;
        } else {
            locationInput.placeholder = 'Search properties in India';
            propertyTypeSelect.innerHTML = `
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
            `;
        }
        clearFilters();
    }

    // Handle property type change
    propertyTypeSelect.addEventListener('change', () => {
        const propertyType = propertyTypeSelect.value;

        if (propertyType === 'residential') {
            if (country === 'dubai') {
                updateSubtypeOptions(['Flats', 'Apartments', 'Townhouses']);
            } else {
                updateSubtypeOptions(['Residential Lands', 'Flats', 'Villas', 'Apartments', 'Houses']);
            }
        } else if (propertyType === 'commercial' && country === 'india') {
            updateSubtypeOptions(['Farmhouse', 'Office Spaces', 'Rental Spaces', 'Factories', 'Godowns']);
        }
    });

    // Update subtypes dynamically
    function updateSubtypeOptions(options) {
        subtypeSelect.innerHTML = '';
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.toLowerCase();
            optionElement.textContent = option;
            subtypeSelect.appendChild(optionElement);
        });
        propertySubtypeDiv.style.display = 'block';
        conditionalFilters.style.display = 'block';
        setupSubTypeFilters(options);
    }

    // Set up filters based on the selected sub-type
    function setupSubTypeFilters(options) {
        if (country === 'dubai') {
            if (options.includes('Flats') || options.includes('Apartments') || options.includes('Townhouses')) {
                setupDubaiResidentialFilters();
            }
        } else {
            if (options.includes('Residential Lands')) {
                setupIndiaResidentialLandFilters();
            } else {
                setupIndiaResidentialFilters();
            }
        }
    }

    // Dubai Residential Filters
    function setupDubaiResidentialFilters() {
        sqftRangeDiv.style.display = 'block';
        bhkDiv.style.display = 'block';
        priceDisplay.textContent = 'Price Range (AED)';
    }

    // India Residential Land Filters
    function setupIndiaResidentialLandFilters() {
        sqftRangeDiv.style.display = 'none';
        bhkDiv.style.display = 'none';
        priceDisplay.textContent = 'Price Range (INR)';
    }

    // India Residential Filters
    function setupIndiaResidentialFilters() {
        sqftRangeDiv.style.display = 'block';
        bhkDiv.style.display = 'block';
        priceDisplay.textContent = 'Price Range (INR)';
    }

    // India Commercial Filters
    function setupIndiaCommercialFilters() {
        sqftRangeDiv.style.display = 'block';
        bhkDiv.style.display = 'none';
        priceDisplay.textContent = 'Price Range (INR)';
    }

    // Clear all filters
    function clearFilters() {
        propertySubtypeDiv.style.display = 'none';
        sqftRangeDiv.style.display = 'none';
        bhkDiv.style.display = 'none';
        conditionalFilters.style.display = 'none';
    }

    // Country button event listeners
    countryButtons.dubai.addEventListener('click', () => {
        country = 'dubai';
        updateCountryFilters();
    });

    countryButtons.india.addEventListener('click', () => {
        country = 'india';
        updateCountryFilters();
    });

    // Initialize with Dubai filters
    updateCountryFilters();
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
