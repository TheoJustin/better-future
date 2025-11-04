import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ReceiptNFTModule", (m) => {
  const name = m.getParameter("name", "Receipt NFT");
  const symbol = m.getParameter("symbol", "RCPT");
  
  const receiptNFT = m.contract("ReceiptNFT", [name, symbol]);

  return { receiptNFT };
});