import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import AlertModal from '../components/AlertModal.js'
import config from '../config.js'
import { validateEmail } from '../utils/validateInput.js'
import useLoading from '../utils/useLoading.js'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [modalType, setModalType] = useState(null)
    const [loading, setLoading] = useState(false)
    const dotsAnime = useLoading(loading)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()
        setError('')

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        if (!validateEmail(email)) {
            setError('Invalid email format')
            return
        }

        try {
            setLoading(true)
            console.log('login begins')
            const response = await axios.post(`${config.baseUrl}/api/account/login`, { email, password })
            localStorage.setItem('token', response.data.token)

            setModalMessage(response.data.message)
            setModalType('success')
            setModalOpen(true)

            setTimeout(() => {
                setModalOpen(false)
                navigate('/')
            }, 1000)

        } catch (error) {

            const errorMessage = error.response.data.error || 'An unexpected error occurred'
            setModalMessage(errorMessage)
            setModalType('error')
            setModalOpen(true)

        } finally {
            setLoading(false)
        }
    }

    const handleOutsideClick = () => {
        if (modalType === 'success') {
            setModalOpen(false)
            navigate('/')
        } else {
            setModalOpen(false)
        }
    }

    return (
        <div className="login__container">
            <div className="login__card">
                <h2 className="login__title">Login Page</h2>
                <form onSubmit={handleSubmit} className='login__form'>
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="login__error">{error}</p>}
                    {loading && <p className="login__loading">Processing{dotsAnime}</p>}
                    <Button type="submit" className="login__button primary-btn">Login</Button>
                </form>

                <p className="login__link primary-link">
                    <a href="/register">
                        Create an account </a>
                </p>
            </div>
            {modalType && (
                <AlertModal
                    isOpen={modalOpen}
                    message={modalMessage}
                    type={modalType}
                    onClose={() => setModalOpen(false)}
                    onOutsideClick={handleOutsideClick}
                />
            )}
        </div>
    )
}

export default Login
