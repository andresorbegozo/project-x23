// store_m4.js
export function saveToLocalStorage(data) {
    localStorage.setItem('contentData', JSON.stringify(data));
}

export function loadFromLocalStorage() {
    const stored = localStorage.getItem('contentData');
    return stored ? JSON.parse(stored) : { sourceVideos: [], postedContent: [] };
}

export function exportToCSV(data) {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content_tracker.csv';
    a.click();
}
