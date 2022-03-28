// import eszip
import { build } from "https://deno.land/x/eszip@0.15.2/mod.ts";

// root specifier(s) you want to bundle,
// these should valid URLs (file:/// or https://) or resolvable by your loader
const roots = [
  "file:///Users/inian/dev/play/play-functions/deno/hello-import.ts",
];

// build the eszip from the roots
// NOTE: you can provide a custom loader func in the 2nd arg
const bytes = await build(roots);

// write the eszip to disk (or upload somewhere)
await Deno.writeFile("./out.eszip2", bytes);
