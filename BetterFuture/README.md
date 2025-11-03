# 🌱 Lisk Garden DApp

A blockchain-based virtual garden game built on **Lisk Sepolia Testnet**. Plant seeds, water them regularly, watch them grow through 4 stages, and harvest for rewards!

![Lisk Garden](https://img.shields.io/badge/Blockchain-Lisk%20Sepolia-purple)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Panna SDK](https://img.shields.io/badge/Panna--SDK-0.1.0-orange)

## 🎮 Game Features

### Core Mechanics
- 🌱 **Plant Seeds**: Start your garden by planting seeds (0.001 ETH)
- 💧 **Water Plants**: Keep your plants alive with free watering (gas only)
- 📈 **Watch Growth**: Plants grow through 4 stages over 3 minutes
- 🌸 **Harvest Rewards**: Earn 0.003 ETH when plants bloom (3x profit!)
- ⚠️ **Water Depletion**: Water depletes 20% every 30 seconds - keep watering or plants die!

### Growth Stages
1. 🌱 **Seed** - Just planted (1 minute)
2. 🌿 **Sprout** - Growing roots (1 minute)
3. 🪴 **Growing** - Getting stronger (1 minute)
4. 🌸 **Blooming** - Ready to harvest!

### Game Economics
- **Plant Cost**: 0.001 ETH
- **Harvest Reward**: 0.003 ETH
- **Profit**: 3x return on investment
- **Growth Time**: 3 minutes (total)
- **Watering**: FREE - only gas costs
- **Water Depletion**: 20% every 30 seconds

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 (React 19)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Animations**: Tailwind Animate

### Blockchain
- **Network**: Lisk Sepolia Testnet (Chain ID: 4202)
- **Web3 SDK**: Panna SDK 0.1.0
- **Contract Interaction**: Thirdweb SDK
- **Smart Contract**: Solidity ^0.8.20
- **Wallet**: MetaMask / Web3 compatible

### Smart Contract Features
- Plant ownership tracking
- Automatic stage progression based on time
- Water depletion system
- Plant death mechanism
- Harvest rewards distribution
- Event emission for all actions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or Web3 wallet
- Lisk Sepolia testnet ETH

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd lisk-garden-dapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Smart Contract Deployment

The smart contract is deployed on **Lisk Sepolia Testnet**.

**Contract Address**: `0xf44adEdec3f5E7a9794bC8E830BE67e4855FA8fF`

To deploy your own contract:
1. Set up Hardhat in the `contracts` directory
2. Configure Lisk Sepolia network
3. Deploy using: `npx hardhat run scripts/deploy.js --network liskSepolia`
4. Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`

## 📱 Usage

### Connect Wallet
1. Click "Connect Wallet" button
2. Connect your MetaMask to Lisk Sepolia
3. Approve the connection

### Plant a Seed
1. Click "Plant New Seed" button
2. Confirm transaction (0.001 ETH + gas)
3. Wait for transaction confirmation

### Water Your Plants
1. Click on any plant card
2. Click "Water Plant" button
3. Confirm transaction (FREE - gas only)

### Harvest
1. Wait 3 minutes for plant to reach blooming stage
2. Click on the blooming plant
3. Click "Harvest Plant" button
4. Receive 0.003 ETH reward!

### Monitor Progress
- **Auto-refresh**: Data updates every 5 seconds
- **Manual refresh**: Click refresh button anytime
- **Real-time stats**: View garden statistics in sidebar
- **Water levels**: Monitor water depletion in real-time
- **Growth progress**: Track percentage completion

## 🏗️ Project Structure

```
lisk-garden-dapp/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main garden page
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── garden-header.tsx    # Header with wallet connection
│   ├── garden-grid.tsx      # Plant grid display
│   ├── plant-card.tsx       # Individual plant card
│   ├── plant-details-modal.tsx  # Plant details & actions
│   ├── plant-seed-modal.tsx     # Planting modal
│   ├── stats-sidebar.tsx    # Statistics sidebar
│   └── ui/                  # shadcn/ui components
├── hooks/                   # React hooks
│   ├── useContract.ts       # Web3 contract hook
│   └── usePlants.ts         # Plant management hook
├── lib/                     # Utility libraries
│   ├── contract.ts          # Contract interaction functions
│   └── utils.ts             # Helper utilities
├── types/                   # TypeScript types
│   └── contracts.ts         # Contract types & ABI
├── scripts/                 # Utility scripts
│   └── check-balance.js     # Contract balance checker
└── public/                  # Static assets
```

## 🔧 Key Functions

### Contract Interactions
- `plantSeed()` - Plant a new seed (payable)
- `waterPlant(plantId)` - Water a plant
- `harvestPlant(plantId)` - Harvest a blooming plant
- `getPlant(plantId)` - Get plant data
- `getUserPlants(address)` - Get all user's plants
- `calculateWaterLevel(plantId)` - Get current water level

### Helper Functions
- `formatPlantAge()` - Format time since planting
- `formatLastWatered()` - Format time since last watering
- `getClientWaterLevel()` - Calculate current water level
- `getPlantProgress()` - Calculate growth percentage
- `canHarvest()` - Check if plant is harvestable
- `isCritical()` - Check if plant needs immediate watering

## 🎨 Features Highlight

### Real-time Updates
- Auto-refresh every 5 seconds
- Seamless background updates
- No loading flickers
- Live water depletion tracking

### Visual Feedback
- Stage-specific color themes
- Animated plant emojis
- Growth progress bars
- Water level indicators
- Critical water warnings

### Responsive Design
- Mobile-friendly layout
- Dark/Light mode support
- Smooth animations
- Interactive hover effects

## 🔐 Smart Contract Security

- Owner-only withdraw function
- Plant ownership verification
- Existence checks before operations
- Automatic water depletion tracking
- Death state prevention of double-harvest

## 🌐 Network Configuration

### Lisk Sepolia Testnet
- **Chain ID**: 4202
- **RPC URL**: https://rpc.sepolia-api.lisk.com
- **Explorer**: https://sepolia-blockscout.lisk.com

### Get Test ETH
1. Visit Lisk Sepolia faucet
2. Enter your wallet address
3. Receive test ETH for transactions

## 📊 Game Statistics

Track your garden performance:
- Total plants owned
- Alive plants count
- Blooming plants ready to harvest
- Growing plants in progress
- Dead plants (from dehydration)

## 🐛 Common Issues

### "Transfer failed" Error
**Problem**: Contract doesn't have enough ETH for harvest rewards

**Solution**:
```bash
node scripts/check-balance.js
```
Send ETH to contract address if balance is low.

### Plants Not Loading
**Problem**: Wallet not connected or wrong network

**Solution**:
1. Connect wallet
2. Switch to Lisk Sepolia network
3. Refresh the page

### Transaction Failing
**Problem**: Insufficient gas or wrong parameters

**Solution**:
1. Ensure you have enough ETH for gas
2. Wait for previous transaction to complete
3. Check if plant exists and you're the owner

## 🔄 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Check contract balance
node scripts/check-balance.js
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Lisk** - For the Sepolia testnet
- **Panna SDK** - For Web3 authentication
- **Thirdweb** - For contract interaction utilities
- **shadcn/ui** - For beautiful UI components
- **Next.js** - For the React framework

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review smart contract events

## 🎯 Roadmap

Future enhancements:
- [ ] Multiple plant types
- [ ] Plant breeding system
- [ ] Marketplace for trading plants
- [ ] Achievements and rewards
- [ ] Leaderboard system
- [ ] Mobile app version

---

**Built with ❤️ on Lisk Sepolia Testnet**

*Happy Gardening! 🌸*
