export const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9_]+$/
    return re.test(username)
}

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}