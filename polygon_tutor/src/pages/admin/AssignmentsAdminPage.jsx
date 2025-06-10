// SOUBOR 1: Vytvořte nový soubor src/pages/admin/AssignmentsAdminPage.jsx
// -------------------------------------------------------------------------
// Tato komponenta slouží k přiřazování scénářů uživatelům.

import React, { useState, useEffect } from 'react';
import { databases, teams, ID, Query } from '../../appwriteConfig';

// DŮLEŽITÉ: Nahraďte je vašimi skutečnými hodnotami!
const DATABASE_ID = 'ID_VAŠÍ_DATABÁZE';
const SCENARIOS_COLLECTION_ID = 'scenarios';
const ASSIGNMENTS_COLLECTION_ID = 'assignments';

const AssignmentsAdminPage = () => {
    const [users, setUsers] = useState([]);
    const [scenarios, setScenarios] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Stavy pro formulář
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedScenarioId, setSelectedScenarioId] = useState('');

    useEffect(() => {
        // Načteme všechny potřebné data najednou
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            // Promise.all umožňuje spustit více asynchronních operací najednou
            const [usersResponse, scenariosResponse, assignmentsResponse] = await Promise.all([
                teams.listMemberships('ID_TÝMU_STUDENTS'), // Načteme jen členy týmu 'Students'
                databases.listDocuments(DATABASE_ID, SCENARIOS_COLLECTION_ID, [Query.limit(100)]),
                databases.listDocuments(DATABASE_ID, ASSIGNMENTS_COLLECTION_ID, [Query.limit(100), Query.orderDesc('$createdAt')])
            ]);
            setUsers(usersResponse.memberships);
            setScenarios(scenariosResponse.documents);
            setAssignments(assignmentsResponse.documents);

        } catch (error) {
            console.error("Chyba při načítání dat:", error);
            alert('Nepodařilo se načíst data pro přiřazování.');
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
                DATABASE_ID,
                ASSIGNMENTS_COLLECTION_ID,
                ID.unique(),
                {
                    userId: selectedUserId,
                    scenarioId: selectedScenarioId,
                    assigned_at: new Date().toISOString(),
                    status: 'active'
                }
            );
            alert('Scénář byl úspěšně přiřazen!');
            fetchAllData(); // Obnovíme seznam přiřazení

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

            <section style={{ marginBottom: '2em', padding: '1em', border: '1px solid #ccc' }}>
                <h4>Přiřadit nový scénář</h4>
                <form onSubmit={handleAssignScenario}>
                    <div>
                        <label>Vyberte studenta: </label>
                        <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} required>
                            <option value="">-- Student --</option>
                            {users.map(user => (
                                <option key={user.userId} value={user.userId}>{user.userName} ({user.userEmail})</option>
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
                            // Najdeme jména podle ID pro lepší zobrazení
                            const user = users.find(u => u.userId === assignment.userId);
                            const scenario = scenarios.find(s => s.$id === assignment.scenarioId);
                            return (
                                <tr key={assignment.$id}>
                                    <td>{user ? user.userName : assignment.userId}</td>
                                    <td>{scenario ? scenario.name : assignment.scenarioId}</td>
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
