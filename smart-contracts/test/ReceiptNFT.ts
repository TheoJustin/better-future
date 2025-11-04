import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";
import { network } from "hardhat";
import { getAddress, parseEventLogs } from "viem";

describe("ReceiptNFT", async () => {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();

  let receiptNFT: any;
  let owner: any;
  let minter: any;
  let user: any;

  beforeEach(async () => {
    const [signerOwner, signerMinter, signerUser] = await viem.getWalletClients();
    owner = signerOwner;
    minter = signerMinter;
    user = signerUser;

    receiptNFT = await viem.deployContract("ReceiptNFT", ["Receipt NFT", "RCPT"]);
  });

  async function mintReceiptBy(minterAccount: any, to: string, tokenURI: string) {
    const txHash = await receiptNFT.write.mintReceipt([to, tokenURI], { account: minterAccount });
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    const logs = parseEventLogs({
      abi: receiptNFT.abi,
      logs: receipt.logs,
      eventName: "Transfer",
    });
    return (logs[0] as any).args.tokenId as bigint;
  }

  it("Owner should be able to set minter", async () => {
    await receiptNFT.write.setMinter([minter.account.address, true], { account: owner.account });
    
    const isMinter = await receiptNFT.read.minters([minter.account.address]);
    assert.equal(isMinter, true);
  });

  it("Should emit MinterUpdated event when setting minter", async () => {
    const txHash = await receiptNFT.write.setMinter([minter.account.address, true], { account: owner.account });
    
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    const logs = parseEventLogs({
      abi: receiptNFT.abi,
      logs: receipt.logs,
      eventName: "MinterUpdated",
    });
    
    assert.equal(logs.length, 1);
    assert.equal(getAddress((logs[0] as any).args.minter), getAddress(minter.account.address));
    assert.equal((logs[0] as any).args.allowed, true);
  });

  it("Minter should be able to mint receipt NFT", async () => {
    await receiptNFT.write.setMinter([minter.account.address, true], { account: owner.account });
    
    const tokenId = await mintReceiptBy(minter.account, user.account.address, "ipfs://receipt1");
    
    const ownerOfToken = await receiptNFT.read.ownerOf([tokenId]);
    const tokenURI = await receiptNFT.read.tokenURI([tokenId]);
    const balance = await receiptNFT.read.balanceOf([user.account.address]);
    
    assert.equal(getAddress(ownerOfToken), getAddress(user.account.address));
    assert.equal(tokenURI, "ipfs://receipt1");
    assert.equal(balance, 1n);
  });

  it("Should increment token counter for each mint", async () => {
    await receiptNFT.write.setMinter([minter.account.address, true], { account: owner.account });
    
    const tokenId1 = await mintReceiptBy(minter.account, user.account.address, "ipfs://receipt1");
    const tokenId2 = await mintReceiptBy(minter.account, user.account.address, "ipfs://receipt2");
    
    assert.equal(tokenId1, 1n);
    assert.equal(tokenId2, 2n);
    
    const balance = await receiptNFT.read.balanceOf([user.account.address]);
    assert.equal(balance, 2n);
  });

  it("Should revert if non-minter tries to mint", async () => {
    await assert.rejects(
      receiptNFT.write.mintReceipt([user.account.address, "ipfs://fail"], { account: user.account }),
      /not a minter/
    );
  });

  it("Should revert if non-owner tries to set minter", async () => {
    await assert.rejects(
      receiptNFT.write.setMinter([minter.account.address, true], { account: user.account }),
      /OwnableUnauthorizedAccount/
    );
  });

  it("Owner should be able to revoke minter permission", async () => {
    await receiptNFT.write.setMinter([minter.account.address, true], { account: owner.account });
    await receiptNFT.write.setMinter([minter.account.address, false], { account: owner.account });
    
    const isMinter = await receiptNFT.read.minters([minter.account.address]);
    assert.equal(isMinter, false);
    
    await assert.rejects(
      receiptNFT.write.mintReceipt([user.account.address, "ipfs://fail"], { account: minter.account }),
      /not a minter/
    );
  });
});