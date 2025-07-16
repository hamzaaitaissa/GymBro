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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
  Camera,
  LogOut,
  Save,
  User,
  Dumbbell,
  Utensils,
  Target,
  Activity,
  Ruler,
  Calendar,
  Users,
  Zap,
} from "lucide-react";
import { useAuth } from "../Auth/AuthContext";
import { apiService } from "@/Services/api";

// Types matching your backend
type Gender = "Male" | "Female" | "Other";
type ActivityLevel = "Low" | "Medium" | "High";
type Goal = "LoseWeight" | "Maintain" | "GainMuscle";
type GeminiResponse = {
  assistantMessage: string;
  conversationId: number;
}
interface FitnessData {
  gender: Gender | "";
  age: number | "";
  activityLevel: ActivityLevel | "";
  goal: Goal | "";
  workoutsPerWeek: number | "";
  heightInCm: number | "";
}

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { token, logout, connectedUser, isAuthenticated, isInitialized } =
    useAuth();

  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: new Date().toISOString(),
  });

  const [fitnessData, setFitnessData] = useState<FitnessData>({
    gender: "",
    age: "",
    activityLevel: "",
    goal: "",
    workoutsPerWeek: "",
    heightInCm: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [isFitnessData, setIsFitnessData] = useState(false);
  const [message, setMessage] = useState("")

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
        createdAt: new Intl.DateTimeFormat("en-US", {
          year: "2-digit",
          month: "short",
          day: "numeric",
        }).format(new Date(user.createdAt)),
      });
    }
  }, [connectedUser]);

  useEffect(() => {
    const getUserInormation = async () => {
      if (connectedUser) {
        try {
          const user = connectedUser as ConnectedUser;
          console.log(user);
          const response = await apiService.get<FitnessData>(
            `/api/UserInformation/${user.id}`,
            {
              Authorization: `Bearer ${token}`,
            }
          );
          setFitnessData(response);
          setIsFitnessData(true);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getUserInormation();
  }, [connectedUser]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving profile data:", { userData, fitnessData, passwords });
    setIsLoading(true);
    setSuccessMessage("");

    // Validate fitness data
    const errors = validateFitnessData();
    if (errors.length > 0) {
      setSuccessMessage(
        `Please fix the following errors: ${errors.join(", ")}`
      );
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call to save profile
      const response = await apiService.post<FitnessData>(
        "/api/UserInformation",
        {
          Gender: fitnessData.gender,
          Age: fitnessData.age,
          ActivityLevel: fitnessData.activityLevel,
          Goal: fitnessData.goal,
          WorkoutsPerWeek: fitnessData.workoutsPerWeek,
          HeightInCm: fitnessData.heightInCm,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response) {
        setFitnessData(response);
        return response;
      }
      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      setSuccessMessage("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };
  const handleSavedCredentials = async (e: React.FormEvent) => {};

  const handleUpdateSavedProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    try {
      const user = connectedUser as ConnectedUser
      const response = await apiService.put<FitnessData>(
        "/api/UserInformation",
        {
          UserId: user.id,
          Gender: fitnessData.gender,
          Age: fitnessData.age,
          ActivityLevel: fitnessData.activityLevel,
          Goal: fitnessData.goal,
          WorkoutsPerWeek: fitnessData.workoutsPerWeek,
          HeightInCm: fitnessData.heightInCm,
        },
        {
          Authorization: `Bearer ${token}`
        }
      );
      if(response){
        setFitnessData(response)
        setSuccessMessage("Fitness Profile updated")
        return response
      }
    } catch (error) {
      console.log(error);
      
    }finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const validateFitnessData = (): string[] => {
    const errors: string[] = [];

    if (!fitnessData.gender) errors.push("Gender is required");
    if (!fitnessData.age || fitnessData.age < 10 || fitnessData.age > 120) {
      errors.push("Age must be between 10 and 120");
    }
    if (!fitnessData.activityLevel) errors.push("Activity level is required");
    if (!fitnessData.goal) errors.push("Fitness goal is required");
    if (
      !fitnessData.workoutsPerWeek ||
      fitnessData.workoutsPerWeek < 0 ||
      fitnessData.workoutsPerWeek > 14
    ) {
      errors.push("Workouts per week must be between 0 and 14");
    }
    if (
      !fitnessData.heightInCm ||
      fitnessData.heightInCm < 50 ||
      fitnessData.heightInCm > 300
    ) {
      errors.push("Height must be between 50cm and 300cm");
    }

    return errors;
  };

  const generateWorkoutPlan = async () => {
    const errors = validateFitnessData();
    if (errors.length > 0) {
      setSuccessMessage(
        `Please complete your fitness profile first: ${errors.join(", ")}`
      );
      return;
    }

    setIsGeneratingPlan(true);
    setMessage(`You are a fitness coach, generate a workout plan based on the following: 
      Gender: ${fitnessData.gender}
      Age: ${fitnessData.age}
      Goal: ${fitnessData.goal}
      Activity Level: ${fitnessData.activityLevel}
      Workouts frequesncy: ${fitnessData.workoutsPerWeek}`)
    try {
      const response = await apiService.post<GeminiResponse>('/api/workoutplan',{
        message:message
      },{
        Authorization: `Bearer ${token}`
      })
      if(response){
        console.log("response from Gemini:", response)
        return response
      }
    } catch (error) {
      setSuccessMessage("Failed to generate workout plan. Please try again.");
    } finally {
      setIsGeneratingPlan(false);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const generateMealPlan = async () => {
    const errors = validateFitnessData();
    if (errors.length > 0) {
      setSuccessMessage(
        `Please complete your fitness profile first: ${errors.join(", ")}`
      );
      return;
    }

    setIsGeneratingPlan(true);
    try {
      // Simulate AI API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccessMessage("🍽️ Custom meal plan generated! Check your dashboard.");
      // In real implementation, redirect to meal plan page
      // router.push("/meal-plan");
    } catch (error) {
      setSuccessMessage("Failed to generate meal plan. Please try again.");
    } finally {
      setIsGeneratingPlan(false);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    setSuccessMessage("Logging out...");
    logout();
    setTimeout(() => {
      setIsLoading(false);
      router.push("/signin");
    }, 500);
  };

  const isProfileComplete = () => {
    return Object.values(fitnessData).every((value) => value !== "");
  };
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace("/signin");
    }
  });

  if (!isInitialized) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-mono">My Profile</h1>
        <p className="text-neutral-400 font-sans mt-2">
          Manage your account and fitness information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card className="border-neutral-800 bg-neutral-900">
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="h-24 w-24 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                    <User className="h-12 w-12 text-neutral-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 rounded-full bg-green-500 p-1.5 text-white hover:bg-green-600 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <h2 className="text-xl font-bold font-mono text-center">
                  {userData.name}
                </h2>
                <p className="text-sm text-neutral-400 font-sans text-center mb-2">
                  {userData.email}
                </p>

                {/* Profile Completion Status */}
                <div className="w-full mb-4">
                  <div
                    className={`text-xs px-2 py-1 rounded-full text-center ${
                      isProfileComplete()
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {isProfileComplete()
                      ? "✓ Profile Complete"
                      : "⚠ Profile Incomplete"}
                  </div>
                </div>

                <Separator className="my-4 bg-neutral-800" />

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Member since</span>
                    <span>{userData.createdAt}</span>
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
        <div className="space-y-6">
          {/* Success/Error Messages */}
          {successMessage && (
            <div
              className={`rounded-md p-3 text-sm ${
                successMessage.includes("error") ||
                successMessage.includes("Failed") ||
                successMessage.includes("fix")
                  ? "bg-red-500/10 text-red-400"
                  : "bg-green-500/10 text-green-400"
              }`}
            >
              {successMessage}
            </div>
          )}

          {/* Account Information */}
          <Card className="border-neutral-800 bg-neutral-900">
            <CardHeader>
              <CardTitle className="font-mono flex items-center">
                <User className="mr-2 h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription className="font-sans">
                Update your basic account details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSavedCredentials} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <Separator className="bg-neutral-800" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="font-sans">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                      className="border-neutral-700 bg-neutral-800 font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="font-sans">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      value={passwords.new}
                      onChange={(e) =>
                        setPasswords({ ...passwords, new: e.target.value })
                      }
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
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                      className="border-neutral-700 bg-neutral-800 font-sans"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <Button
                    type="button"
                    onClick={handleSavedCredentials}
                    className="bg-green-500 hover:bg-green-600 font-sans flex-1"
                    disabled={isLoading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Saving..." : "Save Account Profile"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Fitness Profile */}
          <Card className="border-neutral-800 bg-neutral-900">
            <CardHeader>
              <CardTitle className="font-mono flex items-center">
                <Dumbbell className="mr-2 h-5 w-5 text-green-500" />
                Fitness Profile
              </CardTitle>
              <CardDescription className="font-sans">
                Complete your fitness information to get personalized AI
                recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Gender */}
                <div className="space-y-2">
                  <Label className="font-sans flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Gender
                  </Label>
                  <Select
                    value={fitnessData.gender}
                    onValueChange={(value: Gender) =>
                      setFitnessData({ ...fitnessData, gender: value })
                    }
                  >
                    <SelectTrigger
                      className="border-neutral-700 bg-neutral-800"
                      style={{ width: "180px" }}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="font-sans flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="10"
                    max="120"
                    placeholder="25"
                    value={fitnessData.age}
                    onChange={(e) =>
                      setFitnessData({
                        ...fitnessData,
                        age: Number.parseInt(e.target.value) || "",
                      })
                    }
                    className="w-40 border-neutral-700 bg-neutral-800 font-sans"
                  />
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <Label
                    htmlFor="height"
                    className="font-sans flex items-center"
                  >
                    <Ruler className="mr-2 h-4 w-4" />
                    Height (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    min="50"
                    max="300"
                    placeholder="175"
                    value={fitnessData.heightInCm}
                    onChange={(e) =>
                      setFitnessData({
                        ...fitnessData,
                        heightInCm: Number.parseInt(e.target.value) || "",
                      })
                    }
                    className="w-40 border-neutral-700 bg-neutral-800 font-sans"
                  />
                </div>

                {/* Activity Level */}
                <div className="space-y-2">
                  <Label className="font-sans flex items-center">
                    <Activity className="mr-2 h-4 w-4" />
                    Activity Level
                  </Label>
                  <Select
                    value={fitnessData.activityLevel}
                    onValueChange={(value: ActivityLevel) =>
                      setFitnessData({ ...fitnessData, activityLevel: value })
                    }
                  >
                    <SelectTrigger className="border-neutral-700 bg-neutral-800">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low (Sedentary)</SelectItem>
                      <SelectItem value="Medium">
                        Medium (Moderately Active)
                      </SelectItem>
                      <SelectItem value="High">High (Very Active)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Goal */}
                <div className="space-y-2">
                  <Label className="font-sans flex items-center">
                    <Target className="mr-2 h-4 w-4" />
                    Fitness Goal
                  </Label>
                  <Select
                    value={fitnessData.goal}
                    onValueChange={(value: Goal) =>
                      setFitnessData({ ...fitnessData, goal: value })
                    }
                  >
                    <SelectTrigger className="border-neutral-700 bg-neutral-800">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LoseWeight">Lose Weight</SelectItem>
                      <SelectItem value="Maintain">Maintain Weight</SelectItem>
                      <SelectItem value="GainMuscle">Gain Muscle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Workouts Per Week */}
                <div className="space-y-2">
                  <Label
                    htmlFor="workouts"
                    className="font-sans flex items-center"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Workouts/Week
                  </Label>
                  <Input
                    id="workouts"
                    type="number"
                    min="0"
                    max="14"
                    placeholder="3"
                    value={fitnessData.workoutsPerWeek}
                    onChange={(e) =>
                      setFitnessData({
                        ...fitnessData,
                        workoutsPerWeek: Number.parseInt(e.target.value) || "",
                      })
                    }
                    className="w-40 border-neutral-700 bg-neutral-800 font-sans"
                  />
                </div>
              </div>

              <Separator className="bg-neutral-800" />

              {/* Action Buttons */}

              <div className="flex flex-col sm:flex-row gap-4">
                {isFitnessData ? (
                  <Button
                    type="button"
                    onClick={handleUpdateSavedProfile}
                    className="bg-green-500 hover:bg-green-600 font-sans flex-1"
                    disabled={isLoading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Saving..." : "Update Fitness Profile"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSaveProfile}
                    className="bg-green-500 hover:bg-green-600 font-sans flex-1"
                    disabled={isLoading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Saving..." : "Save Fitness Profile"}
                  </Button>
                )}

                <Button
                  type="button"
                  onClick={generateWorkoutPlan}
                  className="bg-blue-500 hover:bg-blue-600 font-sans flex-1"
                  disabled={isGeneratingPlan || !isProfileComplete()}
                >
                  <Dumbbell className="mr-2 h-4 w-4" />
                  {isGeneratingPlan ? "Generating..." : "Generate Workout Plan"}
                </Button>

                <Button
                  type="button"
                  onClick={generateMealPlan}
                  className="bg-orange-500 hover:bg-orange-600 font-sans flex-1"
                  disabled={isGeneratingPlan || !isProfileComplete()}
                >
                  <Utensils className="mr-2 h-4 w-4" />
                  {isGeneratingPlan ? "Generating..." : "Generate Meal Plan"}
                </Button>
              </div>

              {!isProfileComplete() && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-400 text-sm font-sans">
                    💡 Complete your fitness profile to unlock AI-powered
                    workout and meal plan generation!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
