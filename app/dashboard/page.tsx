"use client"

import { authClient } from "@/lib/auth-client"
import { useEffect, useState } from "react"

type SessionData = {
  user: {
    id: string
    name: string | null
    email: string
    emailVerified: boolean
    image?: string | null
  } | null
}

export default function DashboardPage() {
  const [session, setSession] = useState<SessionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      try {
        const data = await authClient.getSession()
        setSession(data.data)
      } catch (error) {
        console.error("Failed to get session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()
  }, [])

  const handleSignOut = async () => {
    await authClient.signOut()
    window.location.href = "/sign-in"
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {session ? (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">
              Welcome, {session.user?.name}!
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {session.user?.email}
              </p>
              <p>
                <strong>User ID:</strong> {session.user?.id}
              </p>
              <p>
                <strong>Email Verified:</strong>{" "}
                {session.user?.emailVerified ? "Yes" : "No"}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <p className="text-gray-600">No active session found.</p>
            <a
              href="/sign-in"
              className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Sign In
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
