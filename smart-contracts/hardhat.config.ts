import { HardhatUserConfig } from 'hardhat/config';
import hardhatToolboxViemPlugin from '@nomicfoundation/hardhat-toolbox-viem';
import hardhatIgnitionViemPlugin from '@nomicfoundation/hardhat-ignition-viem';
import hardhatVerify from '@nomicfoundation/hardhat-verify';
import * as dotenv from 'dotenv';

dotenv.config();

// Get private key from env, or use a default test key for local testing
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin, hardhatIgnitionViemPlugin, hardhatVerify],
  solidity: {
    version: '0.8.30',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    'lisk-sepolia': {
      type: 'http',
      url: 'https://rpc.sepolia-api.lisk.com',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 4202,
    },
  },
  chainDescriptors: {
    4202: {
      name: 'Lisk Sepolia',
      blockExplorers: {
        blockscout: {
          name: 'Blockscout',
          url: 'https://sepolia-blockscout.lisk.com/',
          apiUrl: 'https://sepolia-blockscout.lisk.com/api',
        },
      },
    },
  },
  verify: {
    blockscout: {
      enabled: true,
    },
  },
};

export default config;
