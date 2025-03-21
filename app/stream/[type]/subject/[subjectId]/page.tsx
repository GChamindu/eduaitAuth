import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Download, Eye } from "lucide-react"

// Mock data for papers by subject and stream
const papers = {
  al: {
    physics: [
      { id: "phys-2023", name: "Physics Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "phys-2022", name: "Physics Model Paper 2022", year: 2022, type: "Model Paper" },
      { id: "phys-2021", name: "Physics Past Paper 2021", year: 2021, type: "Past Paper" },
      { id: "phys-mcq-2023", name: "Physics MCQ Paper 2023", year: 2023, type: "MCQ" },
    ],
    chemistry: [
      { id: "chem-2023", name: "Chemistry Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "chem-2022", name: "Chemistry Model Paper 2022", year: 2022, type: "Model Paper" },
      { id: "chem-2021", name: "Chemistry Past Paper 2021", year: 2021, type: "Past Paper" },
    ],
    biology: [
      { id: "bio-2023", name: "Biology Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "bio-2022", name: "Biology Model Paper 2022", year: 2022, type: "Model Paper" },
    ],
    mathematics: [
      { id: "math-2023", name: "Mathematics Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "math-2022", name: "Mathematics Model Paper 2022", year: 2022, type: "Model Paper" },
      { id: "math-2021", name: "Mathematics Past Paper 2021", year: 2021, type: "Past Paper" },
    ],
    economics: [
      { id: "econ-2023", name: "Economics Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "econ-2022", name: "Economics Model Paper 2022", year: 2022, type: "Model Paper" },
    ],
    ict: [
      { id: "ict-2023", name: "ICT Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "ict-2022", name: "ICT Model Paper 2022", year: 2022, type: "Model Paper" },
      { id: "ict-2021", name: "ICT Past Paper 2021", year: 2021, type: "Past Paper" },
    ],
  },
  ol: {
    mathematics: [
      { id: "math-ol-2023", name: "Mathematics Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "math-ol-2022", name: "Mathematics Model Paper 2022", year: 2022, type: "Model Paper" },
      { id: "math-ol-2021", name: "Mathematics Past Paper 2021", year: 2021, type: "Past Paper" },
    ],
    science: [
      { id: "sci-2023", name: "Science Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "sci-2022", name: "Science Model Paper 2022", year: 2022, type: "Model Paper" },
    ],
    english: [
      { id: "eng-2023", name: "English Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "eng-2022", name: "English Model Paper 2022", year: 2022, type: "Model Paper" },
    ],
    history: [
      { id: "hist-2023", name: "History Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "hist-2022", name: "History Model Paper 2022", year: 2022, type: "Model Paper" },
    ],
    geography: [
      { id: "geo-2023", name: "Geography Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "geo-2022", name: "Geography Model Paper 2022", year: 2022, type: "Model Paper" },
    ],
    ict: [
      { id: "ict-ol-2023", name: "ICT Model Paper 2023", year: 2023, type: "Model Paper" },
      { id: "ict-ol-2022", name: "ICT Model Paper 2022", year: 2022, type: "Model Paper" },
    ],
  },
}

// Subject name mapping
const subjectNames = {
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  mathematics: "Mathematics",
  economics: "Economics",
  ict: "ICT",
  science: "Science",
  english: "English",
  history: "History",
  geography: "Geography",
}

export default function SubjectPage({
  params,
}: {
  params: { type: string; subjectId: string }
}) {
  const { type, subjectId } = params
  const streamType = type.toLowerCase()

  // Validate stream type
  if (streamType !== "al" && streamType !== "ol") {
    notFound()
  }

  // Validate subject
  if (!papers[streamType as keyof typeof papers][subjectId as keyof typeof papers.al | keyof typeof papers.ol]) {
    notFound()
  }

  const subjectPapers =
    papers[streamType as keyof typeof papers][subjectId as keyof typeof papers.al | keyof typeof papers.ol]
  const subjectName = subjectNames[subjectId as keyof typeof subjectNames]
  const streamName = streamType === "al" ? "Advanced Level" : "Ordinary Level"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href={`/stream/${streamType}`}>
          <Button variant="ghost" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to {streamName} Subjects
          </Button>
        </Link>
      </div>

      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-primary">{subjectName} Papers</h1>
        <p className="text-muted-foreground mt-2">
          {streamName} ({streamType.toUpperCase()}) - {subjectName} Model and Past Papers
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {subjectPapers.map((paper) => (
            <Card key={paper.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{paper.name}</CardTitle>
                  <Badge variant={paper.type === "Model Paper" ? "default" : "secondary"}>{paper.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-muted-foreground">Year: {paper.year}</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link href={`/stream/${streamType}/subject/${subjectId}/paper/${paper.id}`} className="flex-1">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Eye size={16} />
                    View Paper
                  </Button>
                </Link>
                <Link href={`/stream/${streamType}/subject/${subjectId}/paper/${paper.id}/download`} className="flex-1">
                  <Button className="w-full flex items-center gap-2">
                    <Download size={16} />
                    Download
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

