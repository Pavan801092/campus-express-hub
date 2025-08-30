import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Clock, 
  AlertCircle,
  Bot,
  Calendar,
  Filter
} from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Database Design Report",
    subject: "Database Systems",
    description: "Design and document a normalized database schema for an e-commerce platform with proper ER diagrams.",
    due: "Jan 14, 2025",
    priority: "medium",
    status: "pending",
    estimatedTime: "8h"
  },
  {
    id: 2,
    title: "Data Structures Final Project",
    subject: "Computer Science",
    description: "Implement a complete library management system using advanced data structures including hash tables, BST, and graphs.",
    due: "Jan 10, 2025",
    priority: "high",
    status: "in progress",
    estimatedTime: "25h"
  },
  {
    id: 3,
    title: "Machine Learning Quiz 3",
    subject: "Artificial Intelligence",
    description: "Quiz covering neural networks, deep learning fundamentals, and backpropagation algorithms.",
    due: "Jan 8, 2025",
    priority: "high",
    status: "overdue",
    estimatedTime: "2h"
  },
  {
    id: 4,
    title: "React Native Mobile App",
    subject: "Mobile Development",
    description: "Build a cross-platform mobile application with authentication, real-time data, and push notifications.",
    due: "Jan 20, 2025",
    priority: "high",
    status: "pending",
    estimatedTime: "15h"
  },
  {
    id: 5,
    title: "Software Engineering Documentation",
    subject: "Software Engineering",
    description: "Complete project documentation including requirements analysis, system design, and testing strategies.",
    due: "Jan 25, 2025",
    priority: "medium",
    status: "pending",
    estimatedTime: "6h"
  }
];

export default function Academics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || assignment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-gray-100 text-gray-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddAssignment = () => {
    setShowAddForm(true);
    toast({
      title: "Add Assignment",
      description: "Assignment form opened for demonstration.",
    });
  };

  const handleAITutor = () => {
    toast({
      title: "AI Tutor Activated",
      description: "Connecting you to AI tutoring assistance...",
    });
    // In a real app, this would navigate to AI tutor or open a chat
  };

  const AssignmentCard = ({ assignment }: { assignment: any }) => (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{assignment.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{assignment.subject}</p>
          <p className="text-sm text-foreground">{assignment.description}</p>
        </div>
        <div className="flex flex-col gap-2 ml-4">
          <Badge className={getPriorityColor(assignment.priority)}>
            {assignment.priority}
          </Badge>
          <Badge className={getStatusColor(assignment.status)}>
            {assignment.status === "in progress" ? "In Progress" : 
             assignment.status === "overdue" ? "Due Soon!" : 
             assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>Due: {assignment.due}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{assignment.estimatedTime} estimated</span>
        </div>
        {assignment.status === "overdue" && (
          <div className="flex items-center gap-1 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>Due Soon!</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          View Details
        </Button>
        <Button size="sm" variant="outline">
          Mark Complete
        </Button>
        {assignment.status === "overdue" && (
          <Button size="sm" variant="destructive">
            Urgent Action
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Academic Hub</h1>
          <p className="text-muted-foreground">Manage assignments with AI-powered assistance</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleAITutor}
            variant="outline"
            className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 hover:from-purple-600 hover:to-blue-700"
          >
            <Bot className="w-4 h-4 mr-2" />
            AI Tutor
          </Button>
          <Button 
            onClick={handleAddAssignment}
            className="bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Assignment
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </Card>

      {/* Assignments Grid */}
      <div className="space-y-4">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))
        ) : (
          <Card className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No assignments found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedStatus !== "all" 
                ? "Try adjusting your search or filter criteria." 
                : "You're all caught up! Add a new assignment to get started."
              }
            </p>
            <Button onClick={handleAddAssignment}>
              <Plus className="w-4 h-4 mr-2" />
              Add Assignment
            </Button>
          </Card>
        )}
      </div>

      {/* Add Assignment Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-lg w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New Assignment</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This would open a comprehensive form to add new assignments with due dates, 
              priorities, and AI-powered difficulty estimation.
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setShowAddForm(false);
                  toast({
                    title: "Assignment Added",
                    description: "Your assignment has been added successfully.",
                  });
                }}
                className="flex-1"
              >
                Add Assignment
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}