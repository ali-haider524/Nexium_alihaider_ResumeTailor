"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailLink,
  isSignInWithEmailLink,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function MagicPage() {
  const router = useRouter();

  useEffect(() => {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please enter your email to complete login") || "";
    }

    if (!email || !isSignInWithEmailLink(auth, window.location.href)) {
      alert("Invalid login link or missing email.");
      return;
    }

    signInWithEmailLink(auth, email, window.location.href)
      .then(() => {
        window.localStorage.removeItem("emailForSignIn");
        router.push("/dashboard");
      })
      .catch((err) => {
        alert("Login failed. Please try again.");
        console.error("Magic link error:", err);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-4">
      <p className="text-lg text-gray-800 dark:text-gray-100">
        Verifying magic link, please wait...
      </p>
    </div>
  );
}
