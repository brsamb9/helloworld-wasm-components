const instantiateCore = WebAssembly.instantiate;

let dv = new DataView(new ArrayBuffer());
const dataView = (mem) =>
  dv.buffer === mem.buffer ? dv : (dv = new DataView(mem.buffer));

const utf8Decoder = new TextDecoder();

const isNode =
  typeof process !== "undefined" && process.versions && process.versions.node;
let _fs;
async function fetchCompile(url) {
  if (isNode) {
    _fs = _fs || (await import("fs/promises"));
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

let exports0;
let memory0;
let postReturn0;

function helloWorld() {
  const ret = exports0["hello-world"]();
  const ptr0 = dataView(memory0).getInt32(ret + 0, true);
  const len0 = dataView(memory0).getInt32(ret + 4, true);
  const result0 = utf8Decoder.decode(
    new Uint8Array(memory0.buffer, ptr0, len0)
  );
  postReturn0(ret);
  return result0;
}

export default { helloWorld };

const $init = (async () => {
  const module0 = fetchCompile(
    new URL("./test_wasm_helloworld.core.wasm", import.meta.url)
  );
  ({ exports: exports0 } = await instantiateCore(await module0));
  memory0 = exports0.memory;
  postReturn0 = exports0["cabi_post_hello-world"];
})();

await $init;
