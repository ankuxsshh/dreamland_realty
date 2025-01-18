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