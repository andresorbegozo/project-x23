const { useState, useEffect } = React;
const { createRoot } = ReactDOM;

function ContentTracker() {
    const [sourceVideos, setSourceVideos] = useState([]);
    const [postedContent, setPostedContent] = useState([]);
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1CTuHtOBMAQ020hR4H5aCyKVMYvATzWLkU0i144YXbqs/export?format=csv';

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await fetch(SHEET_URL);
        const csv = await response.text();
        const parsed = Papa.parse(csv, { header: true }).data;
        setSourceVideos(parsed.filter(item => item.type === 'source'));
        setPostedContent(parsed.filter(item => item.type === 'posted'));
    };

    const addContent = async (url, type) => {
        const content = {
            url,
            type,
            timestamp: new Date().toISOString(),
            summary: 'Processing...',
            keywords: []
        };
        
        if (type === 'source') {
            setSourceVideos([...sourceVideos, content]);
        } else {
            setPostedContent([...postedContent, content]);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Content Tracker</h1>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-bold mb-4">Source Videos</h2>
                    <input 
                        type="text"
                        placeholder="Add Google Drive video URL"
                        className="w-full p-2 border rounded mb-4"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                addContent(e.target.value, 'source');
                                e.target.value = '';
                            }
                        }}
                    />
                    {sourceVideos.map(video => (
                        <div key={video.url} className="border p-4 rounded mb-2">
                            <div>{video.url}</div>
                            <div className="text-sm text-gray-600">{video.summary}</div>
                        </div>
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
                                addContent(e.target.value, 'posted');
                                e.target.value = '';
                            }
                        }}
                    />
                    {postedContent.map(post => (
                        <div key={post.url} className="border p-4 rounded mb-2">
                            <div>{post.url}</div>
                            <div className="text-sm text-gray-600">{post.summary}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<ContentTracker />);
