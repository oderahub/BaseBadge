// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

/// @title BaseBadge — Fully Onchain ERC1155 Badge Minter for Base
/// @notice This contract allows users to mint daily badges with fully onchain metadata and SVG
/// @dev All metadata and images are generated and stored onchain
contract BaseBadge is ERC1155, Ownable {
    using Strings for uint256;

    uint256 public constant DAILY_BADGE = 1;
    mapping(address => uint256) public lastMintDay;

    event BadgeMinted(address indexed user, uint256 day, bytes32 answerHash);

    constructor() ERC1155("") Ownable(msg.sender) {}

    /// @notice Mint a daily badge
    /// @param answer The user's answer/inspiration for the day
    /// @dev Users can only mint once per day
    function mintDailyBadge(string calldata answer) external {
        uint256 day = block.timestamp / 1 days;
        require(lastMintDay[msg.sender] < day, "Already minted today");
        lastMintDay[msg.sender] = day;

        bytes32 answerHash = keccak256(abi.encodePacked(answer, msg.sender, day));
        _mint(msg.sender, DAILY_BADGE, 1, "");
        emit BadgeMinted(msg.sender, day, answerHash);
    }

    /// @notice Generate onchain SVG for the badge
    /// @param tokenId The token ID
    /// @return SVG string
    function generateSVG(uint256 tokenId) internal pure returns (string memory) {
        return string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">',
                '<defs>',
                '<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">',
                '<stop offset="0%" style="stop-color:#0052FF;stop-opacity:1" />',
                '<stop offset="100%" style="stop-color:#0A2463;stop-opacity:1" />',
                '</linearGradient>',
                '</defs>',
                '<rect width="400" height="400" fill="url(#grad1)" rx="20"/>',
                '<circle cx="200" cy="150" r="60" fill="#FFD700" opacity="0.9"/>',
                '<text x="200" y="160" font-family="Arial, sans-serif" font-size="48" fill="#0052FF" text-anchor="middle">',
                unicode'🏅',
                '</text>',
                '<text x="200" y="240" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">',
                'BaseBadge',
                '</text>',
                '<text x="200" y="280" font-family="Arial, sans-serif" font-size="20" fill="#E0E0E0" text-anchor="middle">',
                'Daily Participation #',
                tokenId.toString(),
                '</text>',
                '<text x="200" y="320" font-family="Arial, sans-serif" font-size="16" fill="#B0B0B0" text-anchor="middle">',
                'Base Network',
                '</text>',
                '</svg>'
            )
        );
    }

    /// @notice Generate onchain metadata JSON
    /// @param tokenId The token ID
    /// @return Base64 encoded JSON metadata
    function uri(uint256 tokenId) public pure override returns (string memory) {
        string memory svg = generateSVG(tokenId);
        string memory svgBase64 = Base64.encode(bytes(svg));

        string memory json = string(
            abi.encodePacked(
                '{"name":"BaseBadge #',
                tokenId.toString(),
                '","description":"Daily participation badge on Base Network. Celebrate your on-chain journey!",',
                '"image":"data:image/svg+xml;base64,',
                svgBase64,
                '","attributes":[',
                '{"trait_type":"Badge Type","value":"Daily"},',
                '{"trait_type":"Network","value":"Base"},',
                '{"trait_type":"Token ID","value":"',
                tokenId.toString(),
                '"}',
                ']}'
            )
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(bytes(json))
            )
        );
    }
}
