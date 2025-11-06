import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const IDRTokenV2Module = buildModule("IDRTokenV2Module", (m) => {
  const initialOwner = m.getAccount(0);
  
  const idrToken = m.contract("IDRToken", [initialOwner]);

  return { idrToken };
});

export default IDRTokenV2Module;