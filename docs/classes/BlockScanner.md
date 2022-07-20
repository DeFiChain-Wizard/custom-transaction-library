[@defichainwizard/custom-transactions](../README.md) / [Exports](../modules.md) / BlockScanner

# Class: BlockScanner

## Table of contents

### Constructors

- [constructor](BlockScanner.md#constructor)

### Properties

- [address](BlockScanner.md#address)
- [client](BlockScanner.md#client)
- [lastConfigBlock](BlockScanner.md#lastconfigblock)

### Methods

- [findLastBlockchainConfiguration](BlockScanner.md#findlastblockchainconfiguration)

## Constructors

### constructor

• **new BlockScanner**(`config`)

The constructor takes the transaction configuration [TransactionConfig](../interfaces/TransactionConfig.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`BlockScannerConfig`](../interfaces/BlockScannerConfig.md) | The transaction configuration object |

#### Defined in

[blockchain/blockscanner.ts:34](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/101fe8f/src/blockchain/blockscanner.ts#L34)

## Properties

### address

• `Private` `Readonly` **address**: `string`

#### Defined in

[blockchain/blockscanner.ts:26](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/101fe8f/src/blockchain/blockscanner.ts#L26)

___

### client

• `Private` `Readonly` **client**: `WhaleApiClient`

#### Defined in

[blockchain/blockscanner.ts:25](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/101fe8f/src/blockchain/blockscanner.ts#L25)

___

### lastConfigBlock

• `Private` `Readonly` **lastConfigBlock**: `number`

#### Defined in

[blockchain/blockscanner.ts:27](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/101fe8f/src/blockchain/blockscanner.ts#L27)

## Methods

### findLastBlockchainConfiguration

▸ **findLastBlockchainConfiguration**(`numberOfTransactions?`): `Promise`<`undefined` \| `TransactionMessage`\>

Retrieves the last config for this bot. This could either be a [CustomMessage](../interfaces/CustomMessage.md) or a Version.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `numberOfTransactions` | `number` | `200` | The number of transactions to check back in one rush (paging) |

#### Returns

`Promise`<`undefined` \| `TransactionMessage`\>

The latest transaction found for this address

#### Defined in

[blockchain/blockscanner.ts:46](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/101fe8f/src/blockchain/blockscanner.ts#L46)
