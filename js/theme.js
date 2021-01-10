const body = document.getElementById('body')
const headerBackground = document.getElementById('header-background')
const themeMode = document.getElementById('theme-mode')

if(themeMode) {
    themeMode.addEventListener('click', () => {
        if(body.getAttribute('class') == 'dark') {
            body.classList.replace('dark', 'light')
            headerBackground.classList.replace('header-dark', 'header-light')
            themeMode.setAttribute('src', 'img/icon-moon.svg')
            themeMode.setAttribute('alt', 'Dark Theme')
        } else {
            body.classList.replace('light', 'dark')
            headerBackground.classList.replace('header-light', 'header-dark')
            themeMode.setAttribute('src', 'img/icon-sun.svg')
            themeMode.setAttribute('alt', 'Light Theme')
        }
    })
}

