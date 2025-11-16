# BetterFuture

A blockchain-based payment application that enables secure digital transactions using QR codes and smart contracts.

## Core Features

### 🔐 Wallet Authentication
- Connect with Web3 wallets using Panna SDK
- Secure user authentication and session management

### 📱 QR Code Payment System
- **QR Scanner**: Scan merchant QR codes to initiate payments
- **QR Generator**: Generate payment QR codes with public key and price
- Real-time payment processing with blockchain confirmation

### 💰 Smart Contract Integration
- IDR stablecoin payments via PaymentProcessor contract
- Automatic platform fee calculation and distribution
- Receipt NFT minting for transaction records

### 📊 Transaction Management
- Complete transaction history with receipt details
- Real-time balance tracking
- Payment confirmation and success notifications


## Technical Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Blockchain**: Ethereum-compatible networks (EVM), Hardhat
- **Smart Contracts**: Solidity (PaymentProcessor, IDRStable, ReceiptNFT)
- **Web3**: Panna SDK for wallet integration