// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


// PaymentProcessor.sol
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


interface IReceiptNFT {
    function mintReceipt(address to, string memory tokenURI) external returns (uint256);
}


contract PaymentProcessor is Ownable {
    IERC20 public stableToken;
    IReceiptNFT public receiptContract;
    address public platformWallet;
    uint256 public platformFeeBps; // basis points (1% = 100)


    event PaymentMade(address indexed buyer, address indexed merchant, uint256 amount, uint256 platformFee, uint256 tokenId, string category, uint256 timestamp);


    constructor(address _stableToken, address _receiptContract, address _platformWallet, uint256 _platformFeeBps) Ownable(msg.sender) {
        stableToken = IERC20(_stableToken);
        receiptContract = IReceiptNFT(_receiptContract);
        platformWallet = _platformWallet;
        platformFeeBps = _platformFeeBps;
    }


    function setPlatformWallet(address _wallet) external onlyOwner {
        platformWallet = _wallet;
    }


    function setPlatformFeeBps(uint256 _bps) external onlyOwner {
        require(_bps <= 1000, "fee too high"); // max 10% by default guard
        platformFeeBps = _bps;
    }


    /// @notice Buyer must have `approve`d this contract to spend `amount` of stableToken beforehand
    function payMerchant(address merchant, uint256 amount, string calldata receiptTokenURI, string calldata category) external {
        require(merchant != address(0), "invalid merchant");
        require(amount > 0, "amount zero");


        uint256 platformFee = (amount * platformFeeBps) / 10000;
        uint256 merchantAmount = amount - platformFee;


        // Transfer merchant share
        bool ok1 = stableToken.transferFrom(msg.sender, merchant, merchantAmount);
        require(ok1, "transfer to merchant failed");


        // Transfer fee to platform
        if (platformFee > 0) {
            bool ok2 = stableToken.transferFrom(msg.sender, platformWallet, platformFee);
            require(ok2, "transfer fee failed");
        }


        // Mint receipt NFT to buyer (or merchant if you prefer)
        uint256 tokenId = receiptContract.mintReceipt(msg.sender, receiptTokenURI);


        emit PaymentMade(msg.sender, merchant, amount, platformFee, tokenId, category, block.timestamp);
    }
}