import "jest";
import { type, compareVersion } from "../util";

test("the type function input params 'react' return '/src/react-router-redux'", () => {
  const dir = type("react");
  expect(dir).toBe("/src/react-router-redux");
});

test("8.1 > 8", () => {
  const version = compareVersion("8.1");
  expect(version).toBe(true);
});

test("7.9 > 8", () => {
  const version = compareVersion("7.9");
  expect(version).toBe(false);
});
