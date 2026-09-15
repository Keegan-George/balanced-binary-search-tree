import { Tree } from "./balanced-binary-search-tree";
import { test, expect, describe, beforeEach } from "@jest/globals";

let tree;

const NODE_DATA = [1, 2, 3, 4, 5, 6, 7];

describe("Positive cases", () => {
  beforeEach(() => {
    tree = new Tree(NODE_DATA);
  });

  describe("includes() tests", () => {
    test.each(NODE_DATA)(
      "Return true for value in tree: includes(%i) => true",
      (n) => {
        expect(tree.includes(n)).toBe(true);
      },
    );

    test("Return false for value not in tree", () => {
      expect(tree.includes(500)).toBe(false);
    });
  });
});
