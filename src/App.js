import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ViewPost from './pages/ViewPost'
import { AuthProvider } from './routers/AuthContext'
import ProtectedRoute from './routers/ProtectedRoute'
import IfAuthenticated from './routers/IfAuthenticated'

function App() {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={
            <IfAuthenticated>
              <Login />
            </IfAuthenticated>
          } />
          <Route path="/register" element={
            <IfAuthenticated>
              <Register />
            </IfAuthenticated>
          } />
          <Route element={<ProtectedRoute />}>
            <Route path="/view-post/:id" element={<ViewPost />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>

  )
}

export default App
