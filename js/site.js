(function () {
  "use strict";

  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- Open the dropdown that a #link points to ----
  function openFromHash() {
    const el = location.hash && document.querySelector(location.hash);
    if (el && el.tagName === "DETAILS") el.open = true;
  }
  addEventListener("hashchange", openFromHash);
  openFromHash();

  // ---- Starfield with small meteors falling diagonally ----
  // Meteors play even with "reduce motion" on; only the star twinkle is turned off.
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];
  let meteors = [];
  let nextMeteor = 0;
  let last = 0;

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

  // Meteors travel from the upper right towards the lower left.
  function spawnMeteor() {
    const angle = (Math.random() * 12 + 28) * (Math.PI / 180); // 28-40 degrees below horizontal
    const speed = Math.random() * 350 + 450; // px per second
    const startsOnTop = Math.random() < 0.7;
    meteors.push({
      x: startsOnTop ? Math.random() * innerWidth * 1.2 : innerWidth + 20,
      y: startsOnTop ? -20 : Math.random() * innerHeight * 0.5,
      vx: -Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: Math.random() * 110 + 90,
      w: Math.random() * 0.8 + 1,
      a: Math.random() * 0.3 + 0.7,
    });
  }

  function drawMeteor(m) {
    const speed = Math.hypot(m.vx, m.vy);
    const tx = m.x - (m.vx / speed) * m.len;
    const ty = m.y - (m.vy / speed) * m.len;
    const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
    g.addColorStop(0, `rgba(235, 242, 255, ${m.a})`);
    g.addColorStop(0.35, `rgba(150, 185, 255, ${m.a * 0.55})`);
    g.addColorStop(1, "rgba(127, 168, 255, 0)");
    ctx.globalAlpha = 1;
    ctx.strokeStyle = g;
    ctx.lineWidth = m.w;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(tx, ty);
    ctx.stroke();
    ctx.fillStyle = `rgba(255, 255, 255, ${m.a})`;
    ctx.shadowColor = "#9db9ff";
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.w * 0.9, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function draw(t) {
    const dt = Math.min((t - last) / 1000 || 0, 0.05);
    last = t;
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (const st of stars) {
      const tw = reduceMotion ? 1 : 0.7 + 0.3 * Math.sin(st.p + t * st.s * 0.1);
      ctx.globalAlpha = st.a * tw;
      ctx.fillStyle = "#dfe8ff";
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (t >= nextMeteor && meteors.length < 16) {
      spawnMeteor();
      nextMeteor = t + Math.random() * 350 + 150;
    }
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      if (m.x < -m.len || m.y > innerHeight + m.len) {
        meteors.splice(i, 1);
        continue;
      }
      drawMeteor(m);
    }
    requestAnimationFrame(draw);
  }

  addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();
