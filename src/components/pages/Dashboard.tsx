import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Star, 
  BookOpen, 
  Users, 
  Lightbulb, 
  Calendar, 
  Clock,
  TrendingUp,
  Plus,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const statsData = [
  {
    title: "Assignments Due",
    value: "3",
    trend: "+2 this week",
    color: "from-green-500 to-emerald-600",
    icon: BookOpen,
    iconColor: "text-green-600"
  },
  {
    title: "Clubs Joined",
    value: "5",
    trend: "+1 this month",
    color: "from-purple-500 to-violet-600",
    icon: Users,
    iconColor: "text-purple-600"
  },
  {
    title: "Active Projects",
    value: "2",
    trend: "All on track",
    color: "from-orange-500 to-red-600",
    icon: Lightbulb,
    iconColor: "text-orange-600"
  },
  {
    title: "Events This Week",
    value: "4",
    trend: "+50% vs last week",
    color: "from-blue-500 to-cyan-600",
    icon: Calendar,
    iconColor: "text-blue-600"
  }
];

const upcomingDeadlines = [
  {
    title: "Machine Learning Quiz 3",
    subject: "Artificial Intelligence",
    due: "Jan 8, 11:30 AM",
    status: "overdue",
    priority: "high"
  },
  {
    title: "Database Design Report",
    subject: "Database Systems",
    due: "Jan 14, 5:00 PM",
    status: "overdue",
    priority: "medium"
  },
  {
    title: "React Native App Project",
    subject: "Mobile Development",
    due: "Jan 20, 11:59 PM",
    status: "pending",
    priority: "high"
  }
];

const recentActivity = [
  {
    type: "academic",
    title: "Data Structures Quiz submitted",
    time: "Aug 30, 11:30 AM",
    icon: BookOpen
  },
  {
    type: "event",
    title: "Registered for Tech Talk by Google",
    time: "Aug 30, 8:30 AM",
    icon: Calendar
  },
  {
    type: "project",
    title: "Joined AI Chatbot Project team",
    time: "Aug 29, 1:30 PM",
    icon: Lightbulb
  },
  {
    type: "community",
    title: "Followed Robotics Club",
    time: "Aug 28, 1:30 PM",
    icon: Users
  }
];

const quickActions = [
  {
    title: "Add Assignment",
    icon: BookOpen,
    color: "from-green-500 to-emerald-600",
    href: "/academics"
  },
  {
    title: "Join Event",
    icon: Calendar,
    color: "from-purple-500 to-violet-600",
    href: "/clubs"
  },
  {
    title: "Find Project",
    icon: Lightbulb,
    color: "from-orange-500 to-red-600",
    href: "/projects"
  },
  {
    title: "Explore Clubs",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
    href: "/clubs"
  }
];

export default function Dashboard() {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickAction = (action: string, href: string) => {
    toast({
      title: `${action} clicked!`,
      description: `Navigating to ${action.toLowerCase()} section...`,
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-blue-600 p-8 text-white">
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Welcome to CampusConnect AI</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Your smart companion for academic success, community engagement, and campus life
          </p>
          <div className="text-sm text-white/80">
            {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <Card key={stat.title} className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">{stat.trend}</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Deadlines */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
            </div>
            <Link to="/academics">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">{deadline.title}</h3>
                  <p className="text-sm text-muted-foreground">{deadline.subject}</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Due: {deadline.due}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge 
                    variant={deadline.status === "overdue" ? "destructive" : "secondary"}
                    className="capitalize"
                  >
                    {deadline.status === "overdue" ? "Overdue" : "Pending"}
                  </Badge>
                  <Badge 
                    variant={deadline.priority === "high" ? "destructive" : "secondary"}
                    className="capitalize"
                  >
                    {deadline.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <activity.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge 
                  variant="secondary" 
                  className={
                    activity.type === "academic" ? "bg-green-100 text-green-800" :
                    activity.type === "event" ? "bg-purple-100 text-purple-800" :
                    activity.type === "project" ? "bg-orange-100 text-orange-800" :
                    "bg-blue-100 text-blue-800"
                  }
                >
                  {activity.type === "academic" ? "Academic" :
                   activity.type === "event" ? "Event" :
                   activity.type === "project" ? "Project" :
                   "Community"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <Button
                variant="outline"
                className={`w-full h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${action.color} text-white border-0 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                onClick={() => handleQuickAction(action.title, action.href)}
              >
                <action.icon className="w-6 h-6" />
                <span className="font-medium">{action.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}