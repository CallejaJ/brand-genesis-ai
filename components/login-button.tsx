"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Wallet,
  AlertCircle,
  Mail,
  ChevronDown,
  LogOut,
  Globe,
  LogIn,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Assuming JazziconAvatar might not exist or needs to be replaced/omitted.
// I will check if JazziconAvatar exists, if not I will use a simple placeholder or omit it.
// For now I'll use a generic icon if JazziconAvatar is missing from this project's UI components.
// Checking file list earlier, I didn't see jazzicon-avatar.tsx in components/ui.
// I will simulate it with a colored div or Wallet icon.

// Internal component that uses the hook - only rendered if config exists
function PrivyLoginButton() {
  const { login, authenticated, ready, user, logout } = usePrivy();
  const { wallets } = useWallets();

  if (!ready) {
    return (
      <Button variant="outline" disabled className="font-mono h-9">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (authenticated && user) {
    // Identity priority: Email > Wallet > "User"
    const email = user?.email?.address || user?.google?.email;
    const walletAddress = user?.wallet?.address;
    const shortAddress = walletAddress
      ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
      : "";

    const displayName = email || shortAddress || "User";
    const hasEmail = !!email;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 border border-white/10 bg-black/50 text-indigo-100 hover:text-white hover:bg-white/5 hover:border-indigo-400/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-300 h-10 px-4 rounded-full cursor-pointer outline-none focus:outline-none focus:ring-0">
            {hasEmail ? (
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-300">
                <Mail className="h-3 w-3" />
              </div>
            ) : (
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-300">
                <Wallet className="h-3 w-3" />
              </div>
            )}
            <span className="max-w-[120px] truncate font-medium text-sm">
              {displayName}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50 ml-1" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-80 !bg-zinc-950 !border-zinc-700 text-white p-3 shadow-2xl mt-2 rounded-xl"
          align="end"
        >
          <DropdownMenuLabel className="font-normal p-1 mb-3">
            <div className="flex flex-col space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase">
                Signed in as
              </p>
              <p className="text-sm font-medium text-white truncate font-mono tracking-tight opacity-90">
                {displayName}
              </p>
            </div>
          </DropdownMenuLabel>

          <div className="space-y-2 mb-2">
            {hasEmail && walletAddress && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#202022] border border-white/5">
                <Wallet className="h-5 w-5 text-gray-400" />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-0.5">
                    WALLET
                  </span>
                  <span className="font-mono text-sm truncate text-white">
                    {shortAddress}
                  </span>
                </div>
              </div>
            )}
            {walletAddress && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#202022] border border-white/5">
                <Globe className="h-5 w-5 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-0.5">
                    NETWORK
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]"></div>
                    <span className="text-sm font-medium text-white">
                      Sepolia Testnet
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DropdownMenuSeparator className="bg-white/10 my-2" />
          <DropdownMenuItem
            onClick={logout}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer p-2 rounded-lg flex items-center transition-colors focus:bg-red-500/10 focus:text-red-300"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="font-medium text-sm">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="p-[2px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300 inline-block">
      <button
        onClick={login}
        className="min-w-[200px] h-9 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white hover:text-white font-bold text-xs rounded-full px-10 flex justify-center items-center gap-2 transition-all border-0 cursor-pointer"
      >
        <LogIn className="h-4 w-4 text-indigo-400 group-hover:text-white transition-colors" />
        <span className="text-white shadow-sm">Log in</span>
      </button>
    </div>
  );
}

// Main export that safeguards execution
export function LoginButton() {
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
