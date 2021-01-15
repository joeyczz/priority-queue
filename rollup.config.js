import path from "path";
import ts from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
// eslint插件
import { eslint } from "rollup-plugin-eslint";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

const extensions = [".js", ".ts"];

const tsPlugin = ts({
  check: true,
  tsconfig: path.resolve(__dirname, "tsconfig.json"),
  cacheRoot: "node_modules/.cache/rollup-plugin-typescript2",
  useTsconfigDeclarationDir: true,
  tsconfigOverride: {
    exclude: ["test"],
  },
  extensions,
});

const esPlugin = eslint({
  throwOnError: true,
  include: ["src/*.ts"],
  exclude: ["node_modules/**", "lib/**", "test/**"],
});

export default {
  input: "src/index.ts",
  output: {
    file: "lib/index.min.js",
    name: "PriorityQueue",
    format: "umd",
    banner: `/* PriorityQueue version ${pkg.version} */`,
  },
  plugins: [
    esPlugin,
    tsPlugin,
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      extensions,
    }),
    terser(),
    // BabelPlugin({ exclude: "node_modules/**" }),
  ],
};
