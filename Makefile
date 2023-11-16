.PHONY: help graphql unit e2e ts-guard

npm = npm run

default: help

help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

graphql: # Generate GraphQL types from schema
	$(npm) graphql:generate

unit:  # Run unit tests
	$(npm) test

e2e: # Run end-to-end tests
	$(npm) test:e2e

ts-guard: # Generate TS guard for $FILE (e.g. make ts-guard FILE=src/app.ts)
	npx ts-auto-guard $(FILE)