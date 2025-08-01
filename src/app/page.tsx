"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  // Load saved theme or match system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(prefersDark);

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(prefersDark ? "dark" : "light");
  }, []);

  // Toggle dark/light mode
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDarkNow = !html.classList.contains("dark");

    html.classList.remove("dark", "light");
    html.classList.add(isDarkNow ? "dark" : "light");

    setIsDark(isDarkNow);
    localStorage.setItem("theme", isDarkNow ? "dark" : "light");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-orange-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white flex flex-col items-center justify-center px-6 py-12 relative transition-colors duration-300">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <Image src="/logo.png" alt="Resume Tailor" width={120} height={120} className="mx-auto mb-6" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Tailor Your Resume with <span className="text-orange-500 dark:text-orange-400">AI</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Instantly generate and personalize resumes that get noticed.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded text-lg transition shadow"
        >
          Get Started / Login
        </button>
      </div>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full px-6">
        <FeatureCard
          title="AI Powered"
          description="Smart resume builder that tailors your CV to job descriptions using AI."
        />
        <FeatureCard
          title="Secure Login"
          description="Your data is safe and accessible only by you. Powered by Firebase Magic Link."
        />
        <FeatureCard
          title="Professional Layouts"
          description="Clean, modern designs optimized for ATS and hiring managers."
        />
      </section>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-md transition text-center">
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}
