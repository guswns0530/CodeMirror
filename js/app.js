class CodeMirror {
  constructor(textarea) {
    this.textarea = textarea;

    this.init();
  }

  init() {
    this.textarea.innerHTML = `<div id="code-mirror"></div>
        <div id="code-mirror-textarea"></div>`;
    this.textarea.style = "position: relative;";

    this.codeMirror = this.textarea.querySelector("#code-mirror");
    this.codeMirrorTextarea = this.textarea.querySelector(
      "#code-mirror-textarea"
    );

    this.addEvent();
  }

  addEvent() {
    this.codeMirrorTextarea.addEventListener(
      "input",
      this.inputCodeMirrorEvent
    );
    this.codeMirrorTextarea.addEventListener("scroll", (e) => {
      this.scrollEvent(e);
    });
  }

  inputCodeMirrorEvent = (e) => {
    //본문 removeStyle
    this.removeStyleEvent(e)

    // rendering
    this.changeEvent(e);

    // resize
    this.resizeEvent(e);

    // scroll
    this.scrollEvent(e);
  };

  scrollEvent(e) {
    const { target } = e;
    setTimeout(() => {
      const { scrollTop } = target;

      this.codeMirror.scrollTop = scrollTop;
    }, 10);
  }

  resizeEvent(e) {
    const { target } = e;
    target.style = "height: 0px";

    const { scrollHeight, clientHeight } = target;

    if (clientHeight < scrollHeight) {
      target.classList.add("active-scroll");
      this.codeMirror.classList.add("active-scroll");
    } else {
      target.classList.remove("active-scroll");
      this.codeMirror.classList.remove("active-scroll");
    }
  }

  changeEvent(e) {
    const { childNodes } = this.codeMirrorTextarea;
    const list = this.setList(childNodes);

    this.codeMirror.innerHTML = "";

    list.forEach((str) => {
      const div = document.createElement("div");
      //   div.style = "background-color: rgb(255, 0, 0, 0.5)";

      div.innerText = str;

      this.codeMirror.append(div);
    });
  }

  setList = (childNodes) => {
    const list = [];
    const { length } = childNodes;

    if (!childNodes[0]) {
      return list;
    }

    if (childNodes[0].nodeType !== Node.TEXT_NODE) {
      const { childNodes: nodeList } = childNodes[0];

      if (nodeList.length === 0) {
        list.push("");
      } else {
        list.push(...this.setList(nodeList));
      }
    } else {
      list.push(childNodes[0].textContent);
    }

    for (let i = 1; i < length; i++) {
      const node = childNodes[i];
      const { textContent } = node;
      const { previousSibling: prevNode } = childNodes[i];

      if (Node.TEXT_NODE === node.nodeType || node.nodeName === "SPAN") {
        if (Node.TEXT_NODE === prevNode.nodeType) {
          
        }
      }

      if (
        (Node.TEXT_NODE === prevNode.nodeType &&
          Node.TEXT_NODE === node.nodeType) ||
        node.nodeName === "SPAN"
      ) {
        console.log("no block text", node.textContent);
        list[list.length - 1] = list[list.length - 1] + node.textContent;
        continue;
      } else if (node.childNodes) {
        const findList = this.setList(node.childNodes);

        if (findList.length === 0) {
          list.push("");
          continue;
        }
        list.push(...findList);
        continue;
      }

      list.push(textContent);
    }

    return list;
  };

  removeStyle(div) {
    div.childNodes.forEach((node) => {});
  }
}

const codeMirror = new CodeMirror(document.querySelector(".textarea"));
