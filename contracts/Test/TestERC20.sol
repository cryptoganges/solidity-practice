pragma solidity 0.6.6;

import "../ERC20/ERC20.sol";

contract TestERC20 is ERC20 {
    constructor()
    ERC20("Test", "TST", 18)
    public {

    }
}