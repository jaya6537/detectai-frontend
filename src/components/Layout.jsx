import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
                <Outlet />
            </main>
            <footer className="bg-white border-t border-gray-200 mt-auto py-6">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Generative AI Text Detection System. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
