import { FC } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}
// Creates a success or error notification component (Green or Red)
const Notification: FC<NotificationProps> = ({ message, type, onClose }) => {
    return (
        <div
            className={`m-auto mt-8 md:mt-0 md:fixed bottom-4 md:right-4 p-4 rounded shadow-lg text-white ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
        >
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4">
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Notification;
