// SOUBOR: src/pages/DashboardPage.jsx
// ----------------------------------------------------
// UPRAVENÁ VERZE: Tato stránka nyní načítá a zobrazuje scénáře
// přiřazené přihlášenému studentovi.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppwriteConfig } from '../config';
import { databases, Query } from '../appwriteConfig';

const DashboardPage = () => {
    const { user, logoutUser } = useAuth();
    
    // Nové stavy pro načítání a ukládání dat pro studenta
    const [assignedScenarios, setAssignedScenarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect se spustí, když je k dispozici informace o uživateli
    useEffect(() => {
        // Načítáme data pouze pokud je uživatel student
        if (user && user.prefs.role === 'student') {
            fetchMyScenarios();
        } else {
            // Pokud je to admin nebo nikdo, nic nenačítáme
            setIsLoading(false);
        }
    }, [user]); // Závislost na 'user', aby se funkce spustila, až bude user načtený

    /**
     * Načte scénáře přiřazené aktuálnímu studentovi.
     */
    const fetchMyScenarios = async () => {
        setIsLoading(true);
        try {
            // Krok 1: Najdeme všechny záznamy v 'assignments', které patří mně
            const assignmentsResponse = await databases.listDocuments(
                AppwriteConfig.DATABASE_ID,
                AppwriteConfig.ASSIGNMENTS_COLLECTION_ID,
                [
                    Query.equal('userId', user.$id) // Klíčový dotaz: 'userId' se musí rovnat mému ID
                ]
            );

            const myAssignments = assignmentsResponse.documents;

            if (myAssignments.length === 0) {
                // Pokud nemám žádné přiřazené scénáře, skončíme
                setAssignedScenarios([]);
                setIsLoading(false);
                return;
            }

            // Krok 2: Získáme seznam IDček všech mých scénářů
            const scenarioIds = myAssignments.map(assignment => assignment.scenarioId);

            // Krok 3: Načteme detaily všech scénářů podle jejich IDček
            const scenariosResponse = await databases.listDocuments(
                AppwriteConfig.DATABASE_ID,
                AppwriteConfig.SCENARIOS_COLLECTION_ID,
                [
                    Query.equal('$id', scenarioIds) // Dotaz na více hodnot najednou
                ]
            );

            setAssignedScenarios(scenariosResponse.documents);

        } catch (error) {
            console.error("Chyba při načítání mých scénářů:", error);
            alert("Nepodařilo se načíst vaše scénáře.");
        }
        setIsLoading(false);
    };

    if (!user) {
        return <p>Načítání...</p>;
    }

    return (
        <div>
            <h1>Vítej na hlavní stránce, {user.name}!</h1>
            <p>Tvoje role: {user.prefs.role || 'student'}</p>
            <hr style={{ margin: '1em 0' }} />

            {/* Část pro admina zůstává stejná */}
            {user.prefs.role === 'admin' && (
                <div style={{ marginBottom: '1em' }}>
                    <Link to="/admin">
                        <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', cursor: 'pointer' }}>
                            Přejít do Admin Panelu
                        </button>
                    </Link>
                </div>
            )}

            {/* Nová část pro studenta */}
            {user.prefs.role === 'student' && (
                <section>
                    <h2>Moje přiřazené scénáře</h2>
                    {isLoading ? (
                        <p>Načítám scénáře...</p>
                    ) : (
                        <div>
                            {assignedScenarios.length > 0 ? (
                                assignedScenarios.map(scenario => (
                                    // ZMĚNA ZDE: Použijeme Link místo div
                                    <Link to={`/scenario/${scenario.$id}`} key={scenario.$id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em', cursor: 'pointer' }}>
                                            <h3>{scenario.name}</h3>
                                            <p>{scenario.description}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>Zatím ti nebyly přiřazeny žádné scénáře. Zeptej se svého vyučujícího.</p>
                            )}
                        </div>
                    )}
                </section>
            )}
            
            <div style={{ marginTop: '2em' }}>
                <button onClick={logoutUser}>Odhlásit se</button>
            </div>
        </div>
    );
};

export default DashboardPage;
