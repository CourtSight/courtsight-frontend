import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/Navigation"
import { Search, MessageSquare, FileText, Scale, Bot, ChevronRight } from "lucide-react"
import lawyerImage from "@/assets/lawyer.jpg"
import palu from "@/assets/palu.jpg"
import patung from "@/assets/patung.jpg"
import searchImage from "@/assets/search.png"
import aseanImage from "@/assets/asean.png"
export default function CourtSightLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="" style={{ backgroundImage: `url(${aseanImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="text-blue-600">Law</span> should be inclusive and transparent for everyone
                </h1>
                <p className="text-lg text-gray-600 flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-blue-600" />
                  AI-Agent for smarter cases around Indonesia
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Analyze Public Cases
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="border-blue-200 bg-transparent">
                  Explore Features
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">Powered by</p>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                  <span className="text-sm font-medium">SEA-Lion</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Analyze Legal Cases</h3>
                    <Badge variant="secondary">For Lawyer</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-600">Search law cases around Indonesia</span>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-blue-900 mb-2">AI Assistant</div>
                      <div className="text-xs text-blue-700">
                        Berdasarkan data yang tersedia, kasus ini memiliki kesamaan dengan 15 kasus serupa di Indonesia.
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      Start law cases around Indonesia
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              AI Agent for Law
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Legal Professionals</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline your legal workflow with cutting-edge AI technology designed specifically for attorneys and
              legal teams.
            </p>
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
                      <span className="text-sm font-medium">Retrieve AI Agent</span>
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
                      <span className="text-sm font-medium">Retrieve AI Agent</span>
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
                      <span className="text-sm font-medium">Retrieve AI Agent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Legal Professionals</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline your legal workflow with cutting-edge AI technology designed specifically for attorneys and
              legal teams.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">AI-Powered Search Engine</h3>
                </div>
              </div>
              <p className="text-gray-600">
                Get intelligent insights, summaries, and legal case identification with our advanced AI technology.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Explore Features
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
              <img src={searchImage} alt="AI Search Interface" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Putusan</h3>
              <p className="text-gray-600 mb-4">Get intelligent insights, summaries, and legal case identification.</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Search Engine Meet LLM</h3>
              <p className="text-gray-600 mb-4">Get intelligent insights, summaries, and legal case identification.</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Search Engine Meet LLM</h3>
              <p className="text-gray-600 mb-4">Get intelligent insights, summaries, and legal case identification.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Chat Interface Demo */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline">Complete Cases in Seconds</Badge>
              <h2 className="text-4xl font-bold text-gray-900">Powerful Features for Legal Professionals</h2>
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
                    <div className="flex-1 bg-gray-100 rounded-lg p-2">
                      <div className="w-full h-8 bg-blue-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Scale className="w-5 h-5 text-white" />
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

        <div className="container mx-auto px-4 py-12 relative">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <Scale className="w-5 h-5 text-blue-900" />
            </div>
            <span className="text-xl font-bold">CourtSight</span>
          </div>
          <p className="text-blue-200">©2023 CourtSight Team</p>
        </div>
      </footer>
    </div>
  )
}
