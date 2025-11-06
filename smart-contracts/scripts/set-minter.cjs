const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  
  const receiptNFTAddress = "0x251C1faFEE681748c929e41B888f368a023FfdD9";
  const newPaymentProcessorAddress = "0x5dB8c24CcDccEB6eDAA0C32B2832a3C164FB313a";
  
  console.log(`Setting ${newPaymentProcessorAddress} as minter on ${receiptNFTAddress}...`);
  
  const ReceiptNFT = await hre.ethers.getContractAt("ReceiptNFT", receiptNFTAddress);
  
  const tx = await ReceiptNFT.setMinter(newPaymentProcessorAddress, true);
  console.log(`Transaction hash: ${tx.hash}`);
  
  await tx.wait();
  console.log("✅ PaymentProcessor authorized as minter!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});