import { useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { createWalletClient, custom, parseEther } from "viem";
import { sepolia } from "viem/chains";
import BrandGenesisABI from "@/lib/abi/BrandGenesis.json";
import { createGaslessAccount } from "@/lib/zerodev";
import { getLucideIconPath } from "@/lib/icons";

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x2161C8126568aB2Bc4FA59a33613E3F04f64c8df";

export interface BrandConfig {
  icon: string;
  shape: string;
  gradient: {
    from: string;
    to: string;
  };
}

export function useMint() {
  const { user, login } = usePrivy();
  const { wallets } = useWallets();
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mintBrand = async (config: BrandConfig) => {
    setError(null);
    setTxHash(null);

    if (!user) {
      login();
      return;
    }

    const wallet = wallets.find((w) => w.walletClientType === "privy");
    if (!wallet) {
      setError("No Privy wallet connected");
      return;
    }

    setIsMinting(true);

    try {
      // 1. Switch chain to Sepolia (ZeroDev usually operates on specific chains)
      await wallet.switchChain(sepolia.id);

      // 2. Get the EIP-1193 provider from Privy
      const provider = await wallet.getEthereumProvider();

      // 3. Create a basic Viem Wallet Client
      const walletClient = createWalletClient({
        account: wallet.address as `0x${string}`,
        chain: sepolia,
        transport: custom(provider),
      });

      // 4. Upgrade to a ZeroDev Smart Account (Gasless)
      const kernelClient = await createGaslessAccount(walletClient);

      console.log("Minting with Smart Account:", kernelClient.account.address);

      // Get SVG path data
      const pathData = getLucideIconPath(config.icon);

      // 5. Send the UserOperation to Mint
      const hash = await kernelClient.writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BrandGenesisABI,
        functionName: "mint",
        args: [
          kernelClient.account.address, // Smart Account owns the NFT
          config.icon,
          pathData, // Passing the SVG path directly
          config.shape,
          config.gradient.from,
          config.gradient.to,
        ],
      });

      console.log("UserOp sent, tx hash:", hash);
      setTxHash(hash);
    } catch (err: any) {
      console.error("Minting error:", err);
      setError(err.message || "Failed to mint brand");
    } finally {
      setIsMinting(false);
    }
  };

  return {
    mintBrand,
    isMinting,
    txHash,
    error,
    isAuthenticated: !!user,
    login,
  };
}
