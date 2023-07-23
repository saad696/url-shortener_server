class URLModel {
    constructor() {
        this.urls = {};
    }

    generateShortURL() {
        // random 6 character string for url shortening
        return Math.random().toString(36).slice(2, 8);
    }

    saveURL(originalURL, shortURL) {
        this.urls[shortURL] = originalURL;
    }

    getOriginalURL(shortURL) {
        return this.urls[shortURL];
    }

    isArrayMonotonic(numsArray) {
        let increasing = true;
        let decreasing = true;

        for (let i = 1; i < numsArray.length; i++) {
            if (numsArray[i] > numsArray[i - 1]) {
                decreasing = false;
            } else if (numsArray[i] < numsArray[i - 1]) {
                increasing = false;
            }

            // If both increasing and decreasing are false, the array is not monotonic
            if (!increasing && !decreasing) {
                return false;
            }
        }

        return true;
    }
}

module.exports = URLModel;
