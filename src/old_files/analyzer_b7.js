import { CONFIG } from '/project-x23/src/config_n2.js';
import { detectPlatform } from '/project-x23/src/utils_p1.js';

export function analyzeContentGaps(sourceVideos, postedContent) {
    const unusedContent = findUnusedContent(sourceVideos, postedContent);
    const oldContent = findOldContent(sourceVideos, postedContent);
    const trendingTopics = analyzeTrends(postedContent);

    return { unusedContent, oldContent, trendingTopics };
}

function findUnusedContent(sourceVideos, postedContent) {
    return sourceVideos.filter(source => 
        !postedContent.some(post => post.sourceUrl === source.url)
    );
}

function findOldContent(sourceVideos, postedContent) {
    const now = new Date();
    return sourceVideos.filter(source => {
        const lastUsed = postedContent
            .filter(post => post.sourceUrl === source.url)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        
        return lastUsed && 
            (now - new Date(lastUsed.timestamp)) > (CONFIG.REFRESH_INTERVAL * 24 * 60 * 60 * 1000);
    });
}

function analyzeTrends(postedContent) {
    const recentPosts = postedContent
        .filter(post => (new Date() - new Date(post.timestamp)) < (30 * 24 * 60 * 60 * 1000));
    
    return recentPosts
        .flatMap(post => post.keywords)
        .reduce((acc, keyword) => {
            acc[keyword] = (acc[keyword] || 0) + 1;
            return acc;
        }, {});
}
