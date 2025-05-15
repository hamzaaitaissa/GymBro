import { Dumbbell, Brain, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      icon: Dumbbell,
      title: "Custom Workouts",
      description:
        "AI-generated workout plans tailored to your fitness level, goals, and available equipment. Adapts as you progress.",
    },
    {
      icon: Brain,
      title: "Smart Analysis",
      description:
        "Advanced analytics that track your performance, identify patterns, and provide insights to optimize your training.",
    },
    {
      icon: Zap,
      title: "Real-time Feedback",
      description:
        "Instant form correction and technique guidance to maximize results and prevent injuries during your workouts.",
    },
  ]

  return (
    <section className="py-16 dark:bg-neutral-900/50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">Powered by AI</h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            Our platform uses cutting-edge artificial intelligence to transform your fitness journey
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-2 border-neutral-800 bg-neutral-900 transition-all duration-300 hover:border-green-500/50 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-900/30">
                  <feature.icon className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="font-mono">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-neutral-400">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
