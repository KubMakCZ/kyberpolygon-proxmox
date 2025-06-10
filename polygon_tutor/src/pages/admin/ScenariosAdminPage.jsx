// SOUBOR: src/pages/admin/ScenariosAdminPage.jsx
// ----------------------------------------------------
// UPRAVENÁ VERZE: Využívá centrální konfigurační soubor.

import React, { useState, useEffect } from 'react';

// Importujeme naši centrální konfiguraci a služby Appwrite
import { AppwriteConfig } from '../../config';
import { databases, ID, Query } from '../../appwriteConfig';

const ScenariosAdminPage = () => {
    // Seznamy dat z databáze
    const [scenarios, setScenarios] = useState([]);
    const [manuals, setManuals] = useState([]);
    const [vms, setVms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Stavy pro formulář
    const [newScenarioName, setNewScenarioName] = useState('');
    const [newScenarioDesc, setNewScenarioDesc] = useState('');
    const [selectedManualId, setSelectedManualId] = useState('');
    const [selectedVmIds, setSelectedVmIds] = useState([]); // Pole pro více VM

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [scenariosResponse, manualsResponse, vmsResponse] = await Promise.all([
                databases.listDocuments(AppwriteConfig.DATABASE_ID, AppwriteConfig.SCENARIOS_COLLECTION_ID, [Query.orderDesc('$createdAt')]),
                databases.listDocuments(AppwriteConfig.DATABASE_ID, AppwriteConfig.MANUALS_COLLECTION_ID, [Query.limit(100)]),
                databases.listDocuments(AppwriteConfig.DATABASE_ID, AppwriteConfig.VMS_COLLECTION_ID, [Query.limit(100)])
            ]);
            setScenarios(scenariosResponse.documents);
            setManuals(manualsResponse.documents);
            setVms(vmsResponse.documents);
        } catch (error) {
            console.error("Chyba při načítání dat pro scénáře:", error);
            alert('Nepodařilo se načíst potřebná data.');
        }
        setIsLoading(false);
    };
    
    // Handler pro výběr více VM
    const handleVmSelection = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedVmIds(selectedOptions);
    };

    const handleCreateScenario = async (e) => {
        e.preventDefault();
        if (!newScenarioName || !selectedManualId || selectedVmIds.length === 0) {
            alert('Prosím, vyplňte název, vyberte návod a alespoň jeden virtuální stroj.');
            return;
        }

        try {
            await databases.createDocument(
                AppwriteConfig.DATABASE_ID,
                AppwriteConfig.SCENARIOS_COLLECTION_ID,
                ID.unique(),
                {
                    name: newScenarioName,
                    description: newScenarioDesc,
                    manualId: selectedManualId,
                    requiredVmIds: selectedVmIds
                }
            );

            alert('Scénář byl úspěšně vytvořen!');
            setNewScenarioName('');
            setNewScenarioDesc('');
            setSelectedManualId('');
            setSelectedVmIds([]);
            fetchAllData();

        } catch (error) {
            console.error("Chyba při vytváření scénáře:", error);
            alert('Vytvoření scénáře selhalo.');
        }
    };

    if (isLoading) {
        return <p>Načítám data...</p>;
    }

    return (
        <div>
            <h3>Správa Scénářů</h3>

            <section style={{ marginBottom: '2em', padding: '1em', border: '1px solid #ccc' }}>
                <h4>Vytvořit nový scénář</h4>
                <form onSubmit={handleCreateScenario}>
                    <div>
                        <label>Název scénáře: </label>
                        <input type="text" value={newScenarioName} onChange={(e) => setNewScenarioName(e.target.value)} required />
                    </div>
                    <div style={{ marginTop: '0.5em' }}>
                        <label>Popis: </label>
                        <textarea value={newScenarioDesc} onChange={(e) => setNewScenarioDesc(e.target.value)} />
                    </div>
                    <div style={{ marginTop: '0.5em' }}>
                        <label>Vyberte návod: </label>
                        <select value={selectedManualId} onChange={(e) => setSelectedManualId(e.target.value)} required>
                            <option value="">-- Návod --</option>
                            {manuals.map(manual => (
                                <option key={manual.$id} value={manual.$id}>{manual.title}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ marginTop: '0.5em' }}>
                        <label>Vyberte potřebné VM (držte Ctrl/Cmd pro výběr více): </label>
                        <select multiple value={selectedVmIds} onChange={handleVmSelection} required style={{ height: '150px' }}>
                             {vms.map(vm => (
                                <option key={vm.$id} value={vm.$id}>{vm.name} (ID: {vm.proxmox_vmid})</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" style={{ marginTop: '1em' }}>Vytvořit scénář</button>
                </form>
            </section>

            <section>
                <h4>Seznam existujících scénářů</h4>
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Název</th>
                            <th>Popis</th>
                            <th>Počet VM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scenarios.map(scenario => (
                            <tr key={scenario.$id}>
                                <td>{scenario.name}</td>
                                <td>{scenario.description}</td>
                                <td>{scenario.requiredVmIds.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                { !isLoading && scenarios.length === 0 && <p>Zatím nebyly vytvořeny žádné scénáře.</p> }
            </section>
        </div>
    );
};

export default ScenariosAdminPage;
