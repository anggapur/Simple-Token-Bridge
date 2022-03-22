import { HardhatRuntimeEnvironment } from 'hardhat/types'; // This adds the type from hardhat runtime environment.
import { DeployFunction, DeployResult } from 'hardhat-deploy/types'; // This adds the type that a deploy function is expected to fulfill.

type OmitLast<T extends unknown[]> = T extends [...infer Head, unknown?]
  ? Head
  : never;

const LOGIC_NAME = 'GuildToken';

const func: DeployFunction = async function ({
  ethers,
  network,
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  console.debug('Network:', {
    name: network.name,
    live: network.live,
    tags: network.tags,
  });

  if (network.live && !network.tags.goerli) {
    console.warn(
      `SKIP: not running deployment on non-child live network "${network.name}" with tags:`,
      network.tags
    );
    return;
  }

  const {
    deployer: deployerAddress,
    childChainManager,
  } = await getNamedAccounts();

  // Deploy logic
  let logicDeployed = network.live && (await deployments.getOrNull(LOGIC_NAME));
  if (!logicDeployed) {
    logicDeployed = await deployments.deploy(LOGIC_NAME, {
      contract: LOGIC_NAME,
      from: deployerAddress, // Deployer will be performing the deployment transaction.
      args: [], // Arguments to the contract's constructor.
      log: true, // Display the address and gas used in the console (not when run in test though).
    });
  }
};

func.tags = ['GUILD']; // This sets up a tag so you can execute the script on its own (and its dependencies).

export default func;
