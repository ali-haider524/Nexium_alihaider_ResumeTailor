"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // ✅ make sure db is exported from firebase.ts
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleMagicLinkLogin = async () => {
      try {
        if (typeof window === "undefined") return;

        const email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          alert("No email found in localStorage.");
          return;
        }

        if (isSignInWithEmailLink(auth, window.location.href)) {
          const result = await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem("emailForSignIn");

          // ✅ Save user in Firestore
          const userRef = doc(db, "users", result.user.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            await setDoc(userRef, {
              uid: result.user.uid,
              email: result.user.email,
              createdAt: new Date().toISOString(),
            });
          }

          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Magic link login failed:", error);
        alert("Login failed. Please try again.");
      }
    };

    handleMagicLinkLogin();
  }, [router]);

  return <p>Verifying magic link, please wait...</p>;
}
