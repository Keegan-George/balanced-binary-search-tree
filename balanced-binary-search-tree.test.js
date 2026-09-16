import { Tree } from "./balanced-binary-search-tree";
import { test, expect, describe, beforeEach } from "@jest/globals";

let tree;

const NODE_DATA = [1, 3, 5, 7, 9, 11, 13];

describe("Positive cases", () => {
  beforeEach(() => {
    tree = new Tree(NODE_DATA);
  });

  describe("Verify all nodes in tree", () => {
    test.each(NODE_DATA)(
      "Return true for value in tree: includes(%i) => true",
      (n) => {
        expect(tree.includes(n)).toBe(true);
      },
    );

    test.each([
      [1, 2],
      [3, 1],
      [5, 2],
      [7, 0],
      [9, 2],
      [11, 1],
      [13, 2],
    ])("Return depth of value in tree: depth(%i) => %i", (n, expected) => {
      expect(tree.depth(n)).toBe(expected);
    });
  });

  describe("insert nodes", () => {
    test("Can insert new smallest value", () => {
      expect(tree.includes(0)).toBe(false);
      expect(tree.depth(0)).toBeUndefined();
      tree.insert(0);
      expect(tree.includes(0)).toBe(true);
      expect(tree.depth(0)).toBe(3);
    });

    test("Can insert value in middle", () => {
      expect(tree.includes(8)).toBe(false);
      expect(tree.depth(8)).toBeUndefined();
      tree.insert(8);
      expect(tree.includes(8)).toBe(true);
      expect(tree.depth(8)).toBe(3);
    });

    test("Can insert new largest value", () => {
      expect(tree.includes(15)).toBe(false);
      expect(tree.depth(15)).toBeUndefined();
      tree.insert(15);
      expect(tree.includes(15)).toBe(true);
      expect(tree.depth(15)).toBe(3);
    });
  });
});
