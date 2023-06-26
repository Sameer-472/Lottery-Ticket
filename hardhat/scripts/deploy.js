// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config({ path: ".env" });

const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constant");

async function main() {
  // contract b deployment 
  const randomWinnerGame = await hre.ethers.deployContract("RandomWinnerGame",  [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE]);
  // const RandomWinnerGame = await hre.ethers.getContractFactory("RandomWinnerGame");


  // const randomWinnerGame = await RandomWinnerGame.deploy(VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE);

  await randomWinnerGame.waitForDeployment();

  // await randomWinnerGame.waitForDeployment();

  console.log(
    `randomWinnerGame deployed ${randomWinnerGame.target}`
  );

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: randomWinnerGame.target,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

  //contract A deployment


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
