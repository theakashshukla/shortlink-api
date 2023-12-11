// controllers/LinkController.js
const Link = require('../models/Link');

const LinkController = {
  async createLink(req, res) {
    try {
      const { originalUrl } = req.body;
      const userId = req.user.id; // Assuming you have the user object attached to the request

      // Set the expiration time to 48 hours from now
      const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

      // Create a new short link associated with the user
      const link = await Link.create({
        originalUrl,
        shortUrl: generateShortUrl(),
        expiresAt,
        userId,
      });

      res.json({ link });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async getAllLinks(req, res) {
    try {
      const userId = req.user.id; // Assuming you have the user object attached to the request

      // Find all links associated with the user
      const links = await Link.findAll({ where: { userId } });

      res.json({ links });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getLinkAnalytics(req, res) {
    try {
      const linkId = req.params.linkId;
      const userId = req.user.id; // Assuming you have the user object attached to the request

      // Find the link associated with the user by linkId
      const link = await Link.findOne({ where: { id: linkId, userId } });

      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }

      res.json({
        linkId: link.id,
        originalUrl: link.originalUrl,
        shortUrl: link.shortUrl,
        expiresAt: link.expiresAt,
        accessCount: link.accessCount,
        lastAccessedAt: link.lastAccessedAt,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Function to handle link access and update analytics
  async handleLinkAccess(req, res) {
    try {
      const linkId = req.params.linkId;

    // Find the link by linkId
    const link = await Link.findOne({ where: { id: linkId } });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    // Update link analytics
    link.accessCount += 1;
    link.lastAccessedAt = new Date();
    await link.save();

    // Redirect to the original URL
    res.redirect(link.originalUrl);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

// Function to generate a short URL (replace with your logic)
function generateShortUrl() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const shortUrlLength = 4;

  let shortUrl = '';

  // Generate a random short URL until a unique one is found
  do {
    shortUrl = '';
    for (let i = 0; i < shortUrlLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortUrl += characters.charAt(randomIndex);
    }
  } while (!isUniqueShortUrl(shortUrl));

  return shortUrl;
}

// Function to check if the short URL is unique
async function isUniqueShortUrl(shortUrl) {
  const existingLink = await Link.findOne({ where: { shortUrl } });
  return !existingLink;
}

module.exports = LinkController;
