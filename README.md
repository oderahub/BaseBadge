# 🪄 BaseBadge

Mint daily badges on the Base network using Reown AppKit (WalletConnect) and ERC1155 smart contracts.

**Built for the Talent Protocol x WalletConnect Base Builder Challenge**

## 🌟 Overview

BaseBadge is a mini dApp that lets users:
- Connect their wallet with Reown AppKit (WalletConnect)
- Mint daily badges as ERC1155 NFTs on Base Sepolia
- Track their on-chain participation and progress
- Celebrate blockchain activity with beautiful, animated UI

## 🧱 Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, TailwindCSS
- **Web3**: Wagmi, Viem, Reown AppKit
- **Smart Contracts**: Solidity 0.8.19, Foundry
- **Network**: Base Sepolia Testnet
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Foundry (for smart contracts)
- Git

### 1. Clone the Repository

```bash
git clone git@github.com:oderahub/BaseBadge.git
cd BaseBadge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_CONTRACT_ADDR=0xYourContractAddress
```

**Get your WalletConnect Project ID:**
1. Go to [Reown Cloud](https://cloud.reown.com)
2. Create a new project
3. Copy your Project ID

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📄 Smart Contract

### Contract Details

- **Name**: BaseBadge
- **Standard**: ERC1155
- **Network**: Base Sepolia
- **Features**:
  - Daily badge minting (one per day per address)
  - Answer hashing for user engagement
  - Owner-controlled metadata URI

### Deploy Contract with Foundry

```bash
cd contracts

# Install dependencies
forge install

# Compile contracts
forge build

# Run tests
forge test

# Deploy to Base Sepolia
forge script script/Deploy.s.sol \\
  --rpc-url https://sepolia.base.org \\
  --broadcast \\
  --verify

# Export ABI to frontend
forge inspect BaseBadge abi > ../lib/abi/BaseBadge.json
```

### Environment Variables for Deployment

Create `contracts/.env`:

```bash
PRIVATE_KEY=0xYourPrivateKey
BASESCAN_API_KEY=your_basescan_api_key
```

## 📁 Project Structure

```
basebadge/
├── app/
│   ├── components/
│   │   ├── BadgeCard.tsx      # Animated badge display
│   │   └── MintForm.tsx       # Badge minting interface
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── providers.tsx          # Web3 providers
├── contracts/
│   ├── src/
│   │   └── BaseBadge.sol      # Main contract
│   ├── test/
│   │   └── BaseBadge.t.sol    # Contract tests
│   ├── script/
│   │   └── Deploy.s.sol       # Deployment script
│   └── foundry.toml           # Foundry config
├── lib/
│   ├── abi/
│   │   └── BaseBadge.json     # Contract ABI
│   └── config.ts              # Wagmi & AppKit config
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Features

### 1. Wallet Connection
- Powered by Reown AppKit
- Supports Base and Base Sepolia networks
- QR code and injected wallet support

### 2. Daily Badge Minting
- Mint one badge per day
- Input your daily inspiration
- On-chain proof of participation

### 3. Badge Progress Tracking
- View your total badges
- Beautiful animated cards
- Real-time balance updates

### 4. Base-Themed UI
- Dark mode design
- Blue gradient accents (#0052FF)
- Smooth Framer Motion animations

## 🧪 Testing

### Frontend

```bash
npm run build
npm run lint
```

### Smart Contracts

```bash
cd contracts
forge test -vvv
```

## 🚢 Deployment

### Frontend (Vercel)

```bash
# Push to GitHub (already done)
git push origin main

# Deploy on Vercel
# 1. Import your repository
# 2. Add environment variables
# 3. Deploy
```

### Smart Contract (Base Sepolia)

```bash
cd contracts
forge script script/Deploy.s.sol \\
  --rpc-url https://sepolia.base.org \\
  --broadcast \\
  --verify
```

## 🔗 Links

- **GitHub**: [github.com/oderahub/BaseBadge](https://github.com/oderahub/BaseBadge)
- **Live Demo**: TBD (after Vercel deployment)
- **Base Sepolia Explorer**: [sepolia.basescan.org](https://sepolia.basescan.org)
- **Reown AppKit Docs**: [reown.com/docs/appkit](https://reown.com/docs/appkit)

## 🤝 Contributing

This project is open for contributions! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Suggested Future Features

- **Leaderboard**: Track top badge collectors
- **Streak System**: Reward consecutive daily mints
- **Dynamic Metadata**: Custom badge designs per day
- **Profile Page**: User badge collection display
- **Social Sharing**: Share achievements on social media

## 📜 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built for **Talent Protocol x WalletConnect Base Builder Challenge**
- Powered by **Reown AppKit** (formerly WalletConnect)
- Deployed on **Base** network by Coinbase
- UI inspired by Base's beautiful design system

---

**Made with ❤️ by oderahub**
