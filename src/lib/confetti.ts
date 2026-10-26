export function launchConfetti() {
  if (typeof window === "undefined") return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9998;";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d")!;
  const colors = ["#ff5a24", "#e8400c", "#141413", "#ecebe6", "#8f8c85"];

  const particles = Array.from({ length: 130 }, () => ({
    x: Math.random() * canvas.width,
    y: -Math.random() * canvas.height * 0.4 - 10,
    vx: (Math.random() - 0.5) * 7,
    vy: Math.random() * 3 + 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 10 + 5,
    rotation: Math.random() * 360,
    vr: (Math.random() - 0.5) * 14,
    isRect: Math.random() > 0.4,
    opacity: 1,
  }));

  let frame = 0;
  let animId: number;

  function tick() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.rotation += p.vr;
      if (frame > 80) p.opacity -= 0.013;

      if (p.opacity > 0 && p.y < canvas.height + 30) {
        alive++;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        if (p.isRect) {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    if (alive > 0) {
      animId = requestAnimationFrame(tick);
    } else {
      canvas.remove();
    }
  }

  tick();
  return () => {
    cancelAnimationFrame(animId);
    canvas.remove();
  };
}
