/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import {  Home, Settings, InfoIcon, Dumbbell,  MessageCircle, LogInIcon, UserCheck, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/app/Auth/AuthContext"


// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Chat with AI",
    url: "/chat",
    icon: MessageCircle,
  },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "About Developer",
    url: "/about",
    icon: InfoIcon,
  },
]
const itemsAccount = [
  {
    title: "Sign In",
    url: "/signin",
    icon: LogInIcon,
  },
  {
    title: "Sign Up",
    url: "/signup",
    icon: UserCheck,
  },
]
const profile = [
   {
    title: "My Profile",
    url: "/profile",
    icon: User,
  },
]
export function AppSidebar() {
  const {token} = useAuth()
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-4xl py-8 font-extrabold text-green-500/50 hover:text-green-500 transition-all">Gym<Dumbbell/>Bro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3 py-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild className="font-semibold">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {token
              ? profile.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              : itemsAccount.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
    </Sidebar>
  )
}
