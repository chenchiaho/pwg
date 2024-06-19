import React, { useState, useEffect, useCallback } from 'react'
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
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [totalAccounts, setTotalAccounts] = useState(0)
    const [myPosts, setMyPosts] = useState(0)
    const navigate = useNavigate()

    const parseJwt = useCallback((token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]))
        } catch (e) {
            return null
        }
    }, [])

    const getAllPosts = useCallback(async () => {
        try {
            const response = await axios.get(`${config.baseUrl}/api/posts`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page: 1, limit: 1 }
            })
            console.log(response)
            setTotalPosts(response.data.totalPosts)
        } catch (err) {
            console.error('API Error:', err)
        }
    }, [token])

    const fetchPosts = useCallback(async (page) => {
        const endPoint = '/api/posts/mypost'
        const options = {
            headers: { Authorization: `Bearer ${token}` },
            params: { page, limit: postsPerPage }
        }

        try {
            const response = await axios.post(`${config.baseUrl}${endPoint}`, options.params, { headers: options.headers })

            // console.log("Current Page:", page)
            // console.log("Posts Per Page:", postsPerPage)
            // console.log("Total Posts from API:", response.data.totalPosts)
            // console.log("Number of Posts Fetched:", response.data.data.length)

            setPosts(response.data.data || [])
            setMyPosts(response.data.totalPosts || 0)

        } catch (err) {
            setModalMessage(err.message)
            setModalType('error')
            setModalOpen(true)
        }
    }, [token, postsPerPage])

    const fetchTotalAccounts = useCallback(async () => {
        try {
            const response = await axios.get(`${config.baseUrl}/api/accounts`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setTotalAccounts(response.data.accounts.length)
        } catch (err) {
            console.error('API Error:', err)
        }
    }, [token])

    useEffect(() => {
        if (token) {
            const user = parseJwt(token)
            setUserRole(user.role)
            fetchPosts(currentPage)
            if (user.role === 'admin') {
                fetchTotalAccounts()
                getAllPosts()
            }
        }
    }, [currentPage, token, fetchPosts, fetchTotalAccounts, getAllPosts, parseJwt])

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

    const handleDeletePost = (postId, postTitle) => {
        setSelectedPost({ id: postId, title: postTitle })
        setModalMessage('Are you sure you want to delete this post?')
        setModalType('confirmation')
        setModalOpen(true)
    }

    const confirmDeletePost = async () => {
        try {
            const response = await axios.delete(`${config.baseUrl}/api/posts/delete/${selectedPost.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('API Response:', response.data)
            setModalOpen(false)
            fetchPosts(currentPage)
            getAllPosts()

        } catch (err) {
            setModalMessage(err.message)
            setModalType('error')
            setModalOpen(true)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken('')
        navigate('/login')
    }

    return (
        <div className="home">
            <div className="home__header-container">
                <div className="home__header">
                    <Button className="home__button--add primary-btn" onClick={() => { setShowAddModal(true); setSelectedPost(null); }}>
                        Add New Post
                    </Button>
                    <button className="home__button--logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <h3 className="home__title">Post List</h3>
            {userRole === 'admin' &&
                <StatsBoxes
                    userRole={userRole}
                    token={token}
                    totalPosts={totalPosts}
                    totalAccounts={totalAccounts}
                    myPosts={myPosts}
                />}
            <PostList
                posts={posts}
                onViewPost={handleViewPost}
                onEditPost={handleEditPost}
                onDeletePost={(postId, postTitle) => handleDeletePost(postId, postTitle)}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalPosts={totalPosts}
                onPageChange={handlePageChange}
            />
            <AddPostForm
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                refreshPosts={() => {
                    fetchPosts(currentPage)
                    getAllPosts()
                }}
                selectedPost={selectedPost}
            />
            <AlertModal
                isOpen={modalOpen}
                message={modalMessage}
                type={modalType}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmDeletePost}
                postTitle={selectedPost?.title}
                onOutsideClick={() => setModalOpen(false)}
            />
        </div>
    )
}

export default Home
