import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LogicSimulatorProps {
  type: 'mux' | 'demux' | 'half-adder' | 'half-sub' | 'full-adder' | 'full-sub';
}

const LogicSimulator = ({ type }: LogicSimulatorProps) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  
  const [out1, setOut1] = useState(0);
  const [out2, setOut2] = useState(0);

  useEffect(() => {
    switch (type) {
      case 'half-adder': setOut1(a ^ b); setOut2(a & b); break;
      case 'half-sub': setOut1(a ^ b); setOut2((~a & 1) & b); break;
      case 'full-adder':
        const sum1 = a ^ b; const carry1 = a & b;
        setOut1(sum1 ^ c); setOut2(carry1 | (sum1 & c)); break;
      case 'full-sub':
        const diff1 = a ^ b; const borrow1 = (~a & 1) & b;
        setOut1(diff1 ^ c); setOut2(borrow1 | ((~diff1 & 1) & c)); break;
      case 'mux': setOut1(c === 0 ? a : b); setOut2(0); break;
      case 'demux': setOut1(c === 0 ? a : 0); setOut2(c === 1 ? a : 0); break;
      default: setOut1(0); setOut2(0);
    }
  }, [a, b, c, type]);

  const activeColor = '#39ff14'; // Neon Green
  const inactiveColor = '#1f2937'; // Dark Gray

  // Generates SVG Wire
  const Wire = ({ path, on, delay = 0, animate = true }: any) => (
    <motion.path
      d={path}
      fill="transparent"
      stroke={on ? activeColor : inactiveColor}
      strokeWidth="4"
      initial={animate ? { pathLength: 0 } : false}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay, ease: "easeInOut" }}
      style={{
        filter: on ? `drop-shadow(0 0 8px ${activeColor})` : 'none',
        transition: 'stroke 0.3s ease'
      }}
    />
  );

  // Reusable Logic Gate nodes (SVG rects/paths simulating gates)
  const Gate = ({ x, y, label, typeColor = 'rgba(26,92,190,0.8)' }: any) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-30" y="-20" width="60" height="40" rx="8" fill={typeColor} stroke="rgba(255,255,255,0.2)" strokeWidth="2" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))' }} />
      <text x="0" y="5" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">{label}</text>
    </g>
  );

  const PinButton = ({ x, y, val, label, onClick, isOutput = false }: any) => {
    return (
      <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {!isOutput && <span style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px' }}>{label}</span>}
        <button
          onClick={onClick} disabled={isOutput}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: val ? activeColor : '#111827',
            border: `3px solid ${val ? activeColor : '#374151'}`,
            color: val ? '#000' : '#fff', fontWeight: 'bold', fontSize: '1.2rem',
            cursor: isOutput ? 'default' : 'pointer',
            boxShadow: val ? `0 0 15px ${activeColor}` : 'none',
            transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
          {val}
        </button>
        {isOutput && <span style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '8px' }}>{label}</span>}
      </div>
    );
  };

  const hasC = type === 'full-adder' || type === 'full-sub' || type === 'mux' || type === 'demux';
  const hasB = type !== 'demux';

  // SVG Drawing constraints
  const w = 600; const h = 400;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#0a0a0a', padding: '2rem', borderRadius: '16px', border: '1px solid #333' }}>
      
      <div style={{ 
        position: 'relative', width: w, height: h, 
        background: 'repeating-linear-gradient(rgba(255,255,255,0.02) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 100%)',
        backgroundSize: '20px 20px', borderRadius: '12px', overflow: 'hidden'
      }}>
        
        {/* Glow Filters */}
        <svg width="0" height="0">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>

        <svg width={w} height={h} style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Custom Logic Board Visualizations based on Type */}
          {(type === 'half-adder' || type === 'half-sub') && (
            <>
              {/* Wires to Top Gate (XOR / SUM) */}
              <Wire path="M 100 100 L 200 100 C 250 100, 250 150, 300 150" on={a} />
              <Wire path="M 100 250 L 200 250 C 250 250, 250 150, 300 150" on={b} />
              <Wire path="M 330 150 L 500 150" on={out1} delay={0.5} />
              <Gate x={300} y={150} label="XOR" typeColor="rgba(212,160,23,0.8)" />
              
              {/* Wires to Bottom Gate (AND / CARRY) */}
              <Wire path="M 150 100 L 150 300 L 300 300" on={a} />
              <Wire path="M 220 250 L 220 300 L 300 300" on={b} />
              <Wire path="M 330 300 L 500 300" on={out2} delay={0.5} />
              <Gate x={300} y={300} label="AND" typeColor="rgba(15,158,110,0.8)" />
            </>
          )}

          {(type === 'mux') && (
            <>
              {/* Wires for MUX */ }
              <Wire path="M 100 100 L 250 100 C 280 100, 280 200, 350 200" on={a} />
              <Wire path="M 100 200 L 250 200 C 280 200, 280 200, 350 200" on={b} />
              <Wire path="M 100 300 L 350 300 L 350 230" on={c} />
              <Wire path="M 400 200 L 500 200" on={out1} delay={0.5} />
              {/* MUX Shape */}
              <path d="M 320 150 L 380 170 L 380 230 L 320 250 Z" fill="rgba(8,145,178,0.3)" stroke="rgba(8,145,178,0.8)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px rgba(8,145,178,0.5))' }} />
              <text x="350" y="205" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">MUX</text>
            </>
          )}

           {/** Other types follow similar geometric mapping, simplified here for space constraint **/}
           {/* Fallback geometric traces if not explicitly drawn above (e.g., Full Adders which are massive) */}
           {(type === 'full-adder' || type === 'full-sub' || type === 'demux') && (
             <>
               {/* Just a massive abstract Central IC for complex circuits */}
               <rect x="250" y="100" width="100" height="200" rx="10" fill="#1e1e1e" stroke="#555" strokeWidth="4" />
               <text x="300" y="205" fill="#aaa" fontSize="16" letterSpacing="2" textAnchor="middle" style={{ writingMode: 'vertical-rl' }}>LSI CHIP</text>
               {/* Input traces */}
               <Wire path="M 100 150 L 250 150" on={a} />
               <Wire path="M 100 200 L 250 200" on={b} />
               {hasC && <Wire path="M 100 250 L 250 250" on={c} />}
               {/* Output traces */}
               <Wire path="M 350 150 L 500 150" on={out1} />
               <Wire path="M 350 250 L 500 250" on={out2} />
             </>
           )}

        </svg>

        {/* Floating Input Knobs */}
        <PinButton x={100} y={(type==='mux' || type==='demux') ? 100 : 150} val={a} onChange={() => setA(a ^ 1)} label={type==='mux' ? 'D0' : type==='demux' ? 'IN' : 'A'} />
        {hasB && <PinButton x={100} y={200} val={b} onChange={() => setB(b ^ 1)} label={type==='mux' ? 'D1' : 'B'} />}
        {hasC && <PinButton x={100} y={(type==='mux' ? 300 : 250)} val={c} onChange={() => setC(c ^ 1)} label={type==='mux' || type==='demux' ? 'S' : 'Cin'} />}

        {/* Floating Output Knobs */}
        <PinButton x={500} y={(type==='half-adder' || type==='half-sub') ? 150 : (type==='mux') ? 200 : 150} val={out1} isOutput={true} label={type==='mux' ? 'Y' : type==='demux' ? 'Y0' : type.includes('sub') ? 'Diff' : 'Sum'} />
        {type !== 'mux' && <PinButton x={500} y={(type==='half-adder' || type==='half-sub') ? 300 : 250} val={out2} isOutput={true} label={type==='demux' ? 'Y1' : type.includes('sub') ? 'Borrow' : 'Carry'} />}
        
      </div>
      
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', color: '#9ca3af', fontSize: '0.9rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: activeColor, boxShadow: `0 0 8px ${activeColor}` }} /> High (1)</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 12, height: 12, borderRadius: '50%', background: inactiveColor, border: '1px solid #444' }} /> Low (0)</span>
      </div>

    </div>
  );
};

export default LogicSimulator;
