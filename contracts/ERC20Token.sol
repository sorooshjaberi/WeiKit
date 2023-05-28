// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract ERC20Token is ERC20PresetMinterPauser {
    constructor(
        string memory name,
        string memory symbol,
        uint initialSupply
    ) ERC20PresetMinterPauser(name, symbol) {
        mint(_msgSender(), initialSupply);
    }
}
