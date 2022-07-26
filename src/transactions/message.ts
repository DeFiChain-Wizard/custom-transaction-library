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
  [key: string]: string | number | object;
  version: string;
  vaultId: string;
  pause: number; // -1 = off | 0 = on | n = wait for n minutes
  compounding: CustomMessageCompounding;
  poolpairs: { [key: string]: number }; // arbitrary number of dTokens as Keys with the ratio number as value
  rules: CustomMessageRules;
}

export { CustomMessage };
