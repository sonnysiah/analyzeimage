
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Spinner } from './components/Spinner';
import { describeImage, findSimilarImage } from './services/geminiService';
import { ArrowPathIcon, SparklesIcon } from './components/Icons';

type AppState = 'idle' | 'loading' | 'results' | 'error';

const App: React.FC = () => {
    const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [similarImageUrl, setSimilarImageUrl] = useState<string | null>(null);
    const [appState, setAppState] = useState<AppState>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = useCallback((file: File) => {
        if (file && file.type.startsWith('image/')) {
            handleReset();
            setUploadedImageFile(file);
            setUploadedImageUrl(URL.createObjectURL(file));
        } else {
            setError("Please upload a valid image file.");
            setAppState('error');
        }
    }, []);

    const handleProcessImage = async () => {
        if (!uploadedImageFile) {
            setError("Please upload an image first.");
            setAppState('error');
            return;
        }

        setAppState('loading');
        setError(null);
        setDescription('Generating a detailed description of your image...');

        try {
            const generatedDescription = await describeImage(uploadedImageFile);
            setDescription(generatedDescription);
            
            // Update description for next step
            setTimeout(() => {
                setDescription(prev => `${prev}\n\nNow, generating a similar image...`);
            }, 1000);


            const generatedSimilarImage = await findSimilarImage(generatedDescription);
            setSimilarImageUrl(`data:image/png;base64,${generatedSimilarImage}`);
            setAppState('results');

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "An unknown error occurred during processing.");
            setAppState('error');
        }
    };
    
    const handleReset = () => {
        setUploadedImageFile(null);
        if (uploadedImageUrl) {
            URL.revokeObjectURL(uploadedImageUrl);
        }
        setUploadedImageUrl(null);
        setDescription(null);
        setSimilarImageUrl(null);
        setError(null);
        setAppState('idle');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 w-full">
                <div className="w-full max-w-6xl mx-auto bg-gray-800/50 rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-700">
                    {appState === 'idle' && (
                         <ImageUploader onImageUpload={handleImageUpload} />
                    )}

                    {uploadedImageUrl && appState !== 'idle' && (
                        <div className="flex flex-col gap-8">
                            {appState === 'loading' && <Spinner message={description || 'Processing your request...'} />}
                            {appState === 'error' && (
                                 <div className="text-center p-8 bg-red-900/50 border border-red-700 rounded-lg">
                                    <h3 className="text-2xl font-bold text-red-400 mb-2">An Error Occurred</h3>
                                    <p className="text-red-300">{error}</p>
                                </div>
                            )}

                            {(appState === 'results' || appState === 'loading' || appState === 'error') && (
                                <ResultDisplay
                                    originalImageUrl={uploadedImageUrl}
                                    description={description}
                                    similarImageUrl={similarImageUrl}
                                    isLoading={appState === 'loading'}
                                />
                            )}
                        </div>
                    )}
                    
                    {uploadedImageUrl && appState !== 'idle' && appState !== 'loading' && (
                        <div className="mt-8 flex justify-center">
                             <button
                                onClick={handleReset}
                                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <ArrowPathIcon />
                                Start Over
                            </button>
                        </div>
                    )}

                    {uploadedImageUrl && appState === 'idle' && (
                        <div className="mt-8 text-center flex flex-col items-center gap-6">
                             <img src={uploadedImageUrl} alt="Uploaded preview" className="max-h-64 rounded-lg shadow-lg mx-auto" />
                             <button
                                onClick={handleProcessImage}
                                className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
                             >
                                <SparklesIcon />
                                Analyze & Find Similar
                             </button>
                        </div>
                    )}
                </div>
            </main>
             <footer className="text-center p-4 text-gray-500 text-sm">
                <p>Powered by Google Gemini. UI designed by a world-class frontend engineer.</p>
            </footer>
        </div>
    );
};

export default App;
