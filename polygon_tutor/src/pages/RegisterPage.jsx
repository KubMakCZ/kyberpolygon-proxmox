// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const { registerUser } = useAuth();
    const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(userInfo);
    };

    return (
        <div>
            <h2>Registrace</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Jméno" required onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Heslo" required onChange={handleChange} />
                <button type="submit">Zaregistrovat se</button>
            </form>
        </div>
    );
};

export default RegisterPage;