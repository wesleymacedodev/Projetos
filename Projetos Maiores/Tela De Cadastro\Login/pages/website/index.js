if(localStorage.getItem("UserLogged") == null) {
    window.location.href = "../../index.html"
} else {
    const user = document.getElementById("user")
    const logout = document.getElementById("logout")
    user.innerText = JSON.parse(localStorage.getItem("UserLogged"))["username"]
    logout.addEventListener("click", () => {
        localStorage.removeItem("UserLogged")
        window.location.reload()
    })
}



