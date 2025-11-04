import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";
import { network } from "hardhat";
import { getAddress, parseEventLogs, parseEther } from "viem";

describe("IDRToken", async () => {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();

  let idrToken: any;
  let owner: any;
  let user1: any;
  let user2: any;

  beforeEach(async () => {
    const [signerOwner, signerUser1, signerUser2] = await viem.getWalletClients();
    owner = signerOwner;
    user1 = signerUser1;
    user2 = signerUser2;

    idrToken = await viem.deployContract("IDRToken", [owner.account.address]);
  });

  async function mintTokensTo(to: string, amount: bigint) {
    const txHash = await idrToken.write.mint([to, amount], { account: owner.account });
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    const logs = parseEventLogs({
      abi: idrToken.abi,
      logs: receipt.logs,
      eventName: "Transfer",
    });
    return logs[0];
  }

  it("Should have correct name and symbol", async () => {
    const name = await idrToken.read.name();
    const symbol = await idrToken.read.symbol();
    
    assert.equal(name, "IDRToken");
    assert.equal(symbol, "IDR");
  });

  it("Owner should be able to mint tokens", async () => {
    const amount = parseEther("1000");
    
    await mintTokensTo(user1.account.address, amount);
    
    const balance = await idrToken.read.balanceOf([user1.account.address]);
    assert.equal(balance, amount);
  });

  it("Should emit Transfer event when minting", async () => {
    const amount = parseEther("500");
    
    const log = await mintTokensTo(user1.account.address, amount);
    
    assert.equal(getAddress((log as any).args.from), "0x0000000000000000000000000000000000000000");
    assert.equal(getAddress((log as any).args.to), getAddress(user1.account.address));
    assert.equal((log as any).args.value, amount);
  });

  it("Owner should be able to burn tokens from account", async () => {
    const mintAmount = parseEther("1000");
    const burnAmount = parseEther("300");
    
    await idrToken.write.mint([user1.account.address, mintAmount], { account: owner.account });
    await idrToken.write.burn([user1.account.address, burnAmount], { account: owner.account });
    
    const balance = await idrToken.read.balanceOf([user1.account.address]);
    assert.equal(balance, parseEther("700"));
  });

  it("Should emit Transfer event when burning", async () => {
    const mintAmount = parseEther("1000");
    const burnAmount = parseEther("200");
    
    await idrToken.write.mint([user1.account.address, mintAmount], { account: owner.account });
    
    const txHash = await idrToken.write.burn([user1.account.address, burnAmount], { account: owner.account });
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    const logs = parseEventLogs({
      abi: idrToken.abi,
      logs: receipt.logs,
      eventName: "Transfer",
    });
    
    assert.equal(getAddress((logs[0] as any).args.from), getAddress(user1.account.address));
    assert.equal(getAddress((logs[0] as any).args.to), "0x0000000000000000000000000000000000000000");
    assert.equal((logs[0] as any).args.value, burnAmount);
  });

  it("Users should be able to transfer tokens", async () => {
    const amount = parseEther("1000");
    const transferAmount = parseEther("250");
    
    await idrToken.write.mint([user1.account.address, amount], { account: owner.account });
    await idrToken.write.transfer([user2.account.address, transferAmount], { account: user1.account });
    
    const balance1 = await idrToken.read.balanceOf([user1.account.address]);
    const balance2 = await idrToken.read.balanceOf([user2.account.address]);
    
    assert.equal(balance1, parseEther("750"));
    assert.equal(balance2, transferAmount);
  });

  it("Users should be able to burn their own tokens", async () => {
    const amount = parseEther("1000");
    const burnAmount = parseEther("100");
    
    await idrToken.write.mint([user1.account.address, amount], { account: owner.account });
    await idrToken.write.burn([burnAmount], { account: user1.account });
    
    const balance = await idrToken.read.balanceOf([user1.account.address]);
    assert.equal(balance, parseEther("900"));
  });

  it("Should revert if non-owner tries to mint", async () => {
    await assert.rejects(
      idrToken.write.mint([user1.account.address, parseEther("100")], { account: user1.account }),
      /OwnableUnauthorizedAccount/
    );
  });

  it("Should revert if non-owner tries to burn from other account", async () => {
    const amount = parseEther("1000");
    await idrToken.write.mint([user1.account.address, amount], { account: owner.account });
    
    await assert.rejects(
      idrToken.write.burn([user1.account.address, parseEther("100")], { account: user2.account }),
      /OwnableUnauthorizedAccount/
    );
  });

  it("Should support ERC20Permit functionality", async () => {
    const domainSeparator = await idrToken.read.DOMAIN_SEPARATOR();
    assert.notEqual(domainSeparator, "0x0000000000000000000000000000000000000000000000000000000000000000");
  });
});