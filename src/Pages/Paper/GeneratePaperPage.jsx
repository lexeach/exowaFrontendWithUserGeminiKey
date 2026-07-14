// src/Pages/Paper/GeneratePaperPage.jsx
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function GeneratePaperPage() {
  const { user } = useContext(UserContext); // assumes user.geminiKey is stored in context
  const hasKey = Boolean(user?.geminiKey);

  return (
    <div>
      {!hasKey && (
        <div className="error">
          <p><strong>API Key Missing:</strong> Please set your Google Gemini API key on your <a href="/profile">profile page</a> before generating a paper.</p>
        </div>
      )}
      <button disabled={!hasKey}>Generate Paper</button>
      {/* rest of the form */}
    </div>
  );
}
