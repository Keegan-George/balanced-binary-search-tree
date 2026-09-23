import { Tree, Node } from "./balanced-binary-search-tree";
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
      [1, 0],
      [3, 1],
      [5, 0],
      [7, 2],
      [9, 0],
      [11, 1],
      [13, 0],
    ])("Return height of value in tree: height(%i) => %i", (n, expected) => {
      expect(tree.height(n)).toBe(expected);
    });

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

    test("tree is balanced", () => {
      expect(tree.isBalanced()).toBe(true);
    });
  });

  describe("insert nodes", () => {
    test("Can insert new smallest value", () => {
      expect(tree.includes(0)).toBe(false);
      expect(tree.height(0)).toBeUndefined();
      expect(tree.depth(0)).toBeUndefined();
      expect(tree.height(1)).toBe(0);
      expect(tree.isBalanced()).toBe(true);
      tree.insert(0);
      expect(tree.includes(0)).toBe(true);
      expect(tree.height(0)).toBe(0);
      expect(tree.depth(0)).toBe(3);
      expect(tree.height(1)).toBe(1);
      expect(tree.isBalanced()).toBe(true);
    });

    test("Can insert middle value node", () => {
      expect(tree.includes(8)).toBe(false);
      expect(tree.height(8)).toBeUndefined();
      expect(tree.depth(8)).toBeUndefined();
      expect(tree.height(9)).toBe(0);
      expect(tree.isBalanced()).toBe(true);
      tree.insert(8);
      expect(tree.includes(8)).toBe(true);
      expect(tree.height(8)).toBe(0);
      expect(tree.depth(8)).toBe(3);
      expect(tree.height(9)).toBe(1);
      expect(tree.isBalanced()).toBe(true);
    });

    test("Can insert new largest value", () => {
      expect(tree.includes(15)).toBe(false);
      expect(tree.height(15)).toBeUndefined();
      expect(tree.depth(15)).toBeUndefined();
      expect(tree.height(13)).toBe(0);
      expect(tree.isBalanced()).toBe(true);
      tree.insert(15);
      expect(tree.height(15)).toBe(0);
      expect(tree.includes(15)).toBe(true);
      expect(tree.depth(15)).toBe(3);
      expect(tree.height(13)).toBe(1);
      expect(tree.isBalanced()).toBe(true);
    });
  });
});

describe("Unbalanced tree scenarios", () => {
  test("All nodes on left", () => {
    const tree = new Tree([3]);
    tree.root.left = new Node(2);
    tree.root.left.left = new Node(1);
    expect(tree.isBalanced()).toBe(false);
  });

  test("All nodes on right", () => {
    const tree = new Tree([3]);
    tree.root.right = new Node(2);
    tree.root.right.right = new Node(1);
    expect(tree.isBalanced()).toBe(false);
  });

  test("Subtree on left one node on right", () => {
    const tree = new Tree([0]);
    tree.root.left = new Node(1);
    tree.root.right = new Node(2);
    tree.root.left.left = new Node(3);
    tree.root.left.right = new Node(4);
    tree.root.left.left.left = new Node(5);
    expect(tree.isBalanced()).toBe(false);
  });
});
