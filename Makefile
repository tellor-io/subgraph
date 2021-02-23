include .bingo/Variables.mk

.PHONY: build
build: ## Generate all dynamic files.
build: 
	@$(CONTRAGET) --addr=0x04b5129735b5d9b1b54109f2c4c06ea23b506a95 --download-dst=tmp --abi-dst=contracts --name=tellor
	@npm run prepare:mainnet #Here doesn't matter if the prepare is for mainnet or rinkeby.
	@npx graph codegen
	@npx graph build