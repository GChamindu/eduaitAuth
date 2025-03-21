// This file contains mock data for the application
// In a real application, this would be fetched from a database

export type Stream = "al" | "ol"

export interface Subject {
  id: string
  name: string
  icon: string
  streamType: Stream
}

export interface Paper {
  id: string
  name: string
  year: number
  type: "Model Paper" | "Past Paper" | "MCQ"
  subjectId: string
  streamType: Stream
}

export interface PaperContent {
  title: string
  subject: string
  year: number
  stream: Stream
  content: (
    | { type: "section"; title: string }
    | { type: "instruction"; text: string }
    | { type: "question"; number: number; text: string; options?: string[] }
  )[]
}

// Subjects data
export const subjects: Record<Stream, Subject[]> = {
  al: [
    { id: "physics", name: "Physics", icon: "⚛️", streamType: "al" },
    { id: "chemistry", name: "Chemistry", icon: "🧪", streamType: "al" },
    { id: "biology", name: "Biology", icon: "🧬", streamType: "al" },
    { id: "mathematics", name: "Mathematics", icon: "📊", streamType: "al" },
    { id: "economics", name: "Economics", icon: "📈", streamType: "al" },
    { id: "ict", name: "ICT", icon: "💻", streamType: "al" },
  ],
  ol: [
    { id: "mathematics", name: "Mathematics", icon: "📊", streamType: "ol" },
    { id: "science", name: "Science", icon: "🔬", streamType: "ol" },
    { id: "english", name: "English", icon: "📝", streamType: "ol" },
    { id: "history", name: "History", icon: "📜", streamType: "ol" },
    { id: "geography", name: "Geography", icon: "🌍", streamType: "ol" },
    { id: "ict", name: "ICT", icon: "💻", streamType: "ol" },
  ],
}

// Papers data
export const papers: Record<Stream, Record<string, Paper[]>> = {
  al: {
    physics: [
      {
        id: "phys-2023",
        name: "Physics Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "physics",
        streamType: "al",
      },
      {
        id: "phys-2022",
        name: "Physics Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "physics",
        streamType: "al",
      },
      {
        id: "phys-2021",
        name: "Physics Past Paper 2021",
        year: 2021,
        type: "Past Paper",
        subjectId: "physics",
        streamType: "al",
      },
      {
        id: "phys-mcq-2023",
        name: "Physics MCQ Paper 2023",
        year: 2023,
        type: "MCQ",
        subjectId: "physics",
        streamType: "al",
      },
    ],
    chemistry: [
      {
        id: "chem-2023",
        name: "Chemistry Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "chemistry",
        streamType: "al",
      },
      {
        id: "chem-2022",
        name: "Chemistry Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "chemistry",
        streamType: "al",
      },
      {
        id: "chem-2021",
        name: "Chemistry Past Paper 2021",
        year: 2021,
        type: "Past Paper",
        subjectId: "chemistry",
        streamType: "al",
      },
    ],
    biology: [
      {
        id: "bio-2023",
        name: "Biology Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "biology",
        streamType: "al",
      },
      {
        id: "bio-2022",
        name: "Biology Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "biology",
        streamType: "al",
      },
    ],
    mathematics: [
      {
        id: "math-2023",
        name: "Mathematics Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "mathematics",
        streamType: "al",
      },
      {
        id: "math-2022",
        name: "Mathematics Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "mathematics",
        streamType: "al",
      },
      {
        id: "math-2021",
        name: "Mathematics Past Paper 2021",
        year: 2021,
        type: "Past Paper",
        subjectId: "mathematics",
        streamType: "al",
      },
    ],
    economics: [
      {
        id: "econ-2023",
        name: "Economics Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "economics",
        streamType: "al",
      },
      {
        id: "econ-2022",
        name: "Economics Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "economics",
        streamType: "al",
      },
    ],
    ict: [
      {
        id: "ict-2023",
        name: "ICT Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "ict",
        streamType: "al",
      },
      {
        id: "ict-2022",
        name: "ICT Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "ict",
        streamType: "al",
      },
      {
        id: "ict-2021",
        name: "ICT Past Paper 2021",
        year: 2021,
        type: "Past Paper",
        subjectId: "ict",
        streamType: "al",
      },
    ],
  },
  ol: {
    mathematics: [
      {
        id: "math-ol-2023",
        name: "Mathematics Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "mathematics",
        streamType: "ol",
      },
      {
        id: "math-ol-2022",
        name: "Mathematics Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "mathematics",
        streamType: "ol",
      },
      {
        id: "math-ol-2021",
        name: "Mathematics Past Paper 2021",
        year: 2021,
        type: "Past Paper",
        subjectId: "mathematics",
        streamType: "ol",
      },
    ],
    science: [
      {
        id: "sci-2023",
        name: "Science Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "science",
        streamType: "ol",
      },
      {
        id: "sci-2022",
        name: "Science Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "science",
        streamType: "ol",
      },
    ],
    english: [
      {
        id: "eng-2023",
        name: "English Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "english",
        streamType: "ol",
      },
      {
        id: "eng-2022",
        name: "English Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "english",
        streamType: "ol",
      },
    ],
    history: [
      {
        id: "hist-2023",
        name: "History Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "history",
        streamType: "ol",
      },
      {
        id: "hist-2022",
        name: "History Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "history",
        streamType: "ol",
      },
    ],
    geography: [
      {
        id: "geo-2023",
        name: "Geography Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "geography",
        streamType: "ol",
      },
      {
        id: "geo-2022",
        name: "Geography Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "geography",
        streamType: "ol",
      },
    ],
    ict: [
      {
        id: "ict-ol-2023",
        name: "ICT Model Paper 2023",
        year: 2023,
        type: "Model Paper",
        subjectId: "ict",
        streamType: "ol",
      },
      {
        id: "ict-ol-2022",
        name: "ICT Model Paper 2022",
        year: 2022,
        type: "Model Paper",
        subjectId: "ict",
        streamType: "ol",
      },
    ],
  },
}

// Paper content data
export const paperContents: Record<string, PaperContent> = {
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

// Helper functions to get data
export function getSubjectsByStream(streamType: Stream): Subject[] {
  return subjects[streamType] || []
}

export function getPapersBySubject(streamType: Stream, subjectId: string): Paper[] {
  return papers[streamType]?.[subjectId] || []
}

export function getPaperContent(paperId: string): PaperContent | undefined {
  return paperContents[paperId]
}

