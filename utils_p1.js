// utils_p1.js
export function detectPlatform(url) {
    if (url.includes('drive.google')) return 'drive';
    if (url.includes('instagram')) return 'instagram';
    if (url.includes('tiktok')) return 'tiktok';
    if (url.includes('facebook')) return 'facebook';
    return 'unknown';
}

export function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString();
}

export function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
