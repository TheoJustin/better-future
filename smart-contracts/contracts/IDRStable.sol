// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.5.0
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract IDRToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    uint256 public constant EXCHANGE_RATE = 1000;
    
    constructor(address initialOwner)
        ERC20("IDRToken", "IDR")
        Ownable(initialOwner)
        ERC20Permit("IDRToken")
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }


    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }


    function deposit() external payable {
        require(msg.value > 0, "Must send ETH");
        uint256 idrAmount = msg.value * EXCHANGE_RATE;
        _mint(msg.sender, idrAmount);
    }
    
}
