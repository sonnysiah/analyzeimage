
import React from 'react';
import { CameraIcon } from './Icons';

export const Header: React.FC = () => {
    return (
        <header className="p-4 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
            <div className="max-w-6xl mx-auto flex items-center gap-4">
                <CameraIcon />
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    Image Analyzer
                </h1>
            </div>
        </header>
    );
};
