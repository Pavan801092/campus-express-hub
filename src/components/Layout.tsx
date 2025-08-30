import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Lightbulb, 
  Search, 
  Bot,
  GraduationCap,
  Bell
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Academics", href: "/academics", icon: BookOpen },
  { name: "Clubs", href: "/clubs", icon: Users },
  { name: "Projects", href: "/projects", icon: Lightbulb },
  { name: "Lost & Found", href: "/lost-found", icon: Search },
  { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
];

const quickStats = [
  { label: "Assignments Due", value: 3, color: "bg-red-500" },
  { label: "Upcoming Events", value: 5, color: "bg-blue-500" },
  { label: "Active Projects", value: 2, color: "bg-green-500" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-border">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">CampusConnect</h1>
            <p className="text-sm text-muted-foreground">AI-Powered Student Hub</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Navigation
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Stats */}
        <div className="p-4 mt-8">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Quick Stats
          </div>
          <div className="space-y-3">
            {quickStats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{stat.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {stat.value}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">SU</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Student User</p>
              <p className="text-xs text-muted-foreground">Connected & Learning</p>
            </div>
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {children}
      </div>
    </div>
  );
}