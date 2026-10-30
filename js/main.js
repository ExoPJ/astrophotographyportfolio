(function () {
  "use strict";

  const grid = document.getElementById("gallery-grid");
  const filterBar = document.querySelector(".filters");
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  let visible = PORTFOLIO.slice();
  let current = 0;
  let lastFocus = null;

  document.getElementById("year").textContent = new Date().getFullYear();

  // ---- Filters ----
  const categories = ["All", ...new Set(PORTFOLIO.map((p) => p.category))];
  if (categories.length > 2) {
    categories.forEach((cat, i) => {
      const b = document.createElement("button");
      b.className = "filter" + (i === 0 ? " active" : "");
      b.textContent = cat;
      b.setAttribute("role", "tab");
      b.addEventListener("click", () => {
        filterBar.querySelectorAll(".filter").forEach((f) => f.classList.remove("active"));
        b.classList.add("active");
        visible = cat === "All" ? PORTFOLIO.slice() : PORTFOLIO.filter((p) => p.category === cat);
        renderGallery();
      });
      filterBar.appendChild(b);
    });
  }

  // ---- Gallery ----
  function renderGallery() {
    grid.innerHTML = "";
    visible.forEach((item, i) => {
      const card = document.createElement("button");
      card.className = "card";
      card.setAttribute("aria-label", `View ${item.title} (${item.catalog})`);
      card.innerHTML = `
        <div class="card-img"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>
        <div class="card-meta">
          <span class="card-catalog">${item.catalog}</span>
          <span class="card-title">${item.title}</span>
          <span class="card-type">${item.type}</span>
        </div>`;
      card.addEventListener("click", () => openLightbox(i));
      grid.appendChild(card);
    });
  }

  // ---- Lightbox ----
  function fillDl(dl, obj) {
    dl.innerHTML = "";
    Object.entries(obj).forEach(([k, v]) => {
      if (!v) return;
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = k;
      dd.textContent = v;
      dl.append(dt, dd);
    });
    return dl.children.length > 0;
  }

  function show(i) {
    current = (i + visible.length) % visible.length;
    const item = visible[current];
    lbImg.classList.remove("loaded");
    lbImg.onload = () => lbImg.classList.add("loaded");
    lbImg.src = item.image;
    lbImg.alt = `${item.title} (${item.catalog})`;
    document.getElementById("lb-catalog").textContent = item.catalog;
    document.getElementById("lb-title").textContent = item.title;
    document.getElementById("lb-type").textContent = item.type;
    document.getElementById("lb-desc").textContent = item.description;
    fillDl(document.getElementById("lb-facts"), item.facts || {});
    const hasCapture = fillDl(document.getElementById("lb-capture"), item.capture || {});
    document.getElementById("lb-capture-wrap").hidden = !hasCapture;
    lightbox.querySelector(".lb-info").scrollTop = 0;
    const multi = visible.length > 1;
    document.getElementById("lb-prev").hidden = !multi;
    document.getElementById("lb-next").hidden = !multi;
  }

  function openLightbox(i) {
    lastFocus = document.activeElement;
    show(i);
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add("open"));
    document.body.style.overflow = "hidden";
    document.getElementById("lb-close").focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => (lightbox.hidden = true), 250);
    if (lastFocus) lastFocus.focus();
  }

  document.getElementById("lb-close").addEventListener("click", closeLightbox);
  document.getElementById("lb-prev").addEventListener("click", () => show(current - 1));
  document.getElementById("lb-next").addEventListener("click", () => show(current + 1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lb-figure")) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft" && visible.length > 1) show(current - 1);
    else if (e.key === "ArrowRight" && visible.length > 1) show(current + 1);
  });

  renderGallery();

  // ---- Subtle starfield background ----
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round((innerWidth * innerHeight) / 6000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.1 + 0.2,
      a: Math.random() * 0.6 + 0.2,
      s: Math.random() * 0.02 + 0.005,
      p: Math.random() * Math.PI * 2,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const st of stars) {
      const tw = reduceMotion ? 1 : 0.7 + 0.3 * Math.sin(st.p + t * st.s * 0.1);
      ctx.globalAlpha = st.a * tw;
      ctx.fillStyle = "#dfe8ff";
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  addEventListener("resize", () => {
    resize();
    if (reduceMotion) draw(0);
  });
  resize();
  requestAnimationFrame(draw);
})();
