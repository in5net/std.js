import { Mat2, mat2 } from "./mat2";
import { assert, test } from "vitest";

const a = mat2([5, 8, 3, 8]);
const b = mat2([3, 8, 8, 9]);

test("add", () => {
  const ans = Mat2.add(a, b);
  assert(ans.eq([8, 16, 11, 17]));
});

test("subtract", () => {
  const ans = Mat2.sub(a, b);
  assert(ans.eq([2, 0, -5, -1]));
});

test("multiply", () => {
  const ans = Mat2.mul(a, b);
  assert(ans.eq([79, 112, 73, 96]));
});

test("determinant", () => {
  const ans = a.det();
  assert(ans === 16);
});
