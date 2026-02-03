"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet, AlertCircle } from "lucide-react";

// Internal component that uses the hook - only rendered if config exists
function PrivyLoginButton() {
  const { login, authenticated, ready, user, logout } = usePrivy();

  if (!ready) {
    return (
      <Button variant="outline" disabled className="font-mono h-9">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (authenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-green-400 hidden sm:inline-block">
          {user.wallet?.address
            ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}`
            : user.email?.address}
        </span>
        <Button
          variant="outline"
          onClick={logout}
          className="font-terminal text-xs border-red-500/50 text-red-400 hover:bg-red-950/30 hover:text-red-300 h-9"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={login}
      className="bg-[hsl(285,86%,55%)] hover:bg-[hsl(285,86%,55%)]/90 text-white font-bold text-xs rounded-md shadow-lg hover:shadow-xl transition-all h-9 px-4"
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}

// Main export that safeguards execution
export function LoginButton() {
  // Check environment variable availability
  // In Next.js client-side, we must count on the variable being exposed at build time or runtime
  const isConfigured =
    typeof process !== "undefined" && !!process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!isConfigured) {
    return (
      <Button
        variant="destructive"
        size="sm"
        className="font-mono text-xs opacity-80 h-9"
      >
        <AlertCircle className="mr-2 h-4 w-4" />
        Config Missing
      </Button>
    );
  }

  return <PrivyLoginButton />;
}
