# BrandGenesis AI

<div align="center">
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Ethereum-Sepolia-3C3C3D?style=for-the-badge&logo=ethereum" alt="Ethereum" />
    <img src="https://img.shields.io/badge/Privy-Auth-6366F1?style=for-the-badge" alt="Privy" />
    <img src="https://img.shields.io/badge/ZeroDev-Gasless-00D395?style=for-the-badge" alt="ZeroDev" />
    <img src="https://img.shields.io/badge/Gemini-AI-8E75B2?style=for-the-badge&logo=google" alt="Gemini AI" />
</div>

<p align="center">
    <i>An AI-powered Web3 branding tool. Chat with an expert AI consultant to generate your brand identity and mint it as an NFT—completely gasless.</i>
</p>

---

## Project Overview

BrandGenesis AI transforms the concept of a simple favicon generator into a comprehensive **Web3 Brand Consultant**. Users interact with an AI specialized in design theory to create a unique logo and color palette, which can then be minted as an NFT on the Sepolia testnet without paying any gas fees.

### Core Features

| Feature                  | Description                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **AI Design Consultant** | Gemini-powered chat interface that suggests logos based on your project description |
| **Instant Preview**      | Real-time rendering of your favicon in various contexts (Browser, Mobile, App)      |
| **Gasless Minting**      | Mint your Brand NFT for free, sponsored by ZeroDev (Account Abstraction)            |
| **Smart Auth**           | Seamless login via Email, Google, or Wallet using Privy                             |
| **Retro Aesthetic**      | A fully immersive Cyberpunk/Arcade UI with scanlines and neon typography            |

---

## How It Works

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Chats    │───>│   AI Generates  │───>│  Preview Brand  │
│   with Consultant│    │   Identity      │    │                 │
└─────────────────┘    └─────────────────┘    └────────┬────────┘
                                                       │
                                                       v
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  NFT Minted     │<───│  Gasless TX     │<───│   User Mints    │
│  On-Chain       │    │  (ZeroDev)      │    │   Brand Identity│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### The Workflow

1. **Consultation**: Describe your project to the AI (e.g., "A DeFi protocol for yield farming").
2. **Generation**: The AI applies design principles to suggest an icon, shape, and color palette.
3. **Refinement**: Tweak the design manually or ask the AI for changes.
4. **Minting**: Once satisfied, mint your brand as an NFT. ZeroDev handles the gas fees via a Paymaster.

---

## AI Consultant System

The platform leverages **Google Gemini 1.5 Flash** with a specialized system prompt acting as a Senior Brand Designer.

### Capabilities

| Skill                 | Description                                                          |
| --------------------- | -------------------------------------------------------------------- |
| **Color Psychology**  | Suggests colors that evoke the right emotions (e.g., Blue for Trust) |
| **Symbolism**         | Chooses shapes and icons that align with the brand archetype         |
| **Context Awareness** | Adapts designs based on the specific industry (Web3, SaaS, Gaming)   |

---

## Gasless Transactions (Account Abstraction)

Users can mint their Brand NFTs **without holding ETH**. This is powered by:

- **ZeroDev**: Kernel Smart Accounts (ERC-4337)
- **Privy**: Information-less wallet creation
- **Paymaster**: Automatically sponsors the minting transaction

---

## Technology Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - App Router
- **[React 19](https://react.dev/)** - UI Library
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling (Retro Theme)
- **[shadcn/ui](https://ui.shadcn.com/)** - Components
- **[Lucide React](https://lucide.dev/)** - Icons

### Web3

- **[Privy](https://privy.io/)** - Authentication & Embedded Wallets
- **[ZeroDev](https://zerodev.app/)** - Account Abstraction (AA)
- **[viem](https://viem.sh/)** - Low-level Ethereum interactions

### AI

- **[Google Gemini API](https://ai.google.dev/)** - Generative AI Model

---

## Project Setup

### Prerequisites

- Node.js 18+
- Privy App ID
- ZeroDev Project ID
- Google AI API Key

### Environment Configuration

Create a `.env.local` file:

```env
# Privy - Authentication
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
# (Optional) Server-side secret
PRIVY_APP_SECRET=your_privy_secret

# ZeroDev - Account Abstraction
NEXT_PUBLIC_ZERODEV_PROJECT_ID=your_zerodev_project_id

# Google AI - Consultant
GOOGLE_API_KEY=your_google_api_key

# Blockchain
SEPOLIA_RPC_URL=https://rpc.sepolia.org
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/brand-genesis-ai.git
cd brand-genesis-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables (Privy ID, ZeroDev ID, Google Key)
4. Deploy

---

## License

MIT License - Built for the Web3 design community.

---

<div align="center">
    <p><b>BrandGenesis AI</b></p>
    <p>Design - Mint - Own</p>
</div>
