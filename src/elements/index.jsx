import React from 'react';

// Seeded pseudo-random for deterministic organic variation
const seededRand = (seed, index = 0) => {
  const x = Math.sin(seed * 9301 + index * 49297 + 233) * 1e8;
  return x - Math.floor(x);
};

const vary = (base, range, seed, index = 0) =>
  base + (seededRand(seed, index) - 0.5) * range * 2;

// ─────────────────────────────────────────────────────────────
// FLOWER ELEMENTS
// ─────────────────────────────────────────────────────────────

export const Chrysanthemum = ({ seed = 1, ink = '#1c1917' }) => {
  const petalCount = Math.floor(vary(18, 2, seed));
  const innerCount = Math.floor(vary(12, 2, seed, 1));
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = (i * 360) / petalCount + vary(0, 1.5, seed + i, 2);
    const len = vary(24, 3, seed, i + 3);
    const wid = vary(5, 1.2, seed, i + 4);
    return (
      <g key={i} transform={`rotate(${angle} 50 50)`}>
        <ellipse
          cx="50" cy={50 - 10 - len / 2}
          rx={wid / 2} ry={len / 2}
          fill="none" stroke={ink} strokeWidth="0.75"
          opacity={vary(0.85, 0.15, seed, i + 5)}
        />
      </g>
    );
  });
  const innerPetals = Array.from({ length: innerCount }, (_, i) => {
    const angle = (i * 360) / innerCount + 180 / innerCount;
    const len = vary(12, 2, seed, i + 10);
    return (
      <g key={i} transform={`rotate(${angle} 50 50)`}>
        <ellipse
          cx="50" cy={50 - 6 - len / 2}
          rx="2.2" ry={len / 2}
          fill="none" stroke={ink} strokeWidth="0.6"
          opacity="0.7"
        />
      </g>
    );
  });
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {petals}
      {innerPetals}
      <circle cx="50" cy="50" r="5.5" fill="none" stroke={ink} strokeWidth="1" />
      <circle cx="50" cy="50" r="2" fill={ink} />
    </svg>
  );
};

export const PlumBlossom = ({ seed = 2, ink = '#1c1917' }) => {
  const petals = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72) + vary(0, 3, seed, i);
    const rad = angle * (Math.PI / 180);
    const cx = 50 + Math.cos(rad) * vary(17, 1.5, seed, i + 5);
    const cy = 50 + Math.sin(rad) * vary(17, 1.5, seed, i + 6);
    const r = vary(13, 1.5, seed, i + 7);
    return (
      <ellipse
        key={i} cx={cx} cy={cy}
        rx={r} ry={r * vary(0.95, 0.06, seed, i + 8)}
        transform={`rotate(${vary(0, 10, seed, i + 9)} ${cx} ${cy})`}
        fill="none" stroke={ink} strokeWidth="0.9"
      />
    );
  });
  // Stamens
  const stamens = Array.from({ length: 10 }, (_, i) => {
    const angle = (i * 36) + vary(0, 8, seed, i + 20);
    const rad = angle * (Math.PI / 180);
    const x2 = 50 + Math.cos(rad) * vary(9, 1.5, seed, i + 21);
    const y2 = 50 + Math.sin(rad) * vary(9, 1.5, seed, i + 22);
    return (
      <g key={i}>
        <line x1="50" y1="50" x2={x2} y2={y2} stroke={ink} strokeWidth="0.5" />
        <circle cx={x2} cy={y2} r="0.8" fill={ink} />
      </g>
    );
  });
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {petals}
      {stamens}
      <circle cx="50" cy="50" r="4" fill="none" stroke={ink} strokeWidth="0.8" />
    </svg>
  );
};

