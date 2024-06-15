import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ label, type = 'text', value, onChange, className = '', required = false }) => {
    return (
        <div className="form-group mb-3">
            <label>{label}</label>
            <input
                type={type}
                className={`form-control ${className}`}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    required: PropTypes.bool,
}

export default Input
