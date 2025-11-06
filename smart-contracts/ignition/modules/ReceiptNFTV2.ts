import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ReceiptNFTV2Module = buildModule("ReceiptNFTV2Module", (m) => {
  const receiptNFT = m.contract("ReceiptNFTV2", ["Payment Receipt", "RECEIPT"]);
  return { receiptNFT };
});

export default ReceiptNFTV2Module;