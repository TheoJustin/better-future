import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PaymentProcessorV2Module = buildModule("PaymentProcessorV2Module", (m) => {
  const idrTokenAddress = "0xa8Fdb246849304965440C82304aC6d8df578C2D4";
  const receiptNFTAddress = "0x251C1faFEE681748c929e41B888f368a023FfdD9";
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

export default PaymentProcessorV2Module;