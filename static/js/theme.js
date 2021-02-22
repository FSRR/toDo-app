const headerBackground = document.getElementById('banner-background')
const styles = document.documentElement.style
const themeImg = document.getElementById('theme-mode')
const themeCheckBox = document.getElementById('theme-checkbox')

const lightTheme = {
    '--body': 'hsl(0, 0%, 98%)',
    '--box-item': 'hsl(0, 0%, 98%)',
    '--drag-item': 'hsl(0, 1%, 79%)',
    '--border': 'hsl(234, 19%, 71%)',
    '--text': 'hsl(236, 9%, 61%)',
    '--text2': 'hsl(236, 9%, 61%)',
    '--hover': ' hsl(235, 19%, 35%)',
    '--shadow': 'hsl(236, 33%, 92%)',
    '--button':' hsl(115, 60%, 31%)',
    '--icons': 'hsl(0, 0%, 98%)'
}

const darkTheme = {
    '--body':  'hsl(235, 21%, 11%)',
    '--box-item': 'hsl(235, 24%, 19%)',
    '--drag-item': 'hsl(236, 21%, 14%)',
    '--border': 'hsl(237, 8%, 48%)',
    '--text': 'hsl(234, 39%, 85%)',
    '--text2': 'hsl(233, 14%, 35%)',
    '--hover':  'hsl(236, 33%, 92%)',
    '--shadow':  'hsl(233, 18%, 10%)',
    '--button': 'hsl(245, 89%, 39%)',
    '--icons': 'hsl(234, 39%, 85%)'
}

const changeTheme = theme => {
    const customStyles = Object.keys(theme)
    console.log(customStyles);
    for(const style of customStyles) {
        styles.setProperty(style, theme[style])
    }
}

const themeMode = () => {
    if(themeCheckBox.checked) {
        console.log('Light Theme');
        changeTheme(lightTheme)
        headerBackground.classList.replace('banner-dark', 'banner-light')
        themeImg.firstElementChild.setAttribute('src', '/static/img/icon-moon.svg')
        themeImg.firstElementChild.setAttribute('alt', 'Dark Theme')
    } else {
        console.log('Dark Theme');
        changeTheme(darkTheme)
        headerBackground.classList.replace('banner-light', 'banner-dark')
        themeImg.firstElementChild.setAttribute('src', '/static/img/icon-sun.svg')
        themeImg.firstElementChild.setAttribute('alt', 'Light Theme')
    }
}

onload = themeMode

if(themeImg) {
    themeCheckBox.addEventListener('change', () => {
        console.log(themeCheckBox);

        themeMode()

        fetch('/changeTheme', {
            method: 'POST',
            body: JSON.stringify(themeCheckBox.checked, null, 2),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => console.log(res))
    })
}



addEventListener('resize', () => {
    if( 600 <= window.screen.width < 950) {
        try {
            const menu = document.getElementById('log-sign-home')
            if(menu.firstElementChild === document.getElementById('home')) {
                console.log('siii');
                menu.classList.add('header-home')
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const logout = document.getElementById('logout')
            if(logout) {
                console.log('wooo')
                logout.parentElement.classList.add('header-logout')
            }
        } catch (error) {
            console.log(error);
        }
    }
})




