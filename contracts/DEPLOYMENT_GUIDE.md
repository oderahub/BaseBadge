# BaseBadge Deployment Guide

## Prerequisites

✅ Foundry installed
✅ Dependencies installed (OpenZeppelin, forge-std)
✅ Base Sepolia testnet ETH in your wallet

## Step 1: Build and Test

```bash
# Make sure you're in the contracts directory
cd contracts

# Build contracts
forge build

# Run tests
forge test -vvv
```

Expected output:
```
[PASS] testMintDailyBadge() (gas: ~150000)
[PASS] testCannotMintTwiceSameDay() (gas: ~180000)
[PASS] testCanMintNextDay() (gas: ~300000)
[PASS] testBadgeMintedEvent() (gas: ~150000)
[PASS] testOnchainMetadataGeneration() (gas: ~50000)
[PASS] testUniqueMetadataPerTokenId() (gas: ~60000)
```

## Step 2: Get Base Sepolia Testnet ETH

You need testnet ETH to deploy. Get some from these faucets:

1. **Coinbase Faucet** (Recommended)
   - https://portal.cdp.coinbase.com/products/faucet
   - Connect your wallet
   - Select "Base Sepolia"
   - Request ETH (you'll get ~0.2 ETH)

2. **QuickNode Faucet**
   - https://faucet.quicknode.com/base/sepolia
   - Enter your wallet address

3. **Alchemy Faucet**
   - https://www.alchemy.com/faucets/base-sepolia

## Step 3: Export Your Private Key

### From MetaMask:

1. Open MetaMask
2. Click the three dots (⋮) menu
3. Click "Account details"
4. Click "Show private key"
5. Enter your password
6. Copy the private key

⚠️ **IMPORTANT SECURITY NOTES:**
- NEVER share your private key
- NEVER commit your `.env` file to git
- Use a test wallet, not your main wallet
- This wallet should only contain testnet ETH

## Step 4: Create `.env` File

```bash
# In the contracts directory, create .env file
cd contracts
touch .env
```

Add your private key (without the 0x prefix):

```bash
# Example (DON'T use this key!)
PRIVATE_KEY=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890

# Optional: Add Basescan API key for verification
BASESCAN_API_KEY=YOUR_API_KEY
```

### Getting a Basescan API Key (Optional but Recommended):

1. Go to https://basescan.org/register
2. Create an account
3. Navigate to https://basescan.org/myapikey
4. Create a new API key
5. Copy and add it to your `.env` file

## Step 5: Deploy to Base Sepolia

### Option A: Deploy with Verification (Recommended)

```bash
source .env

forge script script/Deploy.s.sol \
  --rpc-url https://sepolia.base.org \
  --broadcast \
  --verify \
  --etherscan-api-key $BASESCAN_API_KEY \
  -vvvv
```

### Option B: Deploy without Verification

```bash
source .env

forge script script/Deploy.s.sol \
  --rpc-url https://sepolia.base.org \
  --broadcast \
  -vvvv
```

### Expected Output:

```
[⠒] Compiling...
No files changed, compilation skipped
Script ran successfully.

== Logs ==
  BaseBadge deployed to: 0x1234567890abcdef1234567890abcdef12345678
  All metadata and SVG images are stored onchain!

## Setting up 1 EVM.
==========================
Chain 84532

Estimated gas price: 0.001 gwei
Estimated total gas used for script: 2500000
Estimated amount required: 0.0025 ETH
==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
Transaction: 0xabcdef...
```

## Step 6: Verify Contract (If Not Done Automatically)

If verification failed, manually verify:

```bash
forge verify-contract \
  --chain-id 84532 \
  --etherscan-api-key $BASESCAN_API_KEY \
  --compiler-version 0.8.24 \
  0xYourContractAddress \
  src/BaseBadge.sol:BaseBadge
```

## Step 7: Update Frontend

1. **Copy the deployed contract address** from the deployment output

2. **Add it to your root `.env` file** (not the contracts one):

```bash
# /Users/mac/Desktop/base-mini/Curiosity/basebadge/.env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=f35dfb0d59abf9b664e0855748e64f72
NEXT_PUBLIC_CONTRACT_ADDR=0xYourDeployedContractAddress
```

3. **Export the ABI for the frontend:**

```bash
# From the contracts directory
forge inspect BaseBadge abi > ../lib/abi/BaseBadge.json
```

## Step 8: Test Your Deployed Contract

### Check the onchain metadata:

```bash
cast call 0xYourContractAddress "uri(uint256)" 1 --rpc-url https://sepolia.base.org
```

This will return a base64 encoded string like:
```
data:application/json;base64,eyJuYW1lIjoiQmFzZUJhZGdlICMxIiwiZGVzY3JpcHRpb24i...
```

### Decode it:

1. Copy the base64 part (after `base64,`)
2. Visit https://www.base64decode.org/
3. Paste and decode
4. You'll see the full JSON with the SVG image!

### View on BaseScan:

Visit: `https://sepolia.basescan.org/address/0xYourContractAddress`

## Step 9: Run the Frontend

```bash
# Go back to root directory
cd ..

# Start the dev server
npm run dev
```

Open http://localhost:3000 and test:
1. Connect your wallet
2. Switch to Base Sepolia network
3. Enter your daily inspiration
4. Mint your first badge!
5. Check your badge balance

## Troubleshooting

### "Insufficient funds"
- Make sure you have Base Sepolia ETH
- Try the faucets listed above

### "Private key error"
- Ensure your private key is in `.env` without the `0x` prefix
- Run `source .env` before deploying

### "Verification failed"
- You can still use the contract!
- Try manual verification with the command in Step 6
- Or verify later via Basescan UI

### "Transaction reverted"
- Check you're on Base Sepolia (Chain ID: 84532)
- Ensure you have enough gas

### "Already minted today"
- This is expected! You can only mint once per day
- Wait 24 hours or use a different wallet to test

## Next Steps

✅ Contract deployed
✅ Frontend updated with contract address
✅ Ready to mint badges!

Now you can:
1. Test the full flow
2. Create a PR for your feature branch
3. Deploy frontend to Vercel
4. Submit to Talent Protocol x WalletConnect challenge

## Resources

- [Base Sepolia Explorer](https://sepolia.basescan.org)
- [Base Docs](https://docs.base.org)
- [Foundry Book](https://book.getfoundry.sh/)
- [Reown AppKit Docs](https://reown.com/docs/appkit)
