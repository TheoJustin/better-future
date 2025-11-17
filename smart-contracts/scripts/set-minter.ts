import hre from "hardhat";

async function main() {
  const [owner] = await hre.ethers.getSigners();
  
  const receiptNFTAddress = "0x092C45Be1a964bAe01fb33Fd12072BfB335e5E93";
  const newPaymentProcessorAddress = "0x421e010dC23005E7DD536CB42Fb6378b27C788ec";
  
  const ReceiptNFT = await hre.ethers.getContractAt("ReceiptNFT", receiptNFTAddress);
  
  console.log(`Setting ${newPaymentProcessorAddress} as minter...`);
  
  const tx = await ReceiptNFT.setMinter(newPaymentProcessorAddress, true);
  console.log(`Transaction hash: ${tx.hash}`);
  
  await tx.wait();
  console.log("✅ New PaymentProcessor is now authorized to mint receipts!");
  
  // Verify
  const isMinter = await ReceiptNFT.minters(newPaymentProcessorAddress);
  console.log(`Verification - Is minter: ${isMinter}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});