
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Settings, Contact, Sparkles, User, Heart, Notebook, Lightbulb, Waves, Menu, LayoutGrid, HeartPulse, Route, LifeBuoy, Users, BrainCircuit } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const navLinks = [
    { href: "/affirmations", label: "Affirmations", icon: Heart },
    { href: "/therapy-paths", label: "Therapy Paths", icon: Route },
    { href: "/mood-tracker", label: "Mood Tracker", icon: HeartPulse },
    { href: "/journal", label: "Journal", icon: Notebook },
    { href: "/support-circles", label: "Circles", icon: Users },
    { href: "/manifestation", label: "Manifestation", icon: Lightbulb },
    { href: "/meditation", label: "Meditation", icon: Waves },
    { href: "/mindful-moments", label: "Mindful Moments", icon: BrainCircuit },
  ];

  const sheetFooterLinks = [
    { href: "/explore", label: "Explore All Features", icon: LayoutGrid },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/contact", label: "Contact", icon: Contact },
    { href: "/crisis-support", label: "Crisis Support", icon: LifeBuoy, className:"text-red-500 hover:bg-red-500/10 hover:text-red-600" },
  ];
  
  const desktopActionLinks = [
    { href: "/explore", label: "Explore", icon: LayoutGrid },
    { href: "/crisis-support", label: "Crisis Support", icon: LifeBuoy, className: "text-red-500 hover:bg-red-500/10 hover:text-red-600" },
    { href: "/contact", label: "Contact", icon: Contact },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border h-16 flex items-center justify-between px-4 md:px-6">
      {/* Left side: Menu and Logo */}
      <div className="flex items-center gap-2">
         {/* Menu Trigger (Visible on all screen sizes) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="hover:bg-muted/50">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 bg-card text-card-foreground flex flex-col">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle className="text-xl text-primary flex items-center gap-2">
                   <Sparkles className="h-5 w-5 text-accent" />
                   <span>VibeFlow Menu</span>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="flex-1">
                <nav className="flex flex-col space-y-1 p-4">
                  {navLinks.sort((a,b) => a.label.localeCompare(b.label)).map((link) => (
                    <SheetClose asChild key={`mobile-${link.href}`}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 py-2.5 px-3 rounded-md text-foreground/90 hover:bg-muted hover:text-primary transition-colors text-base"
                      >
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </Link>
                    </SheetClose>
                  ))}
                  <Separator className="my-2" />
                  {sheetFooterLinks.map((link) => (
                    <SheetClose asChild key={`mobile-${link.href}`}>
                      <Link
                        href={link.href}
                        className={cn("flex items-center gap-3 py-2.5 px-3 rounded-md text-foreground/90 hover:bg-muted hover:text-primary transition-colors text-base", link.className)}
                      >
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>

        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors" aria-label="Go to homepage">
          <Sparkles className="h-6 w-6 text-accent" />
          <span className="font-semibold text-lg hidden sm:inline">VibeFlow</span>
        </Link>
      </div>

      {/* Right side: Action Icons */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <div className="hidden md:flex items-center space-x-1">
          {desktopActionLinks.map((link) => (
             <Link href={link.href} key={link.href} passHref>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    aria-label={link.label} 
                    className={cn("hover:bg-muted/50 transition-colors duration-200 ease-in-out", link.className)}
                >
                    <link.icon className="h-5 w-5" />
                </Button>
            </Link>
          ))}
        </div>
        
        {/* Theme toggle is separate as it has an onClick and is always visible */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="hover:bg-muted/50 transition-colors duration-200 ease-in-out relative overflow-hidden"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
}
