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

document.addEventListener('DOMContentLoaded', () => {
    const locationBtn = document.getElementById('btn-uae');
    const indiaBtn = document.getElementById('btn-india');
    const locationInput = document.getElementById('location');
    const propertyTypeSelect = document.getElementById('property-type');
    const propertySubtypesDiv = document.getElementById('property-subtypes');
    const subtypeOptionsDiv = document.getElementById('subtype-options');
    const priceDisplay = document.getElementById('price-display');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const sqftDisplay = document.getElementById('sqft-display');
    const minSqft = document.getElementById('min-sqft');
    const maxSqft = document.getElementById('max-sqft');
    const bhkDiv = document.getElementById('bhk-options');

    let country = 'UAE';

    // Event listeners for country buttons
    locationBtn.addEventListener('click', () => {
        country = 'UAE';
        updateLocationOptions();
    });

    indiaBtn.addEventListener('click', () => {
        country = 'India';
        updateLocationOptions();
    });

    // Update location-related options based on selected country
    function updateLocationOptions() {
        if (country === 'UAE') {
            propertyTypeSelect.innerHTML = `
                <option value="residential">Residential</option>
            `;
            locationInput.placeholder = "Search properties in UAE";
        } else if (country === 'India') {
            propertyTypeSelect.innerHTML = `
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
            `;
            locationInput.placeholder = "Search properties in India";
        }
    }

    // Handle property type change
    propertyTypeSelect.addEventListener('change', handlePropertyTypeChange);

    function handlePropertyTypeChange() {
        const propertyType = propertyTypeSelect.value;
        let options = [];

        if (propertyType === 'residential') {
            options = ['Villas', 'Apartments', 'Independent Houses', 'Residential Land'];
        } else if (propertyType === 'commercial') {
            options = ['Office', 'Industries', 'Shopping Complexes'];
        } else if (propertyType === 'agriculture') {
            options = ['Land', 'Farm Houses'];
        }

        updateSubtypeOptions(options);
    }

    // Update subtypes based on selected property type
    function updateSubtypeOptions(options) {
        subtypeOptionsDiv.innerHTML = '';
        options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('form-check');
            optionDiv.innerHTML = `
                <input class="form-check-input" type="checkbox" value="${option}" id="${option}">
                <label class="form-check-label" for="${option}">${option}</label>
            `;
            subtypeOptionsDiv.appendChild(optionDiv);
        });
        propertySubtypesDiv.style.display = 'block';
    }

    // Update price display based on selected price range
    function updatePriceDisplay() {
        const min = parseInt(minPrice.value, 10);
        const max = parseInt(maxPrice.value, 10);
        priceDisplay.textContent = `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    }

    // Update square footage display based on selected range
    function updateSqftDisplay() {
        const min = parseInt(minSqft.value, 10);
        const max = parseInt(maxSqft.value, 10);
        sqftDisplay.textContent = `${min} - ${max} sqft`;
    }

    // Event listeners for sliders
    minPrice.addEventListener('input', updatePriceDisplay);
    maxPrice.addEventListener('input', updatePriceDisplay);
    minSqft.addEventListener('input', updateSqftDisplay);
    maxSqft.addEventListener('input', updateSqftDisplay);

    // Initial update
    updatePriceDisplay();
    updateSqftDisplay();
});
