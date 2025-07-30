"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
      <div className="bg-white rounded shadow p-4">
        <p>Your tailored resumes will appear here.</p>
      </div>
      <button
        onClick={() => router.push('/resume/new')}
        className="mt-6 bg-orange-500 text-white px-4 py-2 rounded"
      >
        + New Resume
      </button>
    </div>
  );
}
