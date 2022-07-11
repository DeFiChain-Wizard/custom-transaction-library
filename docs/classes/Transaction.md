[@defichainwizard/custom-transactions](../README.md) / [Exports](../modules.md) / Transaction

# Class: Transaction

The transaction class that offers all methods to send a
transaction or to read the custom message from a transaction.

## Implements

- `DFITransaction`

## Table of contents

### Constructors

- [constructor](Transaction.md#constructor)

### Methods

- [getCustomMessage](Transaction.md#getcustommessage)
- [send](Transaction.md#send)
- [sendVersion](Transaction.md#sendversion)

## Constructors

### constructor

• **new Transaction**(`config`)

The constructor takes the transaction configuration [TransactionConfig](../interfaces/TransactionConfig.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`TransactionConfig`](../interfaces/TransactionConfig.md) | The transaction configuration object |

#### Defined in

[transactions/transaction.ts:43](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6299c98/src/transactions/transaction.ts#L43)

## Methods

### getCustomMessage

▸ **getCustomMessage**(`message`): [`CustomMessage`](../interfaces/CustomMessage.md) \| `Version`

Takes the compressed and encrypted message from the transaction and returns the
decompressed and decrypted [CustomMessage](../interfaces/CustomMessage.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message as extracted from the transaction. |

#### Returns

[`CustomMessage`](../interfaces/CustomMessage.md) \| `Version`

The custom message.

#### Defined in

[transactions/transaction.ts:80](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6299c98/src/transactions/transaction.ts#L80)

___

### send

▸ **send**(`message`): `Promise`<`string`\>

Will compress, encyrpt and send the given custom message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`CustomMessage`](../interfaces/CustomMessage.md) | The [CustomMessage](../interfaces/CustomMessage.md) to send. |

#### Returns

`Promise`<`string`\>

the transaction id

#### Implementation of

DFITransaction.send

#### Defined in

[transactions/transaction.ts:67](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6299c98/src/transactions/transaction.ts#L67)

___

### sendVersion

▸ **sendVersion**(`version`): `Promise`<`string`\>

Will compress, encyrpt and send the given version message.

#### Parameters

| Name | Type |
| :------ | :------ |
| `version` | `Version` |

#### Returns

`Promise`<`string`\>

the transaction id

#### Defined in

[transactions/transaction.ts:55](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6299c98/src/transactions/transaction.ts#L55)
