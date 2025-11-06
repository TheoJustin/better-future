import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  
  const idrTokenAddress = "0xa8Fdb246849304965440C82304aC6d8df578C2D4";
  const IDRToken = await ethers.getContractAt("IDRToken", idrTokenAddress);
  
  console.log(`Testing deposit with address: ${signer.address}`);
  
  // Check if deposit function exists
  try {
    const exchangeRate = await IDRToken.EXCHANGE_RATE();
    console.log(`Exchange rate: ${exchangeRate}`);
    
    // Test deposit with 0.001 ETH
    const depositAmount = ethers.parseEther("0.001");
    console.log(`Depositing ${ethers.formatEther(depositAmount)} ETH...`);
    
    const tx = await IDRToken.deposit({ value: depositAmount });
    console.log(`Transaction hash: ${tx.hash}`);
    
    await tx.wait();
    console.log("Deposit successful!");
    
    // Check balance
    const balance = await IDRToken.balanceOf(signer.address);
    console.log(`New IDR balance: ${ethers.formatEther(balance)} IDR`);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});