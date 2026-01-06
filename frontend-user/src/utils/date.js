const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
}

export function getTimeAgo (dateStr) {
    const now = new Date(Date.now());
    const date = new Date(dateStr);
    const seconds =  Math.floor((now - new Date(date)) / 1000);

    let minCount = 10000;
    let minValue = null;

    for (const [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(seconds / value);
        if (count >= 1 && count < minCount) {
            minCount = count;
            minValue = unit;
        }
    }

    if (minValue == null) {
        return "just now";
    }
    
    return `${minCount} ${minValue}${(minCount > 1) ? "s" : ""} ago`;
}