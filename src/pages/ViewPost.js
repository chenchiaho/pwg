import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import Button from '../components/Button'

function ViewPost() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    useEffect(() => {
        fetchPostDetails()
    }, [])

    const fetchPostDetails = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${config.baseUrl}/api/posts/view/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            console.log(response)
            setPost(response.data)
        } catch (err) {
            console.error('API Error:', err)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    if (!post) {
        return null
    }

    return (
        <div className="view-post">
            <div className="view-post__header">
                <Button className="view-post__btn--back primary-btn" onClick={() => navigate(-1)}>Back</Button>
                <button className="view-post__btn--logout" onClick={handleLogout}>Logout</button>
            </div>
            <h3 className="view-post__title">View Post</h3>
            <div className="view-post__content">
                <h2 className="view-post__post-title">{post.title}</h2>
                <p className="view-post__body">{post.body}</p>
                <div className="view-post__tags">
                    {post.tags.map((tag, index) => (
                        <p key={index} className="view-post__tag">{tag}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewPost
