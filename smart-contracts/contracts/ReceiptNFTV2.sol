// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReceiptNFTV2 is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) Ownable(msg.sender) {}

    function mintReceipt(address to, string memory tokenURI) external returns (uint256) {
        _tokenIdCounter++;
        uint256 newId = _tokenIdCounter;
        _safeMint(to, newId);
        _setTokenURI(newId, tokenURI);
        return newId;
    }
}