/* Cursor effects: glowing dot, trailing ring, stardust trail, click burst.
 * Only runs on devices with a mouse, and respects "reduce motion". */
(function () {
  "use strict";

  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return;

  document.documentElement.classList.add("custom-cursor");

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  const canvas = document.createElement("canvas");
  canvas.className = "cursor-canvas";
  document.body.append(canvas, ring, dot);

  const ctx = canvas.getContext("2d");
  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;
  let lastX = mx, lastY = my;
  let started = false;
  const particles = [];
  const COLORS = ["#7fa8ff", "#a9c4ff", "#c6b3ff", "#ffffff"];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener("resize", resize);

  function spawn(x, y, speed, count, spread) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = Math.random() * speed;
      particles.push({
        x, y,
        vx: Math.cos(a) * v * spread,
        vy: Math.sin(a) * v * spread + 0.15,
        r: Math.random() * 1.8 + 0.6,
        life: 1,
        decay: Math.random() * 0.02 + 0.015,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      });
    }
  }

  addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!started) {
      started = true;
      rx = mx; ry = my;
      document.body.classList.add("cursor-active");
    }
    const dist = Math.hypot(mx - lastX, my - lastY);
    if (dist > 6) {
      spawn(mx, my, 0.8, Math.min(3, 1 + (dist / 25) | 0), 1);
      lastX = mx; lastY = my;
    }
  });

  addEventListener("mousedown", () => {
    ring.classList.add("press");
    spawn(mx, my, 4.5, 28, 1);
  });
  addEventListener("mouseup", () => ring.classList.remove("press"));
  document.addEventListener("mouseleave", () => document.body.classList.remove("cursor-active"));
  document.addEventListener("mouseenter", () => started && document.body.classList.add("cursor-active"));

  const interactive = "a, button, [role='button'], .card, input, textarea, summary";
  document.addEventListener("mouseover", (e) => {
    ring.classList.toggle("hover", !!e.target.closest(interactive));
  });

  function frame() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.globalCompositeOperation = "lighter";
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.97;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.c;
      ctx.shadowColor = p.c;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life + 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
