import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

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
            const response = await axios.get(`https://api-for-testing-gujp.onrender.com/api/posts/view/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            console.log(response)
            setPost(response.data)
        } catch (err) {
            console.error('API Error:', err)
        }
    }

    if (!post) {
        return null
    }

    return (
        <div className="view-post">
            <button className="view-post__back-button" onClick={() => navigate(-1)}>Back</button>
            <h2 className="view-post__title text-center">{post.title}</h2>
            <p className="view-post__body">{post.body}</p>
            <div className="view-post__tags">
                {post.tags.map((tag, index) => (
                    <span key={index} className="view-post__tag">{tag}</span>
                ))}
            </div>
        </div>
    )
}

export default ViewPost
