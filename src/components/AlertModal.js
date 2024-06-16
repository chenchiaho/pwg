import React from 'react'
import PropTypes from 'prop-types'
import { FaCheckCircle } from 'react-icons/fa'
import { RxCrossCircled } from 'react-icons/rx'
import Button from './Button'

const AlertModal = ({ isOpen, message, type, onClose, onConfirm, onOutsideClick, postTitle }) => {
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
                    <h3 className="modal__title">{postTitle}</h3>
                    <p className="modal__message">{message}</p>

                    {type === 'error' && (
                        <Button onClick={onClose} className="modal__button primary-btn">Ok</Button>
                    )}

                    {type === 'confirmation' && (
                        <div className="modal__actions">
                            <Button onClick={onClose} className="modal__button modal__button--cancel">Cancel</Button>
                            <Button onClick={onConfirm} className="modal__button modal__button--delete">Delete</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

AlertModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'confirmation', null]).isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
    onOutsideClick: PropTypes.func,
    postTitle: PropTypes.string,
}

export default AlertModal
