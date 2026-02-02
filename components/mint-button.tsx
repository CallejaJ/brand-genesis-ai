"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useToast } from "@/hooks/use-toast";
import { createGaslessAccount } from "@/lib/zerodev";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { parseEther } from "viem";

function InternalMintButton() {
  const { authenticated, user, login } = usePrivy();
  const { wallets } = useWallets();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleMint = async () => {
    if (!authenticated) {
      login();
      return;
    }

    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy",
    );

    if (!embeddedWallet) {
      toast({
        title: "No Wallet Found",
        description: "Please login with a Privy wallet to act as the signer.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Switch chain to Sepolia if needed
      await embeddedWallet.switchChain(11155111);

      // Get the EIP-1193 provider
      const provider = await embeddedWallet.getEthereumProvider();

      // We need to construct a Viem WalletClient from this provider
      // PLEASE NOTE: In a real app we'd construct this properly.
      // For this demo, we'll try to use the raw provider or a simple viem client construction
      // Actually, createGaslessAccount expects a viem WalletClient.
      // Let's rely on standard window.ethereum style provider wrapping if possible,
      // or cleaner: use the `privy-wagmi` integration if we had it.
      // Since we are manual:

      const { createWalletClient, custom } = await import("viem");
      const { sepolia } = await import("viem/chains");

      const walletClient = createWalletClient({
        account: embeddedWallet.address as `0x${string}`,
        chain: sepolia,
        transport: custom(provider),
      });

      // Initialize ZeroDev Account
      const kernelClient = await createGaslessAccount(walletClient);

      // Send a dummy transaction (Self-Transfer of 0 ETH)
      // In a real app, this would be a contract call (e.g., mintNFT)
      const txHash = await kernelClient.sendTransaction({
        to: embeddedWallet.address as `0x${string}`,
        value: parseEther("0"),
        data: "0x", // Empty data
      });

      console.log("Transaction sent:", txHash);

      toast({
        title: "Mint Successful! (Simulated)",
        description: `Gasless transaction sent: ${txHash.slice(0, 10)}...`,
        action: (
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline"
          >
            View on Etherscan
          </a>
        ),
      });
    } catch (error: any) {
      console.error("Minting Error:", error);
      toast({
        title: "Minting Failed",
        description:
          error.message || "An error occurred during the transaction.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full text-center space-y-2">
      {!authenticated ? (
        <Button
          onClick={login}
          className="w-full bg-green-900/20 text-green-700 border border-green-900 hover:bg-green-900/40"
        >
          Connect to Mint
        </Button>
      ) : (
        <Button
          onClick={handleMint}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-500 text-black font-press-start text-xs border border-white/20 shadow-[4px_4px_0px_0px_#000000] active:translate-y-[2px] active:shadow-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Minting...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Mint Brand NFT (Free)
            </>
          )}
        </Button>
      )}
      <p className="text-[10px] text-gray-500 font-mono">
        *Gas fees sponsored by ZeroDev
      </p>
    </div>
  );
}

export function MintButton() {
  const isConfigured =
    typeof process !== "undefined" &&
    !!process.env.NEXT_PUBLIC_PRIVY_APP_ID &&
    !!process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID;

  if (!isConfigured) {
    return (
      <div className="w-full text-center p-4 border border-dashed border-gray-700 rounded bg-gray-900/50">
        <p className="text-xs text-gray-500 font-mono mb-2">
          Web3 Config Missing
        </p>
        <Button
          variant="outline"
          size="sm"
          disabled
          className="w-full opacity-50"
        >
          Minting Disabled
        </Button>
      </div>
    );
  }

  return <InternalMintButton />;
}
