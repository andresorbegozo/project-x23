// app_k5.js
import { processVideo } from './processor_k9.js';
import { saveToLocalStorage, loadFromLocalStorage, exportToCSV } from './store_m4.js';
import { analyzeContentGaps } from './analyzer_v3.js';
import { CONFIG } from './config_n2.js';
import { detectPlatform, formatDate, generateId } from './utils_p1.js';
import { ContentCard, AnalysisPanel } from './components_f2.js';

const { useState, useEffect } = React;

function App() {
    const [data, setData] = useState(loadFromLocalStorage());
    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        fetchSheetData();
        updateAnalysis();
    }, [data]);

    const fetchSheetData = async () => {
        const response = await fetch(CONFIG.SHEET_URL);
        const csv = await response.text();
        const parsed = Papa.parse(csv, { header: true }).data;
        setData(parsed);
        saveToLocalStorage(parsed);
    };

    const handleNewContent = async (url, type) => {
        const processed = await processVideo(url);
        if (processed) {
            const newData = {
                ...data,
                [type]: [...data[type], { ...processed, id: generateId() }]
            };
            setData(newData);
            saveToLocalStorage(newData);
        }
    };

    const updateAnalysis = () => {
        setAnalysis(analyzeContentGaps(data.sourceVideos, data.postedContent));
    };

    const handleDelete = (id, type) => {
        const newData = {
            ...data,
            [type]: data[type].filter(item => item.id !== id)
        };
        setData(newData);
        saveToLocalStorage(newData);
    };

    return (
        <div className="dashboard">
            <AnalysisPanel analysis={analysis} />
            
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-bold mb-4">Source Videos</h2>
                    <input 
                        type="text"
                        placeholder="Add Google Drive video URL"
                        className="w-full p-2 border rounded mb-4"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleNewContent(e.target.value, 'sourceVideos');
                                e.target.value = '';
                            }
                        }}
                    />
                    {data.sourceVideos?.map(video => (
                        <ContentCard 
                            key={video.id}
                            content={video}
                            onDelete={(id) => handleDelete(id, 'sourceVideos')}
                        />
                    ))}
                </div>
                
                <div>
                    <h2 className="text-xl font-bold mb-4">Posted Content</h2>
                    <input 
                        type="text"
                        placeholder="Add social media post URL"
                        className="w-full p-2 border rounded mb-4"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleNewContent(e.target.value, 'postedContent');
                                e.target.value = '';
                            }
                        }}
                    />
                    {data.postedContent?.map(post => (
                        <ContentCard 
                            key={post.id}
                            content={post}
                            onDelete={(id) => handleDelete(id, 'postedContent')}
                        />
                    ))}
                </div>
            </div>
            
            <button 
                onClick={() => exportToCSV(data)}
                className="mt-8 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Export to CSV
            </button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
