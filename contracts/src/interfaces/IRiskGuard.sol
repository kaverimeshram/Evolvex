// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/**
 * @title IRiskGuard
 * @notice Strategy validation contract enforcing risk boundaries and safety limits.
 */
interface IRiskGuard {
    function validateStrategyParameters(
        bytes32 strategyId,
        address targetProtocol,
        uint256 allocationUSD,
        uint256 slippageBps
    ) external view returns (bool isValid);

    function isProtocolAllowed(address protocol) external view returns (bool isAllowed);

    function isCircuitBreakerActive() external view returns (bool active);
}

