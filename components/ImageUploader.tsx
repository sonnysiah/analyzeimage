
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageUpload(e.target.files[0]);
        }
    };
    
    const handleDragEvent = useCallback((e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(dragging);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        handleDragEvent(e, false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onImageUpload(e.dataTransfer.files[0]);
        }
    }, [onImageUpload, handleDragEvent]);

    const uploaderClass = `flex flex-col items-center justify-center w-full p-8 md:p-12 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${isDragging ? 'border-indigo-400 bg-indigo-900/50 scale-105' : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'}`;

    return (
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-100">Describe & Find Similar Images</h2>
            <p className="text-lg text-gray-400 mb-8">Upload an image and let AI provide a detailed description and find a similar one.</p>
            <div 
                className={uploaderClass}
                onDragEnter={(e) => handleDragEvent(e, true)}
                onDragLeave={(e) => handleDragEvent(e, false)}
                onDragOver={(e) => handleDragEvent(e, true)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
            >
                <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                    <UploadIcon />
                    <p className="mb-2 text-lg"><span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop</p>
                    <p className="text-sm">PNG, JPG, GIF, or WEBP</p>
                </div>
            </div>
        </div>
    );
};
