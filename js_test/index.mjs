import pkg from "./test_wasm_module/test_wasm_helloworld.js";

const helloWorldString = pkg.helloWorld();
console.log(helloWorldString);
