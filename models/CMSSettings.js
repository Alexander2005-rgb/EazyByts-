const mongoose = require('mongoose');

const cmsSettingsSchema = new mongoose.Schema({
  siteTitle: {
    type: String,
    required: true,
  },
  siteDescription: {
    type: String,
  },
  theme: {
    type: String,
    default: 'light',
  },
  // Add other CMS settings fields as needed
}, { timestamps: true });

module.exports = mongoose.model('CMSSettings', cmsSettingsSchema);
