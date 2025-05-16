import React from 'react';

type NotificationProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
};

const typeStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-600',
};

export default function Notification({ message, type = 'info', onClose }: NotificationProps) {
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-semibold flex items-center space-x-4 ${typeStyles[type]}`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200 text-xl font-bold">&times;</button>
      )}
    </div>
  );
}
