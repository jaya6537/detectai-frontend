import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Fingerprint, Sparkles, Rocket, ScanText, PieChart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const LandingPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                DetectAI Version 2.0
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                Next-Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI Text Detection</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl">
                Utilizing advanced BERT and T5 Transformer models to distinguish between human-written and AI-generated content with unparalleled accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
                {user ? (
                    <>
                        <Link
                            to="/detect"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            Start Analyzing <ScanText className="h-5 w-5" />
                        </Link>
                        <Link
                            to="/dashboard"
                            className="flex-1 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            Dashboard <PieChart className="h-5 w-5 text-gray-400" />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/register"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            Get Started <Rocket className="h-5 w-5" />
                        </Link>
                        <Link
                            to="/login"
                            className="flex-1 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            Login <Fingerprint className="h-5 w-5 text-gray-400" />
                        </Link>
                    </>
                )}
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-gray-200 pt-16">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Hybrid Model</h3>
                    <p className="text-gray-600">Combines BERT embeddings with T5 text-to-text generative understanding for maximum precision.</p>
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">FastAPI Backend</h3>
                    <p className="text-gray-600">High-performance async backend ensuring real-time results and scalable operations.</p>
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Secure History</h3>
                    <p className="text-gray-600">Encrypted token-based authentication logs all your previous detection analytics securely.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
