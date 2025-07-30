'use client';

import { useState, useRef } from 'react';

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    jobTitle: '',
    location: '',
    experience: '',
    skills: '',
  });

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult('');

    const res = await fetch('/api/generate-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResult(data?.data?.output || 'No resume generated.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🧠 AI Resume Tailor</h1>

        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
            <input
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
            <input
              name="jobTitle"
              placeholder="Target Job Title"
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
            <input
              name="location"
              placeholder="Preferred Location"
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
          </div>

          <textarea
            name="experience"
            placeholder="Describe your experience"
            rows={4}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          <textarea
            name="skills"
            placeholder="List your key skills"
            rows={3}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded mt-4"
          >
            {loading ? 'Generating...' : 'Generate Resume'}
          </button>
        </div>

        {/* Output Section */}
        {result && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div ref={previewRef}>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">📄 Tailored Resume</h2>
              <pre className="whitespace-pre-wrap text-sm text-gray-700">{result}</pre>
            </div>

            <button
              onClick={() => alert('PDF download coming next...')}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Download as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
