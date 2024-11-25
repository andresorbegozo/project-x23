// processor_k9.js
export async function processVideo(url) {
    try {
        const mockData = {
            transcription: "Sample transcription",
            summary: "Video summary here",
            keywords: ["keyword1", "keyword2"],
            timestamp: new Date().toISOString()
        };

        return mockData;
    } catch (error) {
        console.error('Processing failed:', error);
        return null;
    }
}

export function analyzeSimilarity(text1, text2) {
    const words1 = new Set(text1.toLowerCase().split(' '));
    const words2 = new Set(text2.toLowerCase().split(' '));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    return intersection.size / Math.max(words1.size, words2.size);
}

export function findUnusedContent(sourceVideos, postedContent) {
    return sourceVideos.filter(source => 
        !postedContent.some(post => 
            analyzeSimilarity(post.transcription, source.transcription) > 0.8
        )
    );
}
