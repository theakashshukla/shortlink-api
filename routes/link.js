const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const LinkController = require('../controllers/LinkController');

router.use(authMiddleware);
// Create short link
router.post('/create', LinkController.createLink);

router.get('/all', LinkController.getAllLinks);

// GET /link/:linkId/analytics
router.get('/:linkId/analytics', LinkController.getLinkAnalytics);

// GET /link/:linkId
router.get('/:linkId', LinkController.handleLinkAccess);


module.exports = router;
