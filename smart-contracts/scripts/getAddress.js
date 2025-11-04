import { network } from "hardhat";

async function main() {
  const { viem } = await network.connect();
  const [deployer] = await viem.getWalletClients();
  console.log(deployer.account.address);
}

main().catch(console.error);