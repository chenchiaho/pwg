import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from './Button'
import Input from './Input'
import EditorModal from './EditorModal'
import TagsInput from './TagsInput'
import config from '../config'

const AddPostForm = ({ show, handleClose, refreshPosts, selectedPost }) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [modalMessage, setModalMessage] = useState('')
    const [modalType, setModalType] = useState('')

    useEffect(() => {
        if (selectedPost) {
            setTitle(selectedPost.title)
            setBody(selectedPost.body)
            setTags(selectedPost.tags)
        } else {
            setTitle('')
            setBody('')
            setTags([])
        }
    }, [selectedPost])

    const handleSubmit = async (e) => {
        e.preventDefault()
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

            setModalMessage(selectedPost ? 'Post updated successfully' : 'Post added successfully')
            setModalType('success')
            refreshPosts()
            handleClose()
            // Clear the form fields
            setTitle('')
            setBody('')
            setTags([])
        } catch (err) {
            console.error('API Error:', err)
            setModalMessage('Error adding/updating post')
            setModalType('error')
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

                <div className="add-post-form__buttons">
                    <Button type="button" onClick={handleClose} className="add-post-form__button secondary-btn">Cancel</Button>
                    <Button type="submit" className="add-post-form__button add-post-form__button--submit primary-btn">
                        {selectedPost ? "Update" : "Add"}
                    </Button>
                </div>
            </form>
            {modalMessage && (
                <div className={`alert ${modalType === 'success' ? 'alert-success' : 'alert-danger'}`}>
                    {modalMessage}
                </div>
            )}
        </EditorModal>
    )
}

export default AddPostForm
