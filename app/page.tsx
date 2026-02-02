"use client";

import { useState } from "react";
import { FaviconGenerator } from "@/components/favicon-generator";
import { FaviconPreview } from "@/components/favicon-preview";
import { AiConsultant } from "@/components/ai-consultant";
import { LoginButton } from "@/components/login-button";
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
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:h-[calc(100vh-8rem)]">
          {/* Left Column: AI Consultant (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant="outline"
                className="border-purple-500/50 text-purple-400 font-terminal"
              >
                STEP 1: DESIGN
              </Badge>
            </div>
            <AiConsultant onUpdateConfig={handleAiUpdate} />
          </div>

          {/* Right Column: Preview & Adjust (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant="outline"
                className="border-blue-500/50 text-blue-400 font-terminal"
              >
                STEP 2: PREVIEW & MINT
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Live Preview */}
              <Card className="bg-black/40 border-primary/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-terminal text-lg text-blue-300">
                    Visual Output
                  </CardTitle>
                  <CardDescription>Real-time rendering</CardDescription>
                </CardHeader>
                <CardContent>
                  <FaviconPreview config={faviconConfig} />
                </CardContent>
              </Card>

              {/* Minting & Export */}
              <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-terminal text-lg text-green-300">
                    Ownership
                  </CardTitle>
                  <CardDescription>Mint your brand on Sepolia</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 items-center justify-center h-[200px]">
                  <MintButton />
                </CardContent>
              </Card>
            </div>

            {/* Manual Adjustment Tabs */}
            <Card className="bg-black/40 border-white/10 mt-4">
              <Tabs defaultValue="manual" className="w-full">
                <div className="flex items-center justify-between px-6 pt-6">
                  <CardTitle className="font-terminal text-sm">
                    Fine Tuning
                  </CardTitle>
                  <TabsList className="bg-black/50 border border-white/10">
                    <TabsTrigger value="manual" className="text-xs">
                      Manual Edit
                    </TabsTrigger>
                    <TabsTrigger value="code" className="text-xs">
                      Export Code
                    </TabsTrigger>
                  </TabsList>
                </div>
                <CardContent className="pt-6">
                  <TabsContent value="manual" className="mt-0">
                    <FaviconGenerator
                      config={faviconConfig}
                      onChange={setFaviconConfig}
                    />
                  </TabsContent>
                  <TabsContent value="code">
                    <div className="p-4 bg-black rounded border border-white/10 font-mono text-xs text-gray-400">
                      {/* We could duplicate the logic to show SVG code here or just rely on the existing download button within Generator */}
                      Select 'Manual Edit' to download the SVG or adjust
                      specific parameters manually if the AI result needs
                      tweaking.
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
