
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import { ThemeApplicator } from '@/components/theme-applicator';

const geistSans = Geist({
  variable: '--font-geist-sans', // This specifies the CSS variable name to be used in globals.css
  subsets: ['latin'],
});
// geistSans.variable from next/font (or mock) will be a class name like 'mock_var_font_geist_sans'

export const metadata: Metadata = {
  title: 'VibeFlow',
  description: 'Your center of peace, power, and presence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply the font variable helper class (geistSans.variable) to the html tag
    <html lang="en" className={cn("h-full", geistSans.variable)} suppressHydrationWarning>
      {/* Font family is applied to body via globals.css using var(--font-geist-sans) */}
      <body className={cn(
        "antialiased h-full flex flex-col",
        "bg-gradient-to-br from-background to-muted dark:from-background dark:to-card",
        "transition-colors duration-300" // Added for smooth background color transition
        )}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
           <ThemeApplicator />
           <Navbar />
           {/* pt-16 ensures content starts below the fixed 64px (h-16) navbar */}
           {/* Increased top padding to pt-20 or pt-24 for better spacing below navbar */}
           <main className="flex-1 p-4 md:p-6 lg:p-8 pt-20 md:pt-24">
              {children}
            </main>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

