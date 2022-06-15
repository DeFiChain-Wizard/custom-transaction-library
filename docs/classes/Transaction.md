[@defichainwizard/custom-transactions](../README.md) / [Exports](../modules.md) / Transaction

# Class: Transaction

## Implements

- `DFITransaction`

## Table of contents

### Constructors

- [constructor](Transaction.md#constructor)

### Methods

- [getCustomMessage](Transaction.md#getcustommessage)
- [send](Transaction.md#send)
- [sendTest](Transaction.md#sendtest)

## Constructors

### constructor

• **new Transaction**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`TransactionOptions`](../interfaces/TransactionOptions.md) |

#### Defined in

[transactions/transaction.ts:29](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/e9f166c/src/transactions/transaction.ts#L29)

## Methods

### getCustomMessage

▸ **getCustomMessage**(`message`): `Promise`<[`CustomMessage`](../interfaces/CustomMessage.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`Promise`<[`CustomMessage`](../interfaces/CustomMessage.md)\>

#### Defined in

[transactions/transaction.ts:46](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/e9f166c/src/transactions/transaction.ts#L46)

___

### send

▸ **send**(`message`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`CustomMessage`](../interfaces/CustomMessage.md) |

#### Returns

`Promise`<`string`\>

#### Implementation of

DFITransaction.send

#### Defined in

[transactions/transaction.ts:40](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/e9f166c/src/transactions/transaction.ts#L40)

___

### sendTest

▸ **sendTest**(`message`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`CustomMessage`](../interfaces/CustomMessage.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[transactions/transaction.ts:36](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/e9f166c/src/transactions/transaction.ts#L36)
