import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Search, 
  Calendar, 
  Heart,
  ExternalLink,
  Instagram,
  Linkedin,
  Plus
} from "lucide-react";

const categories = [
  "All Categories",
  "Technical", 
  "Cultural",
  "Sports",
  "Academic",
  "Social Service",
  "Arts",
  "Entrepreneurship"
];

const upcomingEvents = [
  {
    title: "HackCampus 2025 - 48 Hour Hackathon",
    description: "The biggest hackathon on campus! Build innovative solutions, win prizes, and network with industry professionals.",
    date: "Jan 20, 2025",
    tag: "hackathon",
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "Google Tech Talk: AI in Healthcare",
    description: "Join us for an insightful session with Google engineers discussing the latest applications of AI in healthcare technology.",
    date: "Jan 15, 2025",
    tag: "seminar",
    color: "from-green-500 to-blue-600"
  },
  {
    title: "React & Next.js Workshop",
    description: "Hands-on workshop covering modern React development and Next.js framework. Perfect for beginners and intermediate developers.",
    date: "Jan 12, 2025",
    tag: "workshop",
    color: "from-purple-500 to-pink-600"
  }
];

const clubs = [
  {
    id: 1,
    name: "Coding Club",
    category: "technical",
    description: "A community of passionate programmers, developers, and tech enthusiasts. We organize coding competitions, workshops on latest technologies, and collaborative projects.",
    members: 127,
    image: "/api/placeholder/400/200",
    tags: ["Programming", "Web Dev", "AI", "Open Source"],
    social: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    id: 2,
    name: "Robotics Society",
    category: "technical",
    description: "Building the future with robotics! We work on autonomous robots, participate in national competitions, and explore AI integration in mechanical systems.",
    members: 89,
    image: "/api/placeholder/400/200",
    tags: ["Robotics", "Arduino", "AI", "Engineering"],
    social: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    id: 3,
    name: "Cultural Committee",
    category: "cultural",
    description: "Celebrating diversity through music, dance, theater, and festivals. Join us for cultural events, performances, and artistic collaborations that bring campus together.",
    members: 203,
    image: "/api/placeholder/400/200",
    tags: ["Music", "Dance", "Theater", "Events"],
    social: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    id: 4,
    name: "Entrepreneurship Cell",
    category: "entrepreneurship",
    description: "Fostering innovation and business mindset among students. We host startup competitions, mentorship programs, and networking events with industry leaders.",
    members: 156,
    image: "/api/placeholder/400/200",
    tags: ["Startups", "Business", "Innovation", "Networking"],
    social: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    id: 5,
    name: "Photography Club",
    category: "arts",
    description: "Capturing moments and creating visual stories. We organize photo walks, workshops on photography techniques, and showcase student work in exhibitions.",
    members: 94,
    image: "/api/placeholder/400/200",
    tags: ["Photography", "Visual Arts", "Editing", "Exhibitions"],
    social: {
      instagram: "#",
      linkedin: "#"
    }
  },
  {
    id: 6,
    name: "Environmental Club",
    category: "social service",
    description: "Working towards a sustainable future through environmental awareness campaigns, tree plantation drives, and eco-friendly initiatives on campus.",
    members: 142,
    image: "/api/placeholder/400/200",
    tags: ["Environment", "Sustainability", "Green Campus", "Awareness"],
    social: {
      instagram: "#",
      linkedin: "#"
    }
  }
];

export default function Clubs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const { toast } = useToast();

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All Categories" || 
                           club.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleJoinClub = (clubName: string) => {
    toast({
      title: "Joined Club!",
      description: `Welcome to ${clubName}! You'll receive updates about events and activities.`,
    });
  };

  const handleViewDetails = (clubName: string) => {
    toast({
      title: "View Details",
      description: `Opening detailed information for ${clubName}...`,
    });
  };

  const EventCard = ({ event }: { event: any }) => (
    <Card className={`p-6 bg-gradient-to-r ${event.color} text-white hover:scale-105 transition-all duration-300`}>
      <div className="space-y-3">
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
          {event.tag}
        </Badge>
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-white/90 text-sm">{event.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{event.date}</span>
          <Button variant="secondary" size="sm" className="bg-white text-gray-900 hover:bg-white/90">
            Register
          </Button>
        </div>
      </div>
    </Card>
  );

  const ClubCard = ({ club }: { club: any }) => (
    <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{club.name}</h3>
              <Badge variant="secondary" className="capitalize">
                {club.category}
              </Badge>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{club.description}</p>

        <div className="flex flex-wrap gap-1">
          {club.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{club.members} members</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => handleViewDetails(club.name)}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-700"
            onClick={() => handleJoinClub(club.name)}
          >
            <Heart className="w-3 h-3 mr-1" />
            Join Club
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Campus Clubs & Organizations</h1>
        <p className="text-muted-foreground">Discover communities that match your interests and passions</p>
      </div>

      {/* Search and Categories */}
      <Card className="p-6 mb-8">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search clubs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 
                  "bg-gradient-to-r from-primary to-purple-600 text-white" : 
                  ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Upcoming Events */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Upcoming Events</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {selectedCategory === "All Categories" ? "All Clubs" : `${selectedCategory} Clubs`}
        </h2>
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No clubs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or category filter to find clubs that match your interests.
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All Categories");
            }}>
              Reset Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}