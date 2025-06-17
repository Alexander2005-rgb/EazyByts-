const express = require('express');
const router = express.Router();
const CMSSettings = require('../models/CMSSettings');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Get CMS settings (protected)
router.get('/', auth, authorize, async (req, res) => {
  try {
    const settings = await CMSSettings.findOne();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update CMS settings (protected)
router.post('/', auth, authorize, async (req, res) => {
  try {
    let settings = await CMSSettings.findOne();
    if (settings) {
      settings.siteTitle = req.body.siteTitle || settings.siteTitle;
      settings.siteDescription = req.body.siteDescription || settings.siteDescription;
      settings.theme = req.body.theme || settings.theme;
      settings = await settings.save();
    } else {
      settings = new CMSSettings(req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
