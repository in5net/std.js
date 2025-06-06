import { mat, Mat } from "./mat";
import { assert, test } from "vitest";

const a = mat(4, 3);
a.set([1, 5, 4, 8, 0, 4, 6, 4, 8, 4, 5, 5]);
const b = mat([
  [1, 2],
  [3, 3],
  [0, 8],
]);

test("multiply", { todo: true }, () => {
  const ans = Mat.mul(a, b);
  assert(
    ans.eq(
      mat([
        [16, 49],
        [8, 48],
        [18, 88],
        [19, 63],
      ]),
    ),
  );
});
