// src/components/AdminRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { teams } from '../appwriteConfig';
import { AppwriteConfig } from '../config';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState(null); // null = checking, true = admin, false = not admin
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            console.log('🔍 AdminRoute: Kontroluji admin status...');
            console.log('👤 User object:', user);

            if (!user) {
                console.log('❌ User není přihlášen');
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            console.log('✅ User je přihlášen, User ID:', user.$id);
            console.log('🎯 Admin Team ID:', AppwriteConfig.ADMINS_TEAM_ID);

            try {
                // Zkontroluj, jestli je uživatel členem Admin týmu
                console.log('📡 Načítám členství v Admin týmu...');
                const memberships = await teams.listMemberships(AppwriteConfig.ADMINS_TEAM_ID);
                console.log('📋 Všechna členství v Admin týmu:', memberships);
                console.log('📊 Počet členů:', memberships.memberships.length);

                memberships.memberships.forEach((membership, index) => {
                    console.log(`   Člen ${index + 1}:`, {
                        userId: membership.userId,
                        userName: membership.userName,
                        userEmail: membership.userEmail
                    });
                });

                const isMember = memberships.memberships.some(membership => membership.userId === user.$id);
                console.log(`🔐 Je uživatel ${user.$id} admin?`, isMember);
                setIsAdmin(isMember);
            } catch (error) {
                console.error('❌ Chyba při kontrole admin oprávnění:', error);
                console.error('Detail chyby:', error.message);
                console.error('Full error:', error);
                setIsAdmin(false);
            }
            setLoading(false);
        };

        checkAdminStatus();
    }, [user]);

    if (loading) {
        return <p>Kontroluji oprávnění...</p>;
    }

    if (isAdmin) {
        return children;
    }

    // V ostatních případech (nepřihlášen nebo není admin) přesměruj na domovskou stránku.
    return <Navigate to="/" />;
};

export default AdminRoute;