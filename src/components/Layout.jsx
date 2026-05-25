import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 md:py-8 lg:px-8 lg:py-10">
                <Outlet />
            </main>
            <footer className="bg-white border-t border-gray-200 mt-auto py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-gray-500 text-sm">
                    <span>&copy; {new Date().getFullYear()} Generative AI Text Detection System. All rights reserved.</span>
                    <span className="text-xs text-gray-400">Powered by BERT & T5 Pipelines</span>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
