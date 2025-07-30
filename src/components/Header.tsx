"use client";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="w-full bg-gray-100 p-4 flex justify-between items-center shadow">
      <h1 className="text-lg font-semibold">Resume Tailor</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{user.email}</span>
        <button
          onClick={logout}
          className="bg-orange-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
