'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
     <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-lg border-destructive">
        <CardHeader>
          <CardTitle className="text-2xl text-destructive">Something went wrong!</CardTitle>
          <CardDescription>An unexpected error occurred. ({error.message})</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <p className="text-sm text-muted-foreground">
             We apologize for the inconvenience. Please try again.
           </p>
           {/* Removed conditional error details section for simplification */}
           <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            variant="destructive"
          >
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
