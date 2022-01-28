const wasmCode = await Deno.readFile("increment.wasm");
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule);
const increment = wasmInstance.exports.increment as (input: number) => number;
console.log(increment(41));
