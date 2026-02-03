"use client";

import { useState } from "react";

import { FaviconPreview } from "@/components/favicon-preview";
import { AiConsultant } from "@/components/ai-consultant";
import { LoginButton } from "@/components/login-button";
import { Legend } from "@/components/legend";
import { Button } from "@/components/ui/button";
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
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 relative flex items-center justify-center">
              <img
                src="/logo-transparent.png"
                alt="BrandGenesis Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="text-xl font-press-start bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 hidden sm:block">
              BrandGenesis
              <span className="text-[10px] ml-2 text-white/50">AI</span>
            </h1>
          </div>
          <LoginButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Legend />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Step 1: Design */}
          <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm h-full flex flex-col">
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
          <Card className="bg-black/40 border-primary/20 backdrop-blur-sm h-full flex flex-col">
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
          <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm h-full flex flex-col">
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
                <div className="p-6 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 animate-pulse">
                  <img
                    src="/logo-transparent.png"
                    className="w-24 h-24"
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
    </div>
  );
}
