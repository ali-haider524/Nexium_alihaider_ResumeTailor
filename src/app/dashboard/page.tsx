"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    });
    return () => unsub();
  }, []);

  if (!user) return null;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => signOut(auth)}
      >
        Logout
      </button>
    </div>
  );
}
