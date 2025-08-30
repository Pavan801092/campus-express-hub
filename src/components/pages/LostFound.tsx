import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";
import { 
  QrCode, 
  Download, 
  Plus, 
  Search,
  Calendar,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const lostItems = [
  {
    id: 1,
    name: "student id",
    category: "other",
    image: "/lovable-uploads/05a93d33-045d-4618-b470-27cc1b63e016.png",
    location: "Library 2nd Floor",
    date: "Jan 15, 2025",
    description: "Blue student ID card with lanyard"
  },
  {
    id: 2,
    name: "iPhone 14 Pro",
    category: "electronics",
    image: "/lovable-uploads/d30e54e5-6146-4cd3-ae8a-356155cec8d6.png",
    location: "Student Center",
    date: "Jan 14, 2025",
    description: "Space gray iPhone 14 Pro with clear case"
  }
];

const foundItems = [
  {
    id: 3,
    name: "Advanced Calculus Textbook",
    category: "books",
    image: "/lovable-uploads/4f080cf4-af4b-4745-bcd6-8e6ee1659306.png",
    location: "Math Building Room 203",
    date: "Jan 16, 2025",
    description: "Math textbook with handwritten notes"
  }
];

export default function LostFound() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [showReportForm, setShowReportForm] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQRCode = async () => {
    try {
      // Generate a unique identifier for the user
      const userId = `student-${Date.now()}`;
      const qrData = `https://campusconnect.app/found/${userId}`;
      
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#6366f1',
          light: '#ffffff'
        }
      });
      
      setQrCodeUrl(qrCodeDataUrl);
      toast({
        title: "QR Code Generated!",
        description: "Your personal QR code is ready for download.",
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = 'my-campus-qr-code.png';
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Downloaded!",
      description: "Your QR code has been saved to your device.",
    });
  };

  const handleReportItem = () => {
    setShowReportForm(true);
    toast({
      title: "Report Form Opened",
      description: "Fill out the form to report a lost or found item.",
    });
  };

  const ItemCard = ({ item, type }: { item: any, type: 'lost' | 'found' }) => (
    <Card className="p-4 hover:shadow-lg transition-all duration-300">
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <Search className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-foreground capitalize">{item.name}</h3>
            <Badge variant="secondary" className="capitalize">
              {item.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{item.date}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline">
              <Phone className="w-3 h-3 mr-1" />
              Contact
            </Button>
            <Button size="sm" variant="outline">
              <Mail className="w-3 h-3 mr-1" />
              Email
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Digital Lost & Found</h1>
          <p className="text-muted-foreground">Help reunite lost items with their owners.</p>
        </div>
        <Button 
          onClick={handleReportItem}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Report an Item
        </Button>
      </div>

      {/* QR Code Section */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-primary via-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Your Personal Item QR Code</h2>
                <p className="text-white/90">Stick this on your valuables!</p>
              </div>
            </div>
            <div className="space-y-2 text-white/90">
              <p>If someone finds your item, they can scan this code to</p>
              <p>anonymously notify you through CampusConnect AI.</p>
              <p className="font-medium">Download and print multiple copies.</p>
            </div>
            <div className="flex gap-3 mt-6">
              {!qrCodeUrl ? (
                <Button 
                  onClick={generateQRCode}
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Generate QR Code
                </Button>
              ) : (
                <Button 
                  onClick={downloadQRCode}
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR
                </Button>
              )}
            </div>
          </div>
          {qrCodeUrl && (
            <div className="ml-6">
              <div className="bg-white p-4 rounded-lg">
                <img src={qrCodeUrl} alt="Personal QR Code" className="w-32 h-32" />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Items Tabs */}
      <Tabs defaultValue="lost" className="space-y-6">
        <div className="flex items-center justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="lost" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Lost Items
            </TabsTrigger>
            <TabsTrigger value="found" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Found Items
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="lost" className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-foreground mb-2">Lost Items</h3>
            <p className="text-sm text-muted-foreground">Items that students are looking for</p>
          </div>
          <div className="grid gap-4">
            {lostItems.map((item) => (
              <ItemCard key={item.id} item={item} type="lost" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="found" className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-foreground mb-2">Found Items</h3>
            <p className="text-sm text-muted-foreground">Items waiting to be claimed</p>
          </div>
          <div className="grid gap-4">
            {foundItems.map((item) => (
              <ItemCard key={item.id} item={item} type="found" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Form Modal Placeholder */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Report an Item</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This would open a form to report lost or found items. For now, this is a demonstration.
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowReportForm(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setShowReportForm(false);
                  toast({
                    title: "Item Reported",
                    description: "Your item has been added to the system.",
                  });
                }}
                className="flex-1"
              >
                Submit
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}