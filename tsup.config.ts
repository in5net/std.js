import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/async/index.ts",
    "src/cmath/index.ts",
    "src/fn/index.ts",
    "src/gfx/index.ts",
    "src/iter/index.ts",
    "src/math/index.ts",
    "src/string/index.ts",
    "src/structs/index.ts",
    "src/time/index.ts",
    "src/array.ts",
    "src/bytes.ts",
    "src/cmp.ts",
    "src/csv.ts",
    "src/easing.ts",
    "src/events.ts",
    "src/noise.ts",
    "src/object.ts",
    "src/random.ts",
    "src/types.ts",
  ],
  format: ["esm"],
  dts: true,
  clean: true,
});
