# Etherboard Verification

Exact bytecode verification for the Etherboard contract deployed on Ethereum mainnet.

## Contract Details

| Field | Value |
|-------|-------|
| Address | [`0x350e0ffc780a6a75b44cc52e1ff9092870668945`](https://etherscan.io/address/0x350e0ffc780a6a75b44cc52e1ff9092870668945) |
| Block | 536195 |
| Date | November 13, 2015 |
| Era | Frontier |
| Deployer | `0x4f5b350b662fb17ca4ec22116e91dc1417b892bc` |
| TX | [`0xebe5d18f...`](https://etherscan.io/tx/0xebe5d18f26a04e77baec769580af80da3920b977747c8bcabc51aebfb147a103) |

## Compilation

| Parameter | Value |
|-----------|-------|
| Compiler | Solidity (JS) |
| Version | v0.1.5 through v0.1.7 (all produce identical output) |
| Optimization | Enabled |
| Source | `Etherboard.sol` |

## Verification

Both init (creation) and runtime bytecode match on-chain byte-for-byte.

```bash
npm install solc
node verify.js
```

## What is Etherboard?

Etherboard was a 1000x1000 pixel canvas where users could buy, color, and trade individual pixels on the Ethereum blockchain. Think r/place, but with economic incentives and permanent on-chain storage. Each pixel had an owner, a color, and a price. To claim someone's pixel, you had to outbid them by at least 10%.

Built by [axic](https://github.com/axic) (Alex Beregszaszi), who later became a core Solidity compiler developer.

### Key Features
- **1,000,000 pixels** stored in a 2D mapping on-chain
- **Outbid mechanics**: 110% of current price to take a pixel
- **Owner tracking**: compact uint16 owner IDs mapped to addresses
- **Batch operations**: set multiple pixels in one transaction
- **Fee system**: 1% fee on pixel trades
- **RGB color encoding**: `alpha * 127 + red * 65536 + green * 256 + blue`

### Historical Context
Deployed during the Frontier era, Etherboard was one of the earliest "million pixel" experiments on Ethereum, predating similar concepts by years. The Reddit announcement from November 2015 describes it as "an image powered by the blockchain."

## Sources
- [GitHub: axic/etherboard](https://github.com/axic/etherboard)
- [Reddit announcement (Nov 2015)](https://www.reddit.com/r/ethereum/comments/3rzyp6/etherboard_an_image_powered_by_the_blockchain/)
- [EthereumHistory](https://www.ethereumhistory.com/contract/0x350e0ffc780a6a75b44cc52e1ff9092870668945)
