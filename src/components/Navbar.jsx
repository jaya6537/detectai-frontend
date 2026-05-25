import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Power, PieChart, Clock3, ScanText, ShieldCheck, Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                            <Logo className="h-8 w-8 drop-shadow-sm text-indigo-600" />
                            <span className="font-bold text-xl text-gray-900 tracking-tight mb-1.5">DetectAI</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
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

                    {/* Mobile Hamburger Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Overlay */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md absolute w-full left-0 shadow-lg animate-in slide-in-from-top-4 duration-200">
                    <div className="px-4 pt-2 pb-6 space-y-3">
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all"
                                >
                                    <PieChart className="h-5 w-5 text-gray-500" /> Dashboard
                                </Link>
                                <Link
                                    to="/detect"
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all"
                                >
                                    <ScanText className="h-5 w-5 text-gray-500" /> Detect
                                </Link>
                                <Link
                                    to="/history"
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all"
                                >
                                    <Clock3 className="h-5 w-5 text-gray-500" /> History
                                </Link>
                                {user.isAdmin && (
                                    <Link
                                        to="/admin-dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all border-t border-gray-100 pt-3"
                                    >
                                        <ShieldCheck className="h-5 w-5 text-gray-500" /> Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2.5 rounded-xl font-medium transition-all border border-gray-200 hover:border-red-100"
                                >
                                    <Power className="h-5 w-5 text-gray-500 group-hover:text-red-500" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2 pt-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="text-center text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 px-4 py-2.5 rounded-xl font-medium transition-all border border-gray-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
