import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("IDRTokenModule", (m) => {
  const initialOwner = m.getAccount(0);
  
  const idrToken = m.contract("IDRToken", [initialOwner]);

  return { idrToken };
});