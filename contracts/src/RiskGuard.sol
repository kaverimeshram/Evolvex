// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { IRiskGuard } from "./interfaces/IRiskGuard.sol";

/**
 * @title RiskGuard
 * @notice Enforces immutable and administrative safety constraints on strategy execution.
 * Crucial trust boundary: AI decisions CANNOT bypass these hard limits.
 */
contract RiskGuard is IRiskGuard {
    address public immutable owner;

    // Hard ceiling constraints
    uint256 public constant ABSOLUTE_MAX_SLIPPAGE_BPS = 500; // 5.0% absolute maximum
    uint256 public maxAllocationCeilingUSD = 100_000;         // $100k cap per execution
    bool public circuitBreakerActive;

    mapping(address => bool) public allowedProtocols;

    event ProtocolWhitelisted(address indexed protocol, bool allowed);
    event CircuitBreakerToggled(bool active);
    event MaxAllocationUpdated(uint256 newCeilingUSD);

    error Unauthorized();
    error SlippageExceedsCeiling(uint256 requested, uint256 maxAllowed);
    error AllocationExceedsCeiling(uint256 requested, uint256 maxAllowed);
    error ProtocolNotAllowed(address protocol);
    error CircuitBreakerTriggered();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    constructor(address[] memory initialProtocols) {
        owner = msg.sender;
        for (uint256 i = 0; i < initialProtocols.length; i++) {
            if (initialProtocols[i] != address(0)) {
                allowedProtocols[initialProtocols[i]] = true;
                emit ProtocolWhitelisted(initialProtocols[i], true);
            }
        }
    }

    /**
     * @notice Validates parameters prior to any on-chain action.
     */
    function validateStrategyParameters(
        bytes32 /* strategyId */,
        address targetProtocol,
        uint256 allocationUSD,
        uint256 slippageBps
    ) external view override returns (bool isValid) {
        if (circuitBreakerActive) {
            revert CircuitBreakerTriggered();
        }
        if (!allowedProtocols[targetProtocol]) {
            revert ProtocolNotAllowed(targetProtocol);
        }
        if (slippageBps > ABSOLUTE_MAX_SLIPPAGE_BPS) {
            revert SlippageExceedsCeiling(slippageBps, ABSOLUTE_MAX_SLIPPAGE_BPS);
        }
        if (allocationUSD > maxAllocationCeilingUSD) {
            revert AllocationExceedsCeiling(allocationUSD, maxAllocationCeilingUSD);
        }

        return true;
    }

    function isProtocolAllowed(address protocol) external view override returns (bool) {
        return allowedProtocols[protocol];
    }

    function isCircuitBreakerActive() external view override returns (bool) {
        return circuitBreakerActive;
    }

    function setProtocolAllowed(address protocol, bool allowed) external onlyOwner {
        allowedProtocols[protocol] = allowed;
        emit ProtocolWhitelisted(protocol, allowed);
    }

    function setCircuitBreaker(bool active) external onlyOwner {
        circuitBreakerActive = active;
        emit CircuitBreakerToggled(active);
    }

    function setMaxAllocationCeiling(uint256 newCeilingUSD) external onlyOwner {
        maxAllocationCeilingUSD = newCeilingUSD;
        emit MaxAllocationUpdated(newCeilingUSD);
    }
}

