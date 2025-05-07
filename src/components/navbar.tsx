
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Settings, Contact, Sparkles, User, Heart, Notebook, Lightbulb, Waves, Menu } from 'lucide-react';
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

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const navLinks = [
    { href: "/affirmations", label: "Affirmations", icon: Heart },
    { href: "/journal", label: "Journal", icon: Notebook },
    { href: "/manifestation", label: "Manifestation", icon: Lightbulb },
    { href: "/meditation", label: "Meditation", icon: Waves },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border h-16 flex items-center justify-between px-4 md:px-6 lg:px-8">
      {/* Left side: Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors" aria-label="Go to homepage">
          <Sparkles className="h-6 w-6 text-accent" />
          <span className="font-semibold text-lg hidden sm:inline">VibeFlow</span>
        </Link>
      </div>

      {/* Center: Desktop Main Nav Links */}
      <div className="hidden md:flex items-center gap-1 sm:gap-2">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.href} passHref>
            <Button
              variant="ghost"
              className={cn(
                "text-foreground/80 hover:text-primary px-2 sm:px-3",
                "hover:bg-muted/50 transition-colors duration-200 ease-in-out",
                "hover:scale-105 active:scale-95"
              )}
              aria-label={link.label}
            >
              <link.icon className="h-5 w-5 sm:mr-1" />
              <span className="hidden sm:inline">{link.label}</span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Right side: Action Icons & Mobile Menu Trigger */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Mobile Menu Trigger - Appears on the right on small screens */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="hover:bg-muted/50">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 bg-card text-card-foreground">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle className="text-xl text-primary flex items-center gap-2">
                   <Sparkles className="h-5 w-5 text-accent" />
                   <span>VibeFlow Menu</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-1 p-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 py-3 px-3 rounded-md text-foreground/90 hover:bg-muted hover:text-primary transition-colors text-base"
                    >
                      <link.icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Existing right-side icons (Contact, Theme, Settings, Profile) */}
        <Link href="/contact" passHref>
          <Button variant="ghost" size="icon" aria-label="Contact" className="hover:bg-muted/50 transition-colors duration-200 ease-in-out">
            <Contact className="h-5 w-5" />
          </Button>
        </Link>

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

        <Link href="/settings" passHref>
          <Button variant="ghost" size="icon" aria-label="Settings" className="hover:bg-muted/50 transition-colors duration-200 ease-in-out">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>

        <Link href="/profile" passHref>
          <Button variant="ghost" size="icon" aria-label="User Profile" className="hover:bg-muted/50 transition-colors duration-200 ease-in-out">
            <User className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </nav>
  );
}
