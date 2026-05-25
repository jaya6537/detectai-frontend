import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LineChart, Clock3, ScanText, BadgeCheck, FileCheck } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-5xl mx-auto mt-6 px-4">
            <div className="mb-10 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user?.username || 'User'}</span>!
                </h1>
                <p className="text-gray-600 text-base sm:text-lg">Access your detection tools and review your analysis history.</p>
            </div>

            {/* Stats Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-blue-50 text-blue-600 p-4 rounded-xl">
                        <LineChart className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">Active</div>
                        <div className="text-xs sm:text-sm text-gray-500 font-medium">System Status</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="bg-green-50 text-green-600 p-4 rounded-xl">
                        <BadgeCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">91%</div>
                        <div className="text-xs sm:text-sm text-gray-500 font-medium font-medium">Avg Model Accuracy</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                    <div className="bg-purple-50 text-purple-600 p-4 rounded-xl">
                        <FileCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">Encrypted</div>
                        <div className="text-xs sm:text-sm text-gray-500 font-medium font-medium">History Logs</div>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center sm:text-left tracking-tight">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/detect" className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all hover:-translate-y-0.5">
                    <div className="bg-blue-50 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-105 transition-transform">
                        <ScanText className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Detect AI Text</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Paste your content into our hybrid BERT+T5 engine to verify authenticity instantly.</p>
                </Link>

                <Link to="/history" className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all hover:-translate-y-0.5">
                    <div className="bg-indigo-50 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-105 transition-transform">
                        <Clock3 className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Detection History</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Review your past queries and their assigned confidence scores and analytics.</p>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
