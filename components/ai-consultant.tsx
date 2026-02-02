"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface AiConsultantProps {
  onUpdateConfig: (config: any) => void;
}

interface Message {
  role: "user" | "model";
  content: string;
}

export function AiConsultant({ onUpdateConfig }: AiConsultantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Hello! I'm BrandGenesis. Tell me about your Web3 project (mission, vibe, audience) and I'll design your identity.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Format history for Gemini (excluding the last message which sends as 'message')
      // Gemini expects: { role: 'user' | 'model', parts: [{ text: '...' }] }
      // But our simple API wrapper handles the conversion or expects simple objects.
      // Let's check our API route implementation: it expects { history: [], message: "" }
      // The API route passes history directly to model.startChat.
      // Google's SDK expects history items to have `parts: string | Part[]` (or simple text if using helper)
      // Actually standard format is { role: string, parts: string | array }.

      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: history,
          message: userMessage.content,
        }),
      });

      const data = await res.json();

      if (
        data.type === "function_call" &&
        data.function_name === "set_brand_identity"
      ) {
        const { icon, shape, colorFrom, colorTo, reasoning } = data.args;

        // Update the parent state
        onUpdateConfig({
          icon: icon.toLowerCase(), // Ensure lowercase for matching
          shape: shape,
          gradient: { from: colorFrom, to: colorTo },
          size: 64, // Default
        });

        // Add the reasoning as a message
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: `I've updated your brand identity! ${reasoning}`,
          },
        ]);
      } else if (data.error) {
        console.error("Server API Error:", data.error);
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: `Error: ${data.error} ${data.details?.message || ""}`,
          },
        ]);
      } else if (data.text) {
        setMessages((prev) => [...prev, { role: "model", content: data.text }]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] border-primary/20 bg-black/40 backdrop-blur-sm">
      <CardHeader className="pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <CardTitle className="text-lg text-purple-300 font-press-start text-xs">
            AI Brand Consultant
          </CardTitle>
        </div>
        <CardDescription className="text-xs text-gray-400 font-mono">
          Powered by Gemini RAG
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden relative flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="h-8 w-8 border border-white/10">
                  <AvatarFallback
                    className={
                      m.role === "user" ? "bg-blue-900" : "bg-purple-900"
                    }
                  >
                    {m.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 max-w-[80%] text-sm font-terminal leading-relaxed ${
                    m.role === "user"
                      ? "bg-blue-950/50 text-blue-100 border border-blue-500/20"
                      : "bg-purple-950/50 text-purple-100 border border-purple-500/20"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 border border-white/10">
                  <AvatarFallback className="bg-purple-900">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-purple-950/30 rounded-lg p-3 text-sm text-purple-200 animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-white/10 bg-black/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your project..."
              className="bg-black/50 border-white/20 focus-visible:ring-purple-500 font-terminal text-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
