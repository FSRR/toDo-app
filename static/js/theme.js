const body = document.getElementById('body')
const headerBackground = document.getElementById('banner-background')
const themeMode = document.getElementById('theme-mode')

if(themeMode) {
    themeMode.addEventListener('click', () => {
        if(body.getAttribute('class') == 'dark') {
            body.classList.replace('dark', 'light')
            headerBackground.classList.replace('banner-dark', 'banner-light')
            themeMode.setAttribute('src', '/static/img/icon-moon.svg')
            themeMode.setAttribute('alt', 'Dark Theme')
        } else {
            body.classList.replace('light', 'dark')
            headerBackground.classList.replace('banner-light', 'banner-dark')
            themeMode.setAttribute('src', '/static/img/icon-sun.svg')
            themeMode.setAttribute('alt', 'Light Theme')
        }
    })
}

