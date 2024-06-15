import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const isAuthenticated = !!localStorage.getItem('token')
    const navigate = useNavigate()

    const login = async (data) => {
        setUser(data)
        localStorage.setItem('token', data.token)
        navigate('/', { replace: true })
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
    }

    useEffect(() => {

        const token = localStorage.getItem('token')
        if (token) {
            setUser({ token })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
