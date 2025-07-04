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
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};
type GeminiResponse = {
  assistantMessage: string;
  conversationId: number;
};

export default function ChatPage() {
  const router = useRouter();
  const { token, isAuthenticated, isInitialized, connectedUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi Champ! I'm your AI fitness coach. How can I help with your fitness journey today?",
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
  interface ConnectedUser {
    id: string;
    fullName: string;
    conversations: number[] | null;
    createdAt: string;
    email: string;
    passwordHash: string;
  }
  // Scroll to bottom of chat when messages change
  const getConversationId = async () => {
    // if (!connectedUser) return null;

    // const user = connectedUser as ConnectedUser;
    // return user.conversations && user.conversations.length > 0
    //   ? user.conversations[0]
    //   : 0;
    try {
      const user = connectedUser as ConnectedUser;
      const response = await apiService.get<number>(
        `/api/chat/Conversation/user/${user.id}`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      return response ?? null;
    } catch (error) {
      console.error("Error fetching conversation ID:", error);
      return null;
    }
  };

  const loadMessages = async () => {
    try {
      const conversationId = (await getConversationId()) ?? 0;
      const response = await apiService.get<Message[]>(
        `/api/Chat/conversation/${conversationId}/history`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setMessages([
        {
          role: "assistant",
          content: "👋 Hi Champ! I'm your AI fitness coach. How can I help?",
        },
        ...(response ?? []),
      ]);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated && token && connectedUser) {
      loadMessages();
    }
  }, [isInitialized, isAuthenticated, token, connectedUser]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  },[messages]);

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
  console.log("connectedUser", connectedUser);
  console.log("isInitialized", isInitialized);
  console.log("isAuthenticated", isAuthenticated);

  const sendMessageToGemini = async (message: string) => {
    try {
      const conversationId = await getConversationId();
      const response = await apiService.post<GeminiResponse>(
        `/api/Chat/send`,
        {
          message: message,
          conversationId: conversationId,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response) {
        console.log("Gemini response:", response);
        return response;
      }
    } catch (error) {
      console.log("Error sending message to Gemini:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    try {
      const aiReply = await sendMessageToGemini(input);
      console.log("AI reply:", aiReply);

      if (aiReply?.assistantMessage) {
        const aiMessage: Message = {
          role: "assistant",
          content: aiReply.assistantMessage,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "❌ No response from the AI.",
          },
        ]);
      }
    } catch (error) {
      console.error("AI error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Sorry, something went wrong with the AI.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <section className="flex h-[calc(100vh-2rem)] flex-col p-4">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-neutral-900 to-blue-900/30" />
      </div>

      {/* Header */}
      <div className="mb-4 flex items-center">
        <h1 className="font-mono text-2xl font-bold text-white">GymBro AI Coach</h1>
        <div className="ml-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
          BETA
        </div>
      </div>

      {/* Chat Window */}
      <Card className="flex flex-1 flex-col overflow-hidden border border-neutral-800 bg-neutral-900 shadow-lg rounded-xl">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`group relative flex  items-start gap-3 rounded-xl px-5 py-4 text-sm transition ${
                    message.role === "user"
                      ? "bg-green-500 text-white max-w-[80%]  "
                      : "bg-neutral-800 text-neutral-100 max-w-[100%] sm:max-w-[70%] line-height-7"
                  }`}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20">
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className="prose prose-invert max-w-none text-[.9rem] sm:text-[1.1rem] leading-relaxed fade-in">
                    <ReactMarkdown >{message.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] items-start gap-3 rounded-xl bg-neutral-800 px-5 py-4 text-neutral-200">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">Thinking</span>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:0ms]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:150ms]" />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <div className="border-t border-neutral-800 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about workouts, nutrition, form..."
              className="rounded-lg border border-neutral-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
