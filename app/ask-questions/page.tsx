"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Send, User, Bot } from "lucide-react"
import { subjects } from "@/lib/data"
import { cn } from "@/lib/utils"

// Mock AI responses based on subject
const mockResponses: Record<string, string[]> = {
  physics: [
    "In physics, this can be explained by Newton's third law of motion: for every action, there is an equal and opposite reaction.",
    "This phenomenon is related to the conservation of energy principle, which states that energy cannot be created or destroyed, only transformed from one form to another.",
    "According to Einstein's theory of relativity, the answer depends on the frame of reference you're considering.",
    "This is a classic example of kinematics. We can solve it using the equations of motion: v = u + at, s = ut + ½at², and v² = u² + 2as.",
  ],
  chemistry: [
    "This reaction follows the principles of stoichiometry. We need to balance the chemical equation first.",
    "In organic chemistry, this compound undergoes substitution reactions due to the presence of functional groups.",
    "The periodic table arrangement explains this behavior. Elements in the same group have similar chemical properties.",
    "This is an example of acid-base equilibrium. We can apply the Henderson-Hasselbalch equation to find the pH.",
  ],
  mathematics: [
    "We can solve this using integration by parts. Remember the formula: ∫u(x)v'(x)dx = u(x)v(x) - ∫u'(x)v(x)dx.",
    "This is a classic application of the Pythagorean theorem in a 3D space. We need to find the distance between two points.",
    "For this problem, we can use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a.",
    "This can be solved using matrices and determinants. Remember that a system has a unique solution when the determinant is non-zero.",
  ],
  biology: [
    "This process is part of cellular respiration, which occurs in the mitochondria and produces ATP.",
    "In genetics, this trait follows Mendelian inheritance patterns. We can use a Punnett square to predict the outcomes.",
    "The human body has several mechanisms to maintain homeostasis, which is essential for proper functioning.",
    "This is related to natural selection, a key mechanism of evolution proposed by Charles Darwin.",
  ],
  science: [
    "This scientific phenomenon can be explained by the properties of matter and energy.",
    "The scientific method would suggest forming a hypothesis and then testing it through experimentation.",
    "This is a fundamental concept in science that helps us understand how the natural world works.",
    "Scientists have observed this pattern repeatedly, which is why it's considered a scientific law.",
  ],
  english: [
    "This literary device is commonly used to create emphasis and evoke emotion in the reader.",
    "The author's use of symbolism in this context represents deeper themes of the narrative.",
    "In grammar, this structure follows the subject-verb-object pattern typical in English sentences.",
    "This writing technique helps develop the character's arc throughout the story.",
  ],
  history: [
    "This historical event was influenced by socio-economic factors of that time period.",
    "The historical significance of this can be traced back to the political climate of the era.",
    "Historians debate different interpretations of this event, showing how history is often subjective.",
    "This marked a turning point in history that led to significant changes in society.",
  ],
  geography: [
    "This geographical feature is formed through the process of erosion and deposition over time.",
    "The climate in this region is influenced by its proximity to the ocean and prevailing wind patterns.",
    "Human activities have significantly impacted this ecosystem, leading to environmental challenges.",
    "This geographical phenomenon can be explained using plate tectonic theory.",
  ],
  economics: [
    "This economic principle follows the law of supply and demand in a free market.",
    "In macroeconomics, this is explained by the relationship between inflation and unemployment.",
    "This economic model assumes rational behavior from all market participants.",
    "The concept of opportunity cost is central to understanding this economic decision-making process.",
  ],
  ict: [
    "This programming concept uses object-oriented principles to encapsulate data and behavior.",
    "In networking, this protocol ensures reliable data transmission between devices.",
    "Database normalization helps eliminate redundancy and improve data integrity in this scenario.",
    "This algorithm has a time complexity of O(n log n), making it efficient for large datasets.",
  ],
}

// Generic responses when no specific subject response is available
const genericResponses = [
  "That's an interesting question! Based on the curriculum, you should focus on understanding the core concepts first.",
  "Great question! This topic is commonly tested in exams. Make sure to practice with past papers.",
  "I'd recommend reviewing your textbook chapter on this topic. The key points to remember are the fundamental principles.",
  "This is an important concept to understand. Try breaking it down into smaller parts and tackle each separately.",
]

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function AskQuestionsPage() {
  const [stream, setStream] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [question, setQuestion] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Filter subjects based on selected stream
  const filteredSubjects = stream ? subjects[stream as keyof typeof subjects] : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!stream || !subject || !question.trim()) {
      return
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      // Get subject-specific responses or fall back to generic
      const subjectResponses = mockResponses[subject] || genericResponses

      // Select a random response
      const randomResponse = subjectResponses[Math.floor(Math.random() * subjectResponses.length)]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setQuestion("")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2">
            <ChevronLeft size={16} />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Ask Questions</CardTitle>
            <CardDescription>Get answers to your academic questions from our AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="stream" className="text-sm font-medium">
                    Select Stream
                  </label>
                  <Select
                    value={stream}
                    onValueChange={(value) => {
                      setStream(value)
                      setSubject("") // Reset subject when stream changes
                    }}
                  >
                    <SelectTrigger id="stream">
                      <SelectValue placeholder="Select stream" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="al">Advanced Level (A/L)</SelectItem>
                      <SelectItem value="ol">Ordinary Level (O/L)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Select Subject
                  </label>
                  <Select value={subject} onValueChange={setSubject} disabled={!stream}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder={stream ? "Select subject" : "Select stream first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredSubjects.map((subj) => (
                        <SelectItem key={subj.id} value={subj.id}>
                          {subj.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="question" className="text-sm font-medium">
                  Your Question
                </label>
                <Textarea
                  id="question"
                  placeholder="Type your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={4}
                  className="resize-none"
                  disabled={!stream || !subject}
                />
              </div>

              <Button type="submit" className="w-full" disabled={!stream || !subject || !question.trim() || isLoading}>
                {isLoading ? "Processing..." : "Ask Question"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {messages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 p-4 rounded-lg",
                      message.sender === "user" ? "bg-primary/10 ml-6" : "bg-secondary/10 mr-6",
                    )}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {message.sender === "user" ? (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <User size={16} className="text-primary" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                          <Bot size={16} className="text-secondary" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{message.sender === "user" ? "You" : "EduAI Assistant"}</span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 p-4 rounded-lg bg-secondary/10 mr-6">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Bot size={16} className="text-secondary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">EduAI Assistant</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 rounded-full bg-secondary animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-secondary animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-secondary animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <form onSubmit={handleSubmit} className="w-full flex gap-2">
                <Textarea
                  placeholder="Type your follow-up question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="resize-none flex-1"
                  rows={1}
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={!question.trim() || isLoading}>
                  <Send size={16} />
                </Button>
              </form>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

