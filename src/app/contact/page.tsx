import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Twitter, Instagram, Phone, Mail } from "lucide-react";
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8 px-4 flex justify-center items-start min-h-screen">
      <Card className="w-full max-w-md shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl text-primary">Contact Us</CardTitle>
          <CardDescription>Get in touch or follow us online.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <Twitter className="w-6 h-6 text-secondary" />
            <Link href="https://x.com/Sathyamsarthak" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
              x.com/Sathyamsarthak
            </Link>
          </div>
          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <Instagram className="w-6 h-6 text-pink-500" /> {/* Specific color for Instagram */}
            <Link href="https://www.instagram.com/srishikharji/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
              instagram.com/srishikharji
            </Link>
          </div>
          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <Phone className="w-6 h-6 text-green-500" /> {/* Specific color for Phone */}
            <a href="tel:+918102116569" className="text-foreground hover:underline">
              +91 8102116569
            </a>
          </div>
          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
            <Mail className="w-6 h-6 text-accent" />
            <a href="mailto:Astroman6569@gmail.com" className="text-foreground hover:underline">
              Astroman6569@gmail.com
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
