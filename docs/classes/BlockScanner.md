[@defichainwizard/custom-transactions](../README.md) / [Exports](../modules.md) / BlockScanner

# Class: BlockScanner

Will scan for blocks e.g. to search for transactions.

## Table of contents

### Constructors

- [constructor](BlockScanner.md#constructor)

### Properties

- [address](BlockScanner.md#address)
- [client](BlockScanner.md#client)
- [lastConfigBlock](BlockScanner.md#lastconfigblock)

### Methods

- [findLastWizardConfiguration](BlockScanner.md#findlastwizardconfiguration)

## Constructors

### constructor

• **new BlockScanner**(`config`)

The constructor takes the transaction configuration [TransactionConfig](../interfaces/TransactionConfig.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`BlockScannerConfig`](../interfaces/BlockScannerConfig.md) | The transaction configuration object |

#### Defined in

[blockchain/blockscanner.ts:35](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/637caef/src/blockchain/blockscanner.ts#L35)

## Properties

### address

• `Private` `Readonly` **address**: `string`

#### Defined in

[blockchain/blockscanner.ts:27](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/637caef/src/blockchain/blockscanner.ts#L27)

___

### client

• `Private` `Readonly` **client**: `WhaleApiClient`

#### Defined in

[blockchain/blockscanner.ts:26](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/637caef/src/blockchain/blockscanner.ts#L26)

___

### lastConfigBlock

• `Private` `Readonly` **lastConfigBlock**: `number`

#### Defined in

[blockchain/blockscanner.ts:28](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/637caef/src/blockchain/blockscanner.ts#L28)

## Methods

### findLastWizardConfiguration

▸ **findLastWizardConfiguration**(`numberOfTransactions?`): `Promise`<`undefined` \| `TransactionMessage`\>

Retrieves the last config for this bot. This could either be a [CustomMessage](../interfaces/CustomMessage.md) or a Version.

It will return UNDEFINED if:

- no custom message was found at all
- no custom message was found since last config block

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `numberOfTransactions` | `number` | `200` | The number of transactions to check back in one rush (paging) |

#### Returns

`Promise`<`undefined` \| `TransactionMessage`\>

The latest transaction found for this address, with current block height, the message and the lastConfigBlock.

#### Defined in

[blockchain/blockscanner.ts:52](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/637caef/src/blockchain/blockscanner.ts#L52)
