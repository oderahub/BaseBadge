'use client';

import MintForm from './components/MintForm';
import { BadgeCard } from './components/BadgeCard';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-base-dark to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 backdrop-blur-sm sticky top-0 z-50 bg-base-dark/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-white"
          >
            🪄 <span className="text-base-blue">Base</span>Badge
          </motion.h1>

          <appkit-button />
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Mint Daily Badges on{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Base Network
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Celebrate your on-chain activity with beautiful digital badges
          </p>
        </motion.div>

        {/* Mint Form */}
        <MintForm />

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <BadgeCard
            title="Daily Minting"
            description="Mint a unique badge every day with your personal inspiration"
          />
          <BadgeCard
            title="ERC1155 Tokens"
            description="Your badges are real on-chain NFTs stored on Base"
          />
          <BadgeCard
            title="Track Progress"
            description="Build your collection and showcase your on-chain journey"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-8 mt-16 border-t border-gray-800">
        <p className="text-center text-gray-500 text-sm">
          Built with ❤️ for the Talent Protocol x WalletConnect Base Builder Challenge
        </p>
      </footer>
    </main>
  );
}
