import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">Educational Learning Portal</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access model papers and study materials for Advanced Level and Ordinary Level examinations
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Advanced Level (A/L)</CardTitle>
              <CardDescription>Model papers for A/L students</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Advanced Level"
                className="rounded-md h-48 object-cover"
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/stream/al">
                <Button size="lg">Select A/L Stream</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ordinary Level (O/L)</CardTitle>
              <CardDescription>Model papers for O/L students</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Ordinary Level"
                className="rounded-md h-48 object-cover"
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/stream/ol">
                <Button size="lg">Select O/L Stream</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* New Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* AI Assistant Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Ask EduAI Assistant</CardTitle>
              <CardDescription>Get answers to your academic questions</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <img
                src="/placeholder.svg?height=120&width=200"
                alt="AI Assistant"
                className="rounded-md h-28 object-cover"
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/ask-questions">
                <Button size="sm" variant="outline">
                  Ask Questions
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Knowledge Forum Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Knowledge Forum</CardTitle>
              <CardDescription>Share and answer questions with peers</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <img
                src="/placeholder.svg?height=120&width=200"
                alt="Knowledge Forum"
                className="rounded-md h-28 object-cover"
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/forum">
                <Button size="sm" variant="outline">
                  Join Discussion
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Resource Library Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Resource Library</CardTitle>
              <CardDescription>Share and download study materials</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <img
                src="/placeholder.svg?height=120&width=200"
                alt="Resource Library"
                className="rounded-md h-28 object-cover"
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/resources">
                <Button size="sm" variant="outline">
                  Browse Resources
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-lg bg-white shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Comprehensive Resources</h3>
              <p className="text-muted-foreground">Access a wide range of model papers for all subjects.</p>
            </div>

            <div className="p-6 rounded-lg bg-white shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Community Learning</h3>
              <p className="text-muted-foreground">Share knowledge and resources with fellow students.</p>
            </div>

            <div className="p-6 rounded-lg bg-white shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">AI-Powered Assistance</h3>
              <p className="text-muted-foreground">
                Get instant answers to your academic questions with our EduAI Assistant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

