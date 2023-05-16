const createToastElm = (message, cssName) => {
  // ポップオーバー
  const toast = document.createElement("div");
  toast.popover = "manual";
  toast.classList.add("toast", cssName);
  // コンテンツ
  const content = document.createElement("p");
  content.textContent = message;
  content.classList.add("toastContent");
  toast.appendChild(content);
  // 閉じるボタン
  const closeButton = document.createElement("button");
  closeButton.classList.add("toastButton");
  closeButton.addEventListener("click", () => removeToast(toast));
  toast.appendChild(closeButton);

  return toast;
}

const setupToast = ({message, cssName}) => {
  // トーストを作成
  const toast = createToastElm(message, cssName);

  // DOMに追加
  document.body.appendChild(toast);
  // showPopoverメソッドで表示する
  toast.showPopover();

  // トーストが作成された時と削除された時に並び直す
  toast.addEventListener("toggle", (event) => {
    alignToast();
    if(event.newState === "closed") {
      console.log("closed")
      // TODO
      // clearTimeout(timer);
    }
  });

  // setTimeoutで一定時間経ったら自動的にポップオーバーを消す
  // timer = setTimeout(() => removeToast(toast), 3000);
}

const alignToast = () => {
  const toasts = document.querySelectorAll(".toast");
  toasts.forEach((toast, index) => {
    toast.style.transition = "unset";
    toast.style.translate = `0px ${(56 + 10) * index}px`; 
    toast.style.transition = "translate 0.2s linear";
  })
}

const removeToast = (toast) => {
  // hidePopoverメソッドで非表示にする
  toast.hidePopover();
  // 非表示にした後にDOMから削除する
  toast.remove();
}

const button = document.getElementById("button");
button.addEventListener("click", () => {
  // ランダムに表示させる内容を作る
  const content = Math.random() > 0.5
    ? {message: "Success!", cssName: "success"}
    : {message: "Error!", cssName: "error"};
  setupToast(content);
});
