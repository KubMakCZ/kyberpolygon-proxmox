// SOUBOR 1: Vytvořte nový soubor src/pages/admin/ManualsAdminPage.jsx
// --------------------------------------------------------------------
// Tato komponenta bude sloužit pro správu (zobrazení a vytváření) návodů.

import React, { useState, useEffect } from 'react';
import { databases, storage, ID, Query } from '../../appwriteConfig'; // Importujeme vše potřebné

// IDčka z vaší Appwrite konzole. DŮLEŽITÉ: Nahraďte je vašimi skutečnými hodnotami!
const DATABASE_ID = '6848263c000947667998'; // Např. 'hlavni-databaze'
const MANUALS_COLLECTION_ID = '684826720003c569ee5c';
const MANUALS_BUCKET_ID = '6848264a0012ede9eaab';

const ManualsAdminPage = () => {
    const [manuals, setManuals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Stavy pro formulář pro vytvoření nového návodu
    const [newManualTitle, setNewManualTitle] = useState('');
    const [newManualDescription, setNewManualDescription] = useState('');
    const [newManualFile, setNewManualFile] = useState(null);

    // Načtení existujících návodů při prvním renderu komponenty
    useEffect(() => {
        fetchManuals();
    }, []);

    const fetchManuals = async () => {
        setIsLoading(true);
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                MANUALS_COLLECTION_ID,
                [Query.orderDesc('$createdAt')] // Seřadíme od nejnovějšího
            );
            setManuals(response.documents);
        } catch (error) {
            console.error("Chyba při načítání návodů:", error);
            alert('Nepodařilo se načíst návody.');
        }
        setIsLoading(false);
    };

    // Funkce, která se spustí po odeslání formuláře
    const handleCreateManual = async (e) => {
        e.preventDefault();
        if (!newManualTitle || !newManualFile) {
            alert('Prosím, vyplňte název a vyberte soubor.');
            return;
        }

        try {
            // Krok 1: Nahrání .md souboru do Appwrite Storage
            console.log("Nahrávám soubor...");
            const fileResponse = await storage.createFile(
                MANUALS_BUCKET_ID,
                ID.unique(), // Vygeneruje unikátní ID pro soubor
                newManualFile
            );
            const fileId = fileResponse.$id;
            console.log("Soubor nahrán, ID:", fileId);

            // Krok 2: Vytvoření dokumentu v databázi s odkazem na soubor
            console.log("Vytvářím dokument v databázi...");
            await databases.createDocument(
                DATABASE_ID,
                MANUALS_COLLECTION_ID,
                ID.unique(),
                {
                    title: newManualTitle,
                    description: newManualDescription,
                    markdownFileId: fileId,
                }
            );
            console.log("Dokument vytvořen.");

            alert('Návod byl úspěšně vytvořen!');
            // Reset formuláře a znovu načtení seznamu
            setNewManualTitle('');
            setNewManualDescription('');
            setNewManualFile(null);
            e.target.reset(); // Vyčistí file input
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
                    <div>
                        <label>Název návodu: </label>
                        <input
                            type="text"
                            value={newManualTitle}
                            onChange={(e) => setNewManualTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginTop: '0.5em' }}>
                        <label>Popis: </label>
                        <textarea
                            value={newManualDescription}
                            onChange={(e) => setNewManualDescription(e.target.value)}
                        />
                    </div>
                    <div style={{ marginTop: '0.5em' }}>
                        <label>Markdown soubor (.md): </label>
                        <input
                            type="file"
                            accept=".md"
                            onChange={(e) => setNewManualFile(e.target.files[0])}
                            required
                        />
                    </div>
                    <button type="submit" style={{ marginTop: '1em' }}>Vytvořit</button>
                </form>
            </section>

            <section>
                <h4>Seznam existujících návodů</h4>
                {isLoading ? (
                    <p>Načítám...</p>
                ) : (
                    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>Název</th>
                                <th>Popis</th>
                                <th>Datum vytvoření</th>
                                <th>ID souboru</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manuals.map(manual => (
                                <tr key={manual.$id}>
                                    <td>{manual.title}</td>
                                    <td>{manual.description}</td>
                                    <td>{new Date(manual.$createdAt).toLocaleString()}</td>
                                    <td>{manual.markdownFileId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                 { !isLoading && manuals.length === 0 && <p>Zatím nebyly vytvořeny žádné návody.</p> }
            </section>
        </div>
    );
};

export default ManualsAdminPage;