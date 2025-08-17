import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Scale, Mic, Search, Brain, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-legal-ai.jpg";

const Index = () => {
  const features = [
    {
      icon: Mic,
      title: "Smart Recording",
      description: "Record lawyer-client conversations with real-time transcription and AI analysis"
    },
    {
      icon: Search,
      title: "Legal Search",
      description: "Search Supreme Court documents using advanced AI-powered semantic search"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Get intelligent insights, summaries, and legal issue identification"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security ensuring attorney-client privilege protection"
    }
  ];

  const benefits = [
    "Reduce case preparation time by 70%",
    "Automatically identify key legal issues",
    "Generate structured case notes instantly",
    "Search precedents with natural language"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  Powered by Advanced AI
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  AI-Powered Legal
                  <span className="text-primary block">Case Analysis</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform your legal practice with intelligent document analysis, 
                  real-time transcription, and AI-powered case research.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/recorder">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Start Recording
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/search">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Search Cases
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50,000+</div>
                  <div className="text-sm text-muted-foreground">Cases Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Legal AI Technology"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">AI Analysis Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features for Legal Professionals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamline your legal workflow with cutting-edge AI technology 
              designed specifically for attorneys and legal teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Why Legal Professionals Choose LexiScribe
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-0">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <Clock className="h-12 w-12 text-primary mx-auto" />
                  <h3 className="text-xl font-semibold">Save 15+ Hours Per Week</h3>
                  <p className="text-muted-foreground">
                    Our AI technology automates routine tasks, letting you focus 
                    on what matters most - serving your clients.
                  </p>
                  <Button variant="accent" size="lg" className="w-full">
                    Start Free Trial
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Legal Practice?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of legal professionals who trust LexiScribe 
            for their case analysis and research needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Schedule Demo
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
