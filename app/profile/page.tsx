/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Camera, LogOut, Save, User } from "lucide-react";
import { useAuth } from "../Auth/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { token, logout, connectedUser } = useAuth();
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  interface ConnectedUser {
    id: string;
    fullName: string;
    createdAt: string;
    email: string;
  }

  useEffect(() => {
    if (connectedUser) {
      const user = connectedUser as ConnectedUser;
      setUserData({
        name: user.fullName,
        email: user.email,
      });
    }
  }, [connectedUser]);

  console.log("userData", userData);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSuccessMessage("Profile updated successfully");
    setIsLoading(false);

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setSuccessMessage("logging out... ");
    logout();
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("You have been logged out");
      router.push("/signin");
    }, 500);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 font-mono">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card className="border-neutral-800 bg-neutral-900">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="h-24 w-24 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                    <User className="h-12 w-12 text-neutral-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 rounded-full bg-green-500 p-1.5 text-white hover:bg-green-600">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold font-mono">{userData.name}</h2>
                <p className="text-sm text-neutral-400 font-sans">
                  {userData.email}
                </p>

                <Separator className="my-4 bg-neutral-800" />

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Member since</span>
                    <span>May 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Workouts</span>
                    <span>32</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Plan</span>
                    <span className="text-green-500">Pro</span>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  className="mt-6 w-full font-sans"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div>
          <Card className="border-neutral-800 bg-neutral-900">
            <CardHeader>
              <CardTitle className="font-mono">Account Information</CardTitle>
              <CardDescription className="font-sans">
                Update your account details and personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                {successMessage && (
                  <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-500">
                    {successMessage}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="font-sans">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    className="border-neutral-700 bg-neutral-800 font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-sans">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="border-neutral-700 bg-neutral-800 font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-password" className="font-sans">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    className="border-neutral-700 bg-neutral-800 font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="font-sans">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      className="border-neutral-700 bg-neutral-800 font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="font-sans">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="border-neutral-700 bg-neutral-800 font-sans"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 font-sans"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
