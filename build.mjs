import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["thermal-printer.tsx"],
  bundle: true,
  format: "esm",
  sourcemap: true,
  minify: true,
  outfile: "thermal-printer.mjs",
});
