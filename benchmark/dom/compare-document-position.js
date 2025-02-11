"use strict";
const suite = require("../document-suite");

exports["compare siblings"] = function () {
  const SIBLINGS = 10000;
  let parent, children, it;

  return suite({
    setup(document) {
      parent = document.createElement("div"); // contain node element to the div tag
      children = new Array(Math.max(SIBLINGS, this.count));
      if (children.length % 2 === 1) {
        ++children.length; // avoid looking up a .5 index
      }

      for (let i = 0; i < children.length; ++i) {
        children[i] = document.createElement("span");
        parent.appendChild(children[i]);
      }

      it = 0;
    },
    fn() {
      children[it].compareDocumentPosition(children[(it + children.length / 2) % children.length]);
      ++it;
    }
  });
};

exports["compare descendant"] = function () {
  const DEPTH = 1000;
  const JUNK_CHILDREN = 10;
  let parent, deepest;

  return suite({
    setup(document) {
      parent = document.createElement("div");
      deepest = parent;

      for (let i = 0; i < DEPTH; ++i) {
        const newNode = document.createElement("div");
        for (let j = 0; j < JUNK_CHILDREN; ++j) {
          newNode.appendChild(document.createElement("div"));
        }

        deepest.appendChild(newNode);
        deepest = newNode;
      }
    },
    fn() {
      parent.compareDocumentPosition(deepest);
    }
  });
};

exports["compare ancestor"] = function () {
  const DEPTH = 1000;
  const JUNK_CHILDREN = 10;
  let parent, deepest;

  return suite({
    setup(document) {
      parent = document.createElement("div");
      deepest = parent;

      for (let i = 0; i < DEPTH; ++i) {
        const newNode = document.createElement("div");
        for (let j = 0; j < JUNK_CHILDREN; ++j) {
          newNode.appendChild(document.createElement("div"));
        }

        deepest.appendChild(newNode);
        deepest = newNode;
      }
    },
    fn() {
      deepest.compareDocumentPosition(parent);
    }
  });
};
