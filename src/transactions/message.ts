interface CustomMessageCompounding {
  threshold: number;
  mode: 1 | 2 | 3;
  token: string; // should be valid dToken? Not sure if we should check it.
}
interface CustomMessageRules {
  keepMinRatio: number;
  keepMaxRatio: number;
}

interface CustomMessage {
  version: string;
  vaultId: string;
  pause: number;
  compounding: CustomMessageCompounding;
  poolpairs: { [key: string]: number }; // arbitrary number of dTokens as Keys with the ratio number as value
  rules: CustomMessageRules;
}

export { CustomMessage };
