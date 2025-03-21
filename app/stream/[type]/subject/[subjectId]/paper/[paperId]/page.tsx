import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Download, Printer } from "lucide-react"

// Mock data for paper content
const paperContent = {
  "phys-2023": {
    title: "Physics Model Paper 2023",
    subject: "Physics",
    year: 2023,
    stream: "al",
    content: [
      { type: "section", title: "Section A - Multiple Choice Questions" },
      { type: "instruction", text: "Answer all questions in this section. Each question carries 1 mark." },
      {
        type: "question",
        number: 1,
        text: "Which of the following is a vector quantity?",
        options: ["Temperature", "Mass", "Velocity", "Energy"],
      },
      {
        type: "question",
        number: 2,
        text: "What is the SI unit of electric current?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
      },
      { type: "section", title: "Section B - Structured Questions" },
      { type: "instruction", text: "Answer all questions in this section. Show all your working." },
      {
        type: "question",
        number: 3,
        text: "A car accelerates uniformly from rest to 20 m/s in 10 seconds. Calculate:\na) The acceleration of the car\nb) The distance traveled during this time",
      },
      {
        type: "question",
        number: 4,
        text: "Explain the principle of conservation of energy and give an example of energy conversion in a hydroelectric power plant.",
      },
    ],
  },
  "math-ol-2023": {
    title: "Mathematics Model Paper 2023",
    subject: "Mathematics",
    year: 2023,
    stream: "ol",
    content: [
      { type: "section", title: "Section A - Short Questions" },
      { type: "instruction", text: "Answer all questions in this section. Each question carries 2 marks." },
      { type: "question", number: 1, text: "Solve for x: 3x + 7 = 22" },
      {
        type: "question",
        number: 2,
        text: "Find the area of a circle with radius 5 cm. Give your answer in terms of π.",
      },
      { type: "section", title: "Section B - Long Questions" },
      { type: "instruction", text: "Answer any four questions from this section. Each question carries 10 marks." },
      {
        type: "question",
        number: 3,
        text: "A rectangular garden has a length of 12 m and a width of 8 m. A path of uniform width is built around the garden. If the total area including the path is 168 m², find the width of the path.",
      },
      {
        type: "question",
        number: 4,
        text: "The table below shows the marks obtained by 50 students in a mathematics test.\n\nMarks | 0-20 | 21-40 | 41-60 | 61-80 | 81-100\nNo. of students | 5 | 10 | 20 | 10 | 5\n\nDraw a histogram to represent this data and find the modal class.",
      },
    ],
  },
}

export default function PaperPage({
  params,
}: {
  params: { type: string; subjectId: string; paperId: string }
}) {
  const { type, subjectId, paperId } = params

  // Check if paper exists
  if (!paperContent[paperId as keyof typeof paperContent]) {
    notFound()
  }

  const paper = paperContent[paperId as keyof typeof paperContent]

  // Validate if paper matches the stream and subject
  if (paper.stream !== type || paper.subject.toLowerCase() !== subjectId) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/stream/${type}/subject/${subjectId}`}>
          <Button variant="ghost" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to Papers
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">{paper.title}</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer size={16} />
            <span className="hidden md:inline">Print</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Download size={16} />
            <span className="hidden md:inline">Download</span>
          </Button>
        </div>
      </div>

      <Card className="p-6 md:p-8 bg-white shadow-md max-w-4xl mx-auto">
        <div className="text-center mb-8 pb-6 border-b">
          <h2 className="text-xl font-bold mb-2">{paper.subject} Model Paper</h2>
          <p className="text-muted-foreground">
            {type.toUpperCase()} Examination - {paper.year}
          </p>
          <p className="mt-2">Time: 3 Hours</p>
        </div>

        <div className="space-y-6">
          {paper.content.map((item, index) => {
            if (item.type === "section") {
              return (
                <div key={index} className="mt-8 mb-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
              )
            } else if (item.type === "instruction") {
              return (
                <div key={index} className="my-2 italic">
                  <p>{item.text}</p>
                </div>
              )
            } else if (item.type === "question") {
              return (
                <div key={index} className="my-4 pl-4 border-l-2 border-primary/20">
                  <p className="font-medium mb-2">
                    {item.number}. {item.text}
                  </p>
                  {item.options && (
                    <div className="grid grid-cols-2 gap-2 mt-2 pl-4">
                      {item.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <span className="text-sm font-medium">{String.fromCharCode(65 + optIndex)}.</span>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return null
          })}
        </div>
      </Card>
    </div>
  )
}

