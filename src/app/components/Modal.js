import React from 'react';
import './Modal.css'; // Import your CSS for styling

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times; {/* Close button */}
                </button>
                {children} {/* Render the content passed to the modal */}
            </div>
        </div>
    );
};

export default Modal;
