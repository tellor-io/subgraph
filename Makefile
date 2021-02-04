.PHONY: build
build: ## Generate all dynamic files.
build: 
	@go run ./scripts/generate
	@npx graph codegen
	@npx graph build