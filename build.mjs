import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["dist/thermal-printer.jsx"],
  bundle: true,
  format: "esm",
  sourcemap: true,
  minify: true,
  outfile: "dist/thermal-printer.js",
});
