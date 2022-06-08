import { Transaction, TransactionOptions } from "./transactions";
import { CustomMessage } from "./transactions/message";

const seed = ["test", "test"];
const message: CustomMessage = {
  version: "1.0",
  vaultId: "412sdfodfasalsdkfjsdkfhjasldfhlasjkdhflasjhdfa",
  pause: -1,
};

const txConfig: TransactionOptions = {
  client: new WhaleApiClient(),
  account: new WhaleWalletAccount(),
  network: undefined,
};

const transaction = new Transaction(txConfig);
transaction.send(message);
