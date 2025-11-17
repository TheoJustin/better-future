import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PaymentProcessorV4Module = buildModule("PaymentProcessorV4Module", (m) => {
  const idrTokenAddress = "0xa8Fdb246849304965440C82304aC6d8df578C2D4";
  const receiptNFTAddress = "0x092C45Be1a964bAe01fb33Fd12072BfB335e5E93";
  const platformWallet = m.getAccount(0);
  const platformFeeBps = 250; // 2.5%

  const paymentProcessor = m.contract("PaymentProcessor", [
    idrTokenAddress,
    receiptNFTAddress,
    platformWallet,
    platformFeeBps
  ]);

  return { paymentProcessor };
});

export default PaymentProcessorV4Module;