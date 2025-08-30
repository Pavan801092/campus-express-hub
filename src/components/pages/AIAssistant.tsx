import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Bot, 
  Send, 
  BookOpen, 
  MapPin, 
  Lightbulb,
  Clock,
  User,
  Sparkles
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  {
    question: "What are the library hours?",
    icon: Clock,
    category: "Campus Info"
  },
  {
    question: "Explain the concept of recursion in programming",
    icon: BookOpen,
    category: "Academic"
  },
  {
    question: "Help me create a study schedule for finals",
    icon: Lightbulb,
    category: "Study Help"
  }
];

const aiCapabilities = [
  {
    icon: BookOpen,
    title: "Academic Questions",
    description: "Explain concepts, help with assignments"
  },
  {
    icon: MapPin,
    title: "Campus Info",
    description: "Library hours, event schedules, locations"
  },
  {
    icon: Lightbulb,
    title: "Study Help",
    description: "Summarize notes, create study guides"
  },
  {
    icon: Lightbulb,
    title: "Project Ideas",
    description: "Brainstorm and plan your projects"
  }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I am CampusConnect AI. I can help you with:\n\n📚 Academic Questions - Explain concepts, help with assignments\n🏛️ Campus Info - Library hours, event schedules, locations 📍\n📖 Study Help - Summarize notes, create study guides 💡 Project Ideas - Brainstorm and plan your projects\n\nWhat would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    if (!apiKey && showApiInput) {
      toast({
        title: "API Key Required",
        description: "Please enter your Perplexity API key to use the AI assistant.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      let botResponse = '';
      
      if (apiKey) {
        // Use Perplexity API for real AI responses
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [
              {
                role: 'system',
                content: 'You are CampusConnect AI, a helpful assistant for college students. Provide concise, accurate information about academics, campus life, study tips, and student projects. Be friendly and supportive.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            temperature: 0.2,
            top_p: 0.9,
            max_tokens: 1000,
            return_images: false,
            return_related_questions: false,
            search_recency_filter: 'month',
            frequency_penalty: 1,
            presence_penalty: 0
          }),
        });

        if (response.ok) {
          const data = await response.json();
          botResponse = data.choices[0]?.message?.content || 'I apologize, but I encountered an issue processing your request.';
        } else {
          throw new Error('API request failed');
        }
      } else {
        // Fallback responses for demo
        const responses = {
          'library hours': 'The library is open:\n• Monday-Friday: 7:00 AM - 11:00 PM\n• Saturday: 9:00 AM - 9:00 PM\n• Sunday: 10:00 AM - 10:00 PM\n\nDuring finals week, we extend hours to 24/7!',
          'recursion': 'Recursion is a programming technique where a function calls itself to solve a problem by breaking it into smaller, similar subproblems.\n\nKey components:\n1. **Base case**: The condition that stops the recursion\n2. **Recursive case**: The function calling itself with modified parameters\n\nExample: Calculating factorial\n```\nfactorial(n) {\n  if (n <= 1) return 1; // base case\n  return n * factorial(n-1); // recursive case\n}\n```',
          'study schedule': 'Here\'s a personalized study schedule template:\n\n**Week before finals:**\n• Day 1-2: Review all course materials\n• Day 3-4: Create summary notes\n• Day 5-6: Practice problems/mock tests\n• Day 7: Light review and rest\n\n**Tips:**\n- Study in 50-minute blocks with 10-minute breaks\n- Prioritize difficult subjects during peak energy hours\n- Use active recall techniques\n- Get 7-8 hours of sleep'
        };

        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('library')) {
          botResponse = responses['library hours'];
        } else if (lowerMessage.includes('recursion')) {
          botResponse = responses['recursion'];
        } else if (lowerMessage.includes('study') && lowerMessage.includes('schedule')) {
          botResponse = responses['study schedule'];
        } else {
          botResponse = `I understand you're asking about "${message}". As a campus AI assistant, I can help with:\n\n• Academic concepts and explanations\n• Campus information and resources\n• Study strategies and tips\n• Project planning and ideas\n\nCould you be more specific about what you'd like to know?`;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I apologize, but I encountered an error. Please check your API key and try again. For now, I can provide basic responses about library hours, programming concepts, and study tips.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowApiInput(false);
      toast({
        title: "API Key Set",
        description: "You can now chat with the AI assistant!",
      });
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Assistant</h1>
        <p className="text-muted-foreground">Your personal AI tutor and campus guide.</p>
      </div>

      {showApiInput && (
        <Card className="p-6 mb-6 border-yellow-200 bg-yellow-50">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-medium text-yellow-800">Enter Perplexity API Key</h3>
          </div>
          <p className="text-sm text-yellow-700 mb-4">
            To enable real-time AI responses, please enter your Perplexity API key. You can get one from{' '}
            <a href="https://perplexity.ai" target="_blank" rel="noopener noreferrer" className="underline">
              perplexity.ai
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Enter your Perplexity API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleApiKeySubmit} disabled={!apiKey.trim()}>
              Set API Key
            </Button>
          </div>
          <p className="text-xs text-yellow-600 mt-2">
            Don't have an API key? You can still use basic responses for demonstration.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowApiInput(false)}
            className="mt-2"
          >
            Continue without API key
          </Button>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary to-purple-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">CampusConnect AI</h3>
                  <p className="text-sm text-white/80">Online • Ready to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about academics or campus life..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Capabilities */}
          <Card className="p-4">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              I can help with:
            </h3>
            <div className="space-y-3">
              {aiCapabilities.map((capability, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <capability.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{capability.title}</p>
                    <p className="text-xs text-muted-foreground">{capability.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Questions */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Quick Questions</h3>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleQuickQuestion(question.question)}
                >
                  <div className="flex items-start gap-2">
                    <question.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{question.question}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {question.category}
                      </Badge>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}