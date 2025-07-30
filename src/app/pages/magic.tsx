// src/pages/magic.tsx
import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { useRouter } from "next/router"

export default function MagicLinkHandler() {
  const [status, setStatus] = useState("Processing login...")
  const router = useRouter()

  useEffect(() => {
    const signIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn")
        if (!email) {
          email = window.prompt("Enter your email")
        }

        try {
          await signInWithEmailLink(auth, email!, window.location.href)
          window.localStorage.removeItem("emailForSignIn")
          setStatus("Login successful! Redirecting...")
          router.push("/dashboard") // Redirect on success
        } catch (error) {
          console.error(error)
          setStatus("Login failed. Please try again.")
        }
      }
    }

    signIn()
  }, [])

  return (
    <div className="p-6 max-w-md mx-auto">
      <p>{status}</p>
    </div>
  )
}
