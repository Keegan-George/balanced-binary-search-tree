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

  height(value) {
    const node = this.#getNode(value);

    if (!node) {
      return;
    }

    const height_left = this.height(node.left?.data);
    const height_right = this.height(node.right?.data);

    return (
      Math.max(
        typeof height_left === "undefined" ? -1 : height_left,
        typeof height_right === "undefined" ? -1 : height_right,
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
    return this.#subTreeHeight(this.root) !== false;
  }

  #subTreeHeight(node) {
    if (!node) {
      return -1;
    }

    const height_left = this.#subTreeHeight(node.left);
    const height_right = this.#subTreeHeight(node.right);

    //if subtree is balanced return its height
    if (Math.abs(height_left - height_right) <= 1) {
      return Math.max(height_left, height_right) + 1;
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

export { Tree, Node };
