"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, SunIcon, MoonIcon, UploadIcon } from "lucide-react"
import { useTheme } from "next-themes"

export function YouTubeHeader() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b bg-background sticky top-0 z-50 h-14">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-1" prefetch={false}>
          {/* YouTube Logo SVG - Retained for specific branding, acting as "Home" */}
          <svg height="20" viewBox="0 0 120 27" fill="currentColor" className="text-red-500">
            <path d="M113.45 12.77c-.72-.22-1.44-.33-2.16-.33-1.44 0-2.88.55-4.32 1.66-1.44 1.11-2.16 2.77-2.16 4.99 0 2.22.72 3.88 2.16 4.99 1.44 1.11 2.88 1.66 4.32 1.66 1.44 0 2.88-.55 4.32-1.66 1.44-1.11 2.16-2.77 2.16-4.99 0-2.22-.72-3.88-2.16-4.99-1.44-1.11-2.88-1.66-4.32-1.66zm-2.16 1.11c.72 0 1.44.22 2.16.66.72.44 1.08 1.11 1.08 2.0-.01 1.11-.37 1.88-1.08 2.33-.72.44-1.44.66-2.16.66-.72 0-1.44-.22-2.16-.66-.72-.44-1.08-1.11-1.08-2.0 0-1.11.36-1.88 1.08-2.33.72-.44 1.44-.66 2.16-.66zM96.77 12.77c-.72-.22-1.44-.33-2.16-.33-1.44 0-2.88.55-4.32 1.66-1.44 1.11-2.16 2.77-2.16 4.99 0 2.22.72 3.88 2.16 4.99 1.44 1.11 2.88 1.66 4.32 1.66 1.44 0 2.88-.55 4.32-1.66 1.44-1.11 2.16-2.77 2.16-4.99 0-2.22-.72-3.88-2.16-4.99-1.44-1.11-2.88-1.66-4.32-1.66zm-2.16 1.11c.72 0 1.44.22 2.16.66.72.44 1.08 1.11 1.08 2.0-.01 1.11-.37 1.88-1.08 2.33-.72.44-1.44.66-2.16.66-.72 0-1.44-.22-2.16-.66-.72-.44-1.08-1.11-1.08-2.0 0-1.11.36-1.88 1.08-2.33.72-.44 1.44-.66 2.16-.66zM79.08 12.77c-.72-.22-1.44-.33-2.16-.33-1.44 0-2.88.55-4.32 1.66-1.44 1.11-2.16 2.77-2.16 4.99 0 2.22.72 3.88 2.16 4.99 1.44 1.11 2.88 1.66 4.32 1.66 1.44 0 2.88-.55 4.32-1.66 1.44-1.11 2.16-2.77 2.16-4.99 0-2.22-.72-3.88-2.16-4.99-1.44-1.11-2.88-1.66-4.32-1.66zm-2.16 1.11c.72 0 1.44.22 2.16.66.72.44 1.08 1.11 1.08 2.0-.01 1.11-.37 1.88-1.08 2.33-.72.44-1.44.66-2.16.66-.72 0-1.44-.22-2.16-.66-.72-.44-1.08-1.11-1.08-2.0 0-1.11.36-1.88 1.08-2.33.72-.44 1.44-.66 2.16-.66zM61.39 12.77c-.72-.22-1.44-.33-2.16-.33-1.44 0-2.88.55-4.32 1.66-1.44 1.11-2.16 2.77-2.16 4.99 0 2.22.72 3.88 2.16 4.99 1.44 1.11 2.88 1.66 4.32 1.66 1.44 0 2.88-.55 4.32-1.66 1.44-1.11 2.16-2.77 2.16-4.99 0-2.22-.72-3.88-2.16-4.99-1.44-1.11-2.88-1.66-4.32-1.66zm-2.16 1.11c.72 0 1.44.22 2.16.66.72.44 1.08 1.11 1.08 2.0-.01 1.11-.37 1.88-1.08 2.33-.72.44-1.44.66-2.16.66-.72 0-1.44-.22-2.16-.66-.72-.44-1.08-1.11-1.08-2.0 0-1.11.36-1.88 1.08-2.33.72-.44 1.44-.66 2.16-.66zM43.7 12.77c-.72-.22-1.44-.33-2.16-.33-1.44 0-2.88.55-4.32 1.66-1.44 1.11-2.16 2.77-2.16 4.99 0 2.22.72 3.88 2.16 4.99 1.44 1.11 2.88 1.66 4.32 1.66 1.44 0 2.88-.55 4.32-1.66 1.44-1.11 2.16-2.77 2.16-4.99 0-2.22-.72-3.88-2.16-4.99-1.44-1.11-2.88-1.66-4.32-1.66zm-2.16 1.11c.72 0 1.44.22 2.16.66.72.44 1.08 1.11 1.08 2.0-.01 1.11-.37 1.88-1.08 2.33-.72.44-1.44.66-2.16.66-.72 0-1.44-.22-2.16-.66-.72-.44-1.08-1.11-1.08-2.0 0-1.11.36-1.88 1.08-2.33.72-.44 1.44-.66 2.16-.66zM26.01 12.77c-.72-.22-1.44-.33-2.16-.33-1.44 0-2.88.55-4.32 1.66-1.44 1.11-2.16 2.77-2.16 4.99 0 2.22.72 3.88 2.16 4.99 1.44 1.11 2.88 1.66 4.32 1.66 1.44 0 2.88-.55 4.32-1.66 1.44-1.11 2.16-2.77 2.16-4.99 0-2.22-.72-3.88-2.16-4.99-1.44-1.11-2.88-1.66-4.32-1.66zm-2.16 1.11c.72 0 1.44.22 2.16.66.72.44 1.08 1.11 1.08 2.0-.01 1.11-.37 1.88-1.08 2.33-.72.44-1.44.66-2.16.66-.72 0-1.44-.22-2.16-.66-.72-.44-1.08-1.11-1.08-2.0 0-1.11.36-1.88 1.08-2.33.72-.44 1.44-.66 2.16-.66zM8.32 12.77c-.72-.22-1.44-.33-2.16-.33-1.44 0-2.88.55-4.32 1.66-1.44 1.11-2.16 2.77-2.16 4.99 0 2.22.72 3.88 2.16 4.99 1.44 1.11 2.88 1.66 4.32 1.66 1.44 0 2.88-.55 4.32-1.66 1.44-1.11 2.16-2.77 2.16-4.99 0-2.22-.72-3.88-2.16-4.99-1.44-1.11-2.88-1.66-4.32-1.66zm-2.16 1.11c.72 0 1.44.22 2.16.66.72.44 1.08 1.11 1.08 2.0-.01 1.11-.37 1.88-1.08 2.33-.72.44-1.44.66-2.16.66-.72 0-1.44-.22-2.16-.66-.72-.44-1.08-1.11-1.08-2.0 0-1.11.36-1.88 1.08-2.33.72-.44 1.44-.66 2.16-.66z" />
          </svg>
          <span className="font-bold text-foreground">Home</span>
          <span className="sr-only">YouTube Home</span>
        </Link>
      </div>
      <div className="flex-1 max-w-xl mx-auto flex border border-input rounded-md overflow-hidden bg-background">
        <Input
          type="text"
          placeholder="Search"
          className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-md rounded-r-none px-4 py-2"
          aria-label="Search"
        />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-r-md rounded-l-none border-l border-input bg-muted hover:bg-accent"
        >
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Search button</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/upload" passHref>
          <Button variant="ghost" size="icon" className="rounded-md" aria-label="Upload video">
            <UploadIcon className="h-6 w-6" />
            <span className="sr-only">Upload</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-md"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          <span className="sr-only">Toggle dark mode</span>
        </Button>
      </div>
    </header>
  )
}
