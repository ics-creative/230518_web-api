const createToastElm = (message, cssName) => {
  // ポップオーバー
  const toast = document.createElement("div");
  toast.popover = "manual";
  toast.classList.add("toast", cssName);
  // コンテンツ
  const content = document.createElement("p");
  content.textContent = message;
  content.classList.add("toast-content");
  toast.appendChild(content);
  // 閉じるボタン
  const closeButton = document.createElement("button");
  closeButton.classList.add("toast-button");
  closeButton.addEventListener("click", () => removeToast(toast));
  toast.appendChild(closeButton);
  return toast;
};

const setupToast = ({ message, cssName }) => {
  // トーストを作成
  const toast = createToastElm(message, cssName);
  // DOMに追加
  document.body.appendChild(toast);
  // showPopoverメソッドで表示する
  toast.showPopover();

  // setTimeoutで一定時間経ったら自動的にポップオーバーを消す
  const timer = setTimeout(() => removeToast(toast), 3000);
  // timeoutを解除するためのtimerをdataset要素として設定する
  toast.dataset.timer = timer;

  // トーストが作成された時と削除された時に並び直す
  toast.addEventListener("toggle", (event) => {
    if (event.newState === "closed") {
      alignToast(true);
    } else {
      alignToast(false);
    }
  });
};

const alignToast = (withMoveAnim) => {
  const toasts = document.querySelectorAll(".toast");
  // トーストを順番に縦に並べる
  toasts.forEach((toast, index) => {
    toast.style.transition = withMoveAnim ? "translate 0.2s linear, opacity 0.2s linear" : "opacity 0.2s linear";
    toast.style.translate = `0px ${(56 + 10) * index}px`;
    toast.style.opacity = 1;
  });
};

const removeToast = (toast) => {
  // hidePopoverメソッドで非表示にする
  toast.hidePopover();
  // 非表示にした後にDOMから削除する
  toast.remove();
  // setTimeoutを解除する
  clearTimeout(toast.dataset.timer);
};

const button = document.getElementById("button");
button.addEventListener("click", () => {
  // ランダムに表示させる内容を作る
  const content = Math.random() > 0.5
    ? { message: "Success!", cssName: "success" }
    : { message: "Error!", cssName: "error" };
  setupToast(content);
});
