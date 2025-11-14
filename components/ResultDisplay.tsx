
import React from 'react';

interface ResultDisplayProps {
    originalImageUrl: string | null;
    description: string | null;
    similarImageUrl: string | null;
    isLoading: boolean;
}

const ImageCard: React.FC<{ src: string | null; title: string; isLoading?: boolean }> = ({ src, title, isLoading }) => (
    <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-center text-indigo-300">{title}</h3>
        <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden shadow-lg border border-gray-700">
            {isLoading && !src ? (
                <div className="w-full h-full bg-gray-700 animate-pulse"></div>
            ) : src ? (
                <img src={src} alt={title} className="w-full h-full object-contain" />
            ) : (
                <div className="text-gray-500">Image will appear here</div>
            )}
        </div>
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImageUrl, description, similarImageUrl, isLoading }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <ImageCard src={originalImageUrl} title="Your Image" />

            <div className="flex flex-col gap-4 lg:col-span-1 h-full">
                 <h3 className="text-xl font-semibold text-center text-indigo-300">AI Description</h3>
                 <div className="bg-gray-900 p-6 rounded-lg h-full border border-gray-700 min-h-[200px] lg:aspect-square flex items-center">
                    {description ? (
                         <p className="text-gray-300 whitespace-pre-wrap">{description}</p>
                    ): (
                        <div className="w-full space-y-3 animate-pulse">
                            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
                             <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                        </div>
                    )}
                 </div>
            </div>

            <ImageCard src={similarImageUrl} title="Generated Similar Image" isLoading={isLoading} />
        </div>
    );
};
