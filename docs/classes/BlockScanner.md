[@defichainwizard/custom-transactions](../README.md) / [Exports](../modules.md) / BlockScanner

# Class: BlockScanner

## Table of contents

### Constructors

- [constructor](BlockScanner.md#constructor)

### Properties

- [address](BlockScanner.md#address)
- [client](BlockScanner.md#client)

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

blockchain/blockscanner.ts:24

## Properties

### address

• `Private` `Readonly` **address**: `string`

#### Defined in

blockchain/blockscanner.ts:17

___

### client

• `Private` `Readonly` **client**: `WhaleApiClient`

#### Defined in

blockchain/blockscanner.ts:16

## Methods

### findLastBlockchainConfiguration

▸ **findLastBlockchainConfiguration**(`numberOfTransactions?`): `Promise`<``null`` \| `DecryptedConfig`\>

Retrieves the last config for this bot. This could either be a [CustomMessage](../interfaces/CustomMessage.md) or a Version.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `numberOfTransactions` | `number` | `500` | The number of transactions to check back in one rush (paging) |

#### Returns

`Promise`<``null`` \| `DecryptedConfig`\>

The latest transaction found for this address

#### Defined in

blockchain/blockscanner.ts:35
