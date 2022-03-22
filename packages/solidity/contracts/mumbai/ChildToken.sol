// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ChildToken is ERC20 {
    address public childChainManagerProxy;

    constructor() ERC20("Child Token", "GuTo") {
        childChainManagerProxy = 0xb5505a6d998549090530911180f38aC5130101c6;
    }

    function deposit(address user, bytes calldata depositData) external {
        require(
            msg.sender == childChainManagerProxy,
            "You're not allowed to deposit"
        );
        uint256 amount = abi.decode(depositData, (uint256));
        _mint(user, amount);
    }

    function withdraw(uint256 amount) external {
        _burn(_msgSender(), amount);
    }
}
