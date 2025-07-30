"use client";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const email = window.localStorage.getItem("emailForSignIn");
    if (isSignInWithEmailLink(auth, window.location.href) && email) {
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          router.push("/dashboard");
        })
        .catch(console.error);
    }
  }, []);

  return <p>Logging in...</p>;
}
