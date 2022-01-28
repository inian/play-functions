console.log(Deno);
await Deno.writeTextFile("./hello.txt", "Hello World!");
console.log("File written to ./hello.txt");
