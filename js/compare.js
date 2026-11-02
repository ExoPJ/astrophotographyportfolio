(function () {
  "use strict";
  const box = document.getElementById("compare");
  if (!box) return;
  const range = box.querySelector(".compare-range");
  const set = () => box.style.setProperty("--pos", range.value + "%");
  range.addEventListener("input", set);
  set();
})();
