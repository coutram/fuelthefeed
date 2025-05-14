'use client';
import React, { useEffect, useRef } from 'react';
import './Modal.css'; // Import your CSS for styling

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !(modalRef.current as HTMLElement).contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
                ref={modalRef}
                className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-4 px-6 py-4 rounded-t-lg border-b border-gray-200"
                     style={{ background: '#F5F7FB' /* Example: soft blue, adjust as needed */ }}>
                    <h2 className="text-xl font-semibold text-[#1e3a4c]"> {/* Example: deep blue text */}
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                <div className="px-6 pb-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