export const Iris = ({ seed = 3, ink = '#1c1917' }) => {
  const jitter = vary(0, 4, seed);
  return (
    <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      {/* Upright petals */}
      <path
        d={`M50,55 C${42 + vary(0,3,seed,1)},40 ${38+vary(0,3,seed,2)},20 50,${8+vary(0,4,seed,3)} C${62+vary(0,3,seed,4)},20 ${58+vary(0,3,seed,5)},40 50,55`}
        fill="none" stroke={ink} strokeWidth="1"
      />
      <path
        d={`M50,55 C${30+vary(0,3,seed,6)},48 ${18+vary(0,4,seed,7)},30 ${22+vary(0,4,seed,8)},${12+vary(0,4,seed,9)} C${34+vary(0,3,seed,10)},${8+vary(0,3,seed,11)} ${44+vary(0,3,seed,12)},35 50,55`}
        fill="none" stroke={ink} strokeWidth="1"
      />
      <path
        d={`M50,55 C${70+vary(0,3,seed,13)},48 ${82+vary(0,4,seed,14)},30 ${78+vary(0,4,seed,15)},${12+vary(0,4,seed,16)} C${66+vary(0,3,seed,17)},${8+vary(0,3,seed,18)} ${56+vary(0,3,seed,19)},35 50,55`}
        fill="none" stroke={ink} strokeWidth="1"
      />
      {/* Drooping petals */}
      <path
        d={`M50,60 C${46+vary(0,3,seed,20)},72 ${34+vary(0,4,seed,21)},${85+vary(0,4,seed,22)} ${28+vary(0,5,seed,23)},${95+vary(0,4,seed,24)} C${36+vary(0,4,seed,25)},${98+vary(0,3,seed,26)} ${46+vary(0,3,seed,27)},80 50,60`}
        fill="none" stroke={ink} strokeWidth="1"
      />
      <path
        d={`M50,60 C${54+vary(0,3,seed,28)},72 ${66+vary(0,4,seed,29)},${85+vary(0,4,seed,30)} ${72+vary(0,5,seed,31)},${95+vary(0,4,seed,32)} C${64+vary(0,4,seed,33)},${98+vary(0,3,seed,34)} ${54+vary(0,3,seed,35)},80 50,60`}
        fill="none" stroke={ink} strokeWidth="1"
      />
      <path
        d={`M50,60 C50,75 ${50+vary(0,3,seed,36)},${88+vary(0,4,seed,37)} ${50+vary(0,4,seed,38)},${102+vary(0,4,seed,39)} C${52+vary(0,3,seed,40)},${105+vary(0,3,seed,41)} ${48+vary(0,3,seed,42)},85 50,60`}
        fill="none" stroke={ink} strokeWidth="1"
      />
      {/* Center detail */}
      <line x1="50" y1="55" x2="50" y2="60" stroke={ink} strokeWidth="1.5" />
    </svg>
  );
};

export const Lotus = ({ seed = 4, ink = '#1c1917' }) => {
  const layers = [
    { petals: 5, radiusX: 11, radiusY: 20, dist: 6, ry: 0.88 },
    { petals: 7, radiusX: 9, radiusY: 18, dist: 14, ry: 0.85 },
    { petals: 9, radiusX: 8, radiusY: 15, dist: 20, ry: 0.82 },
  ];
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {layers.map((layer, li) =>
        Array.from({ length: layer.petals }, (_, i) => {
          const angle = (i * 360 / layer.petals) + (li * 180 / layer.petals) + vary(0, 2, seed, li * 30 + i);
          const rad = angle * Math.PI / 180;
          const cx = 50 + Math.cos(rad) * layer.dist;
          const cy = 50 + Math.sin(rad) * layer.dist * 0.7;
          const rx = vary(layer.radiusX, 1.5, seed, li * 20 + i + 5);
          const ry = vary(layer.radiusY, 2, seed, li * 20 + i + 6);
          return (
            <ellipse
              key={`${li}-${i}`}
              cx={cx} cy={cy} rx={rx} ry={ry}
              transform={`rotate(${angle + 90} ${cx} ${cy})`}
              fill="none" stroke={ink} strokeWidth={0.9 - li * 0.15}
              opacity={1 - li * 0.15}
            />
          );
        })
      )}
      <circle cx="50" cy="50" r="6" fill="none" stroke={ink} strokeWidth="1" />
      <circle cx="50" cy="50" r="2.5" fill={ink} />
    </svg>
  );
};

