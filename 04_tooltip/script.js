const links = document.querySelectorAll("a");

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    const id = link.id;
    const tooltip = document.querySelector(`[anchor=${id}]`);
    if (!tooltip.matches(":popover-open")) {
      tooltip.showPopover();
    }
  });
  link.addEventListener("mouseleave", () => {
    const id = link.id;
    const tooltip = document.querySelector(`[anchor=${id}]`);
    if (tooltip.matches(":popover-open")) {
      tooltip.hidePopover();
    }
  });
});
