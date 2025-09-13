"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Lightbulb, MessageCircle, Send } from "lucide-react"
import Navigation from "@/components/Navigation"


export default function CourtSightPage() {
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      content:
        '"Pada tahun 2025, Mahkamah Agung menjatuhkan putusan kasasi terhadap terdakwa kasus pidana pembunuhan dengan hukuman penjara seumur hidup, setelah menolak permohonan kasasi dan menguatkan putusan Pengadilan Tinggi Jakarta."',
    },
    {
      type: "bot",
      content: "Berdasarkan diatas, UUD 1945 jadi rujukan",
    },
  ])

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, { type: "user", content: chatMessage }])
      setChatMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
      {/* Background Map Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="w-full h-full">
          <path
            d="M100,200 Q200,150 300,200 T500,180 T700,220 T900,200 T1100,180"
            stroke="#3b82f6"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M50,300 Q150,250 250,300 T450,280 T650,320 T850,300 T1050,280"
            stroke="#3b82f6"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M150,400 Q250,350 350,400 T550,380 T750,420 T950,400 T1150,380"
            stroke="#3b82f6"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>

      <Navigation />


      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Deskripsi Putusan</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Decision Card */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Putusan Nomor 124 K/Pid/2025</CardTitle>
                  <Button variant="link" className="text-blue-600 p-0 h-auto">
                    Link sumber
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    <strong>DEMI KEADILAN BERDASARKAN KETUHANAN YANG MAHA ESA</strong> M A H K A M A H A G U N G
                    memeriksa perkara perdata dalam tingkat kasasi telah memutus sebagai berikut dalam perkara:
                  </p>
                  <p className="mb-4">
                    <strong>1. NINING ELITOS</strong>, bertempat tinggal di Kp. Kedung Gede, Setia Mekar, Tambun
                    Selatan, Kabupaten Bekasi, Jawa Barat;
                  </p>
                  <p>
                    <strong>2. DHYTA CATURANI</strong>, bertempat tinggal di Jalan Tebet Barat Dalam, Kelurahan Tebet
                    Barat, Tebet, Kota Jakarta Selatan, DKI Jakarta
                  </p>
                </div>

                {/* Summary Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Summarize</h4>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        "Pada tahun 2025, Mahkamah Agung menjatuhkan putusan kasasi terhadap terdakwa kasus pidana
                        pembunuhan dengan hukuman penjara seumur hidup, setelah menolak permohonan kasasi dan menguatkan
                        putusan Pengadilan Tinggi Jakarta."
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Preview Card */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-gray-900">Putusan 1206 K/PDT/2024</CardTitle>
                  <Button variant="link" className="text-blue-600 p-0 h-auto">
                    Link sumber
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="space-y-4">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      PUTUSAN
                    </div>
                    <div className="text-sm font-medium">Nomor 1206 K/Pdt/2024</div>

                    <div className="text-xs text-gray-600 space-y-2 text-left max-w-md mx-auto">
                      <p>
                        <strong>DEMI KEADILAN BERDASARKAN KETUHANAN YANG MAHA ESA</strong>
                      </p>
                      <p>
                        <strong>M A H K A M A H A G U N G</strong>
                      </p>
                      <p>memeriksa perkara perdata dalam tingkat kasasi telah memutus sebagai berikut dalam perkara:</p>

                      <div className="space-y-1 mt-4">
                        <p>
                          <strong>1. NINING ELITOS</strong>, bertempat tinggal di Kp. Kedung Gede, Setia Mekar, Tambun
                          Selatan, Kabupaten Bekasi, Jawa Barat;
                        </p>
                        <p>
                          <strong>2. DHYTA CATURANI</strong>, bertempat tinggal di Jalan Tebet Barat Dalam, Kelurahan
                          Tebet Barat, Tebet, Kota Jakarta Selatan, DKI Jakarta;
                        </p>
                        <p>
                          <strong>3. SRI BASKORO</strong>, bertempat tinggal di Jalan Lobak Raya, Kelurahan Cinere,
                          Cinere, Kota Depok, Jawa Barat;
                        </p>
                        <p>
                          <strong>4. BETTY MARTINA</strong>, bertempat tinggal di Lemigas, Blok Kelurahan Menyung, Limo,
                          Kota Depok, Jawa Barat;
                        </p>
                        <p>
                          <strong>5. AHMAD MUAZ</strong>, bertempat tinggal di Kp. Setu, Blok Jaya, Bekasi Barat, Kota
                          Bekasi, Jawa Barat;
                        </p>
                        <p>
                          <strong>6. MINARSIH</strong>, bertempat tinggal di Petemon, Kelurahan Patemon, Kecamatan
                          Sawahan, Kota Surabaya;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chatbot Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg font-bold text-gray-900">Chatbot</CardTitle>
                </div>
                <p className="text-sm text-gray-600">Putusan 1206 K/PDT/2024</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Chat Messages */}
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  <div className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">Siapa yg salah?</div>

                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        message.type === "bot"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-600 text-white ml-auto max-w-[80%]"
                      }`}
                    >
                      {message.content}
                    </div>
                  ))}

                  <div className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">Undang undang yg diproses?</div>
                </div>

                {/* Chat Input */}
                <div className="flex space-x-2 pt-4 border-t">
                  <Input
                    placeholder="Tanya disini?"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
