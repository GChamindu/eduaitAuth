"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, MessageSquare, ThumbsUp, ImageIcon, Send } from "lucide-react"
import { subjects } from "@/lib/data"

// Mock forum data
interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar?: string
    initials: string
  }
  stream: "al" | "ol"
  subject: string
  createdAt: Date
  likes: number
  replies: ForumReply[]
  hasImage: boolean
}

interface ForumReply {
  id: string
  content: string
  author: {
    name: string
    avatar?: string
    initials: string
  }
  createdAt: Date
  likes: number
}

// Initial mock data
const initialPosts: ForumPost[] = [
  {
    id: "post1",
    title: "Help with Newton's Laws of Motion",
    content:
      "I'm struggling to understand the practical applications of Newton's Third Law. Can someone explain with examples?",
    author: {
      name: "Amal Perera",
      initials: "AP",
    },
    stream: "al",
    subject: "physics",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    likes: 12,
    replies: [
      {
        id: "reply1",
        content:
          "Newton's Third Law states that for every action, there is an equal and opposite reaction. A practical example is rocket propulsion - the rocket pushes exhaust gases backward, and the gases push the rocket forward with equal force.",
        author: {
          name: "Dr. Kumara",
          initials: "DK",
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        likes: 8,
      },
      {
        id: "reply2",
        content:
          "Another example is when you're swimming. You push water backwards, and the water pushes you forward. That's how you move in water!",
        author: {
          name: "Nimal Silva",
          initials: "NS",
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        likes: 5,
      },
    ],
    hasImage: false,
  },
  {
    id: "post2",
    title: "Organic Chemistry Reaction Mechanisms",
    content:
      "Can someone help me understand the SN1 and SN2 reaction mechanisms? I'm confused about the differences between them.",
    author: {
      name: "Kamala Jayawardena",
      initials: "KJ",
    },
    stream: "al",
    subject: "chemistry",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    likes: 9,
    replies: [
      {
        id: "reply3",
        content:
          "SN1 is a two-step process where the leaving group leaves first, forming a carbocation, and then the nucleophile attacks. SN2 is a one-step process where the nucleophile attacks as the leaving group leaves.",
        author: {
          name: "Priya Mendis",
          initials: "PM",
        },
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        likes: 7,
      },
    ],
    hasImage: true,
  },
  {
    id: "post3",
    title: "Solving Quadratic Equations",
    content:
      "What's the easiest method to solve quadratic equations in the exam? I find the formula method time-consuming.",
    author: {
      name: "Dinesh Kumar",
      initials: "DK",
    },
    stream: "ol",
    subject: "mathematics",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likes: 15,
    replies: [
      {
        id: "reply4",
        content:
          "Try factoring first if the coefficients are simple. It's much faster than using the quadratic formula. For example, x² + 5x + 6 = 0 can be factored as (x + 2)(x + 3) = 0, so x = -2 or x = -3.",
        author: {
          name: "Ms. Fathima",
          initials: "MF",
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        likes: 10,
      },
      {
        id: "reply5",
        content:
          "Completing the square is also a good method once you get used to it. It's especially useful when you need to convert to vertex form.",
        author: {
          name: "Rohan De Silva",
          initials: "RS",
        },
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        likes: 6,
      },
    ],
    hasImage: false,
  },
]

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts)
  const [activeTab, setActiveTab] = useState<"browse" | "create">("browse")
  const [stream, setStream] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [replyContent, setReplyContent] = useState<Record<string, string>>({})
  const [filter, setFilter] = useState<{ stream: string; subject: string }>({ stream: "", subject: "" })

  // Filter subjects based on selected stream
  const filteredSubjects = stream ? subjects[stream as keyof typeof subjects] : []

  // Filter posts based on selected filters
  const filteredPosts = posts.filter((post) => {
    if (filter.stream && post.stream !== filter.stream) return false
    if (filter.subject && post.subject !== filter.subject) return false
    return true
  })

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Handle post creation
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()

    if (!stream || !subject || !title || !content) {
      return
    }

    const newPost: ForumPost = {
      id: `post${Date.now()}`,
      title,
      content,
      author: {
        name: "You",
        initials: "YO",
      },
      stream: stream as "al" | "ol",
      subject,
      createdAt: new Date(),
      likes: 0,
      replies: [],
      hasImage: !!selectedFile,
    }

    setPosts([newPost, ...posts])
    setActiveTab("browse")
    setStream("")
    setSubject("")
    setTitle("")
    setContent("")
    setSelectedFile(null)
  }

  // Handle reply submission
  const handleSubmitReply = (postId: string) => {
    if (!replyContent[postId]?.trim()) return

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newReply: ForumReply = {
          id: `reply${Date.now()}`,
          content: replyContent[postId],
          author: {
            name: "You",
            initials: "YO",
          },
          createdAt: new Date(),
          likes: 0,
        }

        return {
          ...post,
          replies: [...post.replies, newReply],
        }
      }
      return post
    })

    setPosts(updatedPosts)
    setReplyContent({ ...replyContent, [postId]: "" })
  }

  // Handle like action
  const handleLikePost = (postId: string) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1,
        }
      }
      return post
    })

    setPosts(updatedPosts)
  }

  // Format date
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    }
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

      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Knowledge Forum</h1>
        <p className="text-muted-foreground mt-2">Share your questions and help others with their studies</p>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "browse" | "create")}
        className="max-w-5xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Questions</TabsTrigger>
            <TabsTrigger value="create">Ask a Question</TabsTrigger>
          </TabsList>

          {activeTab === "browse" && (
            <div className="flex gap-2">
              <Select
                value={filter.stream}
                onValueChange={(value) => setFilter({ ...filter, stream: value, subject: "" })}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Streams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Streams</SelectItem>
                  <SelectItem value="al">A/L</SelectItem>
                  <SelectItem value="ol">O/L</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filter.subject}
                onValueChange={(value) => setFilter({ ...filter, subject: value })}
                disabled={!filter.stream}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder={filter.stream ? "Select Subject" : "Select Stream First"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {filter.stream &&
                    subjects[filter.stream as keyof typeof subjects]?.map((subj) => (
                      <SelectItem key={subj.id} value={subj.id}>
                        {subj.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <TabsContent value="browse" className="space-y-6">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No questions found. Be the first to ask a question!</p>
                <Button className="mt-4" onClick={() => setActiveTab("create")}>
                  Ask a Question
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {post.author.avatar && <AvatarImage src={post.author.avatar} alt={post.author.name} />}
                        <AvatarFallback>{post.author.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">{post.author.name}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{post.stream.toUpperCase()}</Badge>
                      <Badge>{subjects[post.stream]?.find((s) => s.id === post.subject)?.name || post.subject}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{post.content}</p>

                  {post.hasImage && (
                    <div className="mt-4 border rounded-md overflow-hidden">
                      <img
                        src="/placeholder.svg?height=300&width=600"
                        alt="Question attachment"
                        className="w-full max-h-[300px] object-contain bg-muted/50"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-muted-foreground"
                      onClick={() => handleLikePost(post.id)}
                    >
                      <ThumbsUp size={16} />
                      <span>{post.likes}</span>
                    </Button>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <MessageSquare size={16} />
                      <span>{post.replies.length} replies</span>
                    </span>
                  </div>
                </CardContent>

                {post.replies.length > 0 && (
                  <div className="px-6 pb-2">
                    <h3 className="text-sm font-medium mb-3">Replies</h3>
                    <div className="space-y-4 pl-4 border-l-2 border-muted">
                      {post.replies.map((reply) => (
                        <div key={reply.id} className="relative">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                              {reply.author.avatar && <AvatarImage src={reply.author.avatar} alt={reply.author.name} />}
                              <AvatarFallback className="text-xs">{reply.author.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{reply.author.name}</span>
                                <span className="text-xs text-muted-foreground">{formatDate(reply.createdAt)}</span>
                              </div>
                              <p className="text-sm mt-1">{reply.content}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center gap-1 text-muted-foreground mt-1"
                              >
                                <ThumbsUp size={14} />
                                <span className="text-xs">{reply.likes}</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <CardFooter className="border-t pt-4 flex gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>YO</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Textarea
                      placeholder="Write a reply..."
                      className="min-h-[40px] resize-none"
                      value={replyContent[post.id] || ""}
                      onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
                    />
                    <Button
                      size="icon"
                      onClick={() => handleSubmitReply(post.id)}
                      disabled={!replyContent[post.id]?.trim()}
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Ask a Question</CardTitle>
              <CardDescription>Share your question with the community</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePost} className="space-y-4">
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
                      required
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
                    <Select value={subject} onValueChange={setSubject} disabled={!stream} required>
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
                  <label htmlFor="title" className="text-sm font-medium">
                    Question Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title for your question"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Question Details
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Describe your question in detail..."
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    Attach Image (Optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-upload")?.click()}
                      className="flex items-center gap-2"
                    >
                      <ImageIcon size={16} />
                      {selectedFile ? "Change Image" : "Add Image"}
                    </Button>
                    {selectedFile && <span className="text-sm text-muted-foreground">{selectedFile.name}</span>}
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("browse")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!stream || !subject || !title || !content}>
                    Post Question
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

