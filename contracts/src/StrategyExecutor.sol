// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { IStrategyExecutor } from "./interfaces/IStrategyExecutor.sol";
import { IRiskGuard } from "./interfaces/IRiskGuard.sol";

/**
 * @title StrategyExecutor
 * @notice Destination chain contract. Receives Reactive callbacks, emits events
 * for the AI worker, validates parameters against RiskGuard, and executes approved actions.
 *
 * Architecture step 3, 4, 5, 6:
 * 3. Contract receives callback and emits StrategyEvaluationRequested.
 * 4. Off-chain AI worker detects event and formulates strategy recommendation.
 * 5. Destination contract validates permissions and risk constraints via RiskGuard.
 * 6. Authorized transaction executes the approved strategy.
 */
contract StrategyExecutor is IStrategyExecutor {
    address public immutable owner;
    address public reactiveCallbackSender;
    IRiskGuard public riskGuard;

    mapping(address => bool) public authorizedExecutors;
    bool public paused;

    error Unauthorized();
    error ContractPaused();
    error InvalidConfiguration();
    error ExecutionFailed();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier onlyCallbackSender() {
        if (msg.sender != reactiveCallbackSender) revert Unauthorized();
        _;
    }

    modifier onlyAuthorizedExecutor() {
        if (!authorizedExecutors[msg.sender] && msg.sender != owner) {
            revert Unauthorized();
        }
        _;
    }

    modifier whenNotPaused() {
        if (paused) revert ContractPaused();
        _;
    }

    constructor(address _reactiveCallbackSender, address _riskGuard) {
        if (_riskGuard == address(0)) revert InvalidConfiguration();
        owner = msg.sender;
        reactiveCallbackSender = _reactiveCallbackSender;
        riskGuard = IRiskGuard(_riskGuard);
        authorizedExecutors[msg.sender] = true;
    }

    /**
     * @notice Handles cross-chain callback from Reactive Network.
     * Emits event for the off-chain AI worker to begin strategy evaluation.
     */
    function handleReactiveCallback(
        address sender,
        bytes calldata eventPayload
    ) external override onlyCallbackSender whenNotPaused {
        bytes32 eventId = keccak256(abi.encodePacked(block.timestamp, sender, eventPayload));
        emit StrategyEvaluationRequested(eventId, sender, eventPayload, block.timestamp);
    }

    /**
     * @notice Executes an AI-recommended strategy after strict RiskGuard validation.
     * Crucial trust boundary: msg.sender must be an authorized executor, and
     * parameters must satisfy RiskGuard constraints.
     */
    function executeApprovedStrategy(
        bytes32 strategyId,
        address targetProtocol,
        bytes calldata actionData,
        uint256 maxSlippageBps,
        uint256 allocationUSD
    ) external override onlyAuthorizedExecutor whenNotPaused returns (bool success) {
        // Step 5: Validate permissions and risk constraints
        riskGuard.validateStrategyParameters(
            strategyId,
            targetProtocol,
            allocationUSD,
            maxSlippageBps
        );

        // Step 6: Execute approved action on target protocol
        if (actionData.length > 0) {
            (bool callSuccess, ) = targetProtocol.call(actionData);
            if (!callSuccess) revert ExecutionFailed();
        }

        emit StrategyExecuted(strategyId, targetProtocol, msg.sender, block.timestamp);
        return true;
    }

    function setReactiveCallbackSender(address _sender) external onlyOwner {
        reactiveCallbackSender = _sender;
    }

    function setRiskGuard(address _riskGuard) external onlyOwner {
        if (_riskGuard == address(0)) revert InvalidConfiguration();
        riskGuard = IRiskGuard(_riskGuard);
    }

    function setAuthorizedExecutor(address executor, bool authorized) external onlyOwner {
        authorizedExecutors[executor] = authorized;
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }
}

