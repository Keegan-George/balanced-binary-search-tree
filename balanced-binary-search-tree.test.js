import { Tree } from "./balanced-binary-search-tree";
import { test, expect, describe, beforeEach } from "@jest/globals";

let tree;

const NODE_DATA = [1, 3, 5, 7, 9, 11, 13];

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
      expect(tree.includes(400)).toBe(false);
    });
  });

  describe("insert() tests", () => {
    test("Can insert new smallest value", () => {
      expect(tree.includes(0)).toBe(false);
      tree.insert(0);
      expect(tree.includes(0)).toBe(true);
    });

    test("Can insert value in middle", () => {
      expect(tree.includes(8)).toBe(false);
      tree.insert(8);
      expect(tree.includes(8)).toBe(true);
    });

    test("Can insert new largest value", () => {
      expect(tree.includes(15)).toBe(false);
      tree.insert(15);
      expect(tree.includes(15)).toBe(true);
    });
  });
});
