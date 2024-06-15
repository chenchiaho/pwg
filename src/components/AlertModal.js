import React from 'react'
import PropTypes from 'prop-types'
import { FaCheckCircle } from 'react-icons/fa'
import { RxCrossCircled } from 'react-icons/rx'
import Button from './Button'

const AlertModal = ({ isOpen, message, type, onClose, onOutsideClick }) => {
    if (!isOpen) return null

    return (
        <div className="modal__backdrop" onClick={onOutsideClick}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <div className={`modal__content modal__content--${type}`}>
                    {type === 'success' ? (
                        <FaCheckCircle className="modal__icon" />
                    ) : (
                        <RxCrossCircled className="modal__icon" />
                    )}
                    <p className="modal__message">{message}</p>

                    {type === 'error' && (
                        <Button onClick={onClose} className='modal__button primary-btn'>Ok</Button>
                    )}

                </div>
            </div>
        </div>
    )
}

AlertModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    onClose: PropTypes.func.isRequired,
    onOutsideClick: PropTypes.func,
}

export default AlertModal
