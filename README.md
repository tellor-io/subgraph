Golang is required for downloading the contracts and generating the ABIs.

`npm install` to install dependancies
`make build` to build

Deploy to mainnet
`npx graph auth https://api.thegraph.com/deploy/ token`
`npm run prepare:mainnet && npm run deploy:mainnet`

Deploy to rinkeby
`npm run prepare:rinkeby && npm run deploy:rinkeby`


To run test queries:
https://api.thegraph.com/subgraphs/name/tellor-io/lens
https://thegraph.com/explorer/subgraph/tellor-io/lens-rinkeby