// SOUBOR 3: Nahraďte obsah souboru -> src/pages/admin/ManualsAdminPage.jsx
// -------------------------------------------------------------------------
// Toto je kompletní, opravená verze, která při nahrávání souboru nastavuje správná oprávnění.

import React, { useState, useEffect } from 'react';

// Importujeme vše potřebné, včetně Permission a Role
import { AppwriteConfig } from '../../config';
import { databases, storage, ID, Query, Permission, Role } from '../../appwriteConfig';

const ManualsAdminPage = () => {
    const [manuals, setManuals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [newManualTitle, setNewManualTitle] = useState('');
    const [newManualDescription, setNewManualDescription] = useState('');
    const [newManualFile, setNewManualFile] = useState(null);

    useEffect(() => {
        fetchManuals();
    }, []);

    const fetchManuals = async () => {
        setIsLoading(true);
        try {
            const response = await databases.listDocuments(
                AppwriteConfig.DATABASE_ID,
                AppwriteConfig.MANUALS_COLLECTION_ID,
                [Query.orderDesc('$createdAt')]
            );
            setManuals(response.documents);
        } catch (error) {
            console.error("Chyba při načítání návodů:", error);
            alert('Nepodařilo se načíst návody.');
        }
        setIsLoading(false);
    };

    const handleCreateManual = async (e) => {
        e.preventDefault();
        if (!newManualTitle || !newManualFile) {
            alert('Prosím, vyplňte název a vyberte soubor.');
            return;
        }

        // OPRAVA ZDE: Připravíme si pole oprávnění pro nový soubor
        const filePermissions = [
            // Dáme oprávnění ke čtení celému týmu studentů
            Permission.read(Role.team(AppwriteConfig.STUDENTS_TEAM_ID)),
            // Dáme plná oprávnění celému týmu adminů
            Permission.read(Role.team(AppwriteConfig.ADMINS_TEAM_ID)),
            Permission.update(Role.team(AppwriteConfig.ADMINS_TEAM_ID)),
            Permission.delete(Role.team(AppwriteConfig.ADMINS_TEAM_ID)),
        ];

        try {
            // Při nahrávání souboru předáme i pole oprávnění
            const fileResponse = await storage.createFile(
                AppwriteConfig.MANUALS_BUCKET_ID,
                ID.unique(),
                newManualFile,
                filePermissions // <-- Předáváme oprávnění zde
            );
            const fileId = fileResponse.$id;

            await databases.createDocument(
                AppwriteConfig.DATABASE_ID,
                AppwriteConfig.MANUALS_COLLECTION_ID,
                ID.unique(),
                {
                    title: newManualTitle,
                    description: newManualDescription,
                    markdownFileId: fileId,
                }
            );

            alert('Návod byl úspěšně vytvořen!');
            setNewManualTitle('');
            setNewManualDescription('');
            setNewManualFile(null);
            e.target.reset();
            fetchManuals();

        } catch (error) {
            console.error("Chyba při vytváření návodu:", error);
            alert('Vytvoření návodu se nezdařilo.');
        }
    };

    return (
        <div>
            <h3>Správa Návodů</h3>
            <section style={{ marginBottom: '2em', padding: '1em', border: '1px solid #ccc' }}>
                <h4>Vytvořit nový návod</h4>
                <form onSubmit={handleCreateManual}>
                    {/* Formulář zůstává stejný */}
                    <div><label>Název návodu: </label><input type="text" value={newManualTitle} onChange={(e) => setNewManualTitle(e.target.value)} required /></div>
                    <div style={{ marginTop: '0.5em' }}><label>Popis: </label><textarea value={newManualDescription} onChange={(e) => setNewManualDescription(e.target.value)} /></div>
                    <div style={{ marginTop: '0.5em' }}><label>Markdown soubor (.md): </label><input type="file" accept=".md" onChange={(e) => setNewManualFile(e.target.files[0])} required /></div>
                    <button type="submit" style={{ marginTop: '1em' }}>Vytvořit</button>
                </form>
            </section>
            <section>
                <h4>Seznam existujících návodů</h4>
                {/* Tabulka zůstává stejná */}
                {isLoading ? (<p>Načítám...</p>) : (<table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}><thead><tr><th>Název</th><th>Popis</th><th>Datum vytvoření</th><th>ID souboru</th></tr></thead><tbody>{manuals.map(manual => (<tr key={manual.$id}><td>{manual.title}</td><td>{manual.description}</td><td>{new Date(manual.$createdAt).toLocaleString()}</td><td>{manual.markdownFileId}</td></tr>))}</tbody></table>)}
                { !isLoading && manuals.length === 0 && <p>Zatím nebyly vytvořeny žádné návody.</p> }
            </section>
        </div>
    );
};

export default ManualsAdminPage;