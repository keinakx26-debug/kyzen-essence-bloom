/**
 * Procedural canvas drawing for the cinematic sequence.
 * Everything is generated (no external image dependency): a cardamom pod,
 * its seeds, and a KYZEN packet rendered with a fake-3D Y rotation.
 */

export const PALETTE = {
  bg: "#050a07",
  podLight: "#9fbb7a",
  podMid: "#6d8f4d",
  podDark: "#2f4429",
  seed: "#4a3520",
  seedLight: "#7a5a37",
  gold: "#c9a961",
  ivory: "#efe7d7",
  packet: "#0f2018",
  packetLight: "#1d3a2a",
};

type Ctx = CanvasRenderingContext2D;

/** One cardamom pod: ribbed spindle body with a small stem tip. */
export function drawPod(
  ctx: Ctx,
  cx: number,
  cy: number,
  r: number,
  rotation: number,
  open: number, // 0 = closed, 1 = fully split
  alpha = 1,
) {
  if (alpha <= 0.001) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.rotate(rotation * 0.25);

  const w = r * 0.62;
  const h = r;
  const split = open * r * 0.4;

  const half = (dir: 1 | -1) => {
    ctx.save();
    ctx.translate(dir * split, 0);
    ctx.rotate(dir * open * 0.28);

    const g = ctx.createLinearGradient(-w, -h, w, h);
    g.addColorStop(0, PALETTE.podLight);
    g.addColorStop(0.45, PALETTE.podMid);
    g.addColorStop(1, PALETTE.podDark);

    ctx.beginPath();
    // half-spindle silhouette
    ctx.moveTo(0, -h);
    ctx.bezierCurveTo(dir * w * 1.15, -h * 0.45, dir * w * 1.15, h * 0.45, 0, h);
    ctx.lineTo(0, -h);
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.shadowColor = "rgba(0,0,0,0.55)";
    ctx.shadowBlur = r * 0.35;
    ctx.shadowOffsetY = r * 0.08;
    ctx.fill();
    ctx.shadowBlur = 0;

    // ribs
    ctx.globalAlpha = alpha * 0.35;
    ctx.strokeStyle = PALETTE.podDark;
    ctx.lineWidth = Math.max(1, r * 0.008);
    for (let i = 1; i <= 3; i++) {
      const k = i / 4;
      ctx.beginPath();
      ctx.moveTo(0, -h * (1 - k * 0.1));
      ctx.bezierCurveTo(
        dir * w * 1.15 * k,
        -h * 0.4,
        dir * w * 1.15 * k,
        h * 0.4,
        0,
        h * (1 - k * 0.1),
      );
      ctx.stroke();
    }
    ctx.globalAlpha = alpha;

    // inner cavity shading when open
    if (open > 0.02) {
      ctx.globalAlpha = alpha * open * 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.94);
      ctx.bezierCurveTo(
        dir * w * 0.55,
        -h * 0.4,
        dir * w * 0.55,
        h * 0.4,
        0,
        h * 0.94,
      );
      ctx.closePath();
      ctx.fillStyle = "#16210f";
      ctx.fill();
      ctx.globalAlpha = alpha;
    }
    ctx.restore();
  };

  half(-1);
  half(1);

  // stem
  ctx.globalAlpha = alpha * (1 - open * 0.7);
  ctx.strokeStyle = PALETTE.podDark;
  ctx.lineWidth = Math.max(1.5, r * 0.03);
  ctx.beginPath();
  ctx.moveTo(0, -h);
  ctx.quadraticCurveTo(r * 0.08, -h * 1.18, -r * 0.02, -h * 1.3);
  ctx.stroke();

  ctx.restore();
}

