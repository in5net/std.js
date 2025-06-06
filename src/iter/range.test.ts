import { range } from "./range";
import { expect, test } from "vitest";

test("range(10)", () => {
  const iter = range(10);
  const arr = [...iter];
  expect(arr).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("range(-5)", () => {
  const iter = range(-5);
  const arr = [...iter];
  expect(arr).toEqual([0, -1, -2, -3, -4]);
});

test("range(3, 10)", () => {
  const iter = range(3, 10);
  const arr = [...iter];
  expect(arr).toEqual([3, 4, 5, 6, 7, 8, 9]);
});

test("range(7, -2)", () => {
  const iter = range(7, -2);
  const arr = [...iter];
  expect(arr).toEqual([7, 6, 5, 4, 3, 2, 1, 0, -1]);
});

test("range(3, 10, 2)", () => {
  const iter = range(3, 10, 2);
  const arr = [...iter];
  expect(arr).toEqual([3, 5, 7, 9]);
});

test("range(4, -3, 0.5)", () => {
  const iter = range(4, -3, 0.5);
  const arr = [...iter];
  expect(arr).toEqual([
    4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0, -0.5, -1, -1.5, -2, -2.5,
  ]);
});
