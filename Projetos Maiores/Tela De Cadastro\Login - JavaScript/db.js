function dbUserAutentication(user,password) {
    let db = JSON.parse(localStorage.getItem("accounts")) || []
    let autentication = db.some((value) => (value.username == user && value.password == password))
    return autentication
}

function dbExistUser(user) {
    let db = JSON.parse(localStorage.getItem("accounts")) || []
    let userExist = db.some((value) => value.username == user)
    return userExist
}

function dbUserLogged(user) {
    let token = Math.random().toString(26).substring(2)
    let userBody = {
        "token": token,
        "username": user
    }
    localStorage.setItem("UserLogged", JSON.stringify(userBody))
}

function dbNewUser(user,password) {
    let db = JSON.parse(localStorage.getItem("accounts")) || []
    db.push(
        {"username": user,"password": password}
    )
    localStorage.setItem("accounts", JSON.stringify(db))
} 

export { dbNewUser, dbExistUser, dbUserAutentication, dbUserLogged }