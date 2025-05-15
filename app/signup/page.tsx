"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dumbbell } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    try {
      setIsLoading(true)

      
      // for testing purposes im mocking a successful signup
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to the chat page after successful signup
      router.push("/chat")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 font-sans">
      <Card className="mx-auto w-full max-w-md border-neutral-800 bg-neutral-900">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900/30">
              <Dumbbell className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold font-mono">Create an account</CardTitle>
          <CardDescription className="font-sans">Enter your information to get started with GymBro</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">{error}</div>}

            <div className="space-y-2">
              <Label htmlFor="name" className="font-sans">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-neutral-700 bg-neutral-800 font-sans"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-neutral-700 bg-neutral-800 font-sans"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-sans">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-neutral-700 bg-neutral-800 font-sans"
                required
              />
              <p className="text-xs text-neutral-400 font-sans">Password must be at least 8 characters long</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm font-sans">
                I agree to the{" "}
                <Link href="/terms" className="text-green-500 hover:text-green-400">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-green-500 hover:text-green-400">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 font-sans" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-neutral-400 font-sans">
            Already have an account?{" "}
            <Link href="/signin" className="text-green-500 hover:text-green-400">
              Sign in
            </Link>
          </div>

         
        </CardFooter>
      </Card>
    </div>
  )
}
