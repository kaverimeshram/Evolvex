// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/**
 * @title IReactive
 * @notice Official interface standard for Reactive Network smart contracts.
 * Contracts implementing this interface receive execution notifications
 * from the Reactive Network engine upon observed subscribed events.
 */
interface IReactive {
    event Callback(
        uint256 indexed chain_id,
        address indexed _contract,
        uint64 indexed gas_limit,
        bytes payload
    );

    /**
     * @notice Entrypoint invoked exclusively by the Reactive Network VM
     * when a matching event on a monitored chain is detected.
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
    ) external;
}

interface ISubscriptionService {
    function subscribe(
        uint256 chain_id,
        address _contract,
        uint256 topic_0,
        uint256 topic_1,
        uint256 topic_2,
        uint256 topic_3
    ) external;

    function unsubscribe(
        uint256 chain_id,
        address _contract,
        uint256 topic_0,
        uint256 topic_1,
        uint256 topic_2,
        uint256 topic_3
    ) external;
}

