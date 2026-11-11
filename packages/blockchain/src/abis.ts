export const ReactiveStrategyMonitorABI = [
  {
    type: 'constructor',
    inputs: [
      { name: '_service', type: 'address' },
      { name: '_destinationChainId', type: 'uint256' },
      { name: '_destinationExecutor', type: 'address' },
      { name: '_monitoredContract', type: 'address' },
      { name: '_monitoredTopic0', type: 'uint256' },
    ],
  },
  {
    name: 'react',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'chain_id', type: 'uint256' },
      { name: '_contract', type: 'address' },
      { name: 'topic_0', type: 'uint256' },
      { name: 'topic_1', type: 'uint256' },
      { name: 'topic_2', type: 'uint256' },
      { name: 'topic_3', type: 'uint256' },
      { name: 'data', type: 'bytes' },
      { name: 'block_number', type: 'uint256' },
      { name: 'op_code', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    name: 'pause',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'resume',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'CallbackDispatched',
    type: 'event',
    inputs: [
      { name: 'chainId', type: 'uint256', indexed: true },
      { name: 'target', type: 'address', indexed: true },
      { name: 'payload', type: 'bytes', indexed: false },
    ],
  },
] as const;

export const StrategyExecutorABI = [
  {
    type: 'constructor',
    inputs: [
      { name: '_callbackSender', type: 'address' },
      { name: '_riskGuard', type: 'address' },
    ],
  },
  {
    name: 'handleReactiveCallback',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'eventPayload', type: 'bytes' },
    ],
    outputs: [],
  },
  {
    name: 'executeApprovedStrategy',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'strategyId', type: 'bytes32' },
      { name: 'targetProtocol', type: 'address' },
      { name: 'actionData', type: 'bytes' },
      { name: 'maxSlippageBps', type: 'uint256' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
  },
  {
    name: 'StrategyEvaluationRequested',
    type: 'event',
    inputs: [
      { name: 'eventId', type: 'bytes32', indexed: true },
      { name: 'originSender', type: 'address', indexed: true },
      { name: 'rawPayload', type: 'bytes', indexed: false },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
  {
    name: 'StrategyExecuted',
    type: 'event',
    inputs: [
      { name: 'strategyId', type: 'bytes32', indexed: true },
      { name: 'targetProtocol', type: 'address', indexed: true },
      { name: 'executor', type: 'address', indexed: false },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
] as const;

export const RiskGuardABI = [
  {
    name: 'validateStrategyParameters',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'strategyId', type: 'bytes32' },
      { name: 'targetProtocol', type: 'address' },
      { name: 'allocationUSD', type: 'uint256' },
      { name: 'slippageBps', type: 'uint256' },
    ],
    outputs: [{ name: 'isValid', type: 'bool' }],
  },
  {
    name: 'isProtocolAllowed',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'protocol', type: 'address' }],
    outputs: [{ name: 'isAllowed', type: 'bool' }],
  },
  {
    name: 'isCircuitBreakerActive',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'active', type: 'bool' }],
  },
] as const;

