@defichainwizard/custom-transactions / [Exports](modules.md)

# DeFiChain Wizard Core Library

This library can be used to access and retrieve certain data that should be available from within the UI.

# Installation

```
npm i @defichainwizard/core
```

# What can be done with this library

- Store and read the seed phrase (encrypted)
- Store and read the wallet address
- Store and read the vault address
- Store and read the Blockhain configuration
- Send a custom transaction to the DeFiChain Blockchain
- Read basic Blockchain-Data
- Read data from your wallet (e.g. tokens, ratio,...)

# Basic Usage

You can import the classes to use like this:

```ts
import { Wallet, Seed } from "@defichainwizard/core";
```

## Create the wallet and get some data

```ts
const wallet = new Wallet(myDFIAddress);

// returns the current UTXO balance
const balance = await wallet.getUTXOBalance();

// returns all active vaults
const vaults = await wallet.getVaults();

// returns a specific vault
const someVault = await wallet.getVault(myVaultId);

// get all tokens (incl. liquidity mining) from the wallet
const tokens = await wallet.listTokens();

// specify a certain vault to be used
await wallet.setCurrentVault(someVaultId);

// returns the current vault to be used
const vault = await wallet.getCurrentVault();
```

```ts
import { CustomTransactionBuilder } from "./transcations";
import { CustomMessage } from "./transcations/message";

const seed = ["test", "test"];
const message: CustomMessage = {
  version: "1.0",
  vaultId: "412sdfodfasalsdkfjsdkfhjasldfhlasjkdhflasjhdfa",
  pause: -1,
};

const customTXBuilder = new CustomTransactionBuilder({
  client, //WhaleAPIClient
  account, // WhaleAccount
  network, // Network
});

const transaction = customTXBuilder.build({
  message,
  seed,
});

transaction.send();
```
## Send a custom transaction

Now that we have the wallet and the seed in place, let's send a custom transaction.

```ts
// sends a custom transaction with a custom message
const transactionId = await wallet.sendTransaction(
  "My custom message",
  seedEncrypted,
  myPassword
);
```

If you want to see the custom (RAW) transaction just use the following page and enter either the returned transaction ID or search for your wallet address:

https://chainz.cryptoid.info/dfi/
