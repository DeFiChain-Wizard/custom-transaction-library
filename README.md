# DeFiChain Wizard Custom Transaction Library

This library can be used to send and retrieve custom (RAW) transactions from the DeFiChain.

# Installation

```
npm i @defichainwizard/custom-transactions
```

# Basic Usage

You can import the objects to use like this:

```ts
import {
  Transaction,
  CustomMessage,
} from "@defichainwizard/custom-transactions";
```

## Send a custom transaction

```ts
// Create your message to be sent
const message: {
  version: "1.0",
  vaultId: "f13c7bdd78339b7e9a3149f97bde79cef72f1f8a47fb92a43a2b5fcd617dd003",
  pause: -1,
  //....
}

// The object properties are mandatory and enforced by typescript
const config: TransactionOptions = {
  client: this.client, // your whale api client
  account: this.account // your whale wallet account
  network: this.network, // the chosen network (e.g. mainnet)
};

// Create the transaction (it will automaticall compress and encrypt the message)
const transaction = new Transaction(config);

// Send the transaction
const txId = await transaction.send(message);
```

If you want to see the custom (RAW) transaction just use the following page and enter either the returned transaction ID or search for your wallet address:

https://chainz.cryptoid.info/dfi/
