// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { loginUser } = useAuth();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(credentials);
    };

    return (
        <div>
            <h2>Přihlášení</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Heslo" required onChange={handleChange} />
                <button type="submit">Přihlásit se</button>
            </form>
        </div>
    );
};

export default LoginPage;