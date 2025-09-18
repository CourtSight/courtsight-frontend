import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/Navigation"
import { Search, MessageSquare, FileText, Scale, Bot, ChevronRight, Github, Linkedin, Mail, Twitter } from "lucide-react"
import lawyerImage from "@/assets/lawyer.jpg"
import palu from "@/assets/palu.jpg"
import patung from "@/assets/patung.jpg"
import sealion from "@/assets/sealion.png"
import searchImage from "@/assets/search.png"
import chatbotImage from "@/assets/chatbot.png"
import aseanImage from "@/assets/asean.png"
import ChatWidget from "@/components/ChatWidget"
import { Input } from "@/components/ui/input"

export default function CourtSightLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={aseanImage} alt="ASEAN" className="w-full h-full object-cover" />
          {/* <div className="" style={{ backgroundImage: `url(${aseanImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}></div> */}
        </div>

        <div className="container mx-auto px-24 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="text-blue-600">Law</span> should be inclusive and transparent for everyone
                </h1>
                <p className="text-lg text-gray-600 flex items-center">
                  AI platform to find and understand public Supreme Court rulings across Southeast Asia
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Start Searching Rulings
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-blue-200 bg-transparent">
                  Explore Features
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">Powered by</p>
                <div className="flex items-center space-x-2">
                  <img src={sealion} alt="SEA-Lion" className="w-32 h-fit" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About CourtSight */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-20">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">About CourtSight</h2>
            <p className="text-lg text-gray-700">
              CourtSight makes law more inclusive and transparent for everyone—not just experts. Our AI‑powered platform
              helps people across Southeast Asia quickly find and understand public Supreme Court rulings. Using
              LLM‑based semantic search, it scans court decisions from multiple countries and delivers relevant results
              in seconds.
            </p>
            <p className="text-lg text-gray-700">
              We also provide realtime, LLM‑powered speech‑to‑text for client and witness meetings so lawyers can focus
              on listening while the system transcribes, summarizes, and surfaces related rulings when needed. Built for
              both B2B and B2C, CourtSight serves law firms, independent lawyers, students, journalists, and researchers—
              turning unstructured documents into clear, searchable insights.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-20">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">AI for Legal Transparency</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for B2B and B2C</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Designed for law firms, independent lawyers, students, journalists, and researchers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card key={1} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg relative overflow-hidden">
                  <img
                    src={lawyerImage}
                    alt="Legal professionals"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Semantic Search</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card key={1} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg relative overflow-hidden">
                  <img
                    src={palu}
                    alt="Legal professionals"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Rulings Explorer</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card key={1} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg relative overflow-hidden">
                  <img
                    src={searchImage}
                    alt="Legal professionals"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Realtime Transcription</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Tools for Legal Professionals and the Public</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Make justice more accessible with LLM-powered search and realtime transcription tailored to Southeast Asia.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">LLM Semantic Search</h3>
                </div>
              </div>
              <p className="text-gray-600">Scan public court decisions across countries and surface relevant rulings in seconds.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Try Semantic Search
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
              <img src={searchImage} alt="AI Search Interface" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
              <img src={chatbotImage} alt="AI Search Interface" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">AI Chatbot for Supreme Court Cases</h3>
                </div>
              </div>
              <p className="text-gray-600">Scan public court decisions across countries and surface relevant rulings in seconds.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Try AI Chatbot
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Future Features</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rulings Explorer</h3>
              <p className="text-gray-600 mb-4">Understand public Supreme Court decisions with clear, searchable insights.</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Realtime Transcription</h3>
              <p className="text-gray-600 mb-4">Focus on the conversation while AI transcribes and summarizes in realtime.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Chat Interface Demo */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline">Complete Cases in Seconds</Badge>
              <h2 className="text-4xl font-bold text-gray-900">Chatbot made it simple</h2>
              <p className="text-lg text-gray-600">
                Streamline your legal workflow with cutting-edge AI technology designed specifically for attorneys and
                legal teams.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Explore Features
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">Case Submission</span>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-900 mb-2">
                      Berdasarkan contoh kasus putusan pidana pembunuhan yang tercatat pada Direktori Putusan Mahkamah
                      Agung:
                    </p>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>
                        • Putusan Nomor 124 K/Pid/2025: 3 Perkara pidana pembunuhan berencana di Jakarta Timur, Mahkamah
                      </li>
                      <li>• Agung memutuskan hukuman penjara seumur hidup</li>
                      <li>• Putusan tersebut juga memuat pembuktian kasus</li>
                      <li>• berdasarkan saksi dan barang bukti yang diajukan</li>
                      <li>• Pengadilan tingkat I di Pengadilan Negeri Wamena</li>
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Input placeholder="Search Supreme Cases"/>
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('/city-skyline-silhouette.jpg')] bg-bottom bg-no-repeat bg-cover"></div>
        </div>

        <div className="container mx-auto px-6 md:px-20 py-12 relative">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <Scale className="w-5 h-5 text-blue-900" />
            </div>
            <span className="text-xl font-bold">CourtSight</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="/search" className="hover:underline">Semantic Search</a></li>
                <li><a href="/chat" className="hover:underline">AI Assistant</a></li>
                <li><a href="/recorder" className="hover:underline">Realtime Transcription</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="/" className="hover:underline">Documentation</a></li>
                <li><a href="/" className="hover:underline">API Reference</a></li>
                <li><a href="/" className="hover:underline">Privacy & Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-blue-100">
                <li><a href="/" className="hover:underline">About</a></li>
                <li><a href="/" className="hover:underline">Careers</a></li>
                <li><a href="/" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Stay in the loop</h4>
              <p className="text-blue-100 text-sm mb-3">Get updates on new features and supported jurisdictions.</p>
              <div className="flex gap-2">
                <Input placeholder="Your email" className="bg-white/10 border-white/20 text-white placeholder:text-blue-200" />
                <Button className="bg-white text-blue-900 hover:bg-blue-50">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="text-blue-200 text-sm">© {new Date().getFullYear()} CourtSight. All rights reserved.</p>
            <div className="flex items-center gap-4 text-blue-100">
              <a href="mailto:hello@courtsight.ai" className="hover:text-white" aria-label="Email"><Mail className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white" aria-label="GitHub"><Github className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
      <ChatWidget />
    </div>
  )
}
