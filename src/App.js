// App.js
import React, { useState, useEffect } from 'react';
import { fetchSheetData, processVideo } from './services/api';
import { ContentList } from './components/ContentList';
import { AnalysisPanel } from './components/AnalysisPanel';

function App() {
  const [sourceVideos, setSourceVideos] = useState([]);
  const [postedContent, setPostedContent] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSheetData();
      setSourceVideos(data.sourceVideos);
      setPostedContent(data.postedContent);
    };
    loadData();
  }, []);

  const handleAddContent = async (url, type) => {
    const processed = await processVideo(url);
    if (processed) {
      if (type === 'source') {
        setSourceVideos([...sourceVideos, processed]);
      } else {
        setPostedContent([...postedContent, processed]);
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AnalysisPanel sourceVideos={sourceVideos} postedContent={postedContent} />
      <div className="grid grid-cols-2 gap-6">
        <ContentList
          title="Source Videos"
          items={sourceVideos}
          onAdd={(url) => handleAddContent(url, 'source')}
          placeholder="Add Google Drive video URL"
        />
        <ContentList
          title="Posted Content"
          items={postedContent}
          onAdd={(url) => handleAddContent(url, 'posted')}
          placeholder="Add social media post URL"
        />
      </div>
    </div>
  );
}

export default App;
