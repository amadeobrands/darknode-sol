/// <reference types="../types/truffle-contracts" />

const NULL = "0x0000000000000000000000000000000000000000";

const ShifterRegistry = artifacts.require("ShifterRegistry");

const BTCShifter = artifacts.require("BTCShifter");
const zBTC = artifacts.require("zBTC");

const ZECShifter = artifacts.require("ZECShifter");
const zZEC = artifacts.require("zZEC");

const BCHShifter = artifacts.require("BCHShifter");
const zBCH = artifacts.require("zBCH");

const DarknodePayment = artifacts.require("DarknodePayment");

const networks = require("./networks.js");

/**
 * @param {any} deployer
 * @param {string} network
 * @param {any[]} accounts
 */
module.exports = async function (deployer, network, accounts) {
    deployer.logger.log(`Deploying to ${network} (${network.replace("-fork", "")})...`);

    network = network.replace("-fork", "");

    const addresses = networks[network] || {};
    const config = networks[network] ? networks[network].config : networks.config;
    const _mintAuthority = config.mintAuthority || accounts[0];
    // TODO: _feeRecipient should be the DarknodePayment contract
    // There should be a 0_darknode_payment.js that deploys it before the shifter contracts
    const _feeRecipient = addresses.DarknodePaymentStore || accounts[0];

    BTCShifter.address = addresses.BTCShifter || "";
    ZECShifter.address = addresses.ZECShifter || "";
    BCHShifter.address = addresses.BCHShifter || "";
    ShifterRegistry.address = addresses.ShifterRegistry || "";
    zZEC.address = addresses.zZEC || "";
    zBCH.address = addresses.zBCH || "";
    zBTC.address = addresses.zBTC || "";

    const darknodePayment = await DarknodePayment.at(DarknodePayment.address);

    /** Registry **************************************************************/

    if (!ShifterRegistry.address) {
        await deployer.deploy(
            ShifterRegistry,
        );
    }
    const registry = await ShifterRegistry.at(ShifterRegistry.address);

    // try {
    //     deployer.logger.log("Attempting to change cycle");
    //     await darknodePayment.changeCycle();
    // } catch (error) {
    //     deployer.logger.log("Unable to call darknodePayment.changeCycle()");
    // }

    for (const [Token, Shifter, name, symbol, decimals, minShiftOutAmount] of [
        [zBTC, BTCShifter, "Shifted Bitcoin", "zBTC", 8, config.zBTCMinShiftOutAmount],
        [zZEC, ZECShifter, "Shifted ZCash", "zZEC", 8, config.zZECMinShiftOutAmount],
        [zBCH, BCHShifter, "Shifted Bitcoin Cash", "zBCH", 8, config.zBCHMinShiftOutAmount],
    ]) {
        if (!Token.address) {
            await deployer.deploy(Token, name, symbol, decimals);
        }
        const token = await Token.at(Token.address);

        if (!Shifter.address) {
            await deployer.deploy(
                Shifter,
                Token.address,
                _feeRecipient,
                _mintAuthority,
                config.shiftInFee,
                config.shiftOutFee,
                minShiftOutAmount,
            );
        }
        const tokenShifter = await Shifter.at(Shifter.address);

        const shifterAuthority = await tokenShifter.mintAuthority.call();
        if (shifterAuthority.toLowerCase() !== _mintAuthority.toLowerCase()) {
            deployer.logger.log(`Updating fee recipient for ${symbol} shifter. Was ${shifterAuthority.toLowerCase()}, now is ${_mintAuthority.toLowerCase()}`);
            deployer.logger.log(`Updating mint authority in ${symbol} shifter`);
            await tokenShifter.updateMintAuthority(_mintAuthority);
        }

        const tokenOwner = await token.owner.call();
        if (tokenOwner !== Shifter.address) {
            deployer.logger.log(`Transferring ${symbol} ownership`);

            if (tokenOwner === accounts[0]) {
                await token.transferOwnership(tokenShifter.address);

                // Update tokenShifter address
                deployer.logger.log(`Claiming ${symbol} ownership in shifter`);
                await tokenShifter.claimTokenOwnership();
            } else {
                deployer.logger.log(`Transferring token ownership from ${tokenOwner} to new ${symbol} shifter`);
                const oldShifter = await Shifter.at(tokenOwner);
                await oldShifter.transferTokenOwnership(tokenShifter.address);
                // This will also call claim, but we try anyway because older
                // contracts didn't:
                try {
                    // Claim ownership
                    await tokenShifter.claimTokenOwnership();
                } catch (error) {
                    // Ignore
                }
            }
        }

        // Try to change the payment cycle in case the token is pending registration
        let tokenRegistered = (await darknodePayment.registeredTokenIndex.call(Token.address)).toString() !== "0";
        const pendingRegistration = await darknodePayment.tokenPendingRegistration.call(Token.address);
        if (!tokenRegistered && !pendingRegistration) {
            deployer.logger.log(`Registering token ${symbol} in DarknodePayment`);
            await darknodePayment.registerToken(Token.address);
        }

        const registered = await registry.getShifterByToken.call(Token.address);
        if (registered === NULL) {
            const otherRegistration = (await registry.getShifterBySymbol.call(symbol));
            if (otherRegistration === NULL) {
                deployer.logger.log(`Registering ${symbol} shifter`);
                await registry.setShifter(Token.address, Shifter.address);
            } else {
                deployer.logger.log(`Updating registered ${symbol} shifter`);
                await registry.updateShifter(Token.address, Shifter.address);
            }
        } else {
            deployer.logger.log(`${symbol} shifter is already registered: ${await registry.getShifterByToken.call(Token.address)}`);
        }

        const feeRecipient = await tokenShifter.feeRecipient.call();
        if (feeRecipient.toLowerCase() !== _feeRecipient.toLowerCase()) {
            deployer.logger.log(`Updating fee recipient for ${symbol} shifter. Was ${feeRecipient.toLowerCase()}, now is ${_feeRecipient.toLowerCase()}`);
            await tokenShifter.updateFeeRecipient(_feeRecipient);
        }
    }

    /** LOG *******************************************************************/

    deployer.logger.log({
        BTCShifter: BTCShifter.address,
        ZECShifter: ZECShifter.address,
        BCHShifter: BCHShifter.address,
        zBTC: zBTC.address,
        zZEC: zZEC.address,
        zBCH: zBCH.address,
        ShifterRegistry: ShifterRegistry.address,
    });
}