import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

const ProtectedRoute = ({ type, children }) => {
    const { isAuthenticated } = useAuth()
    if (type === "private" && !isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    if (type === "guest" && isAuthenticated) {
        return <Navigate to="/" replace />
    }
    return children || <Outlet />
}

export default ProtectedRoute
