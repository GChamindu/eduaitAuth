"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Download, FileText, Upload, Search, FileUp, Eye } from "lucide-react"
import { subjects } from "@/lib/data"

// Mock resource data
interface Resource {
  id: string
  title: string
  description: string
  fileType: "pdf" | "doc" | "ppt" | "other"
  fileSize: string
  author: {
    name: string
    avatar?: string
    initials: string
  }
  stream: "al" | "ol"
  subject: string
  createdAt: Date
  downloads: number
  views: number
}

// Initial mock data
const initialResources: Resource[] = [
  {
    id: "res1",
    title: "Complete Physics A/L Notes",
    description: "Comprehensive notes covering the entire A/L Physics syllabus with diagrams and examples.",
    fileType: "pdf",
    fileSize: "4.2 MB",
    author: {
      name: "Dr. Kumara",
      initials: "DK",
    },
    stream: "al",
    subject: "physics",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    downloads: 245,
    views: 512,
  },
  {
    id: "res2",
    title: "Chemistry Organic Reactions Cheat Sheet",
    description: "A quick reference guide for all important organic chemistry reactions for A/L exams.",
    fileType: "pdf",
    fileSize: "1.8 MB",
    author: {
      name: "Priya Mendis",
      initials: "PM",
    },
    stream: "al",
    subject: "chemistry",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    downloads: 189,
    views: 320,
  },
  {
    id: "res3",
    title: "O/L Mathematics Formula Book",
    description: "All formulas and equations you need for O/L Mathematics in one document.",
    fileType: "pdf",
    fileSize: "2.5 MB",
    author: {
      name: "Ms. Fathima",
      initials: "MF",
    },
    stream: "ol",
    subject: "mathematics",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    downloads: 312,
    views: 450,
  },
  {
    id: "res4",
    title: "Biology Diagrams Collection",
    description: "High-quality diagrams for all biology systems and processes in the A/L syllabus.",
    fileType: "pdf",
    fileSize: "8.7 MB",
    author: {
      name: "Nimal Silva",
      initials: "NS",
    },
    stream: "al",
    subject: "biology",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    downloads: 156,
    views: 278,
  },
  {
    id: "res5",
    title: "O/L Science Past Paper Solutions",
    description: "Detailed solutions for the last 5 years of O/L Science past papers.",
    fileType: "pdf",
    fileSize: "5.3 MB",
    author: {
      name: "Rohan De Silva",
      initials: "RS",
    },
    stream: "ol",
    subject: "science",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    downloads: 201,
    views: 342,
  },
]

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [activeTab, setActiveTab] = useState<"browse" | "upload">("browse")
  const [stream, setStream] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filter, setFilter] = useState<{ stream: string; subject: string }>({ stream: "", subject: "" })

  // Filter subjects based on selected stream
  const filteredSubjects = stream ? subjects[stream as keyof typeof subjects] : []

  // Filter and search resources
  const filteredResources = resources.filter((resource) => {
    // Apply stream and subject filters
    if (filter.stream && resource.stream !== filter.stream) return false
    if (filter.subject && resource.subject !== filter.subject) return false

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        subjects[resource.stream]
          ?.find((s) => s.id === resource.subject)
          ?.name.toLowerCase()
          .includes(query)
      )
    }

    return true
  })

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Handle resource upload
  const handleUploadResource = (e: React.FormEvent) => {
    e.preventDefault()

    if (!stream || !subject || !title || !description || !selectedFile) {
      return
    }

    // Calculate file size in MB
    const fileSizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1)

    // Determine file type
    let fileType: "pdf" | "doc" | "ppt" | "other" = "other"
    if (selectedFile.name.endsWith(".pdf")) fileType = "pdf"
    else if (selectedFile.name.endsWith(".doc") || selectedFile.name.endsWith(".docx")) fileType = "doc"
    else if (selectedFile.name.endsWith(".ppt") || selectedFile.name.endsWith(".pptx")) fileType = "ppt"

    const newResource: Resource = {
      id: `res${Date.now()}`,
      title,
      description,
      fileType,
      fileSize: `${fileSizeMB} MB`,
      author: {
        name: "You",
        initials: "YO",
      },
      stream: stream as "al" | "ol",
      subject,
      createdAt: new Date(),
      downloads: 0,
      views: 0,
    }

    setResources([newResource, ...resources])
    setActiveTab("browse")
    setStream("")
    setSubject("")
    setTitle("")
    setDescription("")
    setSelectedFile(null)
  }

  // Handle resource download
  const handleDownload = (resourceId: string) => {
    // In a real app, this would trigger the actual download
    // For this mock, we'll just increment the download count
    const updatedResources = resources.map((resource) => {
      if (resource.id === resourceId) {
        return {
          ...resource,
          downloads: resource.downloads + 1,
        }
      }
      return resource
    })

    setResources(updatedResources)
  }

  // Handle resource view
  const handleView = (resourceId: string) => {
    // In a real app, this would open the resource for viewing
    // For this mock, we'll just increment the view count
    const updatedResources = resources.map((resource) => {
      if (resource.id === resourceId) {
        return {
          ...resource,
          views: resource.views + 1,
        }
      }
      return resource
    })

    setResources(updatedResources)
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="text-red-500" size={24} />
      case "doc":
        return <FileText className="text-blue-500" size={24} />
      case "ppt":
        return <FileText className="text-orange-500" size={24} />
      default:
        return <FileText className="text-gray-500" size={24} />
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
        <h1 className="text-3xl font-bold text-primary">Resource Library</h1>
        <p className="text-muted-foreground mt-2">Share and download study materials, notes, and books</p>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "browse" | "upload")}
        className="max-w-5xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Resources</TabsTrigger>
            <TabsTrigger value="upload">Upload Resource</TabsTrigger>
          </TabsList>

          {activeTab === "browse" && (
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

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
            </div>
          )}
        </div>

        <TabsContent value="browse" className="space-y-6">
          {filteredResources.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">
                  {searchQuery || filter.stream || filter.subject
                    ? "No resources match your search criteria."
                    : "No resources available yet. Be the first to upload study materials!"}
                </p>
                <Button className="mt-4" onClick={() => setActiveTab("upload")}>
                  Upload Resource
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex items-center justify-center p-6 bg-muted/30 md:w-[120px]">
                      {getFileIcon(resource.fileType)}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{resource.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="w-6 h-6">
                              {resource.author.avatar && (
                                <AvatarImage src={resource.author.avatar} alt={resource.author.name} />
                              )}
                              <AvatarFallback className="text-xs">{resource.author.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{resource.author.name}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{formatDate(resource.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <Badge variant="outline">{resource.stream.toUpperCase()}</Badge>
                          <Badge>
                            {subjects[resource.stream]?.find((s) => s.id === resource.subject)?.name ||
                              resource.subject}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-3">{resource.description}</p>

                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <FileText size={14} />
                          {resource.fileType.toUpperCase()} • {resource.fileSize}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Eye size={14} />
                          {resource.views} views
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Download size={14} />
                          {resource.downloads} downloads
                        </span>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleView(resource.id)}
                        >
                          <Eye size={14} />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleDownload(resource.id)}
                        >
                          <Download size={14} />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Study Material</CardTitle>
              <CardDescription>Share your notes, books, or study materials with other students</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUploadResource} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="upload-stream" className="text-sm font-medium">
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
                      <SelectTrigger id="upload-stream">
                        <SelectValue placeholder="Select stream" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="al">Advanced Level (A/L)</SelectItem>
                        <SelectItem value="ol">Ordinary Level (O/L)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="upload-subject" className="text-sm font-medium">
                      Select Subject
                    </label>
                    <Select value={subject} onValueChange={setSubject} disabled={!stream} required>
                      <SelectTrigger id="upload-subject">
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
                    Resource Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title for your resource"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Resource Description
                  </label>
                  <Input
                    id="description"
                    placeholder="Briefly describe what this resource contains"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="file" className="text-sm font-medium">
                    Upload File (PDF, DOC, PPT)
                  </label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    {selectedFile ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center">
                          <FileText size={40} className="text-primary" />
                        </div>
                        <p className="text-sm font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById("file-upload")?.click()}
                        >
                          Change File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center">
                          <FileUp size={40} className="text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your file here, or click to browse
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById("file-upload")?.click()}
                        >
                          Browse Files
                        </Button>
                      </div>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      className="hidden"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported formats: PDF, DOC, DOCX, PPT, PPTX. Maximum file size: 20MB.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("browse")}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!stream || !subject || !title || !description || !selectedFile}
                    className="flex items-center gap-1"
                  >
                    <Upload size={16} />
                    Upload Resource
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

