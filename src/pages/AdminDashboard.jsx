import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import { Users, Trash2, Power, ShieldCheck, Search, Database, Play, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [modelStatus, setModelStatus] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/admin/users');
            setUsers(response.data);
            setError(null);
        } catch (err) {
            setError("Failed to load users. Ensure you have admin privileges.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchModelStatus = async () => {
        try {
            const response = await api.get('/admin/models/status');
            setModelStatus(response.data);
        } catch (err) {
            console.error("Failed to fetch model status", err);
        }
    };

    useEffect(() => {
        if (user?.isAdmin) {
            fetchUsers();
            fetchModelStatus();
            
            // Poll model status every 5 seconds
            const interval = setInterval(fetchModelStatus, 5000);
            return () => clearInterval(interval);
        }
    }, [user]);

    const handleTrainModel = async (modelName) => {
        try {
            await api.post('/admin/models/train', { model: modelName });
            fetchModelStatus(); // Optimistically update local polling instantly
        } catch (err) {
            alert(err.response?.data?.detail || `Failed to start training for ${modelName}`);
        }
    };

    const toggleStatus = async (userId, currentStatus) => {
        try {
            await api.patch(`/admin/users/${userId}/status?is_active=${!currentStatus}`);
            // Optimistically update the UI
            setUsers(users.map(u => u.id === userId ? { ...u, is_active: !currentStatus } : u));
        } catch (err) {
            alert(err.response?.data?.detail || "Failed to update user status");
        }
    };

    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to permanently delete this user?")) return;
        try {
            await api.delete(`/admin/users/${userId}`);
            // Optimistically update the UI
            setUsers(users.filter(u => u.id !== userId));
        } catch (err) {
            alert(err.response?.data?.detail || "Failed to delete user");
        }
    };

    if (!user?.isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <ShieldCheck className="h-8 w-8 text-indigo-600" />
                    Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-2">Manage users and global system status.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden">
                {error && (
                    <div className="p-4 bg-red-50 text-red-700 border-b border-red-100 text-sm">
                        {error}
                    </div>
                )}

                <div className="p-4 border-b border-gray-300 bg-gray-50 flex justify-between items-center">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="text-sm text-gray-500 font-medium tracking-wide flex items-center gap-2">
                        <Users className="h-4 w-4" /> Total Users: {users.length}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">ID</th>
                                <th className="px-6 py-4 font-medium">User Details</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                                        Fetching users...
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                        No users found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            #{u.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold text-gray-900">{u.username}</div>
                                            <div className="text-xs text-gray-500">{u.email || 'No email provided'}</div>
                                            <div className="text-xs text-gray-400 mt-1">Joined: {new Date(u.created_at).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {u.is_superuser ? (
                                                <span className="px-2 py-1 text-xs font-semibold rounded-md bg-purple-100 text-purple-700">Admin</span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-600">User</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${u.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {u.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2 flex justify-end gap-2">
                                            {!u.is_superuser && (
                                                <>
                                                    <button
                                                        onClick={() => toggleStatus(u.id, u.is_active)}
                                                        className={`p-2 rounded-lg border text-sm flex items-center justify-center transition-colors ${u.is_active ? 'border-yellow-200 text-yellow-600 hover:bg-yellow-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}
                                                        title={u.is_active ? "Deactivate User" : "Activate User"}
                                                    >
                                                        <Power className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteUser(u.id)}
                                                        className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm flex items-center justify-center transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Model Management Section */}
            <div className="mt-10 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-5">
                    <Database className="h-6 w-6 text-indigo-600" />
                    Model Management
                </h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* HYBRID Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-indigo-200 p-8 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Active Neural Spec</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                Unified BERT-T5 Hybrid Architecture
                                {modelStatus?.hybrid?.is_training && (
                                    <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
                                        Training Active
                                    </span>
                                )}
                            </h3>
                            <p className="text-gray-600 mt-3 text-base leading-relaxed max-w-3xl">Combines BERT contextual embeddings with T5 text-to-text generative understanding for maximum precision mapping. Expected detection accuracy: 89%-91%.</p>
                            
                            {/* Neural Network Abstract Architecture Animation (Visible only when training) */}
                            {modelStatus?.hybrid?.is_training && (
                                <div className="mt-8 flex items-center justify-center gap-3 py-6 bg-gradient-to-r from-gray-50 via-indigo-50/30 to-gray-50 rounded-xl border border-gray-100 relative overflow-hidden">
                                    {/* Background decorative pulse */}
                                    <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl animate-pulse -translate-y-1/2" style={{ animationDelay: '1s' }}></div>

                                    {/* BERT Node */}
                                    <div className="flex flex-col items-center gap-2 z-10">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.6)] animate-pulse">
                                            <div className="w-3 h-3 rounded-full bg-white animate-ping"></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">BERT Embeds</span>
                                    </div>

                                    {/* Data Stream 1 */}
                                    <div className="flex space-x-1.5 z-10">
                                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>

                                    {/* Linear Bridge Node */}
                                    <div className="flex flex-col items-center gap-2 z-10">
                                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.6)] animate-pulse" style={{ animationDelay: '500ms' }}>
                                            <div className="w-3 h-3 rounded-full bg-white"></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest">Linear Bridge</span>
                                    </div>

                                    {/* Data Stream 2 */}
                                    <div className="flex space-x-1.5 z-10">
                                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '450ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '750ms' }}></div>
                                    </div>

                                    {/* T5 Node */}
                                    <div className="flex flex-col items-center gap-2 z-10">
                                        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.6)] animate-pulse" style={{ animationDelay: '1000ms' }}>
                                            <div className="w-3 h-3 rounded-full bg-white animate-ping" style={{ animationDelay: '1000ms' }}></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-purple-700 uppercase tracking-widest">T5 Decode</span>
                                    </div>
                                </div>
                            )}

                            {/* Hacker Terminal Log Stream */}
                            <div className="mt-8 relative overflow-hidden rounded-xl border border-gray-800 bg-gray-950 shadow-2xl">
                                {/* Mac OS Header style */}
                                <div className="flex items-center px-4 py-2 border-b border-gray-800 bg-[#0f111a]">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <span className="ml-4 text-xs text-gray-500 font-mono tracking-wider">root@neural-cluster:~/train_hybrid.py</span>
                                </div>
                                
                                {/* Terminal Content */}
                                <div className="p-5 min-h-[120px] relative font-mono">
                                    {/* If training is active, add a glowing scanline element */}
                                    {modelStatus?.hybrid?.is_training && (
                                        <div className="absolute inset-0 bg-green-500/[0.03] animate-pulse pointer-events-none"></div>
                                    )}
                                    
                                    <p className={`text-sm leading-relaxed whitespace-pre-wrap break-words ${modelStatus?.hybrid?.is_training ? 'text-green-400 font-medium' : 'text-gray-400'}`}>
                                        {modelStatus?.hybrid?.last_result || "Standing by for model compilation instructions..."}
                                    </p>
                                    
                                    {/* Blinking cursor if training */}
                                    {modelStatus?.hybrid?.is_training && (
                                        <span className="inline-block w-2.5 h-4 bg-green-400 ml-1 animate-pulse align-middle shadow-[0_0_8px_rgba(74,222,128,1)]"></span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleTrainModel('hybrid')}
                            disabled={modelStatus?.hybrid?.is_training}
                            className={`mt-8 w-full md:w-auto self-start py-3 px-8 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${modelStatus?.hybrid?.is_training ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'}`}
                        >
                            {modelStatus?.hybrid?.is_training ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" /> Compiling Hybrid Model...
                                </>
                            ) : (
                                <>
                                    <Play className="h-5 w-5 fill-current" /> Start Full-Scale Hybrid Fine-tuning
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
