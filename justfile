build-wasm:
    cargo component build --release --target=wasm32-unknown-unknown
transpile-to-js:
    jco transpile ./target/wasm32-unknown-unknown/release/test_wasm_helloworld.wasm -o js_test/test_wasm_module
execute-js:
    cd js_test && node index.mjs && cd ..