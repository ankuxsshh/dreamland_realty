document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const countryButtons = {
      dubai: document.getElementById("btn-dubai"),
      india: document.getElementById("btn-india"),
    };
    const locationInput = document.getElementById("location");
    const propertyTypeSelect = document.getElementById("property-type");
    const subtypeSelect = document.getElementById("property-subtype");
    const sqftRangeDiv = document.getElementById("sqft-range");
    const bhkDiv = document.getElementById("bhk-options");
    const priceDisplay = document.getElementById("price-display");
    const sqftDisplay = document.getElementById("sqft-display");
    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    const minSqftInput = document.getElementById("min-sqft");
    const maxSqftInput = document.getElementById("max-sqft");
    const filterForm = document.getElementById("filter-form");
    const clearFilterButton = document.getElementById("clear-filter");
    const conditionalFiltersDiv = document.getElementById("conditional-filters");
  
    let country = "india"; // Default country
  
    // Helper Functions
    const updatePropertyTypes = () => {
      if (country === "dubai") {
        propertyTypeSelect.innerHTML = `
          <option value="" disabled selected>-Select-</option>
          <option value="residential">Residential</option>
        `;
      } else {
        propertyTypeSelect.innerHTML = `
          <option value="" disabled selected>-Select-</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        `;
      }
    };
  
    const updateSubtypes = () => {
      const selectedType = propertyTypeSelect.value;
  
      if (selectedType === "residential") {
        subtypeSelect.innerHTML = `
          <option value="" disabled selected>-Select Subtype-</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="independent-house">Independent House</option>
        `;
        conditionalFiltersDiv.style.display = "block";
        sqftRangeDiv.style.display = "block";
        bhkDiv.style.display = "flex";
      } else if (selectedType === "commercial") {
        subtypeSelect.innerHTML = `
          <option value="" disabled selected>-Select Subtype-</option>
          <option value="office-space">Office Space</option>
          <option value="shop">Shop</option>
          <option value="warehouse">Warehouse</option>
        `;
        conditionalFiltersDiv.style.display = "block";
        sqftRangeDiv.style.display = "block";
        bhkDiv.style.display = "none"; // Hide BHK options for commercial properties
      } else {
        conditionalFiltersDiv.style.display = "none";
      }
  
      document.getElementById("property-subtypes").style.display = "block";
    };
  
    const resetFilters = () => {
      locationInput.value = "";
      propertyTypeSelect.value = "";
      subtypeSelect.innerHTML = "";
      minPriceInput.value = 0;
      maxPriceInput.value = 10000000;
      minSqftInput.value = 500;
      maxSqftInput.value = 5000;
      priceDisplay.textContent = "0 - 10,000,000";
      sqftDisplay.textContent = "500 - 5000 sqft";
      conditionalFiltersDiv.style.display = "none";
      sqftRangeDiv.style.display = "none";
      bhkDiv.style.display = "none";
      document.getElementById("property-subtypes").style.display = "none";
    };
  
    const updatePriceDisplay = () => {
      const minPrice = parseInt(minPriceInput.value, 10);
      const maxPrice = parseInt(maxPriceInput.value, 10);
      priceDisplay.textContent = `${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}`;
    };
  
    const updateSqftDisplay = () => {
      const minSqft = parseInt(minSqftInput.value, 10);
      const maxSqft = parseInt(maxSqftInput.value, 10);
      sqftDisplay.textContent = `${minSqft} - ${maxSqft} sqft`;
    };
  
    // Event Listeners
    countryButtons.dubai.addEventListener("click", () => {
      country = "dubai";
      updatePropertyTypes();
      resetFilters();
    });
  
    countryButtons.india.addEventListener("click", () => {
      country = "india";
      updatePropertyTypes();
      resetFilters();
    });
  
    propertyTypeSelect.addEventListener("change", updateSubtypes);
  
    minPriceInput.addEventListener("input", updatePriceDisplay);
    maxPriceInput.addEventListener("input", updatePriceDisplay);
  
    minSqftInput.addEventListener("input", updateSqftDisplay);
    maxSqftInput.addEventListener("input", updateSqftDisplay);
  
    clearFilterButton.addEventListener("click", resetFilters);
  
    filterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        location: locationInput.value,
        propertyType: propertyTypeSelect.value,
        propertySubtype: subtypeSelect.value,
        minPrice: minPriceInput.value,
        maxPrice: maxPriceInput.value,
        minSqft: minSqftInput.value,
        maxSqft: maxSqftInput.value,
        bhk: document.querySelector('input[name="bhk"]:checked')?.value || null,
      };
      console.log("Filters applied:", formData);
    });
  
    // Initialize
    updatePropertyTypes();
  });
  