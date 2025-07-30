// src/pages/magic.tsx
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/router";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";

const db = getFirestore(app);

export default function MagicLinkHandler() {
  const [status, setStatus] = useState("Processing login...");
  const router = useRouter();

  useEffect(() => {
    const signIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("Enter your email") ?? "";
        }

        try {
          const result = await signInWithEmailLink(auth, email, window.location.href);
          const user = result.user;

          // ✅ Save user to Firestore
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            createdAt: new Date(),
          });

          window.localStorage.removeItem("emailForSignIn");
          setStatus("Login successful! Redirecting...");
          router.push("/dashboard");
        } catch (error) {
          console.error(error);
          setStatus("Login failed. Please try again.");
        }
      }
    };

    signIn();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      <p>{status}</p>
    </div>
  );
}
