import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LineChart, Clock3, ScanText, BadgeCheck } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    // Note: Here we would fetch the user's statistics from the backend
    // For now, we render the general dashboard UI as per the spec

    return (
        <div className="max-w-5xl mx-auto mt-8">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to your Dashboard</h1>
                <p className="text-gray-600">Access your detection tools and review your analysis history.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-300 flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
                        <LineChart className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">Active</div>
                        <div className="text-sm text-gray-500">System Status</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-300 flex items-center gap-4">
                    <div className="bg-green-100 text-green-600 p-4 rounded-xl">
                        <BadgeCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">91%</div>
                        <div className="text-sm text-gray-500">Avg Model Accuracy</div>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <Link to="/detect" className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-300 hover:border-blue-400 hover:shadow-md transition-all">
                    <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                        <ScanText className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Detect AI Text</h3>
                    <p className="text-gray-600">Paste your content into our hybrid BERT+T5 engine to verify authenticity instantly.</p>
                </Link>

                <Link to="/history" className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-300 hover:border-indigo-400 hover:shadow-md transition-all">
                    <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                        <Clock3 className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Detection History</h3>
                    <p className="text-gray-600">Review your past queries and their assigned confidence scores and analytics.</p>
                </Link>
            </div>
        </div>
    );
};


export default Dashboard;
