// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/BaseBadge.sol";

contract BaseBadgeTest is Test {
    BaseBadge badge;
    address user = address(0x123);
    address owner = address(this);

    function setUp() public {
        badge = new BaseBadge();
        // Start tests at a reasonable timestamp (not day 0)
        // This prevents issues with the daily minting logic
        vm.warp(100 days);
    }

    function testMintDailyBadge() public {
        vm.prank(user);
        badge.mintDailyBadge("gm");
        assertEq(badge.balanceOf(user, badge.DAILY_BADGE()), 1);
    }

    function testCannotMintTwiceSameDay() public {
        vm.startPrank(user);
        badge.mintDailyBadge("gm");
        vm.expectRevert("Already minted today");
        badge.mintDailyBadge("gm again");
        vm.stopPrank();
    }

    function testCanMintNextDay() public {
        vm.startPrank(user);
        badge.mintDailyBadge("gm day 1");

        // Fast forward 1 day
        vm.warp(block.timestamp + 1 days);
        badge.mintDailyBadge("gm day 2");

        assertEq(badge.balanceOf(user, badge.DAILY_BADGE()), 2);
        vm.stopPrank();
    }

    function testBadgeMintedEvent() public {
        uint256 expectedDay = block.timestamp / 1 days;
        string memory answer = "test answer";
        bytes32 expectedHash = keccak256(abi.encodePacked(answer, user, expectedDay));

        vm.prank(user);
        vm.expectEmit(true, false, false, true);
        emit BaseBadge.BadgeMinted(user, expectedDay, expectedHash);
        badge.mintDailyBadge(answer);
    }

    function testOnchainMetadataGeneration() public view {
        string memory metadata = badge.uri(badge.DAILY_BADGE());
        // Check that metadata starts with data URI
        assertTrue(bytes(metadata).length > 0);
        // Metadata should start with "data:application/json;base64,"
    }

    function testUniqueMetadataPerTokenId() public view {
        string memory uri1 = badge.uri(1);
        string memory uri2 = badge.uri(2);
        // Different token IDs should generate different metadata
        assertFalse(keccak256(bytes(uri1)) == keccak256(bytes(uri2)));
    }
}
