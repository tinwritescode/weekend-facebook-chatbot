import typescript from "@rollup/plugin-typescript";
import run from "@rollup/plugin-run";

const dev = process.env.ROLLUP_WATCH === "true";

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/index.ts",
  output: {
    sourcemap: true,
    file: "build/bundle.js",
    format: "esm",
  },

  plugins: [typescript(), dev && run()],
};
