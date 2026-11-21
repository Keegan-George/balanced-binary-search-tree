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

  describe("Tree insertion", () => {
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

  describe("tree deletion", () => {
    test("Can delete leaf root node", () => {
      const tree = new Tree([2]);
      expect(tree.includes(2)).toBe(true);
      tree.deleteItem(2);
      expect(tree.includes(2)).toBe(false);
      expect(tree.root).toBeNull();
    });

    test("Delete single leaf node from two-node tree", () => {
      const tree = new Tree([2, 3]);
      tree.deleteItem(3);
      expect(tree.includes(2)).toBe(true);
      expect(tree.includes(3)).toBe(false);
      expect(tree.root.left).toBeNull();
      expect(tree.root.right).toBeNull();
      tree.deleteItem(2);
      expect(tree.includes(2)).toBe(false);
      expect(tree.root).toBeNull();
    });

    test("Delete all nodes starting from leaves of three-node tree", () => {
      const tree = new Tree([1, 2, 3]);
      tree.deleteItem(1);
      tree.deleteItem(3);
      expect(tree.includes(1)).toBe(false);
      expect(tree.includes(3)).toBe(false);
      expect(tree.includes(2)).toBe(true);
      expect(tree.root.left).toBeNull();
      expect(tree.root.right).toBeNull();
      tree.deleteItem(2);
      expect(tree.includes(2)).toBe(false);
      expect(tree.root).toBeNull();
    });

    test("Delete all nodes starting from leaves of seven-node tree", () => {
      const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
      tree.deleteItem(1);
      tree.deleteItem(3);
      tree.deleteItem(5);
      tree.deleteItem(7);
      expect(tree.includes(1)).toBe(false);
      expect(tree.includes(3)).toBe(false);
      expect(tree.includes(5)).toBe(false);
      expect(tree.includes(7)).toBe(false);
      expect(tree.includes(2)).toBe(true);
      expect(tree.includes(4)).toBe(true);
      expect(tree.includes(6)).toBe(true);
      tree.deleteItem(2);
      tree.deleteItem(6);
      expect(tree.includes(2)).toBe(false);
      expect(tree.includes(6)).toBe(false);
      expect(tree.includes(4)).toBe(true);
      expect(tree.root.left).toBeNull();
      expect(tree.root.right).toBeNull();
      tree.deleteItem(4);
      expect(tree.includes(4)).toBe(false);
      expect(tree.root).toBeNull();
    });
  });

  describe("Tree traversal", () => {
    test("Create array of node values in level order (non-recursively)", () => {
      const levelOrderArray = [];
      tree.levelOrderForEach((n) => levelOrderArray.push(n));
      expect(levelOrderArray).toEqual([7, 3, 11, 1, 5, 9, 13]);
    });

    test("Create array of node values in level order", () => {
      const levelOrderRecArray = [];
      tree.levelOrderForEachRec(tree.root, (n) => levelOrderRecArray.push(n));
      expect(levelOrderRecArray).toEqual([7, 3, 11, 1, 5, 9, 13]);
    });

    test("Create array of node values in order", () => {
      const inOrderArray = [];
      tree.inOrderForEach(tree.root, (n) => inOrderArray.push(n));
      expect(inOrderArray).toEqual([1, 3, 5, 7, 9, 11, 13]);
    });

    test("Create array of node values in pre-order", () => {
      const preOrderArray = [];
      tree.preOrderForEach(tree.root, (n) => preOrderArray.push(n));
      expect(preOrderArray).toEqual([7, 3, 1, 5, 11, 9, 13]);
    });

    test("Create array of node values in post-order", () => {
      const postOrderArray = [];
      tree.postOrderForEach(tree.root, (n) => postOrderArray.push(n));
      expect(postOrderArray).toEqual([1, 5, 3, 9, 13, 11, 7]);
    });
  });
});

describe("Tree rebalance", () => {
  test("Rebalance when all nodes on left", () => {
    const tree = new Tree([3]);
    tree.insert(2);
    tree.insert(1);
    expect(tree.isBalanced()).toBe(false);
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  });

  test("Rebalance when all nodes on right", () => {
    const tree = new Tree([3]);
    tree.insert(2);
    tree.insert(1);
    expect(tree.isBalanced()).toBe(false);
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  });

  test("Rebalance when three nodes on left, one node on right", () => {
    const tree = new Tree([6]);
    tree.insert(4);
    tree.insert(7);
    tree.insert(3);
    tree.insert(5);
    tree.insert(1);
    tree.insert(2);
    expect(tree.isBalanced()).toBe(false);
    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  });
});
