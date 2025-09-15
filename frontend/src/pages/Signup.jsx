import React, { useState } from "react"
import api from "../utils/api"
import { saveToken } from "../utils/auth"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const r = await api.post("/auth/signup", { email, password })
      saveToken(r.data.token)
      setMsg("✅ Signup successful! Token saved.")
    } catch (err) {
      setMsg(err.response?.data?.error || "❌ Signup failed")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h2 className="text-2xl font-bold mb-4 mt-8 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border rounded"
        />
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {msg && <p className="mt-2 text-sm">{msg}</p>}
      </form>
    </div>
  )
}
