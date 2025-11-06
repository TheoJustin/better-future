const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  
  // Get the deployed contract
  const idrTokenAddress = "0x08284D90A5C3a6a9B00d9b4BDe89c27B2Bd86C59";
  const IDRToken = await hre.ethers.getContractAt("IDRToken", idrTokenAddress);
  
  // Address to mint to (replace with actual user address)
  const userAddress = process.argv[2];
  const amount = process.argv[3] || "1000"; // Default 1000 IDR
  
  if (!userAddress) {
    console.log("Usage: npx hardhat run scripts/mint-idr.js --network lisk-sepolia <userAddress> [amount]");
    console.log("Example: npx hardhat run scripts/mint-idr.js --network lisk-sepolia 0x123... 1000");
    return;
  }
  
  console.log(`Minting ${amount} IDR to ${userAddress}...`);
  
  // Mint tokens (amount in wei, so multiply by 10^18)
  const amountWei = hre.ethers.parseEther(amount);
  const tx = await IDRToken.mint(userAddress, amountWei);
  
  console.log(`Transaction hash: ${tx.hash}`);
  await tx.wait();
  
  console.log(`Successfully minted ${amount} IDR to ${userAddress}`);
  
  // Check balance
  const balance = await IDRToken.balanceOf(userAddress);
  console.log(`New balance: ${hre.ethers.formatEther(balance)} IDR`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});