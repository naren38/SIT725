const { scanVulnerabilities } = require('../Model/vulnerabilityModel'); // Import the scan logic

module.exports = {
  scan: (req, res) => {
    const url = req.body.url;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const results = scanVulnerabilities(url); // Perform vulnerability scan
    res.json({ message: `Scanning the URL: ${url}`, results }); // Return scan results
  },
};
