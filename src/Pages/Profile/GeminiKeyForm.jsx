// src/Pages/Profile/GeminiKeyForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GeminiKeyForm() {
  const [key, setKey] = useState("");

  useEffect(() => {
    axios.get('/api/user/gemini-key').then(res => {
      setKey(res.data.geminiKey || "");
    });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/user/gemini-key', { geminiKey: key });
      alert('Key saved!');
    } catch (err) {
      alert('Error saving key');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Google Gemini API Key:</label>
      <input
        type="password"
        value={key}
        onChange={e => setKey(e.target.value)}
        required
        placeholder="Enter your Gemini API key"
      />
      <button type="submit">Save Key</button>
    </form>
  );
}
