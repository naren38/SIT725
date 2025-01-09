const { scanVulnerabilities } = require('../Model/vulnerabilityModel'); // Import the model

module.exports = {
  scan: (req, res) => {
    const url = req.body.url;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const results = scanVulnerabilities(url); // Scan vulnerabilities
    res.json({ message: `Scanning the URL: ${url}`, results }); // Send results as JSON
  },
};
