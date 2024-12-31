// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [user, setUser] = useState('');
  const [key, setKey] = useState('');
  const [hwid, setHwid] = useState('');
  const [message, setMessage] = useState('');

  // Function to generate the key
  const generateKey = async () => {
    const res = await fetch('/api/generateKey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    });
    const data = await res.json();
    if (data.key) {
      setKey(data.key);
      setMessage(`Generated Key: ${data.key}`);
    } else {
      setMessage(data.message);
    }
  };

  // Function to validate the key
  const validateKey = async () => {
    const res = await fetch('/api/validateKey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, user, hwid }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Key Login System</h1>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <button onClick={generateKey}>Generate Key</button>

      <div>
        <label>Key:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div>
        <label>HWID:</label>
        <input
          type="text"
          value={hwid}
          onChange={(e) => setHwid(e.target.value)}
        />
      </div>
      <button onClick={validateKey}>Validate Key</button>

      <p>{message}</p>
    </div>
  );
}
