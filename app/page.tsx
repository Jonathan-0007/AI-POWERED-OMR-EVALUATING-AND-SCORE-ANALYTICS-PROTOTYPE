"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, BarChart3, Download, CheckCircle, XCircle, Brain, User, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const answerKeys = {
  A: {
    1: ["a"],
    2: ["c"],
    3: ["c"],
    4: ["c"],
    5: ["c"],
    6: ["a"],
    7: ["c"],
    8: ["c"],
    9: ["b"],
    10: ["c"],
    11: ["a"],
    12: ["a"],
    13: ["d"],
    14: ["a"],
    15: ["b"],
    16: ["a", "b", "c", "d"],
    17: ["c"],
    18: ["d"],
    19: ["a"],
    20: ["b"],
    21: ["a"],
    22: ["d"],
    23: ["b"],
    24: ["a"],
    25: ["c"],
    26: ["b"],
    27: ["a"],
    28: ["b"],
    29: ["d"],
    30: ["c"],
    31: ["c"],
    32: ["a"],
    33: ["b"],
    34: ["c"],
    35: ["a"],
    36: ["b"],
    37: ["d"],
    38: ["b"],
    39: ["a"],
    40: ["b"],
    41: ["c"],
    42: ["c"],
    43: ["c"],
    44: ["b"],
    45: ["b"],
    46: ["a"],
    47: ["c"],
    48: ["b"],
    49: ["d"],
    50: ["a"],
    51: ["c"],
    52: ["b"],
    53: ["c"],
    54: ["c"],
    55: ["a"],
    56: ["b"],
    57: ["b"],
    58: ["a"],
    59: ["a", "b"],
    60: ["b"],
    61: ["b"],
    62: ["c"],
    63: ["a"],
    64: ["b"],
    65: ["c"],
    66: ["b"],
    67: ["b"],
    68: ["c"],
    69: ["c"],
    70: ["b"],
    71: ["b"],
    72: ["b"],
    73: ["d"],
    74: ["b"],
    75: ["a"],
    76: ["b"],
    77: ["b"],
    78: ["b"],
    79: ["b"],
    80: ["b"],
    81: ["a"],
    82: ["b"],
    83: ["c"],
    84: ["b"],
    85: ["c"],
    86: ["b"],
    87: ["b"],
    88: ["b"],
    89: ["a"],
    90: ["b"],
    91: ["c"],
    92: ["b"],
    93: ["c"],
    94: ["b"],
    95: ["b"],
    96: ["b"],
    97: ["c"],
    98: ["a"],
    99: ["b"],
    100: ["c"],
  },
  B: {
    1: ["a"],
    2: ["b"],
    3: ["d"],
    4: ["b"],
    5: ["b"],
    6: ["d"],
    7: ["c"],
    8: ["c"],
    9: ["a"],
    10: ["c"],
    11: ["a"],
    12: ["b"],
    13: ["d"],
    14: ["c"],
    15: ["c"],
    16: ["a"],
    17: ["c"],
    18: ["b"],
    19: ["d"],
    20: ["c"],
    21: ["a"],
    22: ["a"],
    23: ["b"],
    24: ["a"],
    25: ["b"],
    26: ["a"],
    27: ["b"],
    28: ["b"],
    29: ["c"],
    30: ["c"],
    31: ["b"],
    32: ["c"],
    33: ["b"],
    34: ["c"],
    35: ["a"],
    36: ["a"],
    37: ["a"],
    38: ["b"],
    39: ["b"],
    40: ["a"],
    41: ["b"],
    42: ["a"],
    43: ["d"],
    44: ["b"],
    45: ["c"],
    46: ["b"],
    47: ["b"],
    48: ["b"],
    49: ["b"],
    50: ["b"],
    51: ["c"],
    52: ["a"],
    53: ["c"],
    54: ["a"],
    55: ["c"],
    56: ["c"],
    57: ["b"],
    58: ["a"],
    59: ["b"],
    60: ["c"],
    61: ["b"],
    62: ["b"],
    63: ["b"],
    64: ["d"],
    65: ["c"],
    66: ["b"],
    67: ["b"],
    68: ["a"],
    69: ["b"],
    70: ["b"],
    71: ["b"],
    72: ["c"],
    73: ["a"],
    74: ["d"],
    75: ["b"],
    76: ["b"],
    77: ["d"],
    78: ["a"],
    79: ["b"],
    80: ["a"],
    81: ["b"],
    82: ["c"],
    83: ["b"],
    84: ["a"],
    85: ["c"],
    86: ["b"],
    87: ["b"],
    88: ["a"],
    89: ["b"],
    90: ["d"],
    91: ["c"],
    92: ["d"],
    93: ["b"],
    94: ["b"],
    95: ["b"],
    96: ["c"],
    97: ["c"],
    98: ["b"],
    99: ["b"],
    100: ["c"],
  },
}

