import React, { useState, useEffect, useContext } from 'react';
import { Sparkles, BadgeAlert, BadgeCheck, CopyCheck, Eraser, Activity } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Detect = () => {
    const { user } = useContext(AuthContext);
    const isAdmin = user?.isAdmin === true;

    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const [kaggleResult, setKaggleResult] = useState(null);
    const [kaggleError, setKaggleError] = useState(null);

    const [loadingStep, setLoadingStep] = useState(0);

    const loadingPhrases = [
        "Initializing AI pipelines...",
        "Tokenizing input sequences...",
        "Running BERT classification...",
        "Extracting T5 linguistic features...",
        "Calculating confidence metrics...",
        "Finalizing analysis..."
    ];

    useEffect(() => {
        let interval;
        if (loading) {
            setLoadingStep(0);
            interval = setInterval(() => {
                setLoadingStep((prev) => (prev < loadingPhrases.length - 1 ? prev + 1 : prev));
            }, 800);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleAnalyze = async () => {
        if (text.trim().length < 10) {
            return setError("Please enter at least 10 characters for a reliable analysis.");
        }

        setError(null);
        setKaggleError(null);
        setLoading(true);
        setResult(null);
        setKaggleResult(null);

        // Map requests to promise array so they can run concurrently
        const requests = [];

        // 1. Standard Dataset Model (Admin Only)
        if (isAdmin) {
            requests.push(
                api.post('/detect', { text })
                   .then(res => setResult(res.data))
                   .catch(err => setError(err.response?.data?.detail || "An error occurred during analysis."))
            );
        }

        // 2. Kaggle Dataset Model (Available to All Users - Beta)
        requests.push(
            api.post('/detect/kaggle', { text })
               .then(res => setKaggleResult(res.data))
               .catch(err => setKaggleError(err.response?.data?.detail || "Kaggle model failed/not trained."))
        );

        await Promise.all(requests);
        setLoading(false);
    };

    const renderResultCard = (title, res, err) => {
        if (err) {
            return (
                <div className="bg-white rounded-2xl shadow-sm border border-red-300 p-8 h-full flex flex-col justify-center items-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
                    <div className="text-red-500 font-medium text-center">{err}</div>
                </div>
            );
        }

        if (!res) return null;

        const isAI = res.final_prediction === 'ai' || res.final_prediction === 'ai-generated';
        const confidencePercent = res ? (res.final_confidence * 100).toFixed(1) : 0;

        return (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col h-full transform transition-all hover:scale-[1.01]">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    {title} 
                    {title.includes("Kaggle") && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full px-3">BETA</span>}
                </h2>

                <div className="grid grid-cols-1 gap-6 flex-grow">
                    <div className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-colors ${isAI ? 'bg-red-50 border-red-300 text-red-700' : 'bg-green-50 border-green-300 text-green-700'}`}>
                        {isAI ? <BadgeAlert className="h-16 w-16 mb-4" /> : <BadgeCheck className="h-16 w-16 mb-4" />}
                        <div className="text-3xl font-extrabold mb-2">
                            {isAI ? 'AI Generated' : 'Human Written'}
                        </div>
                        <p className={`text-sm ${isAI ? 'text-red-600' : 'text-green-600'}`}>
                            Classification: highly likely to be {isAI ? 'authored by an AI' : 'written by a human'}.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="mb-2 flex justify-between items-end">
                            <span className="text-gray-600 font-medium">Ensemble Confidence</span>
                            <span className="text-2xl font-bold text-gray-900">{confidencePercent}%</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden shadow-inner">
                            <div
                                className={`h-4 rounded-full transition-all duration-1000 ${isAI ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`}
                                style={{ width: `${confidencePercent}%` }}
                            ></div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-auto w-full">
                            <button onClick={() => { navigator.clipboard.writeText(`Prediction: ${isAI ? 'AI Generated' : 'Human Written'} - Confidence: ${confidencePercent}%`) }} className="flex-1 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-semibold flex justify-center items-center gap-2 transition-all hover:shadow-sm">
                                <CopyCheck className="h-4 w-4" /> Copy
                            </button>
                            <button onClick={() => { setText(''); setResult(null); setKaggleResult(null); }} className="flex-1 bg-gray-50 border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold flex justify-center items-center gap-2 transition-all hover:shadow-sm">
                                <Eraser className="h-4 w-4" /> Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto mt-4 sm:mt-8 px-4">
            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
                    <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 animate-pulse" />
                    AI Text Analysis
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Paste your content below to detect if it was written by an AI or a Human.</p>
                {/* Banner available to all users */}
                <div className="mt-4 inline-block bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm px-4 py-1.5 rounded-lg font-medium">
                    {isAdmin ? "🛡️ Multi-Model Admin Evaluation Enabled" : "🛡️ Powered by DetectAI V2 Architecture"}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="p-4 sm:p-6">
                    <textarea
                        className="w-full h-48 sm:h-64 p-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none transition-all text-sm sm:text-base"
                        placeholder="Paste article, essay, or any text here (minimum 10 characters)..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>

                    <div className="flex justify-between items-center mt-4 text-xs sm:text-sm text-gray-500">
                        <span>{text.length} characters</span>
                        <button
                            onClick={() => setText('')}
                            className="text-gray-400 hover:text-red-500 transition-colors font-medium"
                        >
                            Clear Text
                        </button>
                    </div>
                </div>

                <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="text-xs sm:text-sm text-red-600 font-medium w-full sm:w-auto text-center sm:text-left">
                        {error && <span className="flex items-center justify-center sm:justify-start gap-1"><BadgeAlert className="h-4 w-4" /> {error}</span>}
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={loading || text.length === 0}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed sm:ml-auto"
                    >
                        {loading ? (
                            <><div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div> Analyzing...</>
                        ) : (
                            'Analyze Text'
                        )}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-8 animate-in slide-in-from-bottom-4 fade-in duration-500 overflow-hidden relative mb-8">
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    
                    <div className="relative flex flex-col items-center justify-center py-4">
                        <div className="w-full max-w-2xl mx-auto bg-gray-50 border border-gray-150 rounded-xl p-4 sm:p-5 relative overflow-hidden h-44 mb-8 shadow-inner">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] animate-scan z-20"></div>
                            <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-t from-blue-500/10 to-transparent animate-scan pointer-events-none z-10 transform -translate-y-full"></div>
                            <div className="text-xs sm:text-sm font-mono leading-relaxed opacity-60 pointer-events-none break-words whitespace-normal max-h-full overflow-hidden">
                               {text.split(' ').slice(0, 45).map((word, i) => {
                                   const isHighlight = i % 8 === 0;
                                   const isWarning = i % 13 === 0;
                                   return (
                                       <span key={i} className={`inline-block mr-1.5 transition-all duration-700 ${isHighlight ? 'bg-indigo-100 text-indigo-700 px-0.5 rounded' : 'text-gray-400'} ${isWarning ? 'bg-rose-100 text-rose-700 px-0.5 rounded' : ''}`}>
                                           {word}
                                       </span>
                                   );
                               })}
                               <span className="text-gray-400">...</span>
                            </div>
                        </div>
                        
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 flex items-center gap-2 text-center">
                           <Activity className="h-5 w-5 text-blue-600 animate-pulse" />
                           Running Multi-Model Neural Evaluation
                        </h3>
                        
                        <div className="h-6 overflow-hidden flex justify-center items-center w-full relative">
                            <p 
                                key={loadingStep} 
                                className="text-blue-600 font-medium text-xs sm:text-sm animate-in zoom-in-95 fade-in duration-300 absolute"
                            >
                                {loadingPhrases[loadingStep]}
                            </p>
                        </div>
                        
                        <div className="w-48 sm:w-64 bg-gray-100 rounded-full h-1.5 mt-6 overflow-hidden">
                            <div 
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${Math.min(((loadingStep + 1) / loadingPhrases.length) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Results Section */}
            {!loading && (result || error || kaggleResult || kaggleError) && (
                <div className={`grid gap-8 mb-8 ${isAdmin ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
                    {isAdmin && renderResultCard("DetectAI-Pro Primary Pipeline", result, error)}
                    {renderResultCard("DetectAI-Pro V2 (Kaggle Architecture)", kaggleResult, kaggleError)}
                </div>
            )}
        </div>
    );
};

export default Detect;
