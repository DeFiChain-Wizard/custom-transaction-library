[@defichainwizard/custom-transactions](../README.md) / [Exports](../modules.md) / Transaction

# Class: Transaction

The transaction class that offers all methods to send a
transaction or to read the custom message from a transaction.

## Implements

- `DFITransaction`

## Table of contents

### Constructors

- [constructor](Transaction.md#constructor)

### Properties

- [account](Transaction.md#account)
- [client](Transaction.md#client)
- [network](Transaction.md#network)
- [passphrase](Transaction.md#passphrase)

### Methods

- [compressAndEncryptMessage](Transaction.md#compressandencryptmessage)
- [decryptAndDecompressMessage](Transaction.md#decryptanddecompressmessage)
- [getCustomMessage](Transaction.md#getcustommessage)
- [send](Transaction.md#send)
- [sendCustomMessage](Transaction.md#sendcustommessage)
- [prevOutFromTx](Transaction.md#prevoutfromtx)

## Constructors

### constructor

• **new Transaction**(`config`)

The constructor takes the transaction configuration [TransactionConfig](../interfaces/TransactionConfig.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`TransactionConfig`](../interfaces/TransactionConfig.md) | The transaction configuration object |

#### Defined in

[transactions/transaction.ts:52](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6e57200/src/transactions/transaction.ts#L52)

## Properties

### account

• `Private` `Readonly` **account**: `WhaleWalletAccount`

#### Defined in

[transactions/transaction.ts:44](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6e57200/src/transactions/transaction.ts#L44)

___

### client

• `Private` `Readonly` **client**: `WhaleApiClient`

#### Defined in

[transactions/transaction.ts:43](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6e57200/src/transactions/transaction.ts#L43)

___

### network

• `Private` `Readonly` **network**: `Network`

#### Defined in

[transactions/transaction.ts:45](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6e57200/src/transactions/transaction.ts#L45)

___

### passphrase

• `Private` `Readonly` **passphrase**: `string`[]

#### Defined in

[transactions/transaction.ts:46](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6e57200/src/transactions/transaction.ts#L46)

## Methods

### compressAndEncryptMessage

▸ `Private` **compressAndEncryptMessage**(`message`): `string`

Takes the [CustomMessage](../interfaces/CustomMessage.md) and compresses and encrypts it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`CustomMessage`](../interfaces/CustomMessage.md) \| `Version` | The [CustomMessage](../interfaces/CustomMessage.md) to compress and encrypt |

#### Returns

`string`

the compressed and encrypted message as string

#### Defined in

[transactions/transaction.ts:125](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6e57200/src/transactions/transaction.ts#L125)

___

### decryptAndDecompressMessage

▸ `Private` **decryptAndDecompressMessage**(`message`): [`CustomMessage`](../interfaces/CustomMessage.md) \| `Version`

Takes the compressed and encrypted string from the transaction and returns the [CustomMessage](../interfaces/CustomMessage.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The compressed and encrypted string from the transaction |

#### Returns

[`CustomMessage`](../interfaces/CustomMessage.md) \| `Version`

the uncompressed and decrypted [CustomMessage](../interfaces/CustomMessage.md)

#### Defined in

[transactions/transaction.ts:138](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6e57200/src/transactions/transaction.ts#L138)

___

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

[transactions/transaction.ts:80](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6e57200/src/transactions/transaction.ts#L80)

___

### send

▸ **send**(`message`): `Promise`<`string`\>

Will compress, encrypt and send the given custom message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`CustomMessage`](../interfaces/CustomMessage.md) \| `Version` | The [CustomMessage](../interfaces/CustomMessage.md) or Version to send. |

#### Returns

`Promise`<`string`\>

the transaction id

#### Implementation of

DFITransaction.send

#### Defined in

[transactions/transaction.ts:64](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6e57200/src/transactions/transaction.ts#L64)

___

### sendCustomMessage

▸ `Private` **sendCustomMessage**(`message`, `prefix?`): `Promise`<`string`\>

Takes the compressed and encrypted message as string and sends it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message as prepared string to send. |
| `prefix?` | `string` | - |

#### Returns

`Promise`<`string`\>

#### Defined in

[transactions/transaction.ts:89](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6e57200/src/transactions/transaction.ts#L89)

___

### prevOutFromTx

▸ `Static` **prevOutFromTx**(`tx`): `Prevout`

Creating a Prevout Object from a transactionObject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `CTransactionSegWit` | transaction to convert to prevout |

#### Returns

`Prevout`

prevout Object

#### Defined in

[transactions/transaction.ts:153](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/6e57200/src/transactions/transaction.ts#L153)
