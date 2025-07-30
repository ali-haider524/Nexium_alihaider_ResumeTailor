"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-2xl">
        <Image
          src="/logo.png"
          alt="Resume Tailor"
          width={120}
          height={120}
          className="mx-auto mb-6"
        />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Tailor Your Resume with AI
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Instantly generate and personalize resumes that get noticed.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded text-lg transition shadow"
        >
          Get Started / Login
        </button>
      </div>

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

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
