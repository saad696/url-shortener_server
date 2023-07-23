const URLModel = require('../models/urlModel');
const validUrl = require('valid-url');
const xss = require('xss');

const urlModel = new URLModel();

const createShortURL = (req, res) => {
    let { originalUrl } = req.body;
    // sanitizing the url to prevent cross site attacks
    originalUrl = xss(originalUrl);

    if (!validUrl.isWebUri(originalUrl)) {
        return res.status(400).json({ message: 'Invalid URL' });
    }

    const shortURL = urlModel.generateShortURL();
    urlModel.saveURL(originalUrl, shortURL);
    console.log(process.env.BASE_URL, shortURL);
    res.status(200).json({
        shortURL: process.env.BASE_URL + shortURL,
        originalUrl,
    });
};

const redirectURL = (req, res) => {
    const shortURL = req.params.shortURL;
    const originalURL = urlModel.getOriginalURL(shortURL);

    if (!originalURL) {
        return res.status(404).json({ message: 'Short URL not found.' });
    }

    res.redirect(originalURL);
};

const checkIsArrayMonotonic = (req, res) => {
    const { numsArray } = req.body;
    
    if (!Array.isArray(numsArray) || numsArray.length === 0) {
        return res.status(400).json({ message: 'Invalid array' });
    }

    const isArrayMonotonic = urlModel.isArrayMonotonic(numsArray);

    res.status(200).json({ isArrayMonotonic });
};

module.exports = {
    createShortURL,
    redirectURL,
    checkIsArrayMonotonic
};
