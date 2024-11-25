// src/components/AnalysisPanel.js
import React, { useEffect, useState } from 'react';
import { analyzeContent } from '../services/analysis';

export function AnalysisPanel({ sourceVideos, postedContent }) {
  const [analysis, setAnalysis] = useState({
    unusedContent: [],
    oldContent: [],
    trendingTopics: {}
  });

  useEffect(() => {
    const result = analyzeContent(sourceVideos, postedContent);
    setAnalysis(result);
  }, [sourceVideos, postedContent]);

  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Content Analysis</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Unused Content</h3>
          {analysis.unusedContent.map(content => (
            <div key={content.id} className="text-sm mb-2">
              {content.title}
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2">Needs Refresh</h3>
          {analysis.oldContent.map(content => (
            <div key={content.id} className="text-sm mb-2">
              {content.title} - Last used: {new Date(content.lastUsed).toLocaleDateString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
