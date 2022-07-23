[@defichainwizard/custom-transactions](README.md) / Exports

# @defichainwizard/custom-transactions

## Table of contents

### Classes

- [BlockScanner](classes/BlockScanner.md)
- [Transaction](classes/Transaction.md)

### Interfaces

- [BlockScannerConfig](interfaces/BlockScannerConfig.md)
- [CustomMessage](interfaces/CustomMessage.md)
- [TransactionConfig](interfaces/TransactionConfig.md)

### Functions

- [isCustomMessage](modules.md#iscustommessage)
- [isVersionMessage](modules.md#isversionmessage)

## Functions

### isCustomMessage

▸ **isCustomMessage**(`message`): message is CustomMessage

This internal type guard checks if the decompressed message is of type [CustomMessage](interfaces/CustomMessage.md).

For interoperability it only checks for three members.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `object` | The message to check if it's a custom message |

#### Returns

message is CustomMessage

true if it's a Custom Message

#### Defined in

[utils/helpers.ts:59](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/775b9a2/src/utils/helpers.ts#L59)

___

### isVersionMessage

▸ **isVersionMessage**(`message`): message is Version

This internal type guard checks if the decompressed message is of type Version.

For interoperability it's only check for three members.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `object` | The message to check if it's a custom message |

#### Returns

message is Version

true if it's a Version

#### Defined in

[utils/helpers.ts:78](https://github.com/DeFiChain-Wizard/custom-transcation-library/blob/775b9a2/src/utils/helpers.ts#L78)
