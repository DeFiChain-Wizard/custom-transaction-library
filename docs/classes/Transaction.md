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
- [ctxBuilder](Transaction.md#ctxbuilder)
- [network](Transaction.md#network)
- [passphrase](Transaction.md#passphrase)

### Methods

- [compressAndEncryptMessage](Transaction.md#compressandencryptmessage)
- [decryptAndDecompressMessage](Transaction.md#decryptanddecompressmessage)
- [getCustomMessage](Transaction.md#getcustommessage)
- [send](Transaction.md#send)
- [sendCustomMessage](Transaction.md#sendcustommessage)
- [sendTransactionWithPrevout](Transaction.md#sendtransactionwithprevout)
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

[transactions/transaction.ts:56](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L56)

## Properties

### account

• `Private` `Readonly` **account**: `WhaleWalletAccount`

#### Defined in

[transactions/transaction.ts:47](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L47)

___

### client

• `Private` `Readonly` **client**: `WhaleApiClient`

#### Defined in

[transactions/transaction.ts:46](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L46)

___

### ctxBuilder

• `Private` `Readonly` **ctxBuilder**: `CustomTXBuilder`

#### Defined in

[transactions/transaction.ts:50](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L50)

___

### network

• `Private` `Readonly` **network**: `Network`

#### Defined in

[transactions/transaction.ts:48](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L48)

___

### passphrase

• `Private` `Readonly` **passphrase**: `string`[]

#### Defined in

[transactions/transaction.ts:49](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L49)

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

[transactions/transaction.ts:150](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L150)

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

[transactions/transaction.ts:163](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L163)

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

[transactions/transaction.ts:92](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L92)

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

[transactions/transaction.ts:76](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L76)

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

[transactions/transaction.ts:101](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L101)

___

### sendTransactionWithPrevout

▸ **sendTransactionWithPrevout**(`transactionToSend`, `prevout`): `Promise`<`string`\>

Sends a transaction together with others in the same block

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionToSend` | `TransactionSegWit` | The transaction to be sent |
| `prevout` | `undefined` \| `Prevout` \| `Prevout`[] | The list of prevouts |

#### Returns

`Promise`<`string`\>

The transaction id

#### Defined in

[transactions/transaction.ts:128](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L128)

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

[transactions/transaction.ts:178](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/4aaa3bc/src/transactions/transaction.ts#L178)
