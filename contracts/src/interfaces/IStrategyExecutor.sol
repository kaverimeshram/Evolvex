// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/**
 * @title IStrategyExecutor
 * @notice Destination contract interface executing vetted strategies.
 */
interface IStrategyExecutor {
    event StrategyEvaluationRequested(
        bytes32 indexed eventId,
        address indexed originSender,
        bytes rawPayload,
        uint256 timestamp
    );

    event StrategyExecuted(
        bytes32 indexed strategyId,
        address indexed targetProtocol,
        address indexed executor,
        uint256 timestamp
    );

    function handleReactiveCallback(
        address sender,
        bytes calldata eventPayload
    ) external;

    function executeApprovedStrategy(
        bytes32 strategyId,
        address targetProtocol,
        bytes calldata actionData,
        uint256 maxSlippageBps,
        uint256 allocationUSD
    ) external returns (bool success);
}

