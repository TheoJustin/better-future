// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


// ReceiptNFT.sol
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ReceiptNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    mapping(address => bool) public minters;


    event MinterUpdated(address indexed minter, bool allowed);


    modifier onlyMinter() {
        require(minters[msg.sender], "ReceiptNFT: not a minter");
        _;
    }


    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) Ownable(msg.sender) {}


    function setMinter(address minter, bool allowed) external onlyOwner {
        minters[minter] = allowed;
        emit MinterUpdated(minter, allowed);
    }


    function mintReceipt(address to, string memory tokenURI) external onlyMinter returns (uint256) {
        _tokenIdCounter++;
        uint256 newId = _tokenIdCounter;
        _safeMint(to, newId);
        _setTokenURI(newId, tokenURI);
        return newId;
    }
}