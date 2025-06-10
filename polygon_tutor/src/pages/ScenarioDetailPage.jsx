// SOUBOR: src/pages/ScenarioDetailPage.jsx (Diagnostická verze)
// ----------------------------------------------------------------
// OPRAVA: Místo storage.getFileView() používáme storage.getFileDownload()
// pro získání syrového obsahu souboru.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { AppwriteConfig } from '../config';
import { databases, storage, Query } from '../appwriteConfig';

const ScenarioDetailPage = () => {
    const { scenarioId } = useParams();

    const [scenario, setScenario] = useState(null);
    const [manualContent, setManualContent] = useState('');
    const [vms, setVms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (scenarioId) {
            fetchScenarioDetails();
        }
    }, [scenarioId]);

    const fetchScenarioDetails = async () => {
        setIsLoading(true);
        setError(null);
        console.log("--- START: Načítám detail scénáře ---");

        try {
            // Krok 1: Načteme hlavní data o scénáři
            const scenarioResponse = await databases.getDocument(
                AppwriteConfig.DATABASE_ID,
                AppwriteConfig.SCENARIOS_COLLECTION_ID,
                scenarioId
            );
            setScenario(scenarioResponse);
            console.log("1. Data scénáře:", scenarioResponse);

            // Krok 2: Na základě dat ze scénáře načteme návod
            if (scenarioResponse.manualId) {
                const manualResponse = await databases.getDocument(
                    AppwriteConfig.DATABASE_ID,
                    AppwriteConfig.MANUALS_COLLECTION_ID,
                    scenarioResponse.manualId
                );
                console.log("2. Data návodu (metadata):", manualResponse);
                
                const fileId = manualResponse.markdownFileId;
                console.log(`3. Budu stahovat soubor s ID: ${fileId}`);

                // ZMĚNA ZDE: Použijeme getFileDownload místo getFileView
                const fileUrl = storage.getFileDownload(AppwriteConfig.MANUALS_BUCKET_ID, fileId);
                console.log("4. URL pro stažení souboru (metodou Download):", fileUrl.href);

                // Stáhneme obsah souboru
                const markdownResponse = await fetch(fileUrl.href);
                const markdownText = await markdownResponse.text();

                // DŮLEŽITÝ KROK: Vypíšeme stažený text do konzole
                console.log("5. SKUTEČNÝ STAŽENÝ OBSAH SOUBORU:", markdownText);
                
                setManualContent(markdownText);
            }
            
            // Krok 3: Načteme potřebné VM
            if (scenarioResponse.requiredVmIds && scenarioResponse.requiredVmIds.length > 0) {
                const vmsResponse = await databases.listDocuments(
                    AppwriteConfig.DATABASE_ID,
                    AppwriteConfig.VMS_COLLECTION_ID,
                    [Query.equal('$id', scenarioResponse.requiredVmIds)]
                );
                setVms(vmsResponse.documents);
                console.log("6. Data o virtuálních strojích:", vmsResponse.documents);
            }

        } catch (err) {
            console.error("CHYBA při načítání detailu scénáře:", err);
            setError("Nepodařilo se načíst detail scénáře. Zkontrolujte konzoli.");
        }
        setIsLoading(false);
        console.log("--- KONEC: Načítání dokončeno ---");
    };

    if (isLoading) return <p>Načítám detail scénáře...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!scenario) return <p>Scénář nebyl nalezen.</p>;

    return (
        <div style={{ display: 'flex', gap: '2em' }}>
            <aside style={{ width: '30%' }}>
                <h2>{scenario.name}</h2>
                <p>{scenario.description}</p>
                <hr />
                <h3>Potřebné stroje:</h3>
                <ul>
                    {vms.map(vm => (
                        <li key={vm.$id}>{vm.name} (ID: {vm.proxmox_vmid})</li>
                    ))}
                </ul>
            </aside>
            <main style={{ width: '70%', borderLeft: '1px solid #ccc', paddingLeft: '2em' }}>
                <h2>Návod</h2>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {manualContent}
                </ReactMarkdown>
            </main>
        </div>
    );
};

export default ScenarioDetailPage;
