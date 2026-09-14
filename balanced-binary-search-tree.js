class Tree {
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    const arrClean = [...new Set(arr.sort())];

    return this.#createBST(arrClean, 0, arrClean.length - 1);
  }

  #createBST(arr, start, end) {
    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = this.#createBST(arr, start, mid - 1);
    root.right = this.#createBST(arr, mid + 1, end);

    return root;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export { Tree };
