"use client";

import { useState } from "react";

export default function ResumeForm() {
  const [form, setForm] = useState({
    name: "",
    jobTitle: "",
    careerGoal: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedResume("");

    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setGeneratedResume(data?.data?.resume || "No resume received.");
    } catch (err) {
      setGeneratedResume("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">AI Resume Generator</h1>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700"
          required
        />
        <input
          name="jobTitle"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
          className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700"
          required
        />
        <textarea
          name="careerGoal"
          placeholder="Career Goal"
          value={form.careerGoal}
          onChange={handleChange}
          className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700"
          rows={3}
          required
        />
        <textarea
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
          className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700"
          rows={4}
          required
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </form>

      {generatedResume && (
        <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Generated Resume</h2>
          <pre className="whitespace-pre-wrap text-sm">{generatedResume}</pre>
        </div>
      )}
    </div>
  );
}
