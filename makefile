NODE_DIR:= $(shell pnpm root)

.PHONY: build-js
build-js:
	mkdir -p js && grpc_tools_node_protoc \
	--js_out=import_style=commonjs,binary:./js \
	--ts_out=grpc_js:./js --grpc_out=grpc_js:./js \
	--plugin=protoc-gen-grpc=$(NODE_DIR)/.bin/grpc_tools_node_protoc_plugin \
	-I ./proto ./proto/*.proto