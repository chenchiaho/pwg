// Allowed characters: a-z, A-Z, 0-9, _
export const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9_]+$/
    return re.test(username)
}

// Validates that the email format is correct.
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

// Allowed characters: a-z, A-Z, 0-9, spaces, -, _, ,, ., ;, :, (, )
export const validateTitle = (title) => {
    const re = /^[a-zA-Z0-9\s\-_,\.;:()]+$/
    return re.test(title) && title.trim().length > 0
}

// Allowed characters: Any characters as long as the content is not empty or just whitespace.
export const validateContent = (content) => {
    return content.trim().length > 0
}