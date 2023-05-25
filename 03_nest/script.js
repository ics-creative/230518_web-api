// ------------------------------
// ポップオーバーの制御
// ------------------------------
const popoverContainers = document.querySelectorAll(".popover-container");

popoverContainers.forEach((container) => {
  // マウス操作の制御
  container.addEventListener("mouseenter", () => openPopoverOf(container));
  container.addEventListener("mouseleave", () => closePopoverOf(container));
  // キーボード操作の制御
  container.addEventListener("focusin", () => openPopoverOf(container));
  // TODO キーボードでfocusが外れた時の挙動
  // container.addEventListener("focusout", () => {
  //   console.log("focusout");
  //   closePopoverOf(container);
  // });
});

const openPopoverOf = (container) => {
  const popover = container.querySelector(".popover");
  if (!popover.matches(":popover-open")) {
    popover?.showPopover();
  }
};

const closePopoverOf = (container) => {
  const popover = container.querySelector(".popover");
  if (popover.matches(":popover-open")) {
    popover?.hidePopover();
  }
};
