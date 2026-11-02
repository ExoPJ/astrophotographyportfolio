(function () {
  "use strict";
  document.querySelectorAll(".compare").forEach((box) => {
    const range = box.querySelector(".compare-range");
    let dragging = false;

    const set = (v) => {
      v = Math.max(0, Math.min(100, v));
      range.value = v;
      box.style.setProperty("--pos", v + "%");
    };
    const fromEvent = (e) => {
      const r = box.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 100);
    };

    box.addEventListener("pointerdown", (e) => {
      dragging = true;
      box.setPointerCapture(e.pointerId);
      fromEvent(e);
    });
    box.addEventListener("pointermove", (e) => {
      if (dragging) fromEvent(e);
    });
    const stop = () => (dragging = false);
    box.addEventListener("pointerup", stop);
    box.addEventListener("pointercancel", stop);

    // keyboard support
    range.addEventListener("input", () => set(Number(range.value)));
    set(Number(range.value));
  });
})();
