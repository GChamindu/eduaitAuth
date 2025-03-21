import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

// Mock data for subjects by stream
const subjects = {
  al: [
    { id: "physics", name: "Physics", icon: "⚛️" },
    { id: "chemistry", name: "Chemistry", icon: "🧪" },
    { id: "biology", name: "Biology", icon: "🧬" },
    { id: "mathematics", name: "Mathematics", icon: "📊" },
    { id: "economics", name: "Economics", icon: "📈" },
    { id: "ict", name: "ICT", icon: "💻" },
  ],
  ol: [
    { id: "mathematics", name: "Mathematics", icon: "📊" },
    { id: "science", name: "Science", icon: "🔬" },
    { id: "english", name: "English", icon: "📝" },
    { id: "history", name: "History", icon: "📜" },
    { id: "geography", name: "Geography", icon: "🌍" },
    { id: "ict", name: "ICT", icon: "💻" },
  ],
}

export default function StreamPage({ params }: { params: { type: string } }) {
  const streamType = params.type.toLowerCase()

  // Validate stream type
  if (streamType !== "al" && streamType !== "ol") {
    notFound()
  }

  const streamSubjects = subjects[streamType as keyof typeof subjects]
  const streamTitle = streamType === "al" ? "Advanced Level (A/L)" : "Ordinary Level (O/L)"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to Home
          </Button>
        </Link>
      </div>

      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-primary">{streamTitle} Subjects</h1>
        <p className="text-muted-foreground mt-2">Select a subject to view available model papers</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {streamSubjects.map((subject) => (
          <Card key={subject.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{subject.icon}</span>
                {subject.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Access model papers and study materials for {subject.name}.</p>
            </CardContent>
            <CardFooter>
              <Link href={`/stream/${streamType}/subject/${subject.id}`} className="w-full">
                <Button className="w-full">View Papers</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

