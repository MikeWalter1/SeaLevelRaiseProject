# Deployment:

You can deploy in the `localhost` network following these steps:

1. Start a [local node](https://hardhat.org/hardhat-runner/docs/getting-started#connecting-a-wallet-or-dapp-to-hardhat-network)
    
    `npx hardhat node`
    
2. Open a new terminal and deploy the smart contract in the `localhost` network
    
    
    `npx hardhat run --network localhost scripts/deploy.ts`
    
REPORT_GAS=true npx hardhat test

# Compiling Contracts

https://hardhat.org/hardhat-runner/docs/guides/compile-contracts

To compile your contracts in your Hardhat project, use the built-in `compile` task:

`$ npx hardhat compile
Compiling...
Compiled 1 contract successfully`

The compiled artifacts will be saved in the `artifacts/` directory by default, or whatever your configured artifacts path is. Look at the [paths configuration section](https://hardhat.org/hardhat-runner/docs/config#path-configuration) to learn how to change it. This directory will be created if it doesn't exist.

After the initial compilation, Hardhat will try to do the least amount of work possible the next time you compile. For example, if you didn't change any files since the last compilation, nothing will be compiled:

`$ npx hardhat compile
Nothing to compile`

If you only modified one file, only that file and others affected by it will be recompiled.

To force a compilation you can use the `--force` argument, or run `npx hardhat clean` to clear the cache and delete the artifacts.

# [**# Configuring the compiler**](https://hardhat.org/hardhat-runner/docs/guides/compile-contracts#configuring-the-compiler)

If you need to customize the Solidity compiler options, then you can do so through the `solidity` field in your `hardhat.config.js`. The simplest way to use this field is via the shorthand for setting the compiler version, which we recommend always doing:

`module.exports = {
  solidity: "0.8.24",
};`

We recommend always setting a compiler version in order to avoid unexpected behavior or compiling errors as new releases of Solidity are published.

**WARNING**

Hardhat will automatically download the versions of `solc` that you set up. If you are behind an HTTP proxy, you may need to set the `HTTP_PROXY` or `HTTPS_PROXY` environment variable to the URL of your proxy.

The expanded usage allows for more control of the compiler:

`module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};`

`settings` has the same schema as the `settings` entry in the [Input JSON](https://solidity.readthedocs.io/en/v0.7.2/using-the-compiler.html#input-description) that can be passed to the compiler. Some commonly used settings are:

- `optimizer`: an object with `enabled` and `runs` keys. Default value: `{ enabled: false, runs: 200 }`.
- `evmVersion`: a string controlling the target evm version. For example: `istanbul`, `berlin` or `london`. Default value: managed by `solc`.

If any of your contracts have a version pragma that is not satisfied by the compiler version you configured, then Hardhat will throw an error.


# Frontend

**Set local variable**
`Set NODE_OPTIONS=--openssl-legacy-provider`

**Install dependencies**
`npm install`

**Start Server**
`ng serve`
