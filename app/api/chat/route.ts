import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { designKnowledge } from "@/lib/design-knowledge";

const apiKey = process.env.GOOGLE_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are BrandGenesis, an expert AI Brand Consultant for Web3 projects. 
Your goal is to help users define their visual identity based on their project's mission, vibe, and target audience.
Use the provided Design Knowledge to reason about your choices.

You have access to a tool called 'set_brand_identity' which you should call when you have enough information to propose a design.
Don't ask too many questions (max 2), try to infer from the initial pitch if possible.
Be concise, professional, but with a 'crypto-native' flair (use terms like 'wagmi', 'LFG', 'on-chain' sparingly).

Design Knowledge:
${designKnowledge}
`,
  tools: [
    {
      functionDeclarations: [
        {
          name: "set_brand_identity",
          description: "Sets the generated favicon/brand identity parameters.",
          parameters: {
            type: SchemaType.OBJECT,
            properties: {
              icon: {
                type: SchemaType.STRING,
                description: "The Lucide icon name to use.",
                format: "enum",
                enum: [
                  "Activity",
                  "Anchor",
                  "Aperture",
                  "Award",
                  "Box",
                  "Briefcase",
                  "Camera",
                  "Circle",
                  "Cloud",
                  "Code",
                  "Compass",
                  "Cpu",
                  "CreditCard",
                  "Crown",
                  "Database",
                  "Diamond",
                  "DollarSign",
                  "Eye",
                  "Feather",
                  "File",
                  "Flag",
                  "Flame",
                  "Flashlight",
                  "Gem",
                  "Ghost",
                  "Gift",
                  "Globe",
                  "Hammer",
                  "Heart",
                  "Hexagon",
                  "Home",
                  "Image",
                  "Key",
                  "Layers",
                  "Layout",
                  "Library",
                  "LifeBuoy",
                  "Lightbulb",
                  "Link",
                  "Lock",
                  "Map",
                  "Medal",
                  "Menu",
                  "MessageCircle",
                  "Mic",
                  "Moon",
                  "Mouse",
                  "Music",
                  "Navigation",
                  "Package",
                  "Paperclip",
                  "Pen",
                  "Percent",
                  "PieChart",
                  "Play",
                  "Plus",
                  "Pocket",
                  "Power",
                  "Printer",
                  "Radio",
                  "Rocket",
                  "Save",
                  "Scissors",
                  "Search",
                  "Send",
                  "Settings",
                  "Share",
                  "Shield",
                  "ShoppingBag",
                  "ShoppingCart",
                  "Smartphone",
                  "Smile",
                  "Speaker",
                  "Star",
                  "Sun",
                  "Sunrise",
                  "Sunset",
                  "Tablet",
                  "Tag",
                  "Target",
                  "Terminal",
                  "Thermometer",
                  "ThumbsUp",
                  "ToggleLeft",
                  "Tool",
                  "Trash",
                  "Trophy",
                  "Truck",
                  "Tv",
                  "Umbrella",
                  "Unlock",
                  "Upload",
                  "User",
                  "Video",
                  "Voicemail",
                  "Volume",
                  "Watch",
                  "Wifi",
                  "Wind",
                  "Wrench",
                  "Zap",
                  "ZapOff",
                ],
              },
              shape: {
                type: SchemaType.STRING,
                enum: ["circle", "square", "rounded"],
                format: "enum",
                description: "The shape of the container.",
              },
              colorFrom: {
                type: SchemaType.STRING,
                description: "Start color hex code (e.g. #FF0000).",
              },
              colorTo: {
                type: SchemaType.STRING,
                description: "End color hex code (e.g. #0000FF).",
              },
              reasoning: {
                type: SchemaType.STRING,
                description:
                  "Short explanation of why these choices match the brand.",
              },
            },
            required: ["icon", "shape", "colorFrom", "colorTo", "reasoning"],
          },
        },
      ],
    },
  ],
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { history, message } = body;

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;

    // We need to handle function calls
    const calls = response.functionCalls();

    if (calls && calls.length > 0) {
      const call = calls[0];
      if (call.name === "set_brand_identity") {
        return Response.json({
          type: "function_call",
          function_name: call.name,
          args: call.args,
        });
      }
    }

    return Response.json({
      type: "text",
      text: response.text(),
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    // DEBUG: Return actual error to client to diagnose production issue
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { error: errorMessage, details: error },
      { status: 500 },
    );
  }
}
