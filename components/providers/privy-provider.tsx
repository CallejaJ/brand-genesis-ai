"use client";

import { PrivyProvider as BasePrivyProvider } from "@privy-io/react-auth";
import { sepolia } from "viem/chains";

const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";

export function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!privyAppId) {
    console.warn("PRIVY_APP_ID not configured, wallet features disabled");
    return <>{children}</>;
  }

  return (
    <BasePrivyProvider
      appId={privyAppId}
      config={{
        // Embedded wallets for gasless onboarding
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        // Sepolia testnet
        defaultChain: sepolia,
        supportedChains: [sepolia],
        // Login methods
        loginMethods: ["email", "wallet", "google"],
        // Appearance - Retro/Arcade theme
        appearance: {
          theme: "dark",
          accentColor: "#4ADE80", // Green-400 equivalent for that retro terminal look
          logo: "/logo-transparent.png",
        },
      }}
    >
      {children}
    </BasePrivyProvider>
  );
}

// Hook to check if Privy is configured
export function usePrivyConfigured() {
  return Boolean(privyAppId);
}
