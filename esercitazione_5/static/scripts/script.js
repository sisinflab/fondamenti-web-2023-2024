// slider volume

const volumeSlider = document.getElementById('volume-slider')
const volumeOutput = document.getElementById('volume-output')

volumeSlider.addEventListener('input', (e) => {
    volumeOutput.textContent = e.target.value;
})

// Ricerca

const searchInput = document.getElementById('search-input')

document.getElementById('search-button').addEventListener('click', e => {
    e.preventDefault();
    searchInput.hidden = !searchInput.hidden
})

document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault()
    searchInput.value = ''
    alert('Funzionalità di ricerca non implementata')
})