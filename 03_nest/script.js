const popoverContainers = document.querySelectorAll(".popover-container");
const withoutPopovers = document.querySelectorAll(
  ".navigation-list > li:not(.popover-container)"
);
const popovers = document.querySelectorAll(".popover");

popoverContainers.forEach((container) => {
  // マウス操作の制御
  container.addEventListener("mouseenter", () => openPopoverOf(container));
  container.addEventListener("mouseleave", () => closePopoverOf(container));
  // キーボード操作の制御
  container.addEventListener("focusin", () => openPopoverOf(container));
  withoutPopovers.forEach((item) => {
    item.addEventListener("focusin", () => closePopoverAll());
  });
});

const openPopoverOf = (container) => {
  // containerから一番近いポップオーバーを取得する
  const popover = container.querySelector(".popover");
  if (popover == null) {
    return;
  }
  // まだ開いていない場合だけshowPopoverを呼ぶ
  if (!popover.matches(":popover-open")) {
    popover.showPopover();
  }
};

const closePopoverOf = (container) => {
  // containerから一番近いポップオーバーを取得する
  const popover = container.querySelector(".popover");
  if (popover == null) {
    return;
  }
  // まだ閉じていない場合だけshowPopoverを呼ぶ
  if (popover.matches(":popover-open")) {
    popover.hidePopover();
  }
};

const closePopoverAll = () => {
  popovers.forEach((popover) => {
    // まだ閉じていないpopoverを全て閉じる
    if (popover.matches(":popover-open")) {
      popover?.hidePopover();
    }
  });
};
