import {
  isCustomMessage,
  isVersionMessage,
  isWizardMessage,
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

describe("Testing recognition of the correct transaction message", () => {
  test("find WzTx", () => {
    const testMessage = {
      id: "fe73b3d3fc672e832fac928c9fa79899b238ddf40137c8ea7419c8192392bbf500000000",
      txid: "fe73b3d3fc672e832fac928c9fa79899b238ddf40137c8ea7419c8192392bbf5",
      n: 0,
      value: "0.00000000",
      tokenId: 0,
      script: {
        type: "nulldata",
        hex: "6a004d8401577a5478553246736447566b58313961644e627742756363334c594a52514a6e786a7a57454b754176512b324b59354e55376b32355a4a47514c2b326e704d4f32366c5468736d5131396636565878703169374a5432676d7133346c7543707874326e52416e47336235466b4765324e46722f532b4256786e4e474b6266393976616a51573742346f37526178324d78764a636a756c4b526c512f34546a552b656a6d354c6a447039766c507a384c39495767536d6d4f6b3364496d6658354830346b78514e433062576b504f754d7a4b67524d6b5235455a366f34676e4b513161794e6b4d7931764f4c4b42786c5345702f2b4148576557484e56636b63684c6e53306a7637314e36657250415666464c38544a32455671652b504545642b4273303748787a7a6e70687a50312b574276382b637069714b7a35686c436356712b493343705141433879496c526e526149303648516f6f6b654d7a70326a41457078577972754d437769585331596848416343612f3237737a716430744451694f5030",
      },
    };
    expect(isWizardMessage(testMessage)).toBeTruthy();
    // switch to WzVx
    testMessage.script.hex =
      "6a004d8401577A5678553246736447566b58313961644e627742756363334c594a52514a6e786a7a57454b754176512b324b59354e55376b32355a4a47514c2b326e704d4f32366c5468736d5131396636565878703169374a5432676d7133346c7543707874326e52416e47336235466b4765324e46722f532b4256786e4e474b6266393976616a51573742346f37526178324d78764a636a756c4b526c512f34546a552b656a6d354c6a447039766c507a384c39495767536d6d4f6b3364496d6658354830346b78514e433062576b504f754d7a4b67524d6b5235455a366f34676e4b513161794e6b4d7931764f4c4b42786c5345702f2b4148576557484e56636b63684c6e53306a7637314e36657250415666464c38544a32455671652b504545642b4273303748787a7a6e70687a50312b574276382b637069714b7a35686c436356712b493343705141433879496c526e526149303648516f6f6b654d7a70326a41457078577972754d437769585331596848416343612f3237737a716430744451694f5030";
    expect(isWizardMessage(testMessage)).toBeTruthy();
    // remove first char
    testMessage.script.hex =
      "a004d8401577A5678553246736447566b58313961644e627742756363334c594a52514a6e786a7a57454b754176512b324b59354e55376b32355a4a47514c2b326e704d4f32366c5468736d5131396636565878703169374a5432676d7133346c7543707874326e52416e47336235466b4765324e46722f532b4256786e4e474b6266393976616a51573742346f37526178324d78764a636a756c4b526c512f34546a552b656a6d354c6a447039766c507a384c39495767536d6d4f6b3364496d6658354830346b78514e433062576b504f754d7a4b67524d6b5235455a366f34676e4b513161794e6b4d7931764f4c4b42786c5345702f2b4148576557484e56636b63684c6e53306a7637314e36657250415666464c38544a32455671652b504545642b4273303748787a7a6e70687a50312b574276382b637069714b7a35686c436356712b493343705141433879496c526e526149303648516f6f6b654d7a70326a41457078577972754d437769585331596848416343612f3237737a716430744451694f5030";
    expect(isWizardMessage(testMessage)).toBeFalsy();
    // change prefix to something unknown
    testMessage.script.hex =
      "6a004d8401577A5378553246736447566b58313961644e627742756363334c594a52514a6e786a7a57454b754176512b324b59354e55376b32355a4a47514c2b326e704d4f32366c5468736d5131396636565878703169374a5432676d7133346c7543707874326e52416e47336235466b4765324e46722f532b4256786e4e474b6266393976616a51573742346f37526178324d78764a636a756c4b526c512f34546a552b656a6d354c6a447039766c507a384c39495767536d6d4f6b3364496d6658354830346b78514e433062576b504f754d7a4b67524d6b5235455a366f34676e4b513161794e6b4d7931764f4c4b42786c5345702f2b4148576557484e56636b63684c6e53306a7637314e36657250415666464c38544a32455671652b504545642b4273303748787a7a6e70687a50312b574276382b637069714b7a35686c436356712b493343705141433879496c526e526149303648516f6f6b654d7a70326a41457078577972754d437769585331596848416343612f3237737a716430744451694f5030";
    expect(isWizardMessage(testMessage)).toBeFalsy();
  });

  test("find WzVx", () => {
    const testString = "ThisIsJustATest";
    let testStringWithTxId = `${WIZARD_TRANSACTION_VERSION_PREFIX}${testString}`;
    expect(removeTXPrefix(testStringWithTxId)).toBe(testString);
    testStringWithTxId = `${testString}${WIZARD_TRANSACTION_VERSION_PREFIX}`;
    expect(removeTXPrefix(testStringWithTxId)).not.toBe(testString);
    expect(removeTXPrefix(testStringWithTxId)).toBe(testStringWithTxId);
  });
});
