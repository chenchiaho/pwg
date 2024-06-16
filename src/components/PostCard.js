import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const PostCard = ({ post, onViewPost, onEditPost, onDeletePost }) => {

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
    }

    const renderTags = (tags, limit) => {
        return (
            <>
                {tags.slice(0, limit).map((tag, index) => (
                    <span key={index} className="post-card__tag">{tag}</span>
                ))}
                {tags.length > limit && <span className="post-card__tag">...</span>}
            </>
        )
    }

    const formattedDate = new Date(post.date).toISOString().split('T')[0]

    return (

        <div className="post-card">
            <div className="post-card__header">
                <span className="post-card__date">{formattedDate}</span>
                <span className="post-card__logo">Logo</span>
            </div>
            <h3 className="post-card__title">{post.title}</h3>
            <p className="post-card__body">{truncateText(post.body, 140)}</p>
            <div className="post-card__tags">
                {renderTags(post.tags, 5)}
            </div>
            <div className="post-card__actions">
                <Button onClick={() => onEditPost(post)} className="post-card__button post-card__button--edit">Edit</Button>
                <Button onClick={() => onViewPost(post)} className="post-card__button post-card__button--view">View</Button>
                <Button onClick={() => onDeletePost(post.id, post.title)} className="post-card__button post-card__button--delete">Delete</Button>
            </div>
        </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
    onViewPost: PropTypes.func.isRequired,
    onEditPost: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired,
}

export default PostCard
