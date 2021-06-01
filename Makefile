include .bingo/Variables.mk

.PHONY: build
build: ## Generate all dynamic files.
build: 
	@$(CONTRAGET) --addr=0x1820f929272c2be486e709c6219ac07ded2845bc --download-dst=tmp --abi-dst=contracts --name=tellor
	@npm run prepare:mainnet #Here doesn't matter if the prepare is for mainnet or testnet. It is just to allow running the next step.
	@npx graph codegen
	@npx graph build