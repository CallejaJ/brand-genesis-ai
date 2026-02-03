"use client";

import { useState } from "react";

import { FaviconPreview } from "@/components/favicon-preview";
import { AiConsultant } from "@/components/ai-consultant";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Legend } from "@/components/legend";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { MintButton } from "@/components/mint-button";

export default function HomePage() {
  const [faviconConfig, setFaviconConfig] = useState({
    icon: "sparkles",
    shape: "rounded",
    gradient: { from: "#3b82f6", to: "#8b5cf6" },
    size: 64,
  });

  // Handler for AI updates
  const handleAiUpdate = (newConfig: any) => {
    setFaviconConfig((prev) => ({ ...prev, ...newConfig }));
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#09090b] to-black text-foreground font-sans selection:bg-green-500/30">
      {/* Scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[url('/scanlines.png')] opacity-[0.03] z-[100]" />

      {/* Header */}
      <Header />

      <main className="container mx-auto px-4 pb-8">
        <div className="h-48 w-full" />
        <Legend />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Step 1: Design */}
          <Card className="bg-black/40 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)] backdrop-blur-sm h-full flex flex-col hover:border-purple-500/100 hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-all duration-500 mb-20">
            <CardHeader className="pb-2">
              <Badge
                variant="outline"
                className="w-fit mb-12 border-purple-500/50 text-purple-400 font-terminal"
              >
                STEP 1: DESIGN
              </Badge>
              <CardTitle className="text-white text-lg">
                AI Consultant
              </CardTitle>
              <CardDescription>Powered by Gemini 2.0 Flash</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] p-0 overflow-hidden text-left">
              <div className="h-full w-full p-4 pt-0">
                <AiConsultant onUpdateConfig={handleAiUpdate} />
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Preview */}
          <Card className="bg-black/40 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-sm h-full flex flex-col hover:border-blue-500/100 hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] transition-all duration-500 mb-20">
            <CardHeader>
              <Badge
                variant="outline"
                className="w-fit mb-12 border-blue-500/50 text-blue-400 font-terminal"
              >
                STEP 2: PREVIEW
              </Badge>
              <CardTitle className="font-terminal text-lg text-blue-300">
                Visual Output
              </CardTitle>
              <CardDescription>Real-time SVG rendering</CardDescription>
            </CardHeader>
            <CardContent>
              <FaviconPreview config={faviconConfig} />
            </CardContent>
          </Card>

          {/* Step 3: Mint */}
          <Card className="bg-black/40 border-green-500/80 shadow-[0_0_30px_rgba(34,197,94,0.3)] backdrop-blur-sm h-full flex flex-col hover:border-green-500/100 hover:shadow-[0_0_60px_rgba(34,197,94,0.6)] transition-all duration-500 mb-20">
            <CardHeader>
              <Badge
                variant="outline"
                className="w-fit mb-12 border-green-500/50 text-green-400 font-terminal"
              >
                STEP 3: MINT
              </Badge>
              <CardTitle className="font-terminal text-lg text-green-300">
                Ownership
              </CardTitle>
              <CardDescription>Secure on Sepolia Testnet</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center text-center p-6">
              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <div className="p-6 animate-pulse">
                  <img
                    src="/logo-transparent.png"
                    className="w-18 h-18"
                    alt="Brain Animation"
                  />
                </div>
              </div>
              <div className="w-full mt-auto pt-6">
                <MintButton config={faviconConfig} />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
