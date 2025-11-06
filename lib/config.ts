import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base, baseSepolia } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

// 1. Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// 2. Create wagmiConfig
export const networks = [baseSepolia, base]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

export const config = wagmiAdapter.wagmiConfig

// 3. Create modal
export const metadata = {
  name: 'BaseBadge',
  description: 'Mint daily badges on Base network',
  url: 'https://basebadge.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true
  }
})

export const queryClient = new QueryClient()
