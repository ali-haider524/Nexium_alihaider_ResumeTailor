"use client";

import { useEffect, useState } from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

export default function Magic() {
  const [status, setStatus] = useState("Processing...");
  const router = useRouter();

  useEffect(() => {
    const completeLogin = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("Enter your email to complete sign-in");
        }

        try {
          const result = await signInWithEmailLink(auth, email!, window.location.href);
          const user = result.user;

          // Save user to Firestore
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date(),
          });

          localStorage.removeItem("emailForSignIn");
          setStatus("Login successful. Redirecting...");
          router.push("/dashboard");
        } catch (error) {
          console.error(error);
          setStatus("Login failed.");
        }
      }
    };

    completeLogin();
  }, []);

  return <div className="p-6">{status}</div>;
}
