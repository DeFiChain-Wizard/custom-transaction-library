[@defichainwizard/custom-transactions](../README.md) / [Exports](../modules.md) / MessageUtils

# Class: MessageUtils

The message utils class that offers all methods to send a
to read the custom message from a transaction.

## Table of contents

### Constructors

- [constructor](MessageUtils.md#constructor)

### Methods

- [compressAndEncryptMessage](MessageUtils.md#compressandencryptmessage)
- [decryptAndDecompressMessage](MessageUtils.md#decryptanddecompressmessage)

## Constructors

### constructor

• **new MessageUtils**()

## Methods

### compressAndEncryptMessage

▸ `Static` **compressAndEncryptMessage**(`message`, `passphrase`): `string`

Takes the [CustomMessage](../interfaces/CustomMessage.md) and compresses and encrypts it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`CustomMessage`](../interfaces/CustomMessage.md) \| `Version` | The [CustomMessage](../interfaces/CustomMessage.md) to compress and encrypt |
| `passphrase` | `string`[] | - |

#### Returns

`string`

the compressed and encrypted message as string

#### Defined in

utils/messageutils.ts:17

___

### decryptAndDecompressMessage

▸ `Static` **decryptAndDecompressMessage**(`message`, `passphrase`): [`CustomMessage`](../interfaces/CustomMessage.md) \| `Version`

Takes the compressed and encrypted string from the transaction and returns the [CustomMessage](../interfaces/CustomMessage.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The compressed and encrypted string from the transaction |
| `passphrase` | `string`[] | - |

#### Returns

[`CustomMessage`](../interfaces/CustomMessage.md) \| `Version`

the uncompressed and decrypted [CustomMessage](../interfaces/CustomMessage.md)

#### Defined in

utils/messageutils.ts:33
