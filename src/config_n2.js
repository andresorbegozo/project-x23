import { CONFIG } from '/project-x23/src/config_n2.js';
import { formatDate } from '/project-x23/src/utils_p1.js';

export function ContentCard({ content, onDelete }) {
    return (
        <div className="content-card">
            <div className="flex justify-between">
                <h3 className="font-bold">{content.title}</h3>
                <button onClick={() => onDelete(content.id)} className="text-red-500">×</button>
            </div>
            <p className="text-sm mt-2">{content.summary}</p>
            <div className="mt-2 flex gap-2">
                {content.keywords.map(keyword => (
                    <span key={keyword} className="status-badge bg-blue-100">{keyword}</span>
                ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">
                Added: {formatDate(content.timestamp)}
            </div>
        </div>
    );
}

export function AnalysisPanel({ analysis }) {
    return (
        <div className="analysis-panel">
            <h2 className="text-lg font-bold mb-4">Content Analysis</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold mb-2">Unused Content</h3>
                    {analysis?.unusedContent.map(content => (
                        <div key={content.id} className="text-sm mb-2">
                            {content.title}
                        </div>
                    ))}
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Needs Refresh</h3>
                    {analysis?.oldContent.map(content => (
                        <div key={content.id} className="text-sm mb-2">
                            {content.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
