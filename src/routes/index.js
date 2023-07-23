const express = require('express');
const urlController = require('../controllers/urlController');

const router = express.Router();

router.post('/shorten', urlController.createShortURL);
router.get('/:shortURL', urlController.redirectURL);
router.post('/array-monotonic', urlController.checkIsArrayMonotonic);


module.exports = router;
