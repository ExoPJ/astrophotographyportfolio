(function () {
  "use strict";
  document.querySelectorAll(".compare").forEach((box) => {
    const range = box.querySelector(".compare-range");
    const set = () => box.style.setProperty("--pos", range.value + "%");
    range.addEventListener("input", set);
    set();
  });
})();
