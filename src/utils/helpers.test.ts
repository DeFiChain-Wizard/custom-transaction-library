import {
  isCustomMessage,
  isVersionMessage,
  removeTXPrefix,
  WIZARD_TRANSACTION_CONFIG_PREFIX,
  WIZARD_TRANSACTION_VERSION_PREFIX,
} from "./helpers";

describe("Testing TS type guards", () => {
  test("test if version message can be recognized", () => {
    const versionMessage = {
      version: "1.0",
    };

    const wrongVersionMessage = {
      doesNotExist: "1.0",
    };

    const wrongVersionMessage2 = {};

    const customMessage = {
      version: "1.0",
      vaultId: "dsafasdfasdfasdfasd",
      pause: 0,
      compounding: {
        threshold: 1,
        mode: 1,
        token: "DFI",
      },
      poolpairs: {},
      rules: { keepMaxRatio: 150, keepMinRatio: 160 },
      telegram: { receiver: "rest", key: "1" },
    };
    expect(isCustomMessage(versionMessage)).toBeFalsy();
    expect(isVersionMessage(versionMessage)).toBeTruthy();
    expect(isVersionMessage(wrongVersionMessage)).toBeFalsy();
    expect(isVersionMessage(wrongVersionMessage2)).toBeFalsy();
    expect(isVersionMessage(customMessage)).toBeFalsy();
  });

  test("test if custom message can be recognized", () => {
    const customMessage = {
      version: "1.0",
      vaultId: "dsafasdfasdfasdfasd",
      pause: 0,
      compounding: {
        threshold: 1,
        mode: 1,
        token: "DFI",
      },
      poolpairs: {},
      rules: { keepMaxRatio: 150, keepMinRatio: 160 },
      telegram: { receiver: "rest", key: "1" },
    };

    const wrongCustomMessage = {
      version: "1.0",
      pause: 0,
      compounding: {
        threshold: 1,
        mode: 1,
        token: "DFI",
      },
      poolpairs: {},
      rules: { keepMaxRatio: 150, keepMinRatio: 160 },
      telegram: { receiver: "rest", key: "1" },
    };

    const wrongCustomMessage2 = {
      version: "1.0",
      vaultId: "dsafasdfasdfasdfasd",
      pause: 0,
      compounding: {
        threshold: 1,
        mode: 1,
        token: "DFI",
      },
      rules: { keepMaxRatio: 150, keepMinRatio: 160 },
      telegram: { receiver: "rest", key: "1" },
    };

    const wrongCustomMessage3 = {};

    const versionMessage = {
      version: "1.0",
    };

    expect(isCustomMessage(customMessage)).toBeTruthy();
    expect(isVersionMessage(customMessage)).toBeFalsy();
    expect(isCustomMessage(wrongCustomMessage)).toBeFalsy();
    expect(isCustomMessage(wrongCustomMessage2)).toBeFalsy();
    expect(isCustomMessage(wrongCustomMessage3)).toBeFalsy();
    expect(isCustomMessage(versionMessage)).toBeFalsy();
  });
});

describe("Testing transaction identifier removal", () => {
  test("remove WzTx", () => {
    const testString = "ThisIsJustATest";
    let testStringWithTxId = `${WIZARD_TRANSACTION_CONFIG_PREFIX}${testString}`;
    expect(removeTXPrefix(testStringWithTxId)).toBe(testString);
    testStringWithTxId = `${testString}${WIZARD_TRANSACTION_CONFIG_PREFIX}`;
    expect(removeTXPrefix(testStringWithTxId)).not.toBe(testString);
    expect(removeTXPrefix(testStringWithTxId)).toBe(testStringWithTxId);
  });

  test("remove WzVx", () => {
    const testString = "ThisIsJustATest";
    let testStringWithTxId = `${WIZARD_TRANSACTION_VERSION_PREFIX}${testString}`;
    expect(removeTXPrefix(testStringWithTxId)).toBe(testString);
    testStringWithTxId = `${testString}${WIZARD_TRANSACTION_VERSION_PREFIX}`;
    expect(removeTXPrefix(testStringWithTxId)).not.toBe(testString);
    expect(removeTXPrefix(testStringWithTxId)).toBe(testStringWithTxId);
  });
});
