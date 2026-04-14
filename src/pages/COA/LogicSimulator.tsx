import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, User } from 'lucide-react';

interface LogicSimulatorProps {
  type: string;
}

const LogicSimulator = ({ type }: LogicSimulatorProps) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  
  const [out1, setOut1] = useState(0);
  const [out2, setOut2] = useState(0);

  const exportRef = useRef<HTMLDivElement>(null);
  const [studentName, setStudentName] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    switch (type) {
      case 'logic-half-adder': setOut1(a ^ b); setOut2(a & b); break;
      case 'logic-half-sub': setOut1(a ^ b); setOut2((~a & 1) & b); break;
      case 'logic-full-adder':
        const sum1 = a ^ b; const carry1 = a & b;
        setOut1(sum1 ^ c); setOut2(carry1 | (sum1 & c)); break;
      case 'logic-full-sub':
        const diff1 = a ^ b; const borrow1 = (~a & 1) & b;
        setOut1(diff1 ^ c); setOut2(borrow1 | ((~diff1 & 1) & c)); break;
      case 'logic-mux': setOut1(c === 0 ? a : b); setOut2(0); break;
      case 'logic-demux': setOut1(c === 0 ? a : 0); setOut2(c === 1 ? a : 0); break;
      default: setOut1(0); setOut2(0);
    }
  }, [a, b, c, type]);

  const handleExport = async (format: 'png' | 'pdf') => {
    if (!exportRef.current) return;
    setIsExporting(true);
    
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(exportRef.current!, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#0a0f1c'
        });
        const imgData = canvas.toDataURL('image/png');

        if (format === 'png') {
          const link = document.createElement('a');
          link.download = `PIEMR_Experiment_${type}.png`;
          link.href = imgData;
          link.click();
        } else {
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`PIEMR_Experiment_${type}.pdf`);
        }
      } catch (err) {
        console.error("Export failed", err);
      }
      setIsExporting(false);
    }, 100);
  };

  const activeColor = '#39ff14'; // Neon Green
  const inactiveColor = '#1f2937'; // Dark Gray

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

  const hasC = type === 'logic-full-adder' || type === 'logic-full-sub' || type === 'logic-mux' || type === 'logic-demux';
  const hasB = type !== 'logic-demux';

  const w = 600; const h = 350;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Interactive Controller & Export Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: '1rem' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
               <User size={16} color="var(--text-secondary)" style={{ marginRight: '0.5rem' }} />
               <input 
                  type="text" 
                  placeholder="Enter Student Name..." 
                  value={studentName} 
                  onChange={(e) => setStudentName(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '180px', fontSize: '0.9rem' }}
               />
            </div>
         </div>
         <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleExport('png')} style={{ background: 'var(--accent-tertiary)', color: 'black', border: 'none', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <Download size={14} /> PNG
            </button>
            <button onClick={() => handleExport('pdf')} style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              <Download size={14} /> PDF
            </button>
         </div>
      </div>

      {/* Exporter Block */}
      <div ref={exportRef} style={{ background: '#0a0f1c', padding: isExporting ? '2rem' : '1.5rem', borderRadius: '16px', border: '1px solid var(--border-glow)' }}>
         
         {isExporting && (
            <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
               <h2 style={{ color: 'white', margin: 0 }}>PIEMR Virtual Lab - Digital Logic</h2>
               <p style={{ color: 'var(--accent-tertiary)', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>Experiment: {type.replace('logic-', '').toUpperCase()} SIMULATION</p>
               <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Performed by: <strong style={{color:'white'}}>{studentName || 'Anonymous Student'}</strong></p>
            </div>
         )}

         {/* SVG Visualizer */}
         <div style={{ 
            position: 'relative', width: w, height: h, margin: '0 auto',
            background: 'repeating-linear-gradient(rgba(255,255,255,0.02) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 100%)',
            backgroundSize: '20px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden'
          }}>
            <svg width="0" height="0">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </svg>

            <svg width={w} height={h} style={{ position: 'absolute', top: 0, left: 0 }}>
              {(type === 'logic-half-adder' || type === 'logic-half-sub') && (
                <>
                  <Wire path="M 100 100 L 200 100 C 250 100, 250 150, 300 150" on={a} />
                  <Wire path="M 100 250 L 200 250 C 250 250, 250 150, 300 150" on={b} />
                  <Wire path="M 330 150 L 500 150" on={out1} delay={0.5} />
                  <Gate x={300} y={150} label="XOR" typeColor="rgba(212,160,23,0.8)" />
                  <Wire path="M 150 100 L 150 280 L 300 280" on={a} />
                  <Wire path="M 220 250 L 220 280 L 300 280" on={b} />
                  <Wire path="M 330 280 L 500 280" on={out2} delay={0.5} />
                  <Gate x={300} y={280} label="AND" typeColor="rgba(15,158,110,0.8)" />
                </>
              )}

              {(type === 'logic-mux') && (
                <>
                  <Wire path="M 100 80 L 250 80 C 280 80, 280 180, 350 180" on={a} />
                  <Wire path="M 100 180 L 250 180 C 280 180, 280 180, 350 180" on={b} />
                  <Wire path="M 100 280 L 350 280 L 350 220" on={c} />
                  <Wire path="M 400 180 L 500 180" on={out1} delay={0.5} />
                  <path d="M 320 130 L 380 150 L 380 210 L 320 230 Z" fill="rgba(8,145,178,0.3)" stroke="rgba(8,145,178,0.8)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px rgba(8,145,178,0.5))' }} />
                  <text x="350" y="185" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">MUX</text>
                </>
              )}

               {(type === 'logic-full-adder' || type === 'logic-full-sub' || type === 'logic-demux') && (
                 <>
                   <rect x="250" y="70" width="100" height="200" rx="10" fill="#1e1e1e" stroke="#555" strokeWidth="4" />
                   <text x="300" y="175" fill="#aaa" fontSize="16" letterSpacing="2" textAnchor="middle" style={{ writingMode: 'vertical-rl' }}>LSI CORE</text>
                   <Wire path="M 100 100 L 250 100" on={a} />
                   <Wire path="M 100 170 L 250 170" on={b} />
                   {hasC && <Wire path="M 100 240 L 250 240" on={c} />}
                   <Wire path="M 350 120 L 500 120" on={out1} />
                   <Wire path="M 350 220 L 500 220" on={out2} />
                 </>
               )}
            </svg>

            {/* Inputs & Outputs Overlay */}
            <PinButton x={100} y={(type==='logic-mux' || type==='logic-demux') ? 80 : 100} val={a} onClick={() => !isExporting && setA(a ^ 1)} label={type==='logic-mux' ? 'D0' : type==='logic-demux' ? 'IN' : 'A'} />
            {hasB && <PinButton x={100} y={(type==='logic-mux') ? 180 : 170} val={b} onClick={() => !isExporting && setB(b ^ 1)} label={type==='logic-mux' ? 'D1' : 'B'} />}
            {hasC && <PinButton x={100} y={(type==='logic-mux' ? 280 : 240)} val={c} onClick={() => !isExporting && setC(c ^ 1)} label={type==='logic-mux' || type==='logic-demux' ? 'Sel' : 'Cin'} />}

            <PinButton x={500} y={(type==='logic-half-adder' || type==='logic-half-sub') ? 150 : (type==='logic-mux') ? 180 : 120} val={out1} isOutput={true} label={type==='logic-mux' ? 'Y' : type==='logic-demux' ? 'Y0' : type.includes('sub') ? 'Diff' : 'Sum'} />
            {type !== 'logic-mux' && <PinButton x={500} y={(type==='logic-half-adder' || type==='logic-half-sub') ? 280 : 220} val={out2} isOutput={true} label={type==='logic-demux' ? 'Y1' : type.includes('sub') ? 'Borrow' : 'CarryOut'} />}
         </div>

         {isExporting && (
          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
             <p style={{ margin: 0 }}>Designed and Developed by {studentName || 'Student'} | PIEMR Virtual Lab</p>
          </div>
         )}
      </div>

    </div>
  );
};

export default LogicSimulator;
