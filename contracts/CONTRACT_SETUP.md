# BaseBadge Contract Setup Guide

## Prerequisites

Install Foundry if you haven't already:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

## Installation Steps

### 1. Navigate to contracts directory

```bash
cd contracts
```

### 2. Initialize Foundry (if not done)

```bash
forge init --no-commit
```

### 3. Install OpenZeppelin Contracts

```bash
forge install OpenZeppelin/openzeppelin-contracts --no-commit
```

### 4. Install Forge Standard Library

```bash
forge install foundry-rs/forge-std --no-commit
```

### 5. Build the contracts

```bash
forge build
```

You should see:
```
[⠊] Compiling...
[⠒] Compiling 23 files with Solc 0.8.19
[⠢] Solc 0.8.19 finished in X.XXs
Compiler run successful!
```

### 6. Run tests

```bash
forge test -vvv
```

Expected output:
```
Running 6 tests for test/BaseBadge.t.sol:BaseBadgeTest
[PASS] testBadgeMinted Event() (gas: XXXX)
[PASS] testCanMintNextDay() (gas: XXXX)
[PASS] testCannotMintTwiceSameDay() (gas: XXXX)
[PASS] testMintDailyBadge() (gas: XXXX)
[PASS] testOnchainMetadataGeneration() (gas: XXXX)
[PASS] testUniqueMetadataPerTokenId() (gas: XXXX)
Test result: ok. 6 passed; 0 failed;
```

## Deployment

### 1. Create environment file

Create `contracts/.env`:

```bash
PRIVATE_KEY=0xYourPrivateKeyHere
BASESCAN_API_KEY=YourBasescanApiKey
```

### 2. Deploy to Base Sepolia

```bash
source .env

forge script script/Deploy.s.sol \\
  --rpc-url https://sepolia.base.org \\
  --broadcast \\
  --verify \\
  --etherscan-api-key $BASESCAN_API_KEY
```

### 3. Export ABI for frontend

After deployment, export the ABI:

```bash
forge inspect BaseBadge abi > ../lib/abi/BaseBadge.json
```

### 4. Update frontend environment variables

Copy the deployed contract address and update `/.env.local`:

```
NEXT_PUBLIC_CONTRACT_ADDR=0xYourDeployedContractAddress
```

## Contract Features

### Fully Onchain Metadata ✨

The BaseBadge contract generates all metadata and SVG images onchain:

- **No IPFS required** - Everything lives on the blockchain
- **Dynamic SVG generation** - Each badge is rendered as a beautiful gradient SVG
- **Base64 encoded** - Metadata is encoded as data URIs
- **Gas efficient** - Optimized for minimal gas usage

### Testing Onchain Metadata

You can test the metadata generation locally:

```bash
forge test --match-test testOnchainMetadataGeneration -vvv
```

To view the actual SVG/metadata, call the `uri()` function:

```bash
cast call <CONTRACT_ADDRESS> "uri(uint256)" 1 --rpc-url https://sepolia.base.org
```

Then decode the base64 string to see the JSON and SVG!

## Troubleshooting

### Error: "Source not found"

Make sure you've installed dependencies:
```bash
forge install
```

### Error: "Compiler version mismatch"

Check `foundry.toml` - it should specify Solidity 0.8.19:
```toml
[profile.default]
solc = "0.8.19"
```

### Gas estimation failed

Make sure you have testnet ETH on Base Sepolia. Get some from:
- https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- https://faucet.quicknode.com/base/sepolia

## Next Steps

1. Deploy contract to Base Sepolia
2. Update frontend with contract address
3. Test minting badges from the UI
4. View your onchain SVG badges in wallets and marketplaces!

## Resources

- [Foundry Book](https://book.getfoundry.sh/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Base Documentation](https://docs.base.org)
