import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ChatWidget from "@/components/ChatWidget";
import { Search as SearchIcon, Filter, Calendar, FileText, ExternalLink, BookOpen, Stars } from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [summary, setSummary] = useState("");

  // Mock search results - Indonesian legal documents format
  const mockResults = [
    {
      content: "warna hitam lalu dilakukan penimbangan dengan berat bersih 6,31 (enam koma tiga puluh satu) gram;\n- Berita Acara Pemeriksaan Laboratorium Kriminalistik Nomor:\n1626/NNF/2025 tanggal 19 Mei 2025 yang ditandatangani oleh pemeriksa 1. DEWI ARNI, MM. 2. YOGA RAMADI GUSTI, S.Si. 3. ABDILLAH ADAM\nS, S.Si dan diketahui oleh PS. KABIDLABFOR Polda Riau ERIK",
      metadata: {
        id: 4,
        amar: "Lain-lain",
        page: 21,
        title: "",
        author: "",
        doc_id: "b841529d-6e0c-4b5d-97f1-b224da09536b",
        format: "PDF 1.4",
        source: "https://putusan3.mahkamahagung.go.id/direktori/download_file/86b1487326859a3d656e149d4f24f922/pdf/zaf0898f02ebded2832b313935393337",
        creator: "",
        modDate: "",
        moddate: "",
        subject: "",
        trapped: "",
        keywords: "",
        link_pdf: "https://putusan3.mahkamahagung.go.id/direktori/download_file/86b1487326859a3d656e149d4f24f922/pdf/zaf0898f02ebded2832b313935393337",
        link_zip: "https://putusan3.mahkamahagung.go.id/direktori/download_file/86b1487326859a3d656e149d4f24f922/zip/zaf0898f02ebded2832b313935393337",
        panitera: "Panitera Pengganti: Iwan Uripno",
        producer: "FPDF 1.81",
        file_path: "https://putusan3.mahkamahagung.go.id/direktori/download_file/86b1487326859a3d656e149d4f24f922/pdf/zaf0898f02ebded2832b313935393337",
        timestamp: "2025-09-07T19:37:50.389963",
        kata_kunci: "Narkotika",
        hakim_ketua: "Hakim Ketua Chandra Ramadhani",
        jumlah_view: 6,
        klasifikasi: "Pidana Khusus Narkotika dan Psikotropika Pidana Khusus Narkotika dan Psikotropika",
        link_detail: "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaf0898f02ebded2832b313935393337.html",
        start_index: 0,
        total_pages: 35,
        amar_lainnya: "PIDANA PENJARA WAKTU TERTENTU",
        creationDate: "D:20250909172916",
        creationdate: "D:20250909172916",
        hakim_anggota: "Hakim Anggota Syafariah Rizqa, Br Hakim Anggota Rivaldo Ganti Diolan Siahaan",
        tahun_putusan: 2025,
        tingkat_proses: "Pertama",
        jumlah_download: 2,
        tanggal_register: "22 Juli 2025",
        lembaga_peradilan: "PN TEMBILAHAN",
        tanggal_dibacakan: "4 September 2025",
        tanggal_musyawarah: "4 September 2025",
        jenis_lembaga_peradilan: "PN",
        similarity_score: 0.972901689590862,
        retrieval_strategy: "vector_search",
        service_strategy: "vector_search",
        service_query: "sanksi pidana korupsi"
      },
      score: 0.972901689590862
    },
    {
      content: "Narkotika yang mana pasal ini tidak didakwakan, Terdakwa terbukti sebagai pemakai dan jumlahnya relatif kecil (SEMA Nomor 4 Tahun 2010), maka Hakim memutus sesuai surat dakwaan tetapi dapat menyimpangi ketentuan pidana minimum khusus dengan membuat pertimbangan yang cukup, dan ketentuan di dalam SEMA nomor 1 tahun 2017, yang mengatur bahwa: dalam hal terdakwa tidak tertangkap tangan sedang memakai narkotika dan pada terdakwa ditemukan barang bukti narkotika yang jumlahnya/beratnya relatif",
      metadata: {
        id: 6,
        amar: "Lain-lain",
        page: 28,
        title: "",
        author: "",
        doc_id: "d922d102-8a9e-4d76-93b6-c2e05f67a655",
        format: "PDF 1.4",
        source: "https://putusan3.mahkamahagung.go.id/direktori/download_file/1e4871d466b40958f25d430a498d01f8/pdf/zaf0897ce0b49be08ef2313734393438",
        creator: "",
        modDate: "",
        moddate: "",
        subject: "",
        trapped: "",
        keywords: "",
        link_pdf: "https://putusan3.mahkamahagung.go.id/direktori/download_file/1e4871d466b40958f25d430a498d01f8/pdf/zaf0897ce0b49be08ef2313734393438",
        link_zip: "https://putusan3.mahkamahagung.go.id/direktori/download_file/1e4871d466b40958f25d430a498d01f8/zip/zaf0897ce0b49be08ef2313734393438",
        panitera: "Panitera Pengganti Aminah",
        producer: "FPDF 1.81",
        file_path: "https://putusan3.mahkamahagung.go.id/direktori/download_file/1e4871d466b40958f25d430a498d01f8/pdf/zaf0897ce0b49be08ef2313734393438",
        timestamp: "2025-09-07T19:38:10.906524",
        kata_kunci: "Narkotika",
        hakim_ketua: "Hakim Ketua Lis Susilowati",
        jumlah_view: 10,
        klasifikasi: "Pidana Khusus Narkotika dan Psikotropika Pidana Khusus Narkotika dan Psikotropika",
        link_detail: "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaf0897ce0b49be08ef2313734393438.html",
        start_index: 272,
        total_pages: 32,
        amar_lainnya: "PIDANA PENJARA WAKTU TERTENTU",
        creationDate: "D:20250909172946",
        creationdate: "D:20250909172946",
        hakim_anggota: "Br Hakim Anggota Mahendra Adhi Purwanta, Hakim Anggota Andika Bimantoro",
        tahun_putusan: 2025,
        tingkat_proses: "Pertama",
        jumlah_download: 6,
        tanggal_register: "25 Juni 2025",
        lembaga_peradilan: "PN BOYOLALI",
        tanggal_dibacakan: "4 September 2025",
        tanggal_musyawarah: "4 September 2025",
        jenis_lembaga_peradilan: "PN",
        similarity_score: 0.982868452212609,
        retrieval_strategy: "vector_search",
        service_strategy: "vector_search",
        service_query: "sanksi pidana korupsi"
      },
      score: 0.982868452212609
    },
    {
      content: "Surat Edaran Mahkamah Agung Nomor 7 Tahun 2009 juncto Surat Edaran Mahkamah Agung Nomor 4 Tahun 2010) serta hasil tes urine terdakwa positif mengandung Metamphetamine, namun penuntut umum tidak mendakwakan Pasal 127 ayat (1) Undang-Undang Nomor 35 Tahun 2009 tentang Narkotika maka perbuatan Terdakwa tersebut dapat dikategorikan sebagai Penyalah Guna Narkotika Golongan I bagi diri sendiri sedangkan kualifikasi tindak pidananya tetap mengacu pada surat dakwaan",
      metadata: {
        id: 6,
        amar: "Lain-lain",
        page: 28,
        title: "",
        author: "",
        doc_id: "d922d102-8a9e-4d76-93b6-c2e05f67a655",
        format: "PDF 1.4",
        source: "https://putusan3.mahkamahagung.go.id/direktori/download_file/1e4871d466b40958f25d430a498d01f8/pdf/zaf0897ce0b49be08ef2313734393438",
        creator: "",
        modDate: "",
        moddate: "",
        subject: "",
        trapped: "",
        keywords: "",
        link_pdf: "https://putusan3.mahkamahagung.go.id/direktori/download_file/1e4871d466b40958f25d430a498d01f8/pdf/zaf0897ce0b49be08ef2313734393438",
        link_zip: "https://putusan3.mahkamahagung.go.id/direktori/download_file/1e4871d466b40958f25d430a498d01f8/zip/zaf0897ce0b49be08ef2313734393438",
        panitera: "Panitera Pengganti Aminah",
        producer: "FPDF 1.81",
        file_path: "https://putusan3.mahkamahagung.go.id/direktori/download_file/1e4871d466b40958f25d430a498d01f8/pdf/zaf0897ce0b49be08ef2313734393438",
        timestamp: "2025-09-07T19:38:10.906524",
        kata_kunci: "Narkotika",
        hakim_ketua: "Hakim Ketua Lis Susilowati",
        jumlah_view: 10,
        klasifikasi: "Pidana Khusus Narkotika dan Psikotropika Pidana Khusus Narkotika dan Psikotropika",
        link_detail: "https://putusan3.mahkamahagung.go.id/direktori/putusan/zaf0897ce0b49be08ef2313734393438.html",
        start_index: 786,
        total_pages: 32,
        amar_lainnya: "PIDANA PENJARA WAKTU TERTENTU",
        creationDate: "D:20250909172946",
        creationdate: "D:20250909172946",
        hakim_anggota: "Br Hakim Anggota Mahendra Adhi Purwanta, Hakim Anggota Andika Bimantoro",
        tahun_putusan: 2025,
        tingkat_proses: "Pertama",
        jumlah_download: 6,
        tanggal_register: "25 Juni 2025",
        lembaga_peradilan: "PN BOYOLALI",
        tanggal_dibacakan: "4 September 2025",
        tanggal_musyawarah: "4 September 2025",
        jenis_lembaga_peradilan: "PN",
        similarity_score: 0.985037083887522,
        retrieval_strategy: "vector_search",
        service_strategy: "vector_search",
        service_query: "sanksi pidana korupsi"
      },
      score: 0.985037083887522
    }
  ];

  // Generate AI summary based on query
  const generateSummary = (query) => {
    const summaries = {
      "sanksi pidana korupsi": "Berdasarkan pencarian dokumen hukum terkait sanksi pidana korupsi, ditemukan berbagai putusan pengadilan yang mengatur tentang hukuman pidana untuk tindak pidana korupsi. Sanksi pidana korupsi di Indonesia umumnya berupa pidana penjara dengan waktu tertentu sesuai dengan tingkat kerugian negara dan perbuatan yang dilakukan. Putusan-putusan ini menunjukkan konsistensi dalam penerapan hukum anti korupsi dan pentingnya pemberantasan korupsi dalam sistem peradilan Indonesia.",
      "narkotika": "Hasil pencarian menunjukkan berbagai putusan pengadilan terkait tindak pidana narkotika yang mencakup penyalahgunaan, peredaran, dan kepemilikan narkotika. Putusan-putusan ini mengatur tentang sanksi pidana yang berbeda-beda tergantung pada jenis narkotika, jumlah yang ditemukan, dan peran pelaku dalam tindak pidana tersebut. Pengadilan menerapkan ketentuan Undang-Undang Nomor 35 Tahun 2009 tentang Narkotika dengan mempertimbangkan berbagai faktor seperti jumlah barang bukti dan kondisi terdakwa.",
      "pidana": "Pencarian dokumen hukum terkait pidana menunjukkan berbagai jenis sanksi pidana yang diterapkan dalam sistem peradilan Indonesia, termasuk pidana penjara waktu tertentu, pidana denda, dan pidana lainnya. Putusan-putusan ini mencerminkan penerapan prinsip-prinsip hukum pidana yang adil dan proporsional sesuai dengan tingkat kesalahan dan dampak dari tindak pidana yang dilakukan."
    };
    
    // Find matching summary or generate generic one
    const lowerQuery = query.toLowerCase();
    for (const [key, value] of Object.entries(summaries)) {
      if (lowerQuery.includes(key)) {
        return value;
      }
    }
    
    // Generic summary if no specific match
    return `Berdasarkan pencarian dokumen hukum dengan kata kunci "${query}", ditemukan berbagai putusan pengadilan yang relevan dengan topik tersebut. Dokumen-dokumen ini mencakup berbagai aspek hukum yang berkaitan dengan pencarian Anda, termasuk sanksi pidana, prosedur peradilan, dan penerapan hukum yang konsisten dalam sistem peradilan Indonesia.`;
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Generate AI summary
    const aiSummary = generateSummary(searchQuery);
    setSummary(aiSummary);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Clear summary when search query is cleared
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      setSummary("");
      setSearchResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Pencarian Dokumen Hukum Indonesia
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cari melalui putusan pengadilan Indonesia menggunakan pencarian semantik berbasis AI 
            untuk menemukan kasus dan preseden hukum yang relevan.
          </p>
        </div>

        {/* Search Interface */}
        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SearchIcon className="h-5 w-5" />
              <span>Cari Putusan Pengadilan</span>
            </CardTitle>
            <CardDescription>
              Masukkan pertanyaan hukum Anda untuk menemukan kasus dan preseden yang relevan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Masukkan pertanyaan hukum Anda (contoh: 'sanksi pidana korupsi')"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="text-base"
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                variant="hero"
                size="lg"
              >
                {isSearching ? "Mencari..." : "Cari"}
              </Button>
              <Button variant="outline" size="lg">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Summary Card */}
        {summary && (
          <Card className="mb-8 shadow-md border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Stars className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">Ringkasan AI</h3>
                    <Badge variant="secondary" className="text-xs">
                      <Stars className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {summary}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Hasil Pencarian ({searchResults.length} dokumen ditemukan)
              </h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Diurutkan berdasarkan relevansi</span>
              </div>
            </div>

            <div className="grid gap-6">
              {searchResults.map((result, index) => (
                <Card key={result.metadata?.doc_id || index} className="shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-primary">
                            {result.metadata?.klasifikasi || "Dokumen Hukum"}
                          </h3>
                          <Badge variant="outline" className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{result.metadata?.tahun_putusan}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <span className="font-medium">{result.metadata?.lembaga_peradilan}</span>
                          <span>•</span>
                          <span>{result.metadata?.amar_lainnya}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={result.score > 0.9 ? "default" : "secondary"}>
                          {Math.round(result.score * 100)}% match
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/document/${result.metadata?.id || index + 1}`}>
                            <FileText className="h-4 w-4 mr-1" />
                            Detail
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={result.metadata?.link_detail} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {result.content}
                    </p>

                    {/* AI Summarizer Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4 mb-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Stars className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="text-sm font-semibold text-foreground">Ringkasan Dokumen</h4>
                            <Badge variant="secondary" className="text-xs px-2 py-0">
                              <Stars className="h-2 w-2 mr-1" />
                              AI
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {result.metadata?.kata_kunci === "Narkotika" 
                              ? "Dokumen ini membahas tindak pidana narkotika dengan fokus pada penyalahgunaan dan peredaran narkotika. Putusan pengadilan menunjukkan penerapan sanksi pidana sesuai dengan ketentuan Undang-Undang Nomor 35 Tahun 2009 tentang Narkotika, dengan mempertimbangkan jenis dan jumlah narkotika yang ditemukan serta peran terdakwa dalam tindak pidana tersebut."
                              : "Dokumen ini berisi putusan pengadilan yang mengatur tentang penerapan hukum pidana dalam kasus yang relevan dengan pencarian Anda. Putusan ini mencerminkan konsistensi dalam penerapan prinsip-prinsip hukum pidana dan memberikan gambaran tentang bagaimana pengadilan menangani kasus serupa dengan mempertimbangkan berbagai faktor hukum dan fakta-fakta yang terungkap dalam persidangan."
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">
                        {result.metadata?.kata_kunci}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {result.metadata?.tingkat_proses}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {result.metadata?.tanggal_dibacakan}
                        </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Hakim Ketua: {result.metadata?.hakim_ketua}</span>
                        <span>Panitera: {result.metadata?.panitera}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {searchResults.length === 0 && searchQuery && !isSearching && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tidak ada hasil ditemukan</h3>
              <p className="text-muted-foreground">
                Coba perbaiki pertanyaan pencarian Anda atau gunakan kata kunci yang berbeda
              </p>
            </CardContent>
          </Card>
        )}

        {!searchQuery && searchResults.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Cari Putusan Pengadilan</h3>
              <p className="text-muted-foreground">
                Masukkan pertanyaan hukum di atas untuk menemukan putusan pengadilan dan preseden yang relevan
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <ChatWidget />
    </div>
  );
};

export default Search;