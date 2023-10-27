// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**@author Wajid*/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

error FloraPixel__MintNotEnabled();
error FloraPixel__NotEnoughMoneySent();
error FloraPixel__WeSoldOut();
error FloraPixel__WrongId();
error FloraPixel__WithdrawFailed();
error FloraPixel__HasNoBalance();

contract FloraPixel is ERC721, Ownable, ReentrancyGuard {
    using Strings for uint256;
    //* State Variables
    uint256 private constant MINT_PRICE = 0.01 ether;
    uint256 private s_totalSupply = 0;
    uint256 private constant MAX_SUPPLY = 10;
    uint256 private s_mintState = 1;
    string private constant BASE_TOKEN_URI =
        "ipfs://bafybeidlnjv7bbart3azzizjh76ywpvtns67nz3c2pdu5xvytdrtwbeopu/";

    //*Functions
    constructor() ERC721("FloraPixel", "FP") {
        for (uint256 i = 0; i < 2; i++) {
            uint256 tokenId = s_totalSupply + 1;
            s_totalSupply++;
            _safeMint(msg.sender, tokenId);
        }
    }

    /**@dev This function changes the state of nft*/
    function changeMintState() external onlyOwner {
        if (s_mintState != 1) s_mintState = 1;
        else s_mintState = 2;
    }

    /**@dev This is a public mint function that checks public requirements*/
    function Mint(uint256 quantity) public payable {
        if (s_mintState == 1) revert FloraPixel__MintNotEnabled();
        if (msg.value != MINT_PRICE * quantity)
            revert FloraPixel__NotEnoughMoneySent();

        internalMint(quantity);
    }

    /**@dev This is a mint function and module that mint functions uses*/
    function internalMint(uint256 quantity) internal {
        if (s_totalSupply + quantity > MAX_SUPPLY)
            revert FloraPixel__WeSoldOut();

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = s_totalSupply + 1;
            s_totalSupply++;
            _safeMint(msg.sender, tokenId);
        }
    }

    /**@dev This is a tokenURI generator function*/
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = BASE_TOKEN_URI;

        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : "";
    }

    /**@dev This is a withdraw function*/
    function withdraw() external onlyOwner nonReentrant {
        if (address(this).balance == 0) {
            revert FloraPixel__HasNoBalance();
        }

        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        if (!success) {
            revert FloraPixel__WithdrawFailed();
        }
    }

    function Airdrop(
        address[] calldata _to,
        uint256[] calldata _value
    ) external onlyOwner {
        if (_to.length != _value.length)
            revert FloraPixel__DifferentLengthOfReceiversAndQuantity();

        for (uint256 i = 0; i <= _to.length; i++) {
            safeTransferFrom(msg.sender, _to[i], _value[i]);
        }
    }

    //*Getter Functions
    function getMintState() public view returns (bool) {
        if (s_mintState != 1) return true;
        else return false;
    }

    function getBaseTokenURI() public pure returns (string memory) {
        return BASE_TOKEN_URI;
    }

    function getTotalSupply() public view returns (uint256) {
        return s_totalSupply;
    }

    function getMaxSupply() public pure returns (uint256) {
        return MAX_SUPPLY;
    }

    function getMintPrice() public view returns (uint256) {
        return MINT_PRICE;
    }
}
