"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleMagicLinkLogin = async () => {
      if (typeof window === "undefined") return;

      const email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        alert("No email found in localStorage.");
        return;
      }

      if (isSignInWithEmailLink(auth, window.location.href)) {
        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem("emailForSignIn");
          alert("Successfully logged in!");
          router.push("/dashboard"); // change to your actual dashboard
        } catch (error) {
          console.error("Error signing in:", error);
          alert("Login failed.");
        }
      }
    };

    handleMagicLinkLogin();
  }, [router]);

  return <p className="p-6">Verifying magic link login...</p>;
}
