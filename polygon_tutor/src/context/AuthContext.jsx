// SOUBOR 2: src/context/AuthContext.jsx
// ------------------------------------
// Tento soubor vytváří globální kontext pro správu autentizace.
// Díky němu bude jakákoliv komponenta v aplikaci vědět, zda je uživatel přihlášen,
// a bude mít přístup k funkcím pro přihlášení, registraci a odhlášení.

import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { account, ID } from '../appwriteConfig'; // Importujeme z našeho konfiguračního souboru

// Vytvoření kontextu
const AuthContext = createContext();

// Vytvoření "Providera" - komponenty, která bude obalovat naši aplikaci
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Při prvním načtení aplikace zkontrolujeme, zda už není aktivní session
    useEffect(() => {
        checkUserStatus();
    }, []);

    /**
     * Zkontroluje stav přihlášení uživatele.
     */
    const checkUserStatus = async () => {
        try {
            const currentUser = await account.get();
            console.log('🔐 AuthContext: Načten uživatel:', currentUser);
            console.log('   User ID:', currentUser.$id);
            console.log('   Email:', currentUser.email);
            console.log('   Name:', currentUser.name);
            setUser(currentUser);
        } catch (error) {
            console.log('❌ AuthContext: Uživatel není přihlášen');
            setUser(null); // Pokud nastane chyba (např. 401), uživatel není přihlášen
        }
        setLoading(false);
    };

    /**
     * Přihlásí uživatele pomocí emailu a hesla.
     * @param {object} userInfo - Objekt obsahující email a heslo.
     */
    const loginUser = async (userInfo) => {
        setLoading(true);
        try {
            // Nejdřív zkontroluj, jestli už není aktivní session
            try {
                const existingUser = await account.get();
                if (existingUser) {
                    console.log('⚠️ Už je aktivní session, odhlašuji...');
                    await account.deleteSession('current');
                }
            } catch (error) {
                // Žádná aktivní session - to je OK
                console.log('✅ Žádná aktivní session');
            }

            // Teď vytvoř novou session
            await account.createEmailPasswordSession(userInfo.email, userInfo.password);
            const currentUser = await account.get();
            console.log('✅ Uživatel úspěšně přihlášen:', currentUser.email);
            setUser(currentUser);
            navigate('/'); // Přesměrování na domovskou stránku
        } catch (error) {
            console.error("Chyba při přihlašování:", error);
            alert("Přihlášení selhalo. Zkontrolujte prosím email a heslo.");
        }
        setLoading(false);
    };

    /**
     * Odhlásí aktuálního uživatele.
     */
    const logoutUser = async () => {
        await account.deleteSession('current');
        setUser(null);
        navigate('/login'); // Přesměrování na login stránku
    };

    /**
     * Zaregistruje nového uživatele a rovnou ho přihlásí.
     * @param {object} userInfo - Objekt obsahující jméno, email a heslo.
     */
    const registerUser = async (userInfo) => {
        setLoading(true);
        try {
            await account.create(ID.unique(), userInfo.email, userInfo.password, userInfo.name);
            // Po úspěšné registraci uživatele rovnou přihlásíme
            await loginUser(userInfo);
        } catch (error) {
            console.error("Chyba při registraci:", error);
            alert("Registrace selhala. Uživatel s tímto emailem již může existovat.");
        }
        setLoading(false);
    };

    // Data, která poskytneme všem komponentám v aplikaci
    const contextData = {
        user,
        loading,
        loginUser,
        logoutUser,
        registerUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Načítání aplikace...</p> : children}
        </AuthContext.Provider>
    );
};

/**
 * Vlastní "hook" pro snadnější přístup k datům z kontextu.
 * Místo `useContext(AuthContext)` budeme v komponentách psát jen `useAuth()`.
 */
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
