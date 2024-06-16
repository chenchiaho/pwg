import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import AlertModal from '../components/AlertModal.js'
import config from '../config.js'
import { validateUsername, validateEmail } from '../utils/validateInput.js'
import useLoading from '../utils/useLoading.js'

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')
    const [error, setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [modalType, setModalType] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const dotsAnime = useLoading(loading)

    const handleSubmit = async (e) => {

        e.preventDefault()
        setError('')

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        if (!validateUsername(username)) {
            setError('Username can only contain letters, numbers, and underscores')
            return
        }

        if (!validateEmail(email)) {
            setError('Invalid email format')
            return
        }

        try {
            setLoading(true)
            console.log('Registering begins')
            const response = await axios.post(`${config.baseUrl}/api/account/register`, {
                username,
                email,
                password,
                role: role.toLowerCase()
            })

            localStorage.setItem('token', response.data.token)
            setModalMessage(response.data.message)
            setModalType('success')
            setModalOpen(true)

            setTimeout(() => {
                setModalOpen(false)
                navigate('/')
            }, 1000)

        } catch (err) {
            console.log(err)
            setModalMessage(err.response.data.error || 'Error registering')
            setModalType('error')
            setModalOpen(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="register">
            <div className="register__card">
                <h2 className="register__title">Register User</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
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
                    <div className="register__form-group">
                        <label className="register__label">Role</label>
                        <select className="register__select" value={role}
                            onChange={(e) => setRole(e.target.value)} required>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>
                    {error && <p className="register__error">{error}</p>}
                    {loading && <p className="register__loading">Processing{dotsAnime}</p>}
                    <Button type="submit" className="register__button primary-btn">Register</Button>
                </form>
                <p className="register__footer primary-link">
                    <a href="/login" className="register__link">Back to Login Page</a>
                </p>
            </div>
            {modalType && (
                <AlertModal
                    isOpen={modalOpen}
                    message={modalMessage}
                    type={modalType}
                    onClose={() => setModalOpen(false)}
                    onOutsideClick={() => modalType === 'success' ? setModalOpen(false) : null}
                />
            )}

        </div>
    )
}

export default Register