const generateStudentAnswers = (setType: "A" | "B") => {
  const correctAnswers = answerKeys[setType]
  const studentAnswers: { [key: number]: string[] } = {}

  // Simulate student answers with some correct and some wrong
  for (let i = 1; i <= 100; i++) {
    const correctAnswer = correctAnswers[i]
    // 85% chance of getting it right
    if (Math.random() < 0.85) {
      studentAnswers[i] = correctAnswer
    } else {
      // Generate a wrong answer
      const options = ["a", "b", "c", "d"]
      const wrongOptions = options.filter((opt) => !correctAnswer.includes(opt))
      studentAnswers[i] = [wrongOptions[Math.floor(Math.random() * wrongOptions.length)]]
    }
  }

  return studentAnswers
}

const evaluateAnswers = (
  studentAnswers: { [key: number]: string[] },
  setType: "A" | "B",
  positiveMark: number,
  negativeMark: number,
) => {
  const correctAnswers = answerKeys[setType]
  let correct = 0
  let wrong = 0
  let unanswered = 0

  for (let i = 1; i <= 100; i++) {
    const studentAnswer = studentAnswers[i]
    const correctAnswer = correctAnswers[i]

    if (!studentAnswer || studentAnswer.length === 0) {
      unanswered++
    } else {
      // Check if student answer matches any of the correct answers
      const isCorrect =
        studentAnswer.some((ans) => correctAnswer.includes(ans)) &&
        studentAnswer.length === correctAnswer.length &&
        correctAnswer.every((ans) => studentAnswer.includes(ans))

      if (isCorrect) {
        correct++
      } else {
        wrong++
      }
    }
  }

  const totalScore = correct * positiveMark - wrong * negativeMark
  const maxPossibleScore = 100 * positiveMark
  const percentage = Math.round((totalScore / maxPossibleScore) * 100)

  return { correct, wrong, unanswered, totalScore, percentage }
}

interface SectionScore {
  name: string
  score: number
  total: number
  percentage: number
}

interface EvaluationResult {
  totalScore: number
  totalQuestions: number
  percentage: number
  sectionScores: SectionScore[]
  studentName: string
  setNo: string
  processedImage?: string
}

