import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
};

const MGParticlesLogo = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const size = 280;
    canvas.width = size;
    canvas.height = size;

    // canvas caché pour dessiner le texte
    const off = document.createElement("canvas");
    off.width = size;
    off.height = size;
    const offCtx = off.getContext("2d")!;

    offCtx.fillStyle = "#0d9488";
    offCtx.font = "bold 80px sans-serif";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillText("MGaye", size / 2, size / 2);

    const imageData = offCtx.getImageData(0, 0, size, size);
    const particles: Particle[] = [];

    for (let y = 0; y < size; y += 3) {
      for (let x = 0; x < size; x += 3) {
        const index = (y * size + x) * 4;
        if (imageData.data[index + 3] > 128) {
          particles.push({
            x: Math.random() * size,
            y: Math.random() * size,
            baseX: x,
            baseY: y,
          });
        }
      }
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      for (const p of particles) {
        // animation douce (respiration)
        const dx = Math.sin(time + p.baseX * 0.05) * 1.5;
        const dy = Math.cos(time + p.baseY * 0.05) * 1.5;

        p.x += (p.baseX + dx - p.x) * 0.1;
        p.y += (p.baseY + dy - p.y) * 0.1;

        ctx.fillStyle = "#0d9488"; // bleu tailwind
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      }

      time += 0.03;
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: 100,
        height: 100,
        display: "inline-block",
        verticalAlign: "middle",
      }}
    />
  );
};

export default MGParticlesLogo;
