// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { IReactive, ISubscriptionService } from "./interfaces/IReactive.sol";

/**
 * @title ReactiveStrategyMonitor
 * @notice Reactive Network contract monitoring on-chain events and dispatching
 * asynchronous callbacks to the destination chain execution contract.
 *
 * Architecture step 1 & 2:
 * 1. Reactive Network engine detects subscribed events.
 * 2. This contract processes the event in `react(...)` and emits a Callback
 *    destined for the destination chain's StrategyExecutor contract.
 */
contract ReactiveStrategyMonitor is IReactive {
    address public immutable owner;
    address public immutable service;

    uint256 public destinationChainId;
    address public destinationExecutor;

    uint256 public monitoredOriginChainId;
    address public monitoredContract;
    uint256 public monitoredTopic0;

    bool public paused;

    event CallbackDispatched(
        uint256 indexed chainId,
        address indexed target,
        bytes payload
    );
    event ConfigUpdated(address indexed executor, uint256 chainId);
    event PauseToggled(bool isPaused);

    error Unauthorized();
    error ContractPaused();
    error InvalidParameters();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    modifier onlyService() {
        if (msg.sender != service) revert Unauthorized();
        _;
    }

    modifier whenNotPaused() {
        if (paused) revert ContractPaused();
        _;
    }

    constructor(
        address _service,
        uint256 _destinationChainId,
        address _destinationExecutor,
        uint256 _monitoredOriginChainId,
        address _monitoredContract,
        uint256 _monitoredTopic0
    ) {
        if (_service == address(0) || _destinationExecutor == address(0)) {
            revert InvalidParameters();
        }
        owner = msg.sender;
        service = _service;
        destinationChainId = _destinationChainId;
        destinationExecutor = _destinationExecutor;
        monitoredOriginChainId = _monitoredOriginChainId;
        monitoredContract = _monitoredContract;
        monitoredTopic0 = _monitoredTopic0;

        // Note: In deployed Reactive Network environments, subscription is registered
        // with the system subscription service:
        // ISubscriptionService(service).subscribe(monitoredOriginChainId, monitoredContract, monitoredTopic0, 0, 0, 0);
    }

    /**
     * @notice Reactive Network callback entrypoint. Invoked by system service.
     */
    function react(
        uint256 chain_id,
        address _contract,
        uint256 topic_0,
        uint256 topic_1,
        uint256 topic_2,
        uint256 topic_3,
        bytes calldata data,
        uint256 block_number,
        uint256 op_code
    ) external override onlyService whenNotPaused {
        // Build payload for destination callback
        bytes memory payload = abi.encodeWithSignature(
            "handleReactiveCallback(address,bytes)",
            address(this),
            abi.encode(chain_id, _contract, topic_0, block_number, data)
        );

        // Emit Reactive Network Callback event for cross-chain relay
        emit Callback(destinationChainId, destinationExecutor, 500000, payload);
        emit CallbackDispatched(destinationChainId, destinationExecutor, payload);
    }

    function setDestination(
        uint256 _destinationChainId,
        address _destinationExecutor
    ) external onlyOwner {
        if (_destinationExecutor == address(0)) revert InvalidParameters();
        destinationChainId = _destinationChainId;
        destinationExecutor = _destinationExecutor;
        emit ConfigUpdated(_destinationExecutor, _destinationChainId);
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
        emit PauseToggled(_paused);
    }
}

