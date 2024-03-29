[@defichainwizard/custom-transactions](../README.md) / [Exports](../modules.md) / BlockScanner

# Class: BlockScanner

Will scan for blocks e.g. to search for transactions.

## Table of contents

### Constructors

- [constructor](BlockScanner.md#constructor)

### Properties

- [address](BlockScanner.md#address)
- [client](BlockScanner.md#client)

### Methods

- [delay](BlockScanner.md#delay)
- [findLastWizardConfiguration](BlockScanner.md#findlastwizardconfiguration)
- [getBlockHeight](BlockScanner.md#getblockheight)
- [getCurrentBlock](BlockScanner.md#getcurrentblock)
- [waitForNextBlock](BlockScanner.md#waitfornextblock)

## Constructors

### constructor

• **new BlockScanner**(`config`)

The constructor takes the transaction configuration [TransactionConfig](../interfaces/TransactionConfig.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`BlockScannerConfig`](../interfaces/BlockScannerConfig.md) | The transaction configuration object |

#### Defined in

[blockchain/blockscanner.ts:41](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/d5b063f/src/blockchain/blockscanner.ts#L41)

## Properties

### address

• `Private` `Readonly` **address**: `string`

#### Defined in

[blockchain/blockscanner.ts:34](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/d5b063f/src/blockchain/blockscanner.ts#L34)

___

### client

• `Private` `Readonly` **client**: `WhaleApiClient`

#### Defined in

[blockchain/blockscanner.ts:33](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/d5b063f/src/blockchain/blockscanner.ts#L33)

## Methods

### delay

▸ **delay**(`time`): `Promise`<`unknown`\>

Wait for a certain amount of time.

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[blockchain/blockscanner.ts:63](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/d5b063f/src/blockchain/blockscanner.ts#L63)

___

### findLastWizardConfiguration

▸ **findLastWizardConfiguration**(`lastConfigBlock?`, `numberOfTransactions?`): `Promise`<`undefined` \| `TransactionMessage`\>

Retrieves the last config for this bot. This could either be a [CustomMessage](../interfaces/CustomMessage.md) or a Version.

It will return UNDEFINED if:

- no custom message was found at all
- no custom message was found since last config block

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `lastConfigBlock` | `number` | `2010000` | - |
| `numberOfTransactions` | `number` | `200` | The number of transactions to check back in one rush (paging) |

#### Returns

`Promise`<`undefined` \| `TransactionMessage`\>

The latest transaction found for this address, with current block height, the message and the lastConfigBlock.

#### Defined in

[blockchain/blockscanner.ts:111](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/d5b063f/src/blockchain/blockscanner.ts#L111)

___

### getBlockHeight

▸ **getBlockHeight**(): `Promise`<`number`\>

Returns the current block height.

#### Returns

`Promise`<`number`\>

the current block height.

#### Defined in

[blockchain/blockscanner.ts:58](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/d5b063f/src/blockchain/blockscanner.ts#L58)

___

### getCurrentBlock

▸ **getCurrentBlock**(): `Promise`<`Block`\>

Returns the current block.

#### Returns

`Promise`<`Block`\>

the current block.

#### Defined in

[blockchain/blockscanner.ts:50](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/d5b063f/src/blockchain/blockscanner.ts#L50)

___

### waitForNextBlock

▸ **waitForNextBlock**(`searchBlock`): `Promise`<`void`\>

Waits until a certain block was found...

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchBlock` | `number` | The Block to wait for |

#### Returns

`Promise`<`void`\>

#### Defined in

[blockchain/blockscanner.ts:72](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/d5b063f/src/blockchain/blockscanner.ts#L72)
