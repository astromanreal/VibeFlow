
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Twitter, Instagram, Phone, Mail, Github, Handshake, ChevronRight } from "lucide-react";
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | VibeFlow Support',
  description: 'Get in touch with the VibeFlow team. We welcome your questions, feedback, and stories. Reach out via email, phone, or social media.',
  openGraph: {
    title: 'Contact Us | VibeFlow Support',
    description: 'Connect with the VibeFlow team for support or feedback.',
    images: [{ url: 'https://placehold.co/1200x630.png', alt: 'A handshake icon representing contact and support' }],
  },
};


const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    value: "Astroman6569@gmail.com",
    href: "mailto:Astroman6569@gmail.com",
    color: "text-accent",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 8102116569",
    href: "tel:+918102116569",
    color: "text-green-500",
  },
];

const socialLinks = [
  {
    icon: Twitter,
    title: "Twitter / X",
    value: "x.com/Sathyamsarthak",
    href: "https://x.com/Sathyamsarthak",
    color: "text-secondary",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "instagram.com/srishikharji",
    href: "https://www.instagram.com/srishikharji/",
    color: "text-pink-500",
  },
  {
    icon: Github,
    title: "GitHub",
    value: "github.com/astromanreal",
    href: "https://github.com/astromanreal",
    color: "text-foreground",
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8 px-4 flex justify-center items-start min-h-screen">
      <Card className="w-full max-w-2xl shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center items-center">
            <div className="p-4 bg-primary/10 rounded-full mb-3">
                <Handshake className="w-10 h-10 text-primary" />
            </div>
          <CardTitle className="text-3xl md:text-4xl text-primary">Get in Touch</CardTitle>
          <CardDescription className="max-w-md">
            We're here to listen. Whether you have a question, feedback, or just want to connect, we welcome you to reach out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-4">
          
          <div>
            <h3 className="text-lg font-semibold text-secondary mb-4 text-center sm:text-left">Direct Contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method) => (
                <a key={method.title} href={method.href} className="group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  <div className="p-4 border rounded-lg h-full flex items-center gap-4 bg-background/50 hover:bg-muted/50 hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]">
                    <method.icon className={`w-8 h-8 ${method.color} shrink-0`} />
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary">{method.title}</h4>
                      <p className="text-sm text-muted-foreground break-all">{method.value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold text-secondary mb-4 text-center sm:text-left">Follow Our Journey</h3>
            <div className="space-y-4">
              {socialLinks.map((social) => (
                <Link key={social.title} href={social.href} target="_blank" rel="noopener noreferrer" className="group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  <div className="p-4 border rounded-lg flex items-center gap-4 bg-background/50 hover:bg-muted/50 hover:border-primary/50 transition-colors duration-200">
                    <social.icon className={`w-7 h-7 ${social.color} shrink-0`} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary">{social.title}</h4>
                      <p className="text-sm text-muted-foreground">{social.value}</p>
                    </div>
                     <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
