// src/services/api.js
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1CTuHtOBMAQ020hR4H5aCyKVMYvATzWLkU0i144YXbqs/export?format=csv';

export async function fetchSheetData() {
  try {
    const response = await fetch(SHEET_URL);
    const csv = await response.text();
    const parsed = Papa.parse(csv, { header: true }).data;
    return {
      sourceVideos: parsed.filter(item => item.type === 'source'),
      postedContent: parsed.filter(item => item.type === 'posted')
    };
  } catch (error) {
    console.error('Failed to fetch sheet data:', error);
    return { sourceVideos: [], postedContent: [] };
  }
}

export async function processVideo(url) {
  try {
    // Mock processing for now
    return {
      id: '_' + Math.random().toString(36).substr(2, 9),
      url,
      title: `Video from ${url.includes('drive') ? 'Drive' : 'Social Media'}`,
      summary: 'Sample video content',
      keywords: ['sample', 'content'],
      timestamp: new Date().toISOString(),
      type: url.includes('drive') ? 'source' : 'posted'
    };
  } catch (error) {
    console.error('Failed to process video:', error);
    return null;
  }
}
