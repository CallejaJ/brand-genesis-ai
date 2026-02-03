import { Sparkles, Wallet, PenTool, ArrowRight } from "lucide-react";

export function Legend() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {[
        {
          icon: Sparkles,
          color: "text-purple-400",
          bg: "bg-purple-500/10",
          border:
            "border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:border-purple-500/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]",
          title: "1. AI Design",
          desc: "Describe your vision. Gemini builds your identity.",
        },
        {
          icon: PenTool,
          color: "text-blue-400",
          bg: "bg-blue-500/10",
          border:
            "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:border-blue-500/80 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]",
          title: "2. On-Demand",
          desc: "Unlimited SVG icons generate instantly.",
        },
        {
          icon: Wallet,
          color: "text-green-400",
          bg: "bg-green-500/10",
          border:
            "border-green-500/80 shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:border-green-500/80 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]",
          title: "3. Free Mint",
          desc: "Mint your unique SVG icon as an NFT. You own the path data forever.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className={`group relative flex items-start gap-4 p-4 rounded-xl border ${item.border} bg-black/40 backdrop-blur-sm hover:bg-white/5 transition-all duration-300`}
        >
          <div
            className={`p-2.5 rounded-lg ${item.bg} shrink-0 group-hover:scale-110 transition-transform`}
          >
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </div>
          <div>
            <h3
              className={`font-bold text-sm mb-1 ${item.color} font-terminal uppercase tracking-wider`}
            >
              {item.title}
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
