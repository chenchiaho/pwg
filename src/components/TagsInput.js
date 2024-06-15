import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

const tagOptions = [
    'history', 'american', 'crime', 'science', 'fiction',
    'fantasy', 'space', 'adventure', 'nature', 'environment',
    'philosophy', 'psychology', 'health'
]

const TagsInput = ({ tags, setTags }) => {
    const [tagInput, setTagInput] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const inputRef = useRef(null)

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value)
        setShowDropdown(true)
    }

    const handleTagSelect = (tag) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag])
        }
        setTagInput('')
        setShowDropdown(false)
    }

    const handleTagInputKeyDown = (e) => {
        if (e.key === 'Backspace' && !tagInput) {
            const newTags = tags.slice(0, -1)
            setTags(newTags)
        }
    }

    const handleContainerClick = () => {
        inputRef.current.focus()
    }

    return (
        <div className="tags-input">
            <div className="tags-input__selected" onClick={handleContainerClick}>
                {tags.map(tag => (
                    <span key={tag} className="tags-input__tag">
                        {tag}
                    </span>
                ))}
                <input
                    type="text"
                    className="tags-input__input"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleTagInputKeyDown}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    ref={inputRef}
                />
            </div>
            {showDropdown && (
                <ul className="tags-input__dropdown">
                    {tagOptions
                        .filter(tag => tag.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(tag)) // Exclude selected tags
                        .map(tag => (
                            <li key={tag} className="tags-input__dropdown-item" onClick={() => handleTagSelect(tag)}>
                                {tag}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    )
}

TagsInput.propTypes = {
    tags: PropTypes.array.isRequired,
    setTags: PropTypes.func.isRequired
}

export default TagsInput
