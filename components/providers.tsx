"use client";

import * as React from "react";
import { PrivyProviderWrapper } from "@/components/providers/privy-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <PrivyProviderWrapper>{children}</PrivyProviderWrapper>;
}
