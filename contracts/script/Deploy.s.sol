// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { ReactiveStrategyMonitor } from "../src/ReactiveStrategyMonitor.sol";
import { StrategyExecutor } from "../src/StrategyExecutor.sol";
import { RiskGuard } from "../src/RiskGuard.sol";

/**
 * @title DeployScript
 * @notice Foundry deployment script for EvolveX system components.
 * Note: Deployments are separated by network:
 * - StrategyExecutor & RiskGuard deploy to Destination Chain (e.g. Sepolia)
 * - ReactiveStrategyMonitor deploys to Reactive Network (Kopli Testnet)
 */
contract DeployScript {
    function deployDestination(
        address reactiveCallbackProxy,
        address[] memory initialAllowedProtocols
    ) external returns (address riskGuardAddr, address executorAddr) {
        RiskGuard riskGuard = new RiskGuard(initialAllowedProtocols);
        StrategyExecutor executor = new StrategyExecutor(reactiveCallbackProxy, address(riskGuard));
        return (address(riskGuard), address(executor));
    }

    function deployReactiveMonitor(
        address serviceAddress,
        uint256 destinationChainId,
        address destinationExecutor,
        uint256 monitoredOriginChainId,
        address monitoredContract,
        uint256 monitoredTopic0
    ) external returns (address monitorAddr) {
        ReactiveStrategyMonitor monitor = new ReactiveStrategyMonitor(
            serviceAddress,
            destinationChainId,
            destinationExecutor,
            monitoredOriginChainId,
            monitoredContract,
            monitoredTopic0
        );
        return address(monitor);
    }
}

