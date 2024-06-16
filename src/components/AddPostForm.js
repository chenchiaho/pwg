import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from './Button'
import Input from './Input'
import EditorModal from './EditorModal'
import TagsInput from './TagsInput'
import config from '../config'
import { validateTitle, validateContent } from '../utils/validateInput'

const AddPostForm = ({ show, handleClose, refreshPosts, selectedPost }) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        if (selectedPost) {
            setTitle(selectedPost.title)
            setBody(selectedPost.body)
            setTags(selectedPost.tags || [])
        } else {
            setTitle('')
            setBody('')
            setTags([])
        }
    }, [selectedPost])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')

        if (!validateTitle(title)) {
            setError('Please ensure it contains only valid characters')
            return
        }

        if (!validateContent(body)) {
            setError('Content must not be empty')
            return
        }

        if (!tags.length) {
            setError('Please add at least one tag')
            return
        }

        const token = localStorage.getItem('token')
        try {
            const url = selectedPost
                ? `${config.baseUrl}/api/posts/edit/${selectedPost.id}`
                : `${config.baseUrl}/api/posts/create`

            const method = selectedPost ? 'put' : 'post'

            const response = await axios({
                method,
                url,
                data: { title, body, tags },
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log('API Response:', response.data)

            refreshPosts()
            handleClose()
            // Clear the form fields
            setTitle('')
            setBody('')
            setTags([])
            setError('')
        } catch (err) {
            console.error('API Error:', err)
            setError(err.message)
        }
    }

    return (
        <EditorModal show={show} handleClose={handleClose} title={selectedPost ? "Edit Post" : "Add A Post"}>
            <form onSubmit={handleSubmit} className="add-post-form">
                <Input
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <div className="add-post-form__group">
                    <label className="add-post-form__label">Content</label>
                    <textarea
                        className="add-post-form__textarea form-control"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows="4"
                        required
                    />
                </div>
                <div className="add-post-form__group">
                    <label className="add-post-form__label">Tags</label>
                    <TagsInput tags={tags} setTags={setTags} />
                </div>
                {error && <p className="add-post-form__error">{error}</p>}
                <div className="add-post-form__buttons">
                    <Button
                        type="button"
                        onClick={() => {
                            handleClose();
                            setError('');
                        }}
                        className="add-post-form__button secondary-btn">Cancel</Button>
                    <Button type="submit" className="add-post-form__button add-post-form__button--submit primary-btn">
                        {selectedPost ? "Edit" : "Add"}
                    </Button>
                </div>
            </form>

        </EditorModal>
    )
}

export default AddPostForm
