// src/Pages/Profile/ProfilePage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGeminiApiKey(response.data?.data?.geminiApiKey || "");
    } catch (error) {
      console.error(error);
      setMessage("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!geminiApiKey.trim()) {
      setMessage("Please enter your Gemini API key.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        {
          geminiApiKey,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Gemini API key saved successfully.");
    } catch (error) {
      console.error(error);

      setMessage(
        error?.response?.data?.message ||
          "Failed to save Gemini API key."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>

        <p className="text-gray-600 mb-6">
          Add your Google Gemini API key. You will not be able to generate
          papers until a valid key is saved.
        </p>

        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Gemini API Key
            </label>

            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full border rounded-lg px-4 py-3"
              required
            />

            <p className="text-sm text-gray-500 mt-2">
              Example: AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
          </div>

          {message && (
            <div className="mb-4 text-sm text-blue-600">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save API Key"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;