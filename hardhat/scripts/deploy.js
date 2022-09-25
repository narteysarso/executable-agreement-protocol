// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const provider = new hre.ethers.providers.JsonRpcProvider(
        process.env.MUMBAI_RPC_URL
    );

    const sf = await Framework.create({
        chainId: (await provider.getNetwork()).chainId,
        provider,
    });

    // We get the contract to deploy
    const SuperApps = await hre.ethers.getContractFactory("SuperApps");
    //deploy the money router account using the proper host address and the address of the first signer
    const superApps = await SuperApps.deploy()

    // superApps.initialize(
    //   sf.settings.config.hostAddress,
    //   "0x440e65EAAb7A23be8b1a61108643B2cff2E5A967"
    // )

    await superApps.deployed();

    const ExecutableAgreement = await hre.ethers.getContractFactory(
        "ExecutableAgreement"
    );

    const LogContract = await hre.ethers.getContractFactory(
        "LogContract"
    );

    const AgreementFundsManagerContract = await hre.ethers.getContractFactory(
        "AgreementFundsManager"
    );

    const AgreementOfferManagerContract = await hre.ethers.getContractFactory(
        "AgreementOfferManager"
    );

    const AgreementSigningManagerContract = await hre.ethers.getContractFactory(
        "AgreementSigningManagerContract"
    );

    const logContract = await LogContract.deploy();
    const agreementSigningManagerContract = await AgreementSigningManagerContract.deploy();
    const agreementFundsManagerContract = await AgreementFundsManagerContract.deploy();
    const agreementOfferManagerContract = await AgreementOfferManagerContract.deploy();
    const executableAgreement = await ExecutableAgreement.deploy();

    await executableAgreement.deployed();
    await logContract.deployed();
    await agreementSigningManagerContract.deployed();
    await agreementFundsManagerContract.deployed();
    await agreementOfferManagerContract.deployed();

    console.log(
        `Executable Agreement deployed at: ${executableAgreement.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
