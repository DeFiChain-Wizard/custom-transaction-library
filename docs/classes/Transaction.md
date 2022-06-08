[@defichainwizard/custom-transactions](../README.md) / [Exports](../modules.md) / Transaction

# Class: Transaction

## Implements

- `DFITransaction`

## Table of contents

### Constructors

- [constructor](Transaction.md#constructor)

### Methods

- [send](Transaction.md#send)

## Constructors

### constructor

• **new Transaction**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`TransactionOptions`](../interfaces/TransactionOptions.md) |

#### Defined in

[transactions/transaction.ts:25](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/27d5cb0/src/transactions/transaction.ts#L25)

## Methods

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

[transactions/transaction.ts:31](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/27d5cb0/src/transactions/transaction.ts#L31)
