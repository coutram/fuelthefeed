import React from 'react';
import './Modal.css'; // Import your CSS for styling

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button className="close-button" onClick={onClose}>
                        &times; {/* Close button */}
                    </button>
                </div>
                <div className="modal-body">
                    {children} {/* Render the content passed to the modal */}
                </div>
            </div>
        </div>
    );
};

export default Modal;
