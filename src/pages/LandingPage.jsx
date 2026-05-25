import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Fingerprint, Sparkles, Rocket, ScanText, PieChart, ShieldCheck, Cpu, Database } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const LandingPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4 py-8 relative overflow-hidden">
            {/* Background glowing decorations */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-semibold mb-6 flex items-center gap-2 text-sm sm:text-base animate-bounce">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                DetectAI Version 2.0
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight max-w-4xl">
                Next-Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">AI Text Detection</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
                Utilizing advanced BERT and T5 Transformer models to distinguish between human-written and AI-generated content with unparalleled accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md px-4">
                {user ? (
                    <>
                        <Link
                            to="/detect"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            Start Analyzing <ScanText className="h-5 w-5" />
                        </Link>
                        <Link
                            to="/dashboard"
                            className="flex-1 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                        >
                            Dashboard <PieChart className="h-5 w-5 text-gray-400" />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/register"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            Get Started <Rocket className="h-5 w-5" />
                        </Link>
                        <Link
                            to="/login"
                            className="flex-1 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                        >
                            Login <Fingerprint className="h-5 w-5 text-gray-400" />
                        </Link>
                    </>
                )}
            </div>

            {/* Core Features Grid */}
            <div className="mt-20 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 text-left border-t border-gray-200 pt-16 px-4">
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-xl w-fit mb-4">
                        <Cpu className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Hybrid Model</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Combines BERT embeddings with T5 text-to-text generative understanding for maximum precision.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl w-fit mb-4">
                        <Database className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">FastAPI Backend</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">High-performance async backend ensuring real-time results and scalable operations.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 sm:col-span-2 md:col-span-1">
                    <div className="bg-purple-50 text-purple-600 p-3 rounded-xl w-fit mb-4">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Secure History</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Encrypted token-based authentication logs all your previous detection analytics securely.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
