// src/pages/login.tsx
import { useState } from "react"
import { sendSignInLinkToEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault()
    const actionCodeSettings = {
      url: "http://localhost:3000/magic", // ✅ this is your magic handler
      handleCodeInApp: true,
    }

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      window.localStorage.setItem("emailForSignIn", email)
      setSent(true)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login with Magic Link</h1>
      {sent ? (
        <p>Check your inbox, a login link has been sent to: <strong>{email}</strong></p>
      ) : (
        <form onSubmit={handleSendLink} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="border p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
            Send Magic Link
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      )}
    </div>
  )
}
