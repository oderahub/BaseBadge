// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/BaseBadge.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy BaseBadge with fully onchain metadata
        BaseBadge badge = new BaseBadge();

        console.log("BaseBadge deployed to:", address(badge));
        console.log("All metadata and SVG images are stored onchain!");

        vm.stopBroadcast();
    }
}
