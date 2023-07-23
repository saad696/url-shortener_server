const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes time limit / window
    max: 50, // Limit each IP to 100 requests per windowMs
    skipFailedRequests: false,
    handler: (req, res) => {
        // error when the rate limiter hits
        res.status(429).json({
            message: 'Too many requests, please try again later.',
        });
    },
});

module.exports = limiter;
