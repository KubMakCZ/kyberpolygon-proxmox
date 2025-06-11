// SOUBOR: src/pages/ScenarioDetailPage.jsx
// ----------------------------------------------------------------
// FINÁLNÍ VERZE: Přidali jsme další kontroly a logování, abychom odhalili,
// proč není posíláno fileId.

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { AppwriteConfig } from '../config';
import { databases, functions, Query } from '../appwriteConfig';

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

        try {
            const scenarioResponse = await databases.getDocument(
                AppwriteConfig.DATABASE_ID,
                AppwriteConfig.SCENARIOS_COLLECTION_ID,
                scenarioId
            );
            setScenario(scenarioResponse);

            if (scenarioResponse.manualId) {
                const manualResponse = await databases.getDocument(
                    AppwriteConfig.DATABASE_ID,
                    AppwriteConfig.MANUALS_COLLECTION_ID,
                    scenarioResponse.manualId
                );
                
                // Zde získáme fileId
                const fileId = manualResponse.markdownFileId;

                // NOVÝ DIAGNOSTICKÝ KROK: Vypíšeme si, jaké fileId jsme našli.
                console.log("Nalezeno fileId v dokumentu návodu:", fileId);

                // NOVÁ KONTROLA: Ujistíme se, že fileId existuje, než zavoláme funkci.
                if (!fileId) {
                    throw new Error("Dokument návodu neobsahuje platné 'markdownFileId'. Zkontrolujte data v Appwrite.");
                }

                const functionResponse = await functions.createExecution(
                    AppwriteConfig.GET_MANUAL_CONTENT_FUNCTION_ID,
                    JSON.stringify({ fileId: fileId })
                );

                if (functionResponse.status === 'failed') {
                    // Pokusíme se vypsat chybovou zprávu z těla odpovědi, pokud existuje
                    const errorResult = JSON.parse(functionResponse.responseBody || '{}');
                    throw new Error(`Provedení serverové funkce selhalo: ${errorResult.message || functionResponse.stderr}`);
                }

                const result = JSON.parse(functionResponse.responseBody);

                if (!result.success) {
                    throw new Error(`Chyba uvnitř funkce: ${result.message}`);
                }

                setManualContent(result.content);
            }
            
            if (scenarioResponse.requiredVmIds && scenarioResponse.requiredVmIds.length > 0) {
                const vmsResponse = await databases.listDocuments(
                    AppwriteConfig.DATABASE_ID,
                    AppwriteConfig.VMS_COLLECTION_ID,
                    [Query.equal('$id', scenarioResponse.requiredVmIds)]
                );
                setVms(vmsResponse.documents);
            }

        } catch (err) {
            console.error("CHYBA při načítání detailu scénáře:", err);
            setError("Nepodařilo se načíst detail scénáře. Zkontrolujte konzoli.");
        }
        setIsLoading(false);
    };

    if (isLoading) return <p>Načítám detail scénáře...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!scenario) return <p>Scénář nebyl nalezen.</p>;

    return (
        <div>
            <div style={{ marginBottom: '1em' }}>
                <Link to="/">&larr; Zpět na přehled</Link>
            </div>
            <div style={{ display: 'flex', gap: '2em' }}>
                <aside style={{ width: '30%' }}>
                    <h2>{scenario.name}</h2>
                    <p>{scenario.description}</p>
                    <hr />
                    <h3>Potřebné stroje:</h3>
                    <ul>{vms.map(vm => (<li key={vm.$id}>{vm.name} (ID: {vm.proxmox_vmid})</li>))}</ul>
                </aside>
                <main style={{ width: '70%', borderLeft: '1px solid #ccc', paddingLeft: '2em' }}>
                    <h2>Návod</h2>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {manualContent}
                    </ReactMarkdown>
                </main>
            </div>
        </div>
    );
};

export default ScenarioDetailPage;
