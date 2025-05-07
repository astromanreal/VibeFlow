
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-muted", // Changed bg-secondary to bg-muted for better theme consistency
      className // Ensure external className is merged correctly
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
          "h-full w-full flex-1 bg-primary transition-all",
          // Allow overriding indicator styles via className prop if needed, though direct styling is primary method
          // The className from the Root might affect this if not handled carefully, but style is preferred for dynamic width
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
