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


// Login e logout


function updateLoggedUserName() {
    const loggedUserElement = document.getElementById('logged-user')
    if (localStorage.getItem('loggedUser')) {
        loggedUserElement.innerText = JSON.parse(localStorage.getItem('loggedUser')).firstName
    } else {
        loggedUserElement.innerText = 'Login'
    }
}

updateLoggedUserName()

const loginLogoutButton = document.getElementById('login-logout-button')

loginLogoutButton.addEventListener('click', e => {
    e.preventDefault()
    if (!localStorage.getItem('loggedUser')) {
        const username = prompt('Inserisci il tuo username')
        const password = prompt('Inserisci la tua password')
        fetch('/login', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => res.json())
            .then(res => {
                if (res.user) {
                    localStorage.setItem('loggedUser', JSON.stringify(res.user))
                    updateLoggedUserName()
                }
            })
    } else {
        localStorage.removeItem('loggedUser')
        updateLoggedUserName()
    }
})