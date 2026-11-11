// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { StrategyExecutor } from "../src/StrategyExecutor.sol";
import { RiskGuard } from "../src/RiskGuard.sol";

// Minimal test contract compatible with Foundry
contract StrategyExecutorTest {
    StrategyExecutor public executor;
    RiskGuard public riskGuard;

    address public owner = address(this);
    address public callbackSender = address(0xCAFE);
    address public allowedProtocol = address(0xBEEF);
    address public unapprovedProtocol = address(0xDEAD);
    address public aiExecutor = address(0x9999);

    function setUp() public {
        address[] memory protocols = new address[](1);
        protocols[0] = allowedProtocol;

        riskGuard = new RiskGuard(protocols);
        executor = new StrategyExecutor(callbackSender, address(riskGuard));
        executor.setAuthorizedExecutor(aiExecutor, true);
    }

    function test_InitialConfiguration() public view {
        require(executor.reactiveCallbackSender() == callbackSender, "Sender mismatch");
        require(riskGuard.isProtocolAllowed(allowedProtocol), "Protocol should be allowed");
        require(!riskGuard.isProtocolAllowed(unapprovedProtocol), "Protocol should not be allowed");
    }

    function test_ExecutionFailsForUnapprovedProtocol() public {
        bytes32 strategyId = keccak256("strategy-v1");
        bool failed = false;

        try executor.executeApprovedStrategy(
            strategyId,
            unapprovedProtocol,
            "",
            50, // 0.5% slippage
            1000 // $1,000
        ) {
            failed = false;
        } catch {
            failed = true;
        }

        require(failed, "Execution with unapproved protocol must revert");
    }

    function test_ExecutionFailsWhenSlippageExceedsCeiling() public {
        bytes32 strategyId = keccak256("strategy-v1");
        bool failed = false;

        // Try with 600 bps (> 500 bps ceiling)
        try executor.executeApprovedStrategy(
            strategyId,
            allowedProtocol,
            "",
            600,
            1000
        ) {
            failed = false;
        } catch {
            failed = true;
        }

        require(failed, "Execution exceeding slippage ceiling must revert");
    }

    function test_ExecutionFailsWhenCircuitBreakerActive() public {
        riskGuard.setCircuitBreaker(true);
        bytes32 strategyId = keccak256("strategy-v1");
        bool failed = false;

        try executor.executeApprovedStrategy(
            strategyId,
            allowedProtocol,
            "",
            50,
            1000
        ) {
            failed = false;
        } catch {
            failed = true;
        }

        require(failed, "Execution during circuit breaker must revert");
    }

    function test_ExecutionSucceedsWithValidParameters() public {
        bytes32 strategyId = keccak256("strategy-v1");
        bool success = executor.executeApprovedStrategy(
            strategyId,
            allowedProtocol,
            "",
            50,
            5000
        );
        require(success, "Valid execution must succeed");
    }
}

