// src/pages/dashboard.tsx
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/router"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user)
      else router.push("/login")
    })
    return () => unsubscribe()
  }, [])

  if (!user) return null

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
  )
}
