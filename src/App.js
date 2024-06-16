import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ViewPost from './pages/ViewPost'
import { AuthProvider } from './routers/AuthContext'
import ProtectedRoute from './routers/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<ProtectedRoute type="guest"><Login /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute type="guest"><Register /></ProtectedRoute>} />
          <Route element={<ProtectedRoute type="private" />}>
            <Route path="/view-post/:id" element={<ViewPost />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}
export default App
