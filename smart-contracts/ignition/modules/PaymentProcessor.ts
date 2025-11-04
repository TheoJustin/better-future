import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("PaymentProcessorModule", (m) => {
  const stableToken = m.getParameter("stableToken");
  const receiptContract = m.getParameter("receiptContract");
  const platformWallet = m.getParameter("platformWallet", m.getAccount(0));
  const platformFeeBps = m.getParameter("platformFeeBps", 100n); // 1% default
  
  const paymentProcessor = m.contract("PaymentProcessor", [
    stableToken,
    receiptContract,
    platformWallet,
    platformFeeBps
  ]);

  return { paymentProcessor };
});