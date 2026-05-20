import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setUser({
                        token,
                        username: decoded.sub || decoded.username,
                        isAdmin: decoded.is_superuser === true
                    });
                } catch (err) {
                    console.error("Failed to decode token", err);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (email, password) => {
        // FastAPI is expecting a JSON payload (LoginRequest)
        const response = await api.post('/auth/login', {
            username: email,
            password: password
        });

        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            const decoded = jwtDecode(response.data.access_token);
            setUser({
                token: response.data.access_token,
                username: decoded.sub || decoded.username,
                isAdmin: decoded.is_superuser === true
            });
            return true;
        }
        return false;
    };

    const register = async (username, email, password) => {
        const response = await api.post('/auth/register', { username, email, password });
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
