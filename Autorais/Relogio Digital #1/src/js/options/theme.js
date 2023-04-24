const elementTheme = document.getElementById("theme")

// Modelo dos elementos que sofreram alteração
function themeColor(colorPrimary, colorSecondary, colorFont) {
    document.documentElement.style.setProperty("--color-primary", colorPrimary) 
    document.documentElement.style.setProperty("--color-secondary", colorSecondary) 
    document.documentElement.style.setProperty("--color-font", colorFont) 
}

// Valor que será atribuído aos elementos que sofreram alteração
function themeName(themeName) {
    switch (themeName) {
        case "light":
            themeColor("#b4b4b4","#aaaaaa","rgb(46, 46, 46)")
        break
        case "dark":
            themeColor("#1f1f1f","#363636","rgb(247, 238, 222)")
        break
        case "dracula":
            themeColor("#282a36","#44475a","wheat")
        break 
        default:
            themeColor("#282a36","#44475a","wheat")
        break
    }
}

// Verifica os dados locais e adiciona caso exista
(function localFont() {
    if(localStorage.getItem("elementTheme") !== null) {
        themeName(localStorage.getItem("elementTheme"))
    }
})();

// Verifica alteração na configuração e altera o valor, além de adicionar no localstorage
elementTheme.addEventListener("change", () => {
    localStorage.setItem("elementTheme", elementTheme.value)
    themeName(elementTheme.value)
})