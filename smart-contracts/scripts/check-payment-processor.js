const hre = require("hardhat");

async function main() {
  const paymentProcessorAddress = "0xD7eC51a2a6e2DF143342c92cFfF91F9e25b4e1e0";
  const PaymentProcessor = await hre.ethers.getContractAt("PaymentProcessor", paymentProcessorAddress);
  
  console.log("Checking PaymentProcessor configuration...");
  
  const stableTokenAddress = await PaymentProcessor.stableToken();
  console.log(`Current stable token address: ${stableTokenAddress}`);
  console.log(`New IDR token address: 0xa8Fdb246849304965440C82304aC6d8df578C2D4`);
  
  if (stableTokenAddress.toLowerCase() !== "0xa8Fdb246849304965440C82304aC6d8df578C2D4".toLowerCase()) {
    console.log("❌ PaymentProcessor is using the old IDR token address!");
    console.log("Need to deploy new PaymentProcessor with correct IDR address");
  } else {
    console.log("✅ PaymentProcessor is using the correct IDR token address");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});