.PHONY: docs

all: docs

docs:
	node ./node_modules/yuidocjs/lib/cli.js ./lib
