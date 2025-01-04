// Hide loader after page load
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
    }
});
