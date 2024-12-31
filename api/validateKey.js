// api/validateKey.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      const { key, user, hwid } = req.body;
  
      if (!key || !user || !hwid) {
        return res.status(400).json({ message: 'Key, user, and HWID are required' });
      }
  
      const keyData = keys[key];
  
      if (!keyData) {
        return res.status(404).json({ message: 'Key not found' });
      }
  
      const now = new Date();
      if (keyData.expiration < now) {
        delete keys[key];  // Remove expired key
        return res.status(400).json({ message: 'Key has expired' });
      }
  
      if (hwidMap[key] && hwidMap[key] !== hwid) {
        return res.status(400).json({ message: 'This key is already tied to another device' });
      }
  
      if (activeKeys[user] && activeKeys[user] !== key) {
        return res.status(400).json({ message: 'You are already using another key' });
      }
  
      // Bind the key to the HWID and mark the key as active for the user
      hwidMap[key] = hwid;
      activeKeys[user] = key;
  
      res.status(200).json({ message: 'Key validated and activated successfully' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  