export const WildFlower = ({ seed = 5, ink = '#1c1917' }) => {
  const petalCount = Math.floor(vary(7, 1, seed));
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = (i * 360 / petalCount) + vary(0, 5, seed, i);
    const rad = angle * Math.PI / 180;
    const len = vary(26, 4, seed, i + 3);
    const wid = vary(9, 2, seed, i + 4);
    const cx = 50 + Math.cos(rad) * (len / 2 + 5);
    const cy = 50 + Math.sin(rad) * (len / 2 + 5);
    return (
      <ellipse
        key={i} cx={cx} cy={cy} rx={wid / 2} ry={len / 2}
        transform={`rotate(${angle + 90} ${cx} ${cy})`}
        fill="none" stroke={ink} strokeWidth="0.9"
      />
    );
  });
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {petals}
      <circle cx="50" cy="50" r="7" fill="none" stroke={ink} strokeWidth="1" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * 60 + vary(0, 10, seed, i + 20)) * Math.PI / 180;
        return <line key={i} x1="50" y1="50"
          x2={50 + Math.cos(a) * 5} y2={50 + Math.sin(a) * 5}
          stroke={ink} strokeWidth="0.6" />;
      })}
    </svg>
  );
};

export const Poppy = ({ seed = 6, ink = '#1c1917' }) => {
  const petals = Array.from({ length: 4 }, (_, i) => {
    const angle = i * 90 + vary(0, 6, seed, i);
    const rad = angle * Math.PI / 180;
    const cx = 50 + Math.cos(rad) * vary(16, 2, seed, i + 5);
    const cy = 50 + Math.sin(rad) * vary(16, 2, seed, i + 6);
    const rx = vary(16, 2, seed, i + 7);
    const ry = vary(13, 2, seed, i + 8);
    return (
      <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}
        transform={`rotate(${angle} ${cx} ${cy})`}
        fill="none" stroke={ink} strokeWidth="1"
      />
    );
  });
  const stamens = Array.from({ length: 18 }, (_, i) => {
    const a = (i * 20 + vary(0, 5, seed, i + 20)) * Math.PI / 180;
    const r = vary(6, 1.5, seed, i + 21);
    return (
      <g key={i}>
        <line x1="50" y1="50" x2={50 + Math.cos(a) * r} y2={50 + Math.sin(a) * r}
          stroke={ink} strokeWidth="0.5" />
        <circle cx={50 + Math.cos(a) * r} cy={50 + Math.sin(a) * r} r="0.6" fill={ink} />
      </g>
    );
  });
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {petals}
      {stamens}
      <circle cx="50" cy="50" r="3" fill={ink} />
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────
// STEM & BRANCH ELEMENTS
// ─────────────────────────────────────────────────────────────

