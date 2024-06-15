import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import PostList from '../components/PostList'
import AlertModal from '../components/AlertModal'
import Button from '../components/Button'
import AddPostForm from '../components/AddPostForm'
import StatsBoxes from '../components/StatsBoxes'
import config from '../config'

function Home() {
    const [posts, setPosts] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [modalType, setModalType] = useState('error')
    const [selectedPost, setSelectedPost] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(9)
    const [totalPosts, setTotalPosts] = useState(0)
    const [userRole, setUserRole] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = parseJwt(token)
        setUserRole(user.role)

        fetchPosts(currentPage, user.role)
    }, [currentPage])

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]))
        } catch (e) {
            return null
        }
    }

    const fetchPosts = async (page, role) => {
        const token = localStorage.getItem('token')
        const url = role === 'admin' ? '/api/posts' : '/api/posts/mypost'
        const method = role === 'admin' ? 'get' : 'post'
        const options = {
            headers: { Authorization: `Bearer ${token}` },
            params: { page, limit: postsPerPage }
        }

        try {
            const response = await axios({
                method,
                url: `${config.baseUrl}${url}`,
                ...(method === 'post' && { data: options.params }),
                ...(method === 'get' && { params: options.params }),
                headers: options.headers
            })

            console.log('API Response:', response.data)
            setPosts(response.data.data || [])
            setTotalPosts(response.data.totalPosts || 0)
        } catch (err) {
            console.error('API Error:', err)
            setModalMessage('Error fetching posts')
            setModalType('error')
            setModalOpen(true)
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleViewPost = (post) => {
        setSelectedPost(post)
        navigate(`/view-post/${post.id}`)
    }

    const handleEditPost = (post) => {
        setSelectedPost(post)
        setShowAddModal(true)
    }

    const handleDeletePost = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.delete(`${config.baseUrl}/api/posts/delete/${postId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log('API Response:', response.data)
                fetchPosts(currentPage, userRole)
                setModalMessage('Post deleted successfully')
                setModalType('success')
                setModalOpen(true)
            } catch (error) {
                console.error('API Error:', error)
                setModalMessage('Error deleting post')
                setModalType('error')
                setModalOpen(true)
            }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="home">
            {userRole === 'admin' && <StatsBoxes userRole={userRole} token={localStorage.getItem('token')} />}
            <div className="home__header">
                <Button className="home__button--add primary-btn" onClick={() => { setShowAddModal(true); setSelectedPost(null) }}>
                    Add New Post
                </Button>
                <button className="home__button--logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <h3 className="home__title">Post List</h3>
            <PostList
                posts={posts}
                onViewPost={handleViewPost}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalPosts={totalPosts}
                onPageChange={handlePageChange}
            />
            <AddPostForm
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                refreshPosts={() => fetchPosts(currentPage, userRole)}
                selectedPost={selectedPost}
            />
            <AlertModal
                isOpen={modalOpen}
                message={modalMessage}
                type={modalType}
                onClose={() => setModalOpen(false)}
            />
        </div>
    )
}

export default Home
