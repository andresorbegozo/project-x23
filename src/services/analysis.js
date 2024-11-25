// src/services/analysis.js
const REFRESH_INTERVAL = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds

export function analyzeContent(sourceVideos, postedContent) {
  return {
    unusedContent: findUnusedContent(sourceVideos, postedContent),
    oldContent: findOldContent(sourceVideos, postedContent),
    trendingTopics: analyzeTrends(postedContent)
  };
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
      (now - new Date(lastUsed.timestamp)) > REFRESH_INTERVAL;
  });
}

function analyzeTrends(postedContent) {
  const recentPosts = postedContent
    .filter(post => 
      (new Date() - new Date(post.timestamp)) < (30 * 24 * 60 * 60 * 1000)
    );

  return recentPosts
    .flatMap(post => post.keywords)
    .reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {});
}

export function calculateSimilarity(text1, text2) {
  const words1 = new Set(text1.toLowerCase().split(' '));
  const words2 = new Set(text2.toLowerCase().split(' '));
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  return intersection.size / Math.max(words1.size, words2.size);
}
