const BN = require("bn.js");

const config = {
    MINIMUM_BOND: new BN(100000).mul(new BN(10).pow(new BN(18))),
    MINIMUM_POD_SIZE: 3, // 24 in production
    MINIMUM_EPOCH_INTERVAL_SECONDS: 30, // 216000 in production, 1 month
    DARKNODE_PAYOUT_PERCENT: 50, // Only payout 50% of the reward pool
    BLACKLIST_SLASH_PERCENT: 0, // Don't slash bond for blacklisting
    MALICIOUS_SLASH_PERCENT: 50, // Slash 50% of the bond
    SECRET_REVEAL_SLASH_PERCENT: 100, // Slash 100% of the bond
    mintAuthority: "", // Darknode public key
    shiftInFee: 10,
    shiftOutFee: 10,
    zBTCMinShiftOutAmount: 10000,
    zZECMinShiftOutAmount: 10000,
    zBCHMinShiftOutAmount: 10000,
}

module.exports = {
    mainnet: {
        RenToken: "0x408e41876cCCDC0F92210600ef50372656052a38",
        DarknodeSlasher: "0x0000000000000000000000000000000000000000",
        DarknodeRegistry: "0x34bd421C7948Bc16f826Fd99f9B785929b121633",
        DarknodeRegistryStore: "0x06df0657ba5e8f5339e742212669f6e7ee3c5057",
        DarknodePayment: "0x5a7802E66b067cB1770ee5b1165AA201690A8B6a",
        DarknodePaymentStore: "0x731Ea4Ba77fF184d89dBeB160A0078274Acbe9D2",
        tokens: {
            DAI: "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
            ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        },

        ShifterRegistry: "",
        zZEC: "",
        BTCShifter: "",
        zBTC: "",
        ZECShifter: "",
        zBCH: "",
        BCHShifter: "",

        config: {
            ...config,
            mintAuthority: "TODO",
        },
    },
    chaosnet: {
        tokens: {
            DAI: "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
            ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        },

        RenToken: "0x408e41876cCCDC0F92210600ef50372656052a38",
        DarknodeSlasher: "0x7AdD7E6F431Cfa23dFfce61DD9749810dc678B16",
        DarknodeRegistry: "0xA1eb04Db7a0ffd6e458b1868660a0edAF8199Fa9",
        DarknodeRegistryStore: "0xE8d0C5D4ca958C8619Ab1B98cA901d65340C48B1",
        DarknodePayment: "0x376D835c6Dc5d06C6335915B36ffe9734D3E4faa",
        DarknodePaymentStore: "0x311999EE72B5826D664FD4F3aC09c0C462eFfe49",

        BTCShifter: "0x1258d7FF385d1d81017d4a3d464c02f74C61902a",
        ZECShifter: "0x2b59Ef3Eb28c7388c7eC69d43a9b8E585C461d5b",
        BCHShifter: "0xa76beA11766E0b66bD952bc357CF027742021a8C",
        zBTC: "0x88C64A7D2ecC882D558DD16aBC1537515a78BB7D",
        zZEC: "0x8dD8944320Eb76F8e39C58E7A30d34E7fbA9D719",
        zBCH: "0x466Dd97F83b18aC23dDF16931f8171A817953fF1",
        ShifterRegistry: "0x5d9bF2Bad3dD710e4D533681ed16eD1cfeAc9e6F",

        config: {
            ...config,
            MINIMUM_BOND: new BN(10000).mul(new BN(10).pow(new BN(18))),
            mintAuthority: "0x5D0b91e8a8037C3EBB55f52D76BFc64CaBEBCAE1",
        },
    },
    testnet: {
        RenToken: "0x2cd647668494c1b15743ab283a0f980d90a87394",
        DarknodeSlasher: "0x06f44b3a0C2621D581Fe667Ec2170F6A5Be02BD0",
        DarknodeRegistry: "0xD94aD925233f8344875C74DeDF7c4cbcb92aA9FF",
        DarknodeRegistryStore: "0xc24146aE71470C2f8749DA0738b09434E0220d92",
        DarknodePayment: "0x4Fc1f776ddfeb7AC1A93Cbb9FcbeFdda7e3C838E",
        DarknodePaymentStore: "0x823c22F1e17766271a5986D9faa12bcfFDeb701B",
        tokens: {
            DAI: "0xc4375b7de8af5a38a93548eb8453a498222c4ff2",
            ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        },

        BTCShifter: "0x7e6E1D8F26D2b49B2fB4C3B6f5b7dad8d8ea781b",
        ZECShifter: "0x1615f5a285134925Fb4D87812827863fde046fDa",
        BCHShifter: "0xea08e98E56f1088E2001fAB8369A1c9fEEc58Ec9",
        zBTC: "0xc6069E8DeA210C937A846db2CEbC0f58ca111f26",
        zZEC: "0xB9b5B5346BF8CA9bc02f4F9d8947916b7CA9C97E",
        zBCH: "0x7bdb2A8231eB4E4795749F01f0241940a8166575",
        ShifterRegistry: "0xbA563a8510d86dE95F5a50007E180d6d4966ad12",

        config: {
            ...config,
            mintAuthority: "0x44Bb4eF43408072bC888Afd1a5986ba0Ce35Cb54",
        },
    },

    devnet: {
        RenToken: "0x2cd647668494c1b15743ab283a0f980d90a87394",
        DarknodeSlasher: "0xfe48363206E1849a2F53f5214af932354c35FD89",
        DarknodeRegistry: "0x6E1a6b85f05bfec5c24C7a26E302cB28e639651c",
        DarknodeRegistryStore: "0xC126a308dd07Adfa4a445686dcF7CbC423185593",
        DarknodePayment: "0x1f1b1d015Fc31d425C616cC35E39e31686DA69A8",
        DarknodePaymentStore: "0x6341DF1012E862f766Fcd72e0fCAAc5a3839CFef",
        tokens: {
            DAI: "0xc4375b7de8af5a38a93548eb8453a498222c4ff2",
            ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        },

        BTCShifter: "0x8fB4F7D1ea9329697127F2784399301c0F8E6866",
        ZECShifter: "0x19Fe91276a992c2E85544C627583fcc535ff0661",
        zBTC: "0x916B8012E1813E5924a3Eca400dBE6C7055a8484",
        zZEC: "0x71b6A19Fc832bD9C739489EcBEa67ab41261026F",
        zBCH: "0xfC1bc29e7a7282DA195f9b8A824cf242c770673F",
        BCHShifter: "0x9b74517b18D8D0581df70dc6376db5f4974ebfbD",
        ShifterRegistry: "0xc7B310c18D78f175812CFfD8896d3cC959aC28d6",

        config: {
            ...config,
            mintAuthority: "0x1B9d58208879AA9aa9E10040b34cF2b684237621",
        },
    },

    localnet: {
        RenToken: "0x2cd647668494c1b15743ab283a0f980d90a87394",
        DarknodeSlasher: "0xa6B1d1E63B92F8Fb36F8E1356FD5739e6433f0a3",
        DarknodeRegistry: "",
        DarknodeRegistryStore: "0x46d016F50837a5DF8fe229127e54fb18B621bAeF",
        DarknodePayment: "0x7c71E53853863ce0a3BE7D024EF99aba7d872bfe",
        DarknodePaymentStore: "0x72Acdf4f0E3245262E46Bd8daCc207Df7CF3A534",
        tokens: {
            DAI: "0xc4375b7de8af5a38a93548eb8453a498222c4ff2",
            ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        },

        ShifterRegistry: "0x33666067A7741B9e88520285C96B776E73281811",
        zBTC: "0xDE027035d33CEB2757685E325de1A0b924aA73E6",
        BTCShifter: "0x7012ECc13De5Ce416C14C013d9b02b7c37154b37",
        zZEC: "0xB7b7be50B13E6817afBb30C93161D0eB388b8f08",
        ZECShifter: "0x69AC72Cb35B1AA818e90842C048719a3246ba0BE",
        zBCH: "",
        BCHShifter: "",

        config: {
            ...config,
            mintAuthority: "0x04084f1cACCB87Dcab9a29a084281294dA96Bf44",
        },
    },

    config,
}