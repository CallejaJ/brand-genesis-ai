import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Shapes,
  Eye,
  Download,
  Copy,
  Smartphone,
  Accessibility,
  Code,
  Globe,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Icon Selection",
    description: "Choose from 10 professionally designed Lucide icons",
    badge: "10+ Icons",
  },
  {
    icon: Shapes,
    title: "Shape Options",
    description: "Rounded, circle, or square favicon shapes",
    badge: "3 Shapes",
  },
  {
    icon: Palette,
    title: "Color Presets",
    description: "6 beautiful gradient presets ready to use",
    badge: "6 Presets",
  },
  {
    icon: Palette,
    title: "Custom Colors",
    description: "Full color picker for unlimited gradient combinations",
    badge: "Unlimited",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description: "Real-time preview in multiple sizes (16x16, 32x32, 64x64)",
    badge: "Real-time",
  },
  {
    icon: Globe,
    title: "Browser Simulation",
    description: "See how your favicon looks in a browser tab",
    badge: "Live Demo",
  },
  {
    icon: Code,
    title: "SVG Code",
    description: "Generated SVG code with syntax highlighting",
    badge: "Clean Code",
  },
  {
    icon: Download,
    title: "Instant Download",
    description: "Download SVG files immediately",
    badge: "One-click",
  },
  {
    icon: Copy,
    title: "Copy to Clipboard",
    description: "One-click code copying",
    badge: "Quick Copy",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Works perfectly on all devices",
    badge: "Mobile Ready",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description: "WCAG compliant with screen reader support",
    badge: "WCAG 2.1",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Powerful Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create professional favicons with ease and
            precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription>
                Create your first favicon in seconds with our intuitive
                generator.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
}
