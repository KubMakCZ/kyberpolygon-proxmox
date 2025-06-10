// SOUBOR: src/pages/admin/AssignmentsAdminPage.jsx
// -------------------------------------------------------------------------
// Finální verze, která volá naši funkční serverovou funkci 'getStudents'
// a správně zpracovává její JSON odpověď.

import React, { useState, useEffect } from 'react';

// Importujeme naši centrální konfiguraci a potřebné služby Appwrite
import { AppwriteConfig } from '../../config';
import { databases, functions, ID, Query } from '../../appwriteConfig';

const AssignmentsAdminPage = () => {
    const [users, setUsers] = useState([]);
    const [scenarios, setScenarios] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedScenarioId, setSelectedScenarioId] = useState('');

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [usersFunctionResponse, scenariosResponse, assignmentsResponse] = await Promise.all([
                // 1. Zavoláme naši serverovou funkci podle jejího ID z configu
                functions.createExecution(AppwriteConfig.GET_STUDENTS_FUNCTION_ID),
                
                // Tyto části zůstávají stejné
                databases.listDocuments(AppwriteConfig.DATABASE_ID, AppwriteConfig.SCENARIOS_COLLECTION_ID, [Query.limit(100)]),
                databases.listDocuments(AppwriteConfig.DATABASE_ID, AppwriteConfig.ASSIGNMENTS_COLLECTION_ID, [Query.limit(100), Query.orderDesc('$createdAt')])
            ]);

            // 2. OPRAVA: Nejdříve zkontrolujeme, zda spuštění funkce neselhalo
            if (usersFunctionResponse.status === 'failed') {
                throw new Error(`Provedení serverové funkce selhalo: ${usersFunctionResponse.errors}`);
            }

            // 3. OPRAVA: Zpracováváme odpověď z vlastnosti 'responseBody', ne 'response'
            // Odpověď je text (string), musíme ji převést na JSON objekt
            const usersResult = JSON.parse(usersFunctionResponse.responseBody);
            
            // 4. Zkontrolujeme, zda operace UVNITŘ funkce byla úspěšná
            if (!usersResult.success) {
                // Pokud ne, vyvoláme chybu se zprávou z funkce
                throw new Error(usersResult.message || 'Načtení studentů přes funkci selhalo.');
            }
            
            // 5. Pokud vše proběhlo v pořádku, uložíme data do stavu
            // Data jsou nyní uvnitř objektu, který vrací naše funkce
            setUsers(usersResult.data.memberships); 
            setScenarios(scenariosResponse.documents);
            setAssignments(assignmentsResponse.documents);

        } catch (error) {
            console.error("Chyba při načítání dat pro přiřazení:", error);
            alert('Nepodařilo se načíst data. Zkontrolujte konzoli pro detaily.');
        }
        setIsLoading(false);
    };

    const handleAssignScenario = async (e) => {
        e.preventDefault();
        if (!selectedUserId || !selectedScenarioId) {
            alert('Prosím, vyberte studenta i scénář.');
            return;
        }

        try {
            await databases.createDocument(
                AppwriteConfig.DATABASE_ID,
                AppwriteConfig.ASSIGNMENTS_COLLECTION_ID,
                ID.unique(),
                {
                    userId: selectedUserId,
                    scenarioId: selectedScenarioId,
                    assigned_at: new Date().toISOString(),
                    status: 'active'
                }
            );
            alert('Scénář byl úspěšně přiřazen!');
            fetchAllData();

        } catch (error) {
            console.error("Chyba při přiřazování scénáře:", error);
            alert('Přiřazení scénáře selhalo.');
        }
    };

    if (isLoading) {
        return <p>Načítám data...</p>;
    }

    return (
        <div>
            <h3>Přiřazení Scénářů</h3>
            
            {/* Formulář a tabulka zůstávají beze změny */}
            <section style={{ marginBottom: '2em', padding: '1em', border: '1px solid #ccc' }}>
                <h4>Přiřadit nový scénář</h4>
                <form onSubmit={handleAssignScenario}>
                    <div>
                        <label>Vyberte studenta: </label>
                        <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} required>
                            <option value="">-- Student --</option>
                            {users.map(userMembership => (
                                <option key={userMembership.userId} value={userMembership.userId}>{userMembership.userName} ({userMembership.userEmail})</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ marginTop: '0.5em' }}>
                        <label>Vyberte scénář: </label>
                        <select value={selectedScenarioId} onChange={(e) => setSelectedScenarioId(e.target.value)} required>
                            <option value="">-- Scénář --</option>
                            {scenarios.map(scenario => (
                                <option key={scenario.$id} value={scenario.$id}>{scenario.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" style={{ marginTop: '1em' }}>Přiřadit</button>
                </form>
            </section>

            <section>
                <h4>Seznam aktuálních přiřazení</h4>
                 <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Scénář</th>
                            <th>Datum přiřazení</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map(assignment => {
                            const user = users.find(u => u.userId === assignment.userId);
                            const scenario = scenarios.find(s => s.$id === assignment.scenarioId);
                            return (
                                <tr key={assignment.$id}>
                                    <td>{user ? user.userName : `Neznámý uživatel (${assignment.userId})`}</td>
                                    <td>{scenario ? scenario.name : `Neznámý scénář (${assignment.scenarioId})`}</td>
                                    <td>{new Date(assignment.assigned_at).toLocaleString()}</td>
                                    <td>{assignment.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {assignments.length === 0 && <p>Zatím nebyly provedeny žádné přiřazení.</p> }
            </section>
        </div>
    );
};

export default AssignmentsAdminPage;