export const Stem = ({ seed = 10, ink = '#1c1917' }) => {
  const cp1x = vary(50, 12, seed, 1);
  const cp1y = vary(33, 10, seed, 2);
  const cp2x = vary(50, 12, seed, 3);
  const cp2y = vary(67, 10, seed, 4);
  return (
    <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M${50+vary(0,3,seed,5)},5 C${cp1x},${cp1y} ${cp2x},${cp2y} ${50+vary(0,3,seed,6)},155`}
        fill="none" stroke={ink} strokeWidth={vary(1.2, 0.3, seed, 7)} strokeLinecap="round"
      />
    </svg>
  );
};

export const Branch = ({ seed = 11, ink = '#1c1917' }) => {
  const main = { x1: 50 + vary(0,5,seed), y1: 150, x2: 50+vary(0,6,seed,1), y2: 10 };
  const b1a = vary(-35, 8, seed, 2);
  const b1len = vary(35, 8, seed, 3);
  const b1y = vary(60, 15, seed, 4);
  const b2a = vary(30, 8, seed, 5);
  const b2len = vary(28, 8, seed, 6);
  const b2y = vary(90, 15, seed, 7);
  const b3a = vary(-20, 8, seed, 8);
  const b3len = vary(22, 6, seed, 9);
  const b3y = vary(35, 10, seed, 10);
  return (
    <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
      <line {...main} stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
      {/* Branch 1 */}
      <line
        x1={main.x2 + (main.x2 - main.x1) * (b1y / 140)}
        y1={b1y}
        x2={(main.x2 + (main.x2-main.x1)*(b1y/140)) + Math.cos(b1a*Math.PI/180)*b1len}
        y2={b1y + Math.sin(b1a*Math.PI/180)*b1len}
        stroke={ink} strokeWidth="0.9" strokeLinecap="round"
      />
      {/* Branch 2 */}
      <line
        x1={main.x2 + (main.x2 - main.x1) * (b2y / 140)}
        y1={b2y}
        x2={(main.x2 + (main.x2-main.x1)*(b2y/140)) + Math.cos(b2a*Math.PI/180)*b2len}
        y2={b2y + Math.sin(b2a*Math.PI/180)*b2len}
        stroke={ink} strokeWidth="0.8" strokeLinecap="round"
      />
      {/* Branch 3 - sub-branch */}
      <line
        x1={main.x2 + (main.x2 - main.x1) * (b3y / 140)}
        y1={b3y}
        x2={(main.x2 + (main.x2-main.x1)*(b3y/140)) + Math.cos(b3a*Math.PI/180)*b3len}
        y2={b3y + Math.sin(b3a*Math.PI/180)*b3len}
        stroke={ink} strokeWidth="0.7" strokeLinecap="round"
      />
    </svg>
  );
};

export const Bamboo = ({ seed = 12, ink = '#1c1917' }) => {
  const segments = Math.floor(vary(5, 1, seed));
  const segHeight = 130 / segments;
  const xs = Array.from({ length: segments + 1 }, (_, i) => vary(50, 4, seed, i));
  return (
    <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: segments }, (_, i) => (
        <line key={i}
          x1={xs[i]} y1={10 + i * segHeight}
          x2={xs[i+1]} y2={10 + (i+1) * segHeight}
          stroke={ink} strokeWidth={vary(2.5, 0.4, seed, i + 10)}
          strokeLinecap="round"
        />
      ))}
      {/* Nodes */}
      {Array.from({ length: segments - 1 }, (_, i) => (
        <ellipse key={i}
          cx={xs[i+1]} cy={10 + (i+1) * segHeight}
          rx={vary(5, 1, seed, i + 20)} ry="1.5"
          fill="none" stroke={ink} strokeWidth="0.8"
        />
      ))}
      {/* Small leaves at top */}
      <path
        d={`M${xs[segments]},10 C${xs[segments]-20},${vary(0,5,seed,30)} ${xs[segments]-35},${-10+vary(0,5,seed,31)} ${xs[segments]-28},${-22+vary(0,5,seed,32)}`}
        fill="none" stroke={ink} strokeWidth="0.8" strokeLinecap="round"
      />
      <path
        d={`M${xs[segments]},10 C${xs[segments]+15},${vary(0,5,seed,33)} ${xs[segments]+28},${-8+vary(0,5,seed,34)} ${xs[segments]+22},${-20+vary(0,5,seed,35)}`}
        fill="none" stroke={ink} strokeWidth="0.8" strokeLinecap="round"
      />
    </svg>
  );
};

export const WillowBranch = ({ seed = 13, ink = '#1c1917' }) => {
  const drapes = Math.floor(vary(6, 2, seed));
  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
      {/* Main arching branch */}
      <path
        d={`M10,10 C${vary(40,8,seed,1)},${vary(5,5,seed,2)} ${vary(80,8,seed,3)},${vary(5,5,seed,4)} 110,10`}
        fill="none" stroke={ink} strokeWidth="1.2" strokeLinecap="round"
      />
      {/* Drooping fronds */}
      {Array.from({ length: drapes }, (_, i) => {
        const startX = 10 + (i * 100 / (drapes - 1)) + vary(0, 5, seed, i + 5);
        const endX = startX + vary(0, 15, seed, i + 10);
        const endY = vary(110, 30, seed, i + 11);
        const cp1y = vary(50, 20, seed, i + 12);
        return (
          <path key={i}
            d={`M${startX},10 C${startX+vary(-5,8,seed,i+15)},${cp1y} ${endX+vary(-5,8,seed,i+16)},${endY-20} ${endX},${endY}`}
            fill="none" stroke={ink} strokeWidth="0.6" strokeLinecap="round"
            opacity={vary(0.85, 0.15, seed, i + 20)}
          />
        );
      })}
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────
// LEAF ELEMENTS
// ─────────────────────────────────────────────────────────────

export const LargeLeaf = ({ seed = 20, ink = '#1c1917' }) => {
  const lean = vary(0, 8, seed);
  const len = vary(70, 10, seed, 1);
  const wid = vary(22, 5, seed, 2);
  return (
    <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M50,100 C${50-wid+lean},${100-len*0.6} ${50-wid*0.8+lean},${100-len} 50,10 C${50+wid*0.8+lean},${100-len} ${50+wid+lean},${100-len*0.6} 50,100`}
        fill="none" stroke={ink} strokeWidth="0.9"
      />
      {/* Midrib */}
      <path
        d={`M50,100 C${50+lean*0.3},${100-len*0.5} ${50+lean*0.5},${100-len*0.75} 50,10`}
        fill="none" stroke={ink} strokeWidth="0.6"
      />
      {/* Veins */}
      {Array.from({ length: 7 }, (_, i) => {
        const y = 20 + i * 11 + vary(0, 2, seed, i + 5);
        const x = 50 + lean * (1 - (y - 10) / 90) * 0.5;
        const vlen = (wid * 0.6) * (1 - Math.abs(y - 60) / 60);
        return (
          <g key={i}>
            <line x1={x} y1={y} x2={x - vlen} y2={y + vary(4,2,seed,i+12)} stroke={ink} strokeWidth="0.4" opacity="0.6" />
            <line x1={x} y1={y} x2={x + vlen} y2={y + vary(4,2,seed,i+13)} stroke={ink} strokeWidth="0.4" opacity="0.6" />
          </g>
        );
      })}
    </svg>
  );
};

