import { Navigate } from 'react-router-dom'
import { useAuth } from '../routers/AuthContext'

const IfAuthenticated = ({ children }) => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return children
}

export default IfAuthenticated