export default function OMREvaluationApp() {
  const [selectedOMRFile, setSelectedOMRFile] = useState<File | null>(null)
  const [selectedAnswerKeyFile, setSelectedAnswerKeyFile] = useState<File | null>(null)
  const [studentName, setStudentName] = useState("")
  const [positiveMarkValue, setPositiveMarkValue] = useState("1")
  const [negativeMarkValue, setNegativeMarkValue] = useState("0.25")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [dragActiveOMR, setDragActiveOMR] = useState(false)
  const [dragActiveAnswerKey, setDragActiveAnswerKey] = useState(false)

  const handleOMRFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedOMRFile(file)
    }
  }

  const handleAnswerKeyFileSelect = (file: File) => {
    const allowedTypes = [
      "image/",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    const isValidType = allowedTypes.some((type) => file.type.startsWith(type) || file.type === type)

    if (file && isValidType) {
      setSelectedAnswerKeyFile(file)
    }
  }

  const handleOMRDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveOMR(true)
    } else if (e.type === "dragleave") {
      setDragActiveOMR(false)
    }
  }

  const handleAnswerKeyDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveAnswerKey(true)
    } else if (e.type === "dragleave") {
      setDragActiveAnswerKey(false)
    }
  }

  const handleOMRDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActiveOMR(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleOMRFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleAnswerKeyDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActiveAnswerKey(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAnswerKeyFileSelect(e.dataTransfer.files[0])
    }
  }

  const simulateProcessing = async () => {
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 4000))

    // AI detects question set (randomly choose A or B for demo)
    const aiDetectedSet: "A" | "B" = Math.random() > 0.5 ? "A" : "B"

    const positiveMark = Number.parseFloat(positiveMarkValue) || 1
    const negativeMark = Number.parseFloat(negativeMarkValue) || 0

    // Generate realistic student answers
    const studentAnswers = generateStudentAnswers(aiDetectedSet)

    // Evaluate using real answer key
    const evaluation = evaluateAnswers(studentAnswers, aiDetectedSet, positiveMark, negativeMark)

    // Calculate section-wise scores (distribute questions across 5 sections)
    const sectionsData = [
      { name: "Python", questions: 20, startQ: 1 },
      { name: "Data Analysis", questions: 20, startQ: 21 },
      { name: "MySQL", questions: 20, startQ: 41 },
      { name: "Power BI", questions: 20, startQ: 61 },
      { name: "Advanced Stats", questions: 20, startQ: 81 },
    ]

    const sectionScores = sectionsData.map((section) => {
      let sectionCorrect = 0
      let sectionWrong = 0

      for (let i = section.startQ; i < section.startQ + section.questions; i++) {
        const studentAnswer = studentAnswers[i]
        const correctAnswer = answerKeys[aiDetectedSet][i]

        if (studentAnswer && studentAnswer.length > 0) {
          const isCorrect =
            studentAnswer.some((ans) => correctAnswer.includes(ans)) &&
            studentAnswer.length === correctAnswer.length &&
            correctAnswer.every((ans) => studentAnswer.includes(ans))

          if (isCorrect) {
            sectionCorrect++
          } else {
            sectionWrong++
          }
        }
      }

      const sectionScore = sectionCorrect * positiveMark - sectionWrong * negativeMark
      const sectionTotal = section.questions * positiveMark
      const sectionPercentage = Math.round((sectionScore / sectionTotal) * 100)

      return {
        name: section.name,
        score: Math.round(sectionScore * 100) / 100,
        total: sectionTotal,
        percentage: Math.max(0, sectionPercentage), // Ensure non-negative percentage
      }
    })

    const mockResult: EvaluationResult = {
      totalScore: Math.round(evaluation.totalScore * 100) / 100,
      totalQuestions: 100,
      percentage: Math.max(0, evaluation.percentage), // Ensure non-negative percentage
      sectionScores,
      studentName: studentName || "Unknown Student",
      setNo: aiDetectedSet,
    }

    setResult(mockResult)
    setIsProcessing(false)
  }

  const handleEvaluate = () => {
    if (selectedOMRFile && selectedAnswerKeyFile && studentName.trim()) {
      simulateProcessing()
    }
  }

  const downloadResults = () => {
    if (!result) return

    const csvContent = [
      ["Student", "Set", "Total Score", "Percentage", ...result.sectionScores.map((s) => s.name)],
      [
        result.studentName,
        result.setNo,
        `${result.totalScore}/${result.totalQuestions * Number.parseFloat(positiveMarkValue || "1")}`,
        `${result.percentage}%`,
        ...result.sectionScores.map((s) => `${s.score}/${s.total}`),
      ],
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${result.studentName}_results.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-balance">AI-Powered OMR Evaluation System</h1>
          </div>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Advanced AI and computer vision technology for automatic student identification and answer sheet evaluation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Files & Configure Marking
              </CardTitle>
              <CardDescription>
                Enter student details, configure marking scheme, and upload both the OMR answer sheet and answer key for
                evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Student Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter student name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Plus className="h-4 w-4 text-green-500" />
                    Positive Mark Value
                  </label>
                  <Input
                    type="number"
                    step="0.25"
                    min="0"
                    placeholder="1"
                    value={positiveMarkValue}
                    onChange={(e) => setPositiveMarkValue(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Points for correct answers</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Minus className="h-4 w-4 text-red-500" />
                    Negative Mark Value
                  </label>
                  <Input
                    type="number"
                    step="0.25"
                    min="0"
                    placeholder="0.25"
                    value={negativeMarkValue}
                    onChange={(e) => setNegativeMarkValue(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Points deducted for wrong answers</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Student OMR Answer Sheet</label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                    dragActiveOMR ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  onDragEnter={handleOMRDrag}
                  onDragLeave={handleOMRDrag}
                  onDragOver={handleOMRDrag}
                  onDrop={handleOMRDrop}
                  onClick={() => document.getElementById("omr-file-input")?.click()}
                >
                  {selectedOMRFile ? (
                    <div className="space-y-2">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                      <p className="font-medium text-sm">{selectedOMRFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedOMRFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                      <div>
                        <p className="font-medium text-sm">Drop OMR sheet here, or click to browse</p>
                        <p className="text-xs text-muted-foreground">AI will detect question set automatically</p>
                      </div>
                    </div>
                  )}
                  <input
                    id="omr-file-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleOMRFileSelect(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Answer Key Sheet</label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                    dragActiveAnswerKey ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  onDragEnter={handleAnswerKeyDrag}
                  onDragLeave={handleAnswerKeyDrag}
                  onDragOver={handleAnswerKeyDrag}
                  onDrop={handleAnswerKeyDrop}
                  onClick={() => document.getElementById("answer-key-file-input")?.click()}
                >
                  {selectedAnswerKeyFile ? (
                    <div className="space-y-2">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                      <p className="font-medium text-sm">{selectedAnswerKeyFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedAnswerKeyFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
                      <div>
                        <p className="font-medium text-sm">Drop answer key here, or click to browse</p>
                        <p className="text-xs text-muted-foreground">Supports images, Excel, PDF, Word documents</p>
                      </div>
                    </div>
                  )}
                  <input
                    id="answer-key-file-input"
                    type="file"
                    accept="image/*,.xlsx,.xls,.pdf,.doc,.docx"
                    onChange={(e) => e.target.files?.[0] && handleAnswerKeyFileSelect(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              </div>

              <Button
                onClick={handleEvaluate}
                disabled={!selectedOMRFile || !selectedAnswerKeyFile || !studentName.trim() || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                    AI Processing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Start AI Evaluation
                  </>
                )}
              </Button>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AI analyzing answer key...</span>
                    <span>Comparing with OMR sheet</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                AI Evaluation Results
              </CardTitle>
              <CardDescription>Student performance analysis with custom marking scheme</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-4xl font-bold text-primary mb-2">{result.percentage}%</div>
                    <p className="text-lg font-medium">
                      {result.totalScore} out of {result.totalQuestions * Number.parseFloat(positiveMarkValue || "1")}{" "}
                      marks
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="inline-flex items-center gap-1">
                        <Brain className="h-3 w-3" />
                        Student: {result.studentName} • AI Detected Set {result.setNo}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Marking: +{positiveMarkValue} for correct, -{negativeMarkValue} for wrong
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold mb-2">Section-wise Performance</h3>
                    {result.sectionScores.map((section, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{section.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant={section.percentage >= 80 ? "default" : "secondary"}>
                              {section.score}/{section.total}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{section.percentage}%</span>
                          </div>
                        </div>
                        <Progress value={section.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <Button onClick={downloadResults} variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Results CSV
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <XCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    Configure marking scheme, enter student name, upload both files and click evaluate to see results
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI Detection</h3>
              <p className="text-sm text-muted-foreground">
                Automatically detects student names and question sets from OMR sheets
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Answer Key Upload</h3>
              <p className="text-sm text-muted-foreground">
                Upload custom answer keys for flexible evaluation of different question sets
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-sm text-muted-foreground">Section-wise performance analysis with visual feedback</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