/** A single cardamom seed — small dark faceted grain. */
export function drawSeed(
  ctx: Ctx,
  x: number,
  y: number,
  size: number,
  rot: number,
  depth: number, // 0..1, used for shading + blur feel
  alpha = 1,
) {
  if (alpha <= 0.001 || size <= 0.1) return;
  ctx.save();
  ctx.globalAlpha = alpha * (0.45 + depth * 0.55);
  ctx.translate(x, y);
  ctx.rotate(rot);
  const g = ctx.createLinearGradient(-size, -size, size, size);
  g.addColorStop(0, PALETTE.seedLight);
  g.addColorStop(1, PALETTE.seed);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.85, -size * 0.2);
  ctx.lineTo(size * 0.6, size);
  ctx.lineTo(-size * 0.6, size);
  ctx.lineTo(-size * 0.85, -size * 0.2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * KYZEN packet with a faked Y-axis rotation.
 * rotY in radians: cos() drives horizontal squash, sign picks front/back face.
 */
export function drawPacket(
  ctx: Ctx,
  cx: number,
  cy: number,
  w: number,
  h: number,
  rotY: number,
  label: string,
  alpha = 1,
) {
  if (alpha <= 0.001) return;
  const c = Math.cos(rotY);
  const facing = c >= 0; // front face visible
  const sx = Math.abs(c);
  ctx.save();
  ctx.globalAlpha = alpha;

  // contact shadow
  ctx.save();
  ctx.translate(cx, cy + h * 0.58);
  ctx.scale(1, 0.16);
  const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.9);
  sg.addColorStop(0, "rgba(0,0,0,0.55)");
  sg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.arc(0, 0, w * 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.translate(cx, cy);

  // thin side slab so the packet reads as a solid object edge-on
  const edge = w * 0.14 * Math.abs(Math.sin(rotY));
  if (edge > 0.5) {
    ctx.fillStyle = "#0a170f";
    ctx.beginPath();
    ctx.roundRect(-edge / 2 - (w * sx) / 2, -h / 2, edge + w * sx, h, w * 0.04);
    ctx.fill();
  }

  ctx.save();
  ctx.scale(Math.max(sx, 0.001), 1);

  const g = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
  g.addColorStop(0, PALETTE.packetLight);
  g.addColorStop(0.5, PALETTE.packet);
  g.addColorStop(1, "#081410");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.roundRect(-w / 2, -h / 2, w, h, w * 0.05);
  ctx.fill();

  // crimped top/bottom seals
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fillRect(-w / 2, -h / 2, w, h * 0.07);
  ctx.fillRect(-w / 2, h / 2 - h * 0.07, w, h * 0.07);

  // specular sweep
  const spec = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
  spec.addColorStop(0, "rgba(255,255,255,0)");
  spec.addColorStop(0.42, `rgba(255,255,255,${0.1 + 0.1 * sx})`);
  spec.addColorStop(0.6, "rgba(255,255,255,0)");
  ctx.fillStyle = spec;
  ctx.beginPath();
  ctx.roundRect(-w / 2, -h / 2, w, h, w * 0.05);
  ctx.fill();

  if (facing) {
    ctx.textAlign = "center";
    ctx.fillStyle = PALETTE.ivory;
    ctx.font = `${w * 0.16}px "Cormorant Garamond", serif`;
    ctx.fillText("KYZEN", 0, -h * 0.16);

    ctx.strokeStyle = PALETTE.gold;
    ctx.lineWidth = Math.max(1, w * 0.006);
    ctx.beginPath();
    ctx.moveTo(-w * 0.2, -h * 0.09);
    ctx.lineTo(w * 0.2, -h * 0.09);
    ctx.stroke();

    ctx.fillStyle = PALETTE.gold;
    ctx.font = `${w * 0.052}px Inter, sans-serif`;
    ctx.fillText("PREMIUM GREEN CARDAMOM", 0, h * 0.0);

    ctx.fillStyle = PALETTE.ivory;
    ctx.font = `${w * 0.14}px "Cormorant Garamond", serif`;
    ctx.fillText(label.toUpperCase(), 0, h * 0.34);
  } else {
    // back face: minimal gold rule + tiny copy block
    ctx.strokeStyle = "rgba(201,169,97,0.5)";
    ctx.lineWidth = Math.max(1, w * 0.005);
    ctx.beginPath();
    ctx.roundRect(-w * 0.3, -h * 0.2, w * 0.6, h * 0.4, w * 0.02);
    ctx.stroke();
    ctx.fillStyle = "rgba(239,231,215,0.35)";
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(-w * 0.24, -h * 0.12 + i * h * 0.06, w * 0.48 * (i === 4 ? 0.5 : 1), h * 0.012);
    }
  }
  ctx.restore();
  ctx.restore();
}
