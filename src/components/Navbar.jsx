import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Power, PieChart, Clock3, ScanText, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-300 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <Logo className="h-8 w-8 drop-shadow-sm text-indigo-600" />
                            <span className="font-bold text-xl text-gray-900 tracking-tight mb-1.5">DetectAI</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium transition-colors">
                                    <PieChart className="h-4 w-4" /> Dashboard
                                </Link>
                                <Link to="/detect" className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium transition-colors">
                                    <ScanText className="h-4 w-4" /> Detect
                                </Link>
                                <Link to="/history" className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium transition-colors">
                                    <Clock3 className="h-4 w-4" /> History
                                </Link>
                                {user.isAdmin && (
                                    <Link to="/admin-dashboard" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors border-l pl-4 border-gray-300">
                                        <ShieldCheck className="h-4 w-4" /> Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg font-medium transition-all"
                                >
                                    <Power className="h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
