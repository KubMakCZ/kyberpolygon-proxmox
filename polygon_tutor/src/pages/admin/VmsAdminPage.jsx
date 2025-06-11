// SOUBOR: src/pages/admin/VmsAdminPage.jsx
// ----------------------------------------------------
// UPRAVENÁ VERZE: Využívá centrální konfigurační soubor.

import React, { useState, useEffect } from 'react';

// Importujeme naši centrální konfiguraci a služby Appwrite
import { AppwriteConfig } from '../../config';
import { databases, ID, Query } from '../../appwriteConfig';

const VmsAdminPage = () => {
    const [vms, setVms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Stavy pro formulář
    const [newVmName, setNewVmName] = useState('');
    const [newVmDescription, setNewVmDescription] = useState('');
    const [newVmId, setNewVmId] = useState('');

    useEffect(() => {
        fetchVms();
    }, []);

    const fetchVms = async () => {
        setIsLoading(true);
        try {
            const response = await databases.listDocuments(
                AppwriteConfig.DATABASE_ID,
                AppwriteConfig.VMS_COLLECTION_ID,
                [Query.orderDesc('$createdAt')]
            );
            setVms(response.documents);
        } catch (error) {
            console.error("Chyba při načítání VM:", error);
            alert('Nepodařilo se načíst virtuální stroje.');
        }
        setIsLoading(false);
    };

    const handleCreateVm = async (e) => {
        e.preventDefault();
        if (!newVmName || !newVmId) {
            alert('Prosím, vyplňte název a Proxmox VM ID.');
            return;
        }

        try {
            await databases.createDocument(
                AppwriteConfig.DATABASE_ID,
                AppwriteConfig.VMS_COLLECTION_ID,
                ID.unique(),
                {
                    name: newVmName,
                    description: newVmDescription,
                    proxmox_vmid: parseInt(newVmId, 10),
                    status: 'available',
                }
            );

            alert('Záznam o VM byl úspěšně vytvořen!');
            setNewVmName('');
            setNewVmDescription('');
            setNewVmId('');
            fetchVms();

        } catch (error) {
            console.error("Chyba při vytváření záznamu o VM:", error);
            alert('Vytvoření záznamu o VM se nezdařilo.');
        }
    };

    return (
        <div>
            <h3>Správa Virtuálních Strojů</h3>

            <section style={{ marginBottom: '2em', padding: '1em', border: '1px solid #ccc' }}>
                <h4>Přidat nový virtuální stroj</h4>
                <form onSubmit={handleCreateVm}>
                    <div>
                        <label>Název VM (např. "Kali Linux - Pentest"): </label>
                        <input
                            type="text"
                            value={newVmName}
                            onChange={(e) => setNewVmName(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginTop: '0.5em' }}>
                        <label>Proxmox VM ID (číslo): </label>
                        <input
                            type="number"
                            value={newVmId}
                            onChange={(e) => setNewVmId(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginTop: '0.5em' }}>
                        <label>Popis: </label>
                        <textarea
                            value={newVmDescription}
                            onChange={(e) => setNewVmDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit" style={{ marginTop: '1em' }}>Přidat VM</button>
                </form>
            </section>

            <section>
                <h4>Seznam existujících VM</h4>
                {isLoading ? (
                    <p>Načítám...</p>
                ) : (
                    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>Název</th>
                                <th>Proxmox ID</th>
                                <th>Status</th>
                                <th>Datum vytvoření</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vms.map(vm => (
                                <tr key={vm.$id}>
                                    <td>{vm.name}</td>
                                    <td>{vm.proxmox_vmid}</td>
                                    <td>{vm.status}</td>
                                    <td>{new Date(vm.$createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                 { !isLoading && vms.length === 0 && <p>Zatím nebyly přidány žádné VM.</p> }
            </section>
        </div>
    );
};

export default VmsAdminPage;
