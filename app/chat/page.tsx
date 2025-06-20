/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAuth } from "../Auth/AuthContext";
import { useRouter } from "next/navigation";
import { apiService } from "@/Services/api";
import { connect } from "node:tls";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const router = useRouter();
  const { token, isAuthenticated, isInitialized, connectedUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi there! I'm your AI fitness coach. How can I help with your fitness journey today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample responses for demo purposes
  const demoResponses = [
    "Based on your goals, I'd recommend starting with a 3-day full-body workout routine. Would you like me to create a personalized plan?",
    "Great question! For building muscle, aim for 1.6-2.2g of protein per kg of bodyweight daily. For someone your size, that's about 120-160g per day.",
    "I analyzed your form, and I notice you're rounding your back slightly during deadlifts. Try keeping your chest up and engaging your lats before lifting.",
    "Your progress is impressive! You've increased your squat by 15% in just 4 weeks. Let's adjust your program to keep that momentum going.",
    "For recovery after intense workouts, I recommend light mobility work, proper hydration, and ensuring you get 7-9 hours of quality sleep.",
  ];

  // Scroll to bottom of chat when messages change
  console.log(connectedUser);
  const loadMessages = async () => {
    try {
      const response = await apiService.get<Message[]>("/api/Conversation/1/history")
      
    } catch (error) {
      
    }
  }
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace("/signin");
    }
  }, );

  if (!isInitialized) {
    return null; 
  }

  if (!isAuthenticated) {
    return null; 
  }
  console.log("connectedUser", connectedUser);
  console.log("isInitialized", isInitialized);
  console.log("isAuthenticated", isAuthenticated);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse =
        demoResponses[Math.floor(Math.random() * demoResponses.length)];
      const aiMessage: Message = { role: "assistant", content: randomResponse };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="flex h-[calc(100vh-2rem)] flex-col p-4">
      {/* Simple gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-neutral-950">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-neutral-900 to-blue-900/30" />
      </div>
      <div className="mb-4 flex items-center">
        <h1 className="font-mono text-2xl font-bold">GymBro AI Coach</h1>
        <div className="ml-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
          BETA
        </div>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden border-neutral-800 bg-neutral-900">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] items-start rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-green-500 text-white"
                      : "bg-neutral-800 text-neutral-200"
                  }`}
                >
                  <div className="mr-2 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black/20">
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">{message.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] items-start rounded-lg bg-neutral-800 px-4 py-2 text-neutral-200">
                  <div className="mr-2 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black/20">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">Thinking</div>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:0ms]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:150ms]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:300ms]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-neutral-800 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about workouts, nutrition, form..."
              className="border-neutral-700 bg-neutral-800 text-white"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </Card>
    </section>
  );
}
