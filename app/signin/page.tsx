/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dumbbell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlertComponent from "@/components/alert";
import { apiService } from "@/Services/api";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  type UserToken = {
    token: string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setIsLoading(true);

      const SignInResponse = await apiService.post<UserToken>(
        "/api/Auth/signin",
        {
          email,
          password,
        }
      );
      console.log(SignInResponse);
      localStorage.setItem("token", SignInResponse.token);
      setShowAlert(true);
      setError("");
      setTimeout(() => {
        router.push("/chat");
      }, 2000);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 ">
      <Card className="mx-auto w-full max-w-md border-neutral-800 bg-neutral-900">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900/30">
              <Dumbbell className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold font-mono">
            Sign in to GymBro
          </CardTitle>
          <CardDescription className="font-sans">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                {error}
              </div>
            )}
            {showAlert && (
              <AlertComponent variant="default">
                <p className="text-green-500">Welcome buddy! Redirecting...</p>
              </AlertComponent>
            )}

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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-sans">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-neutral-400 hover:text-white font-sans"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-neutral-700 bg-neutral-800 font-sans"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-sans">
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 font-sans"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-neutral-400 font-sans">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-green-500 hover:text-green-400"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
