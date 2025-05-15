/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, ExternalLink, Mail, Code, Briefcase } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  // Replace these with your actual links
  const links = {
    github: "https://github.com/hamzaaitaissa",
    linkedin: "https://www.linkedin.com/in/hamza-ait-aissa/",
    upwork: "https://www.upwork.com/freelancers/~01c1626be62f654371?mp_source=share",
    portfolio: "https://hamza-aitaissa-portfolio.vercel.app/",
    email: "hamzaaitaissa8@gmail.com",
  }

  return (
    <div className="flex w-full h-screen overflow-auto p-6 ">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="font-mono text-3xl font-bold mb-6">About Developer</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="border-neutral-800 bg-neutral-900 md:col-span-1">
            <CardHeader>
              <div className="aspect-square rounded-full bg-neutral-800 mx-auto mb-4 overflow-hidden w-32 h-32 flex items-center justify-center">
                {/* If you have a profile image, use Image component here */}
                <span className="text-6xl">👨‍💻</span>
              </div>
              <CardTitle className="text-center font-mono">Hamza Ait Aissa</CardTitle>
              <CardDescription className="text-center">Full Stack Developer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="justify-start" asChild>
                  <Link href={links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>

                <Button variant="outline" className="justify-start" asChild>
                  <Link href={links.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Link>
                </Button>

                <Button variant="outline" className="justify-start" asChild>
                  <Link href={links.upwork} target="_blank" rel="noopener noreferrer">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Upwork
                  </Link>
                </Button>

                <Button variant="outline" className="justify-start" asChild>
                  <Link href={links.portfolio} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Portfolio
                  </Link>
                </Button>

                <Button variant="outline" className="justify-start" asChild>
                  <Link href={`mailto:${links.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bio & Skills Card */}
          <Card className="border-neutral-800 bg-neutral-900 md:col-span-2">
            <CardHeader>
              <CardTitle className="font-mono">Bio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 ">
                <p className="text-sm">
                Software developer with 2+ years of experience in Web Development building web solutions. My expertise includes C#, JavaScript etc.
                </p>
                <p className="text-sm">
                  GymBro is my latest project, combining cutting-edge AI technology with fitness expertise to deliver
                  personalized workout experiences.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-lg font-medium mb-4">Skills & Expertise</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["Next.js", "TypeScript", ".NET Core", "C#", "ASP.NET Core", "API", "UI/UX Design", "Docker" , "Git"].map((skill) => (
                    <div key={skill} className="flex items-center rounded-md border border-neutral-800 px-3 py-2 hover:border-green-500/50 hover:shadow-lg">
                      <Code className="mr-2 h-4 w-4 text-green-500" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-neutral-800 pt-6 flex flex-col items-start">
              <h3 className="font-mono text-lg font-medium mb-4">About This Project</h3>
              <p className="mb-4 text-sm">
                GymBro is an AI-powered fitness coaching platform designed to provide personalized workout plans, form
                feedback, and nutritional guidance. Built with Next.js, TypeScript, and integrated with powerful AI
                models to deliver a seamless user experience.
              </p>
              <Button className="bg-green-500 hover:bg-green-600 mt-2" asChild>
                <Link href="/chat">Try the AI Coach</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
