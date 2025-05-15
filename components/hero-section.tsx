"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Simple background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-grid-black/[0.2] bg-[length:20px_20px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900">
            <span className="mr-1 rounded-full bg-green-500 px-1.5 py-0.5 text-xs font-medium text-white">NEW</span>
            <span className="text-neutral-600 dark:text-neutral-400">Introducing GymBro 1.0</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Train Smarter <br />
            <span className="text-green-500">with GymBro</span>
          </h1>

          <p className="mx-auto mb-8 max-w-lg text-lg text-neutral-600 dark:text-neutral-400">
            Your personal AI fitness coach that adapts to your progress, creates custom workouts, and provides real-time
            feedback.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-green-500 hover:bg-green-600">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
          </div>
        </div>
      </div>
    </section>
  )
}
