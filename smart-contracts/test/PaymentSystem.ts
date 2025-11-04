import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";
import { network } from "hardhat";
import { getAddress, parseEventLogs, parseEther } from "viem";

describe("Payment System", async () => {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();

  let idrToken: any;
  let receiptNFT: any;
  let paymentProcessor: any;
  let owner: any;
  let buyer: any;
  let merchant: any;
  let platform: any;

  beforeEach(async () => {
    const wallets = await viem.getWalletClients();
    [owner, buyer, merchant, platform] = wallets;

    // Deploy IDRToken
    idrToken = await viem.deployContract("IDRToken", [owner.account.address]);

    // Deploy ReceiptNFT
    receiptNFT = await viem.deployContract("ReceiptNFT", ["Receipt NFT", "RCPT"]);

    // Deploy PaymentProcessor
    paymentProcessor = await viem.deployContract("PaymentProcessor", [
      idrToken.address,
      receiptNFT.address,
      platform.account.address,
      100n // 1% fee
    ]);

    // Set PaymentProcessor as minter for ReceiptNFT
    await receiptNFT.write.setMinter([paymentProcessor.address, true], { account: owner.account });

    // Mint tokens to buyer
    await idrToken.write.mint([buyer.account.address, parseEther("1000")], { account: owner.account });
  });

  it("Should mint tokens to buyer", async () => {
    const balance = await idrToken.read.balanceOf([buyer.account.address]);
    assert.equal(balance, parseEther("1000"));
  });

  it("Should burn tokens", async () => {
    await idrToken.write.burn([buyer.account.address, parseEther("100")], { account: owner.account });
    const balance = await idrToken.read.balanceOf([buyer.account.address]);
    assert.equal(balance, parseEther("900"));
  });

  it("Should set minter", async () => {
    const isMinter = await receiptNFT.read.minters([paymentProcessor.address]);
    assert.equal(isMinter, true);
  });

  it("Should mint receipt", async () => {
    await receiptNFT.write.setMinter([owner.account.address, true], { account: owner.account });
    await receiptNFT.write.mintReceipt([buyer.account.address, "ipfs://test"], { account: owner.account });
    
    const balance = await receiptNFT.read.balanceOf([buyer.account.address]);
    assert.equal(balance, 1n);
  });

  it("Should process payment successfully", async () => {
    const amount = parseEther("100");
    
    // Approve payment processor to spend tokens
    await idrToken.write.approve([paymentProcessor.address, amount], { account: buyer.account });
    
    // Make payment
    await paymentProcessor.write.payMerchant([
      merchant.account.address,
      amount,
      "ipfs://receipt-metadata"
    ], { account: buyer.account });

    // Check balances
    const merchantBalance = await idrToken.read.balanceOf([merchant.account.address]);
    const platformBalance = await idrToken.read.balanceOf([platform.account.address]);
    const buyerNFTBalance = await receiptNFT.read.balanceOf([buyer.account.address]);

    assert.equal(merchantBalance, parseEther("99")); // 99 IDR (1% fee)
    assert.equal(platformBalance, parseEther("1")); // 1 IDR fee
    assert.equal(buyerNFTBalance, 1n); // 1 NFT receipt
  });

  it("Should emit PaymentMade event", async () => {
    const amount = parseEther("100");
    
    await idrToken.write.approve([paymentProcessor.address, amount], { account: buyer.account });
    
    const txHash = await paymentProcessor.write.payMerchant([
      merchant.account.address,
      amount,
      "ipfs://receipt-metadata"
    ], { account: buyer.account });

    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
    const logs = parseEventLogs({
      abi: paymentProcessor.abi,
      logs: receipt.logs,
      eventName: "PaymentMade",
    });
    
    assert.equal(logs.length, 1);
    assert.equal(getAddress((logs[0] as any).args.buyer), getAddress(buyer.account.address));
  });

  it("Should revert with insufficient allowance", async () => {
    const amount = parseEther("100");
    
    await assert.rejects(
      paymentProcessor.write.payMerchant([
        merchant.account.address,
        amount,
        "ipfs://receipt-metadata"
      ], { account: buyer.account })
    );
  });
});