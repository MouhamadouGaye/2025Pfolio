// import { useEffect, useRef } from "react";

// type Particle = {
//   x: number;
//   y: number;
//   dx: number;
//   dy: number;
// };

// const ParticleNetwork: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current!;
//     const ctx = canvas.getContext("2d")!;

//     const particles: Particle[] = [];
//     const PARTICLE_COUNT = 60;
//     const MAX_DIST = 120;

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     // Init particules
//     for (let i = 0; i < PARTICLE_COUNT; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         dx: (Math.random() - 0.5) * 1.5,
//         dy: (Math.random() - 0.5) * 1.5,
//       });
//     }

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Dessiner les particules
//       particles.forEach((p) => {
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
//         ctx.fillStyle = "white";
//         ctx.fill();
//       });

//       // Dessiner les lignes
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < MAX_DIST) {
//             ctx.beginPath();
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.strokeStyle = `rgba(0, 150, 255, ${1 - dist / MAX_DIST})`;
//             ctx.stroke();
//           }
//         }
//       }

//       // Update positions
//       particles.forEach((p) => {
//         p.x += p.dx;
//         p.y += p.dy;

//         // rebond
//         if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
//         if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
//       });

//       requestAnimationFrame(draw);
//     };

//     draw();
//   }, []);

//   return (
//     <canvas ref={canvasRef} style={{ display: "block", background: "black" }} />
//   );
// };

// export default ParticleNetwork;
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  state: number; // 0 ou 1
  nextState: number;
};

const ParticleNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const PARTICLE_COUNT = 80;
    const MAX_DIST = 100;

    const particles: Particle[] = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 🔹 Initialisation
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
        state: 0,
        nextState: 0,
      });
    }

    // 🔥 sources de signal (2 particules "input")
    const inputA = particles[0];
    const inputB = particles[1];

    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      tick++;

      // 🔹 on injecte un signal périodique (comme un CPU clock)
      inputA.state = tick % 60 < 30 ? 1 : 0;
      inputB.state = tick % 90 < 45 ? 1 : 0;

      let globalSum = 0;

      // 🔹 CALCUL : propagation type "porte OR locale"
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let active = p.state;

        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue;

          const q = particles[j];

          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST && q.state === 1) {
            active = 1; // 🔥 propagation logique (OR spatial)
          }
        }

        p.nextState = active;
      }

      // 🔹 appliquer les nouveaux états + mouvement
      for (const p of particles) {
        p.state = p.nextState;

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        globalSum += p.state;

        // draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.state === 1 ? "cyan" : "rgba(255,255,255,0.15)";
        ctx.fill();
      }

      // 🔹 connexions
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            const alpha = 1 - dist / MAX_DIST;
            ctx.strokeStyle = `rgba(0, 150, 255, ${alpha * 0.4})`;
            ctx.stroke();
          }
        }
      }

      // 🔹 OUTPUT (résultat du calcul global)
      const avg = globalSum / particles.length;

      ctx.fillStyle = "white";
      ctx.font = "18px monospace";
      ctx.fillText(`Signal global: ${avg.toFixed(2)}`, 20, 40);

      // couleur globale du système = résultat du calcul
      canvas.style.background = `rgba(0, 0, 0, ${0.2 + avg * 0.5})`;

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default ParticleNetwork;
