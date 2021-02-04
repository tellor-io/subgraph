Golang is required for downloading the contracts and generating the ABIs.

`npm install` to install dependancies
`make build` to build

Deploy to mainnet
`npx graph auth https://api.thegraph.com/deploy/ token`
`npm run prepare:mainnet && npm run deploy:mainnet`

Deploy to rinkeby
`npx graph auth https://api.thegraph.com/deploy/ token`
`npm run prepare:rinkeby && npm run deploy:rinkeby`