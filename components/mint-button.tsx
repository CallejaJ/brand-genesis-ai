"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, ExternalLink } from "lucide-react";
import { useMint } from "@/hooks/useMint";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

// Optional: Import global context if the config is stored there,
// OR assume the parent component passes the config needed for minting if we lifted state up?
// The current page.tsx HAS the state. But this button is inside page.tsx as <MintButton />.
// It seems `MintButton` in page.tsx doesn't take props currently?
// Let's check page.tsx usage.
// Ah, in page.tsx: <MintButton /> is used without props.
// BUT, the config is in page.tsx state `faviconConfig`.
// I should update page.tsx to pass the config to MintButton, or expose a Context.
// For now, I'll update MintButton to accept props OR keep it independent if it can read state?
// It can't read page.tsx state magically.
// I will modify this component to accept `config` as a prop.

// WAIT: The previous MintButton didn't take config?
// Previous: `export function MintButton() { ... }`
// It was just doing a dummy transaction with 0 ETH.
// Now we need ACTUAL data.
// So I will change the signature to accept props.

interface MintButtonProps {
  config?: {
    icon: string;
    shape: string;
    gradient: { from: string; to: string };
  };
}

export function MintButton({ config }: MintButtonProps) {
  const { mintBrand, isMinting, txHash, error, isAuthenticated, login } =
    useMint();
  const { toast } = useToast();

  useEffect(() => {
    if (txHash) {
      toast({
        title: "Mint Successful!",
        description: "Your Brand Identity has been minted on-chain.",
        action: (
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            View <ExternalLink className="h-3 w-3" />
          </a>
        ),
      });
    }
  }, [txHash, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Mint Failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleClick = () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (!config) {
      toast({
        title: "Configuration Error",
        description: "No brand configuration found.",
        variant: "destructive",
      });
      return;
    }
    mintBrand(config);
  };

  return (
    <div className="w-full text-center space-y-2">
      <Button
        onClick={handleClick}
        disabled={isMinting}
        className="w-full bg-green-600 hover:bg-green-500 text-black font-press-start text-xs border border-white/20 shadow-[4px_4px_0px_0px_#000000] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isMinting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Minting...
          </>
        ) : !isAuthenticated ? (
          "Connect Wallet"
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Mint Brand NFT (Free)
          </>
        )}
      </Button>
      <p className="text-[10px] text-gray-500 font-mono">
        *Gas fees sponsored by ZeroDev
      </p>
    </div>
  );
}
