import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Lightbulb, 
  Search, 
  Users, 
  Clock,
  Plus,
  ExternalLink,
  Star,
  TrendingUp
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AI-Powered Campus Navigator",
    description: "Developing a mobile app using React Native and a custom pathfinding AI to help students navigate the campus efficiently. The app will include real-time location tracking, indoor navigation, and personalized route suggestions.",
    tags: ["AI", "Mobile Dev", "React Native", "Machine Learning"],
    difficulty: "intermediate",
    members: "4 / 4 members",
    status: "Team Full",
    mentor: "Dr. Sarah Johnson",
    duration: "3 months",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "Smart Dorm Room IoT System",
    description: "An IoT project to automate lighting, temperature, and security in dorm rooms using Raspberry Pi and Python. Features include voice control, mobile app integration, and energy efficiency monitoring.",
    tags: ["IoT", "Python", "Hardware", "Raspberry Pi"],
    difficulty: "beginner",
    members: "3 / 3 members",
    status: "In Progress",
    mentor: "Prof. Mike Chen",
    duration: "2 months",
    color: "from-green-500 to-cyan-600"
  },
  {
    id: 3,
    title: "Blockchain Voting System",
    description: "A decentralized e-voting system for student elections to ensure transparency and security with Ethereum smart contracts and Web3 integration. Perfect for advanced students interested in blockchain technology.",
    tags: ["Blockchain", "Web3", "Security", "Ethereum"],
    difficulty: "advanced",
    members: "2 / 5 members",
    status: "Recruiting",
    mentor: "Dr. Alex Rodriguez",
    duration: "4 months",
    color: "from-purple-500 to-pink-600"
  },
  {
    id: 4,
    title: "Campus Social Media Analytics",
    description: "Build a comprehensive analytics dashboard for campus social media engagement using React, Node.js, and machine learning algorithms to analyze student sentiment and engagement patterns.",
    tags: ["Data Science", "React", "Node.js", "Analytics"],
    difficulty: "intermediate",
    members: "3 / 6 members",
    status: "Recruiting",
    mentor: "Dr. Emily Watson",
    duration: "3 months",
    color: "from-orange-500 to-red-600"
  },
  {
    id: 5,
    title: "Virtual Reality Campus Tour",
    description: "Create an immersive VR experience for virtual campus tours using Unity and C#. This project will help prospective students explore the campus remotely with interactive elements and 360° videos.",
    tags: ["VR", "Unity", "C#", "3D Modeling"],
    difficulty: "advanced",
    members: "1 / 4 members",
    status: "Recruiting",
    mentor: "Prof. David Kim",
    duration: "5 months",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: 6,
    title: "Sustainable Campus Tracker",
    description: "Develop a mobile application to track and gamify sustainable practices on campus including waste reduction, energy conservation, and eco-friendly transportation choices.",
    tags: ["Mobile Dev", "Sustainability", "Gamification", "React Native"],
    difficulty: "beginner",
    members: "2 / 4 members",
    status: "Recruiting",
    mentor: "Dr. Lisa Park",
    duration: "2.5 months",
    color: "from-green-500 to-emerald-600"
  }
];

const difficultyColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800", 
  advanced: "bg-red-100 text-red-800"
};

const statusColors = {
  "Recruiting": "bg-blue-100 text-blue-800",
  "In Progress": "bg-purple-100 text-purple-800",
  "Team Full": "bg-gray-100 text-gray-800"
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const { toast } = useToast();

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === "all" || project.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleJoinProject = (projectTitle: string, status: string) => {
    if (status === "Team Full") {
      toast({
        title: "Team Full",
        description: "This project team is currently full. Try joining the waitlist!",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Application Sent!",
        description: `Your application to join "${projectTitle}" has been submitted successfully.`,
      });
    }
  };

  const handleViewDetails = (projectTitle: string) => {
    toast({
      title: "Project Details",
      description: `Opening detailed information for "${projectTitle}"...`,
    });
  };

  const ProjectCard = ({ project }: { project: any }) => (
    <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge className={difficultyColors[project.difficulty as keyof typeof difficultyColors]}>
                {project.difficulty}
              </Badge>
              <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                {project.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Project Info */}
        <div className="space-y-2 py-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{project.members}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{project.duration}</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Mentor:</span> {project.mentor}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => handleViewDetails(project.title)}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View Details
          </Button>
          <Button 
            size="sm" 
            className={`flex-1 ${
              project.status === "Team Full" 
                ? "bg-gray-400 hover:bg-gray-500" 
                : "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700"
            } text-white`}
            onClick={() => handleJoinProject(project.title, project.status)}
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            {project.status === "Team Full" ? "Join Waitlist" : "Join Project"}
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Project Collaboration</h1>
        <p className="text-muted-foreground">Find innovative projects or post your own ideas.</p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-8">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedDifficulty === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty("all")}
              className={selectedDifficulty === "all" ? 
                "bg-gradient-to-r from-primary to-purple-600 text-white" : 
                ""
              }
            >
              All Levels
            </Button>
            {["beginner", "intermediate", "advanced"].map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
                className={selectedDifficulty === difficulty ? 
                  "bg-gradient-to-r from-primary to-purple-600 text-white" : 
                  ""
                }
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Active Projects</p>
              <p className="text-3xl font-bold">{projects.length}</p>
            </div>
            <Lightbulb className="w-8 h-8 text-white/80" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-r from-green-500 to-cyan-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Students Participating</p>
              <p className="text-3xl font-bold">127</p>
            </div>
            <Users className="w-8 h-8 text-white/80" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Projects Completed</p>
              <p className="text-3xl font-bold">43</p>
            </div>
            <Star className="w-8 h-8 text-white/80" />
          </div>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Available Projects</h2>
          <Button className="bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Propose Project
          </Button>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or difficulty filter to find projects that match your interests.
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedDifficulty("all");
            }}>
              Reset Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}