
import React from 'react';

interface SpinnerProps {
    message?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
            <h2 className="text-xl font-semibold text-gray-200">Processing...</h2>
            {message && <p className="text-gray-400 max-w-md whitespace-pre-wrap">{message}</p>}
        </div>
    );
};
