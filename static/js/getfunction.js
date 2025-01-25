
// When the filter form is submitted
document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent form submission

    // Get the filter values
    const filters = {
        country: document.querySelector('input[name="country"]:checked')?.value,
        location: document.getElementById('location').value,
        property_type: document.getElementById('property-type').value,
        property_subtype: document.getElementById('property-subtype').value,
        min_price: document.getElementById('min-price').value,
        max_price: document.getElementById('max-price').value,
        min_sqft: document.getElementById('min-sqft').value,
        max_sqft: document.getElementById('max-sqft').value,
        bhk: document.querySelector('input[name="bhk"]:checked')?.value,
        status: document.getElementById('property-status').value,
        sort_by: document.getElementById('sort-by').value
    };

    // Build the query string
    const queryString = new URLSearchParams(filters).toString();

    // Send the filter request via AJAX
    fetch(`/properties/?${queryString}`, {
        method: 'GET',
    })
        .then(response => response.text())
        .then(data => {
            // Update the properties section in the properties.html with filtered results
            document.getElementById('properties-section').innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
});

// For "Clear" button functionality
document.getElementById('clear-filter').addEventListener('click', function () {
    document.getElementById('filter-form').reset();
    // Optionally reset the properties section or reload the page
    window.location.href = '/properties/';  // Reload with no filters
});
