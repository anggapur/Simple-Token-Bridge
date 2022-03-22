// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GuildToken is ERC20 {
    constructor() ERC20("Guild Token", "GuTo") {
        uint256 initialToken = 1000000;
        _mint(msg.sender, initialToken * 10**decimals());
    }
}
