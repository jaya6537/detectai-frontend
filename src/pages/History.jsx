import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { Clock3, SearchCode, CalendarDays, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const History = () => {
    const { user: authUser } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div className="max-w-5xl mx-auto mt-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Clock3 className="h-8 w-8 text-indigo-600" />
                    Detection History
                </h1>
                <p className="text-gray-600 mt-2">Review all the texts you have previously analyzed.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden">
                {error && (
                    <div className="p-4 bg-yellow-50 text-yellow-800 border-b border-yellow-100 text-sm">
                        {error}
                    </div>
                )}

                <div className="p-4 border-b border-gray-300 bg-gray-50 flex justify-between items-center">
                    <div className="relative w-64">
                        <SearchCode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search texts..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Text Snippet</th>
                                {authUser?.isAdmin && <th className="px-6 py-4 font-medium">Author</th>}
                                <th className="px-6 py-4 font-medium">Prediction</th>
                                <th className="px-6 py-4 font-medium">Confidence</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={authUser?.isAdmin ? 5 : 4} className="px-6 py-8 text-center text-gray-500">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                                        Loading history...
                                    </td>
                                </tr>
                            ) : history.length === 0 ? (
                                <tr>
                                    <td colSpan={authUser?.isAdmin ? 5 : 4} className="px-6 py-12 text-center text-gray-500">
                                        <Clock3 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                        No detection history found.<br />
                                        Start analyzing texts to build your history!
                                    </td>
                                </tr>
                            ) : (
                                history.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4" />
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 max-w-sm truncate" title={item.input_text}>
                                            {item.input_text}
                                        </td>
                                        {authUser?.isAdmin && (
                                            <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                <span className="font-semibold text-gray-800">{item.author_username}</span>
                                            </td>
                                        )}
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${item.prediction === 'ai' || item.prediction === 'AI Generated' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                {item.prediction === 'ai' ? 'AI Generated' : item.prediction === 'human' ? 'Human Written' : item.prediction}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
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
