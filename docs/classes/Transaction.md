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
- [sendTransaction](Transaction.md#sendtransaction)
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

[transactions/transaction.ts:59](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L59)

## Properties

### account

• `Private` `Readonly` **account**: `WhaleWalletAccount`

#### Defined in

[transactions/transaction.ts:50](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L50)

___

### client

• `Private` `Readonly` **client**: `WhaleApiClient`

#### Defined in

[transactions/transaction.ts:49](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L49)

___

### ctxBuilder

• `Private` `Readonly` **ctxBuilder**: `CustomTXBuilder`

#### Defined in

[transactions/transaction.ts:53](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L53)

___

### network

• `Private` `Readonly` **network**: `Network`

#### Defined in

[transactions/transaction.ts:51](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L51)

___

### passphrase

• `Private` `Readonly` **passphrase**: `string`[]

#### Defined in

[transactions/transaction.ts:52](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L52)

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

[transactions/transaction.ts:172](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L172)

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

[transactions/transaction.ts:185](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L185)

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

[transactions/transaction.ts:95](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L95)

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

[transactions/transaction.ts:79](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L79)

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

[transactions/transaction.ts:104](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L104)

___

### sendTransaction

▸ **sendTransaction**(`config`): `Promise`<`CTransactionSegWit`\>

Takes a transaction config and sends it directly.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `CustomTransactionConfig` | The custom transaction configuration containing the transaction to send |

#### Returns

`Promise`<`CTransactionSegWit`\>

#### Defined in

[transactions/transaction.ts:129](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L129)

___

### sendTransactionWithPrevout

▸ **sendTransactionWithPrevout**(`transactionToSend`, `prevout`): `Promise`<`CTransactionSegWit`\>

Sends a transaction together with others in the same block

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionToSend` | `TransactionSegWit` | The transaction to be sent |
| `prevout` | `undefined` \| `Prevout` \| `Prevout`[] | The list of prevouts |

#### Returns

`Promise`<`CTransactionSegWit`\>

The transaction id

#### Defined in

[transactions/transaction.ts:150](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L150)

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

[transactions/transaction.ts:200](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/1f253ca/src/transactions/transaction.ts#L200)
