import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { Clock3, SearchCode, CalendarDays, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const History = () => {
    const { user: authUser } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/history'); // Assuming backend has this endpoint
                setHistory(response.data);
            } catch (err) {
                setError("Failed to load detection history. Note: The backend may not have this endpoint implemented yet.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const filteredHistory = history.filter(item => 
        item.input_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.author_username && item.author_username.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-5xl mx-auto mt-4 sm:mt-8 px-4">
            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
                    <Clock3 className="h-7 w-7 sm:h-8 sm:w-8 text-indigo-600" />
                    Detection History
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">Review all the texts you have previously analyzed.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {error && (
                    <div className="p-4 bg-yellow-50 text-yellow-800 border-b border-yellow-100 text-sm">
                        {error}
                    </div>
                )}

                <div className="p-4 border-b border-gray-250 bg-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-64">
                        <SearchCode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search history..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 font-medium">
                        Total records: {filteredHistory.length}
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[650px]">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs sm:text-sm uppercase tracking-wider border-b border-gray-150">
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Text Snippet</th>
                                {authUser?.isAdmin && <th className="px-6 py-4 font-semibold">Author</th>}
                                <th className="px-6 py-4 font-semibold">Prediction</th>
                                <th className="px-6 py-4 font-semibold">Confidence</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={authUser?.isAdmin ? 5 : 4} className="px-6 py-12 text-center text-gray-500">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                                        Loading history...
                                    </td>
                                </tr>
                            ) : filteredHistory.length === 0 ? (
                                <tr>
                                    <td colSpan={authUser?.isAdmin ? 5 : 4} className="px-6 py-12 text-center text-gray-400 text-sm">
                                        <Clock3 className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                        No detection history found.<br />
                                        Start analyzing texts to build your history!
                                    </td>
                                </tr>
                            ) : (
                                filteredHistory.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-xs sm:text-sm text-gray-500">
                                            <span className="flex items-center gap-1.5 whitespace-nowrap">
                                                <CalendarDays className="h-4 w-4 text-gray-400" />
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs sm:text-sm text-gray-900 max-w-[150px] sm:max-w-xs md:max-w-md truncate" title={item.input_text}>
                                            {item.input_text}
                                        </td>
                                        {authUser?.isAdmin && (
                                            <td className="px-6 py-4 text-xs sm:text-sm text-gray-600">
                                                <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                                                    <User className="h-4 w-4 text-gray-400" />
                                                    {item.author_username}
                                                </span>
                                            </td>
                                        )}
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${item.prediction === 'ai' || item.prediction === 'AI Generated' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                                                {item.prediction === 'ai' ? 'AI Generated' : item.prediction === 'human' ? 'Human Written' : item.prediction}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs sm:text-sm font-bold text-gray-900">
                                            {(item.confidence * 100).toFixed(1)}%
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default History;
