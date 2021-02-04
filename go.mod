module github.com/tellor-io/tellorSubgraph/scripts

go 1.15

require (
	github.com/nanmu42/etherscan-api v1.1.1
	github.com/tellor-io/telliot v0.0.7-0.20210128142157-fa37a7bfaa65
)

replace (
	github.com/tellor-io/telliot => ../telliot
)
