'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi';
import BaseBadgeABI from '@/lib/abi/BaseBadge.json';

export default function MintForm() {
  const [answer, setAnswer] = useState('');
  const { address, isConnected } = useAccount();
  const contractAddress = (process.env.NEXT_PUBLIC_CONTRACT_ADDR as `0x${string}`) || '0x0000000000000000000000000000000000000000';

  // Read badge balance
  const { data: badgeBalance } = useReadContract({
    address: contractAddress,
    abi: BaseBadgeABI,
    functionName: 'balanceOf',
    args: [address, 1],
  });

  const { writeContract, data: hash, isPending, isError, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = async () => {
    if (!answer.trim()) {
      alert('Please enter an answer!');
      return;
    }

    try {
      writeContract({
        address: contractAddress,
        abi: BaseBadgeABI,
        functionName: 'mintDailyBadge',
        args: [answer],
      });
    } catch (err) {
      console.error('Minting error:', err);
    }
  };

  if (!isConnected) {
    return (
      <div className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-800/30 rounded-2xl shadow-lg max-w-md mx-auto mt-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
        <p className="text-gray-300">Please connect your wallet to mint badges</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-800/30 rounded-2xl shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Mint Your Daily Badge</h2>

      {badgeBalance !== undefined && (
        <div className="mb-4 p-3 bg-blue-900/30 rounded-lg">
          <p className="text-sm text-gray-300">Your badges: <span className="font-bold text-white">{badgeBalance.toString()}</span></p>
        </div>
      )}

      <input
        className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-blue-700 focus:outline-none focus:border-blue-500"
        placeholder="What inspired you today?"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={isPending || isConfirming}
      />

      <button
        onClick={handleMint}
        disabled={isPending || isConfirming || !answer.trim()}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-md transition font-semibold"
      >
        {isPending ? 'Confirming...' : isConfirming ? 'Minting...' : 'Mint Badge'}
      </button>

      {isSuccess && (
        <p className="text-green-400 mt-3 text-center">✅ Badge minted successfully!</p>
      )}

      {isError && (
        <p className="text-red-400 mt-3 text-center text-sm">❌ Error: {error?.message.slice(0, 100)}</p>
      )}

      {hash && (
        <p className="text-xs text-gray-400 mt-2 text-center break-all">
          Tx: {hash.slice(0, 10)}...{hash.slice(-8)}
        </p>
      )}
    </div>
  );
}
