// api/generateKey.js
import { v4 as uuidv4 } from 'uuid';

let keys = {};  // Temporary in-memory storage for keys
let activeKeys = {};  // Track active keys per user
let hwidMap = {};  // Track HWID per key

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { user } = req.body;

    if (!user) {
      return res.status(400).json({ message: 'User is required' });
    }

    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);  // 24 hours
    const key = uuidv4();

    // Store key with expiration time
    keys[key] = { expiration, user };

    res.status(200).json({ key, expiration });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
