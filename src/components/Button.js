import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, onClick, type = 'button', className = '' }) => {
    return (
        <button type={type} onClick={onClick} className={`btn ${className}`}>
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
}

export default Button