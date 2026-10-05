class Tree {
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    const sorted = [...arr].sort((a, b) => a - b); // to not modify the original array
    const normalized = [...new Set(sorted)];

    return this.#createBST(normalized, 0, normalized.length - 1);
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

  #getNode(value) {
    let current = this.root;

    while (current) {
      if (current.data === value) {
        return current;
      }

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  includes(value) {
    return this.#getNode(value) ? true : false;
  }

  insert(value) {
    let current = this.root;

    while (current) {
      if (current.data === value) {
        return;
      }
      if (value < current.data) {
        if (!current.left) {
          current.left = new Node(value);
          return;
        }
        current = current.left;
      } else {
        //value > current.data
        if (!current.right) {
          current.right = new Node(value);
          return;
        }
        current = current.right;
      }
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Valid callback function must be provided.");
    }

    const queue = [];
    queue.push(this.root);

    let current;
    while (queue.length) {
      current = queue.shift();
      callback(current.data);

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  levelOrderForEachRec(node, callback, queue = []) {
    if (typeof callback !== "function") {
      throw new Error("Valid callback function must be provided.");
    }

    if (node) {
      queue.push(node);
    }

    if (queue.length === 0) {
      return;
    }

    const current = queue.shift();
    callback(current.data);

    if (current.left) {
      queue.push(current.left);
    }

    if (current.right) {
      queue.push(current.right);
    }

    this.levelOrderForEachRec(undefined, callback, queue);
  }

  preOrderForEach(node, callback) {
    if (typeof callback !== "function") {
      throw new Error("Valid callback function must be provided.");
    }

    if (node === null) {
      return;
    }

    callback(node.data);

    this.preOrderForEach(node.left, callback);
    this.preOrderForEach(node.right, callback);
  }

  inOrderForEach(node, callback) {
    if (typeof callback !== "function") {
      throw new Error("Valid callback function must be provided.");
    }
    if (node === null) {
      return;
    }

    this.inOrderForEach(node.left, callback);
    callback(node.data);
    this.inOrderForEach(node.right, callback);
  }

  postOrderForEach(node, callback) {
    if (typeof callback !== "function") {
      throw new Error("Valid callback function must be provided.");
    }

    if (node === null) {
      return;
    }

    this.postOrderForEach(node.left, callback);
    this.postOrderForEach(node.right, callback);
    callback(node.data);
  }

  height(value) {
    const node = this.#getNode(value);

    if (!node) {
      return;
    }

    const heightLeft = this.height(node.left?.data);
    const heightRight = this.height(node.right?.data);

    return (
      Math.max(
        typeof heightLeft === "undefined" ? -1 : heightLeft,
        typeof heightRight === "undefined" ? -1 : heightRight,
      ) + 1
    );
  }

  depth(value) {
    let current = this.root;
    let edges = 0;

    while (current) {
      if (current.data === value) {
        return edges;
      }

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      edges++;
    }
  }

  isBalanced() {
    return this.#balancedTreeHeight(this.root) !== false;
  }

  #balancedTreeHeight(node) {
    if (!node) {
      return -1;
    }

    const heightLeft = this.#balancedTreeHeight(node.left);
    const heightRight = this.#balancedTreeHeight(node.right);

    //if subtree is balanced return its height
    if (
      heightLeft !== false &&
      heightRight !== false &&
      Math.abs(heightLeft - heightRight) <= 1
    ) {
      return Math.max(heightLeft, heightRight) + 1;
    }
    return false;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const tree = new Tree([6]);
tree.insert(4);
tree.insert(7);
tree.insert(3);
tree.insert(5);
tree.insert(1);
tree.insert(2);
tree.prettyPrint();
// tree.levelOrderForEach(console.log);
// console.log("-");
// tree.levelOrderForEachRec(tree.root, console.log);
// console.log("-");
// tree.preOrderForEach(tree.root, console.log);
// console.log("-");
// tree.inOrderForEach(tree.root, console.log);
// console.log("-");
// tree.postOrderForEach(tree.root, console.log);

export { Tree };
