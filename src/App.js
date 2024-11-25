// src/App.js
const { useState, useEffect } = React;

function App() {
  const [sourceVideos, setSourceVideos] = useState([]);
  const [postedContent, setPostedContent] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const response = await fetch('https://docs.google.com/spreadsheets/d/1CTuHtOBMAQ020hR4H5aCyKVMYvATzWLkU0i144YXbqs/export?format=csv');
      const csv = await response.text();
      const parsed = Papa.parse(csv, { header: true }).data;
      setSourceVideos(parsed.filter(item => item.type === 'source'));
      setPostedContent(parsed.filter(item => item.type === 'posted'));
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleAddContent = (url, type) => {
    const newContent = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      url,
      title: `Content from ${type}`,
      summary: 'New content added',
      timestamp: new Date().toISOString()
    };

    if (type === 'source') {
      setSourceVideos([...sourceVideos, newContent]);
    } else {
      setPostedContent([...postedContent, newContent]);
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
                handleAddContent(e.target.value, 'source');
                e.target.value = '';
              }
            }}
          />
          {sourceVideos.map(video => (
            <div key={video.id} className="border p-4 rounded mb-2">
              <div>{video.title}</div>
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
                handleAddContent(e.target.value, 'posted');
                e.target.value = '';
              }
            }}
          />
          {postedContent.map(post => (
            <div key={post.id} className="border p-4 rounded mb-2">
              <div>{post.title}</div>
              <div className="text-sm text-gray-600">{post.summary}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
