const button = document.getElementById("button");
button.addEventListener("click", () => {
  // ランダムに表示させる内容を作る
  const content =
    Math.random() > 0.5
      ? { message: "Success!", cssName: "success" }
      : { message: "Error!", cssName: "error" };
  setupToast(content);
});

const setupToast = ({ message, cssName }) => {
  // トーストをDOMに追加する
  const toast = createToastElm(message, cssName);
  document.body.appendChild(toast);
  // showPopoverメソッドで表示する
  toast.showPopover();

  // setTimeoutで一定時間経ったら自動的にポップオーバーを消す
  const timer = setTimeout(() => removeToast(toast), 3000);
  // timeoutを解除するためのtimerをdataset要素として設定する
  toast.dataset.timer = timer;

  // トーストの表示時と非表示時に並び替える
  toast.addEventListener("toggle", (event) => {
    alignToast(event.newState === "closed");
  });
};

/**
 * トーストを作成します。
 * @param {string} message 表示するメッセージ
 * @param {string} cssName cssのクラス名
 * @return {HTMLDivElement} 作成したトーストエレメント
 */
const createToastElm = (message, cssName) => {
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

const alignToast = (withMoveAnim) => {
  const toasts = document.querySelectorAll(".toast");
  // トーストを順番に縦に並べる
  // withMoveAnimがtrue：opacityとtranslateのアニメーション
  // withMoveAnimがfalse：opacityのアニメーション
  toasts.forEach((toast, index) => {
    toast.style.transition = withMoveAnim
      ? "translate 0.2s linear, opacity 0.2s linear"
      : "opacity 0.2s linear";
    toast.style.translate = `0px ${(56 + 10) * index}px`;
    toast.style.opacity = 1;
  });
};

/**
 * トーストを削除します。
 * @param {HTMLDivElement} toast 削除したいトースト
 */
const removeToast = (toast) => {
  // hidePopoverメソッドで非表示にする
  toast.hidePopover();
  // 非表示にした後にDOMから削除する
  toast.remove();
  // setTimeoutを解除する
  clearTimeout(toast.dataset.timer);
};
