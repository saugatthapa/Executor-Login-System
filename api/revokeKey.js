// api/revokeKey.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      const { key, user } = req.body;
  
      if (!key || !user) {
        return res.status(400).json({ message: 'Key and user are required' });
      }
  
      const keyData = keys[key];
  
      if (!keyData) {
        return res.status(404).json({ message: 'Key not found' });
      }
  
      // Revoke the key and delete associated data
      delete keys[key];
      delete activeKeys[user];
      delete hwidMap[key];
  
      res.status(200).json({ message: 'Key revoked successfully' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  