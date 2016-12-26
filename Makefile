identifier=me.rok3.PawExtensions.ElixirHTTPoisonCodeGenerator
extensions_dir=$(HOME)/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/

.PHONY: lint build clean install archive

node_modules:
	npm install

build: node_modules
	npm run build
	cp README.md LICENSE.md src/request.mustache ./build/$(identifier)/

clean:
	rm -rf ./build/

install: clean build
	mkdir -p "$(extensions_dir)$(identifier)/"
	cp -r ./build/$(identifier)/* "$(extensions_dir)$(identifier)/"

lint: node_modules
	npm run lint

archive: node_modules clean build
	cd ./build; tar zcf ElixirHTTPoisonCodeGenerator.tar.gz "$(identifier)/"
	cd ./build; zip -q -r ElixirHTTPoisonCodeGenerator.zip "$(identifier)/"