export const RoundLeaf = ({ seed = 21, ink = '#1c1917' }) => {
  const r = vary(32, 5, seed);
  return (
    <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M50,90 C${50-r-vary(0,5,seed,1)},${90-r*0.8} ${50-r*0.7},${90-r*1.8} 50,${90-r*2.1+vary(0,5,seed,2)} C${50+r*0.7},${90-r*1.8} ${50+r+vary(0,5,seed,3)},${90-r*0.8} 50,90`}
        fill="none" stroke={ink} strokeWidth="0.9"
      />
      <line x1="50" y1="90" x2="50" y2="115" stroke={ink} strokeWidth="0.8" />
      {/* Veins */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * 30 - 75) * Math.PI / 180;
        const startR = 5;
        const endR = vary(r * 0.7, 5, seed, i + 5);
        const cy = 90 - r;
        return (
          <line key={i}
            x1={50 + Math.cos(a - Math.PI/2) * startR}
            y1={cy + Math.sin(a - Math.PI/2) * startR}
            x2={50 + Math.cos(a - Math.PI/2) * endR}
            y2={cy + Math.sin(a - Math.PI/2) * endR}
            stroke={ink} strokeWidth="0.4" opacity="0.6"
          />
        );
      })}
    </svg>
  );
};

export const FernFrond = ({ seed = 22, ink = '#1c1917' }) => {
  const leaflets = Math.floor(vary(10, 2, seed));
  return (
    <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
      {/* Main rachis */}
      <path
        d={`M${50+vary(0,4,seed)},150 C${48+vary(0,6,seed,1)},110 ${52+vary(0,6,seed,2)},60 ${50+vary(0,8,seed,3)},5`}
        fill="none" stroke={ink} strokeWidth="0.8" strokeLinecap="round"
      />
      {/* Leaflets */}
      {Array.from({ length: leaflets }, (_, i) => {
        const t = i / leaflets;
        const y = 140 - t * 135;
        const x = 50 + vary(0, 3, seed, i + 5);
        const size = vary(18, 4, seed, i + 6) * (0.5 + t * 0.5);
        const leftAngle = vary(-140, 10, seed, i + 7);
        const rightAngle = vary(-40, 10, seed, i + 8);
        return (
          <g key={i}>
            <path
              d={`M${x},${y} C${x + Math.cos(leftAngle*Math.PI/180)*size*0.5},${y+Math.sin(leftAngle*Math.PI/180)*size*0.5} ${x+Math.cos(leftAngle*Math.PI/180)*size*0.9},${y+Math.sin(leftAngle*Math.PI/180)*size*0.9} ${x+Math.cos(leftAngle*Math.PI/180)*size},${y+Math.sin(leftAngle*Math.PI/180)*size}`}
              fill="none" stroke={ink} strokeWidth="0.7" strokeLinecap="round"
            />
            <path
              d={`M${x},${y} C${x + Math.cos(rightAngle*Math.PI/180)*size*0.5},${y+Math.sin(rightAngle*Math.PI/180)*size*0.5} ${x+Math.cos(rightAngle*Math.PI/180)*size*0.9},${y+Math.sin(rightAngle*Math.PI/180)*size*0.9} ${x+Math.cos(rightAngle*Math.PI/180)*size},${y+Math.sin(rightAngle*Math.PI/180)*size}`}
              fill="none" stroke={ink} strokeWidth="0.7" strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
};

export const GrassBlades = ({ seed = 23, ink = '#1c1917' }) => {
  const blades = Math.floor(vary(5, 2, seed));
  return (
    <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: blades }, (_, i) => {
        const startX = vary(50, 15, seed, i);
        const cpX = vary(startX, 20, seed, i + 5);
        const cpY = vary(80, 20, seed, i + 6);
        const endX = vary(startX + vary(0, 10, seed, i + 7), 10, seed, i + 8);
        const endY = vary(10, 15, seed, i + 9);
        return (
          <path key={i}
            d={`M${startX},150 Q${cpX},${cpY} ${endX},${endY}`}
            fill="none" stroke={ink}
            strokeWidth={vary(0.9, 0.3, seed, i + 10)}
            strokeLinecap="round"
            opacity={vary(0.9, 0.15, seed, i + 11)}
          />
        );
      })}
    </svg>
  );
};

export const MapleBranch = ({ seed = 14, ink = '#1c1917' }) => {
  // 3-lobed maple-ish leaf cluster on a branch
  const lobePoints = (cx, cy, r, phase) =>
    Array.from({ length: 3 }, (_, i) => {
      const a = (i * 120 + phase) * Math.PI / 180;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    });
  return (
    <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      {/* Stem */}
      <line x1={vary(50,4,seed)} y1="130" x2={vary(50,4,seed,1)} y2="60"
        stroke={ink} strokeWidth="1" strokeLinecap="round" />
      {/* Three lobed leaves */}
      {[
        { cx: vary(38,5,seed,2), cy: vary(45,5,seed,3), r: vary(18,3,seed,4), p: -20 },
        { cx: vary(62,5,seed,5), cy: vary(42,5,seed,6), r: vary(17,3,seed,7), p: 10 },
        { cx: vary(50,5,seed,8), cy: vary(28,5,seed,9), r: vary(19,3,seed,10), p: -5 },
      ].map((leaf, li) => {
        const pts = lobePoints(leaf.cx, leaf.cy, leaf.r, leaf.p);
        return (
          <g key={li}>
            {pts.map(([x, y], pi) => (
              <ellipse key={pi} cx={x} cy={y}
                rx={vary(7,1.5,seed,li*10+pi+15)} ry={vary(10,2,seed,li*10+pi+16)}
                transform={`rotate(${vary(pi*120+leaf.p,15,seed,li*10+pi+17)} ${x} ${y})`}
                fill="none" stroke={ink} strokeWidth="0.7"
              />
            ))}
            {/* Leaf center */}
            <circle cx={leaf.cx} cy={leaf.cy} r="2" fill="none" stroke={ink} strokeWidth="0.5" />
          </g>
        );
      })}
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────
// ELEMENT REGISTRY
// ─────────────────────────────────────────────────────────────

export const ELEMENTS = [
  {
    id: 'chrysanthemum',
    label: '菊 Chrysanthemum',
    category: 'flowers',
    component: Chrysanthemum,
    defaultWidth: 90,
    defaultHeight: 90,
    viewBox: '0 0 100 100',
    hint: 'The emperor\'s flower — layered symmetry',
  },
  {
    id: 'plum-blossom',
    label: '梅 Plum Blossom',
    category: 'flowers',
    component: PlumBlossom,
    defaultWidth: 90,
    defaultHeight: 90,
    viewBox: '0 0 100 100',
    hint: 'First bloom of spring',
  },
  {
    id: 'iris',
    label: '菖蒲 Iris',
    category: 'flowers',
    component: Iris,
    defaultWidth: 75,
    defaultHeight: 110,
    viewBox: '0 0 100 120',
    hint: 'Bold form, upward seeking',
  },
  {
    id: 'lotus',
    label: '蓮 Lotus',
    category: 'flowers',
    component: Lotus,
    defaultWidth: 90,
    defaultHeight: 90,
    viewBox: '0 0 100 100',
    hint: 'Rising from still water',
  },
  {
    id: 'wildflower',
    label: '野花 Wild Flower',
    category: 'flowers',
    component: WildFlower,
    defaultWidth: 80,
    defaultHeight: 80,
    viewBox: '0 0 100 100',
    hint: 'Small, unassuming grace',
  },
  {
    id: 'poppy',
    label: '罌粟 Poppy',
    category: 'flowers',
    component: Poppy,
    defaultWidth: 85,
    defaultHeight: 85,
    viewBox: '0 0 100 100',
    hint: 'Four petals, quiet strength',
  },
  {
    id: 'stem',
    label: '茎 Stem',
    category: 'stems',
    component: Stem,
    defaultWidth: 30,
    defaultHeight: 120,
    viewBox: '0 0 100 160',
    hint: 'The line that holds everything',
  },
  {
    id: 'branch',
    label: '枝 Branch',
    category: 'stems',
    component: Branch,
    defaultWidth: 50,
    defaultHeight: 130,
    viewBox: '0 0 100 160',
    hint: 'Seeking light in many directions',
  },
  {
    id: 'bamboo',
    label: '竹 Bamboo',
    category: 'stems',
    component: Bamboo,
    defaultWidth: 35,
    defaultHeight: 130,
    viewBox: '0 0 100 160',
    hint: 'Resilience in sections',
  },
  {
    id: 'willow',
    label: '柳 Willow',
    category: 'stems',
    component: WillowBranch,
    defaultWidth: 120,
    defaultHeight: 120,
    viewBox: '0 0 120 160',
    hint: 'Yielding with the wind',
  },
  {
    id: 'maple-branch',
    label: '楓 Maple',
    category: 'stems',
    component: MapleBranch,
    defaultWidth: 80,
    defaultHeight: 110,
    viewBox: '0 0 100 140',
    hint: 'Three lobes, autumn memory',
  },
  {
    id: 'large-leaf',
    label: '葉 Leaf',
    category: 'leaves',
    component: LargeLeaf,
    defaultWidth: 55,
    defaultHeight: 100,
    viewBox: '0 0 100 120',
    hint: 'The quiet counterpoint',
  },
  {
    id: 'round-leaf',
    label: '丸葉 Round Leaf',
    category: 'leaves',
    component: RoundLeaf,
    defaultWidth: 65,
    defaultHeight: 90,
    viewBox: '0 0 100 120',
    hint: 'Soft, grounded presence',
  },
  {
    id: 'fern',
    label: '羊歯 Fern',
    category: 'leaves',
    component: FernFrond,
    defaultWidth: 65,
    defaultHeight: 130,
    viewBox: '0 0 100 160',
    hint: 'Ancient, unhurried growth',
  },
  {
    id: 'grass',
    label: '草 Grass',
    category: 'leaves',
    component: GrassBlades,
    defaultWidth: 65,
    defaultHeight: 120,
    viewBox: '0 0 100 160',
    hint: 'Where wind becomes visible',
  },
];

export const CATEGORIES = [
  { id: 'flowers', label: '花 Flowers' },
  { id: 'stems', label: '枝 Branches' },
  { id: 'leaves', label: '葉 Leaves' },
];

export const getElementById = (id) => ELEMENTS.find(el => el.id === id);

export const renderElementSVG = ({ type, seed, ink = '#1c1917', width, height }) => {
  const def = getElementById(type);
  if (!def) return null;
  const Comp = def.component;
  return (
    <svg
      width={width || def.defaultWidth}
      height={height || def.defaultHeight}
      viewBox={def.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Comp seed={seed} ink={ink} />
    </svg>
  );
};
