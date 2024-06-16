import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'

const EditorModal = ({ show, handleClose, title, children }) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
            <div className="modal__editor-content">
                <div className="modal__editor-header">
                    <h2 className="modal__editor-title">{title}</h2>
                </div>
                <div className="modal__editor-body">{children}</div>

            </div>
        </Modal>
    )
}

EditorModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default EditorModal
