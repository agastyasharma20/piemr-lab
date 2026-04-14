import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Database, Cpu, Activity, Hash, SquareTerminal, Download, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface AssemblySimulatorProps {
  expId: string;
  title: string;
}

const AssemblySimulator = ({ expId, title }: AssemblySimulatorProps) => {
  const [registers, setRegisters] = useState({
    A: '00', B: '00', C: '00', D: '00', E: '00', H: '00', L: '00'
  });

  const [memory, setMemory] = useState<Record<string, string>>({
    '2000': '04', '2001': '03', '2002': '00', '2003': '00',
    '3000': '01', '3001': '02', '3002': '03', '300A': '00'
  });

  const [isRunning, setIsRunning] = useState(false);
  const [activeReg, setActiveReg] = useState<string | null>(null);
  const [activeMem, setActiveMem] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [code, setCode] = useState("");

  const [studentName, setStudentName] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch(expId) {
      case 'asm-add-8bit': setCode("; Addition of Two 8-bit Numbers\nLXI H, 2000H\nMOV A, M\nINX H\nADD M\nSTA 2002H\nHLT"); break;
      case 'asm-mul-8bit': setCode("; Multiplication via Repeated Addition\nLDA 2000H\nMOV B, A\nLDA 2001H\nMOV C, A\nMVI A, 00H\nLOOP: ADD B\nDCR C\nJNZ LOOP\nSTA 2002H\nHLT"); break;
      case 'asm-add-16bit': setCode("; Addition of 16-bit Numbers\nLHLD 2000H\nXCHG\nLHLD 2002H\nDAD D\nSHLD 2004H\nHLT"); break;
      case 'asm-test-bit': setCode("; Test if Any Bit is 0\nLDA 2000H\nCPI FFH\nJZ SET_FF\nMVI A, 00H\nSTA 2001H\nHLT\nSET_FF: MVI A, FFH\nSTA 2001H\nHLT"); break;
      case 'asm-load-regs': setCode("; Sequential Register Load\nLXI H, 2000H\nMOV C, M\nINX H\nMOV D, M\nINX H\nMOV E, M\nDCX H\nMOV A, M\nHLT"); break;
      case 'asm-inc-array': setCode("; Increment Array\nLXI H, 2000H\nMVI C, 10H\nLOOP: INR M\nINX H\nDCR C\nJNZ LOOP\nHLT"); break;
      case 'asm-sum-array': setCode("; Array Summation (Mock 3 elements)\nLXI H, 3000H\nMVI C, 03H\nXRA A\nLOOP: ADD M\nINX H\nDCR C\nJNZ LOOP\nSTA 300AH\nHLT"); break;
      default: setCode("; Insert Intel 8085 Instructions here\n\nHLT");
    }
  }, [expId]);

  const logMsg = (msg: string) => setLogs(prev => [...prev, msg]);

  const executeSimulation = async () => {
    setIsRunning(true);
    setLogs([]);
    setActiveReg(null);
    setActiveMem(null);
    
    logMsg("System: Booting 8085 Emulator Core...");
    await new Promise(r => setTimeout(r, 600));

    const pushReg = async (reg: string, val: string, msg: string) => {
       logMsg(msg);
       setActiveReg(reg);
       setRegisters(prev => ({ ...prev, [reg]: val }));
       await new Promise(r => setTimeout(r, 500));
    };

    const pushMem = async (addr: string, val: string, msg: string) => {
        logMsg(msg);
        setActiveMem(addr);
        setMemory(prev => ({ ...prev, [addr]: val }));
        await new Promise(r => setTimeout(r, 500));
    };

    if (expId === 'asm-add-8bit') {
        await pushReg('H', '20', "PC: LXI H, 2000H executed");
        await pushReg('L', '00', "PC: H-L Pair points to 2000H");
        await pushReg('A', '04', "PC: MOV A, M (Loaded 04H from 2000H)");
        await pushReg('L', '01', "PC: INX H (Pointer -> 2001H)");
        await pushReg('A', '07', "PC: ADD M (04H + 03H = 07H)");
        await pushMem('2002', '07', "PC: STA 2002H (Stored 07H to Memory)");
    } 
    else if (expId === 'asm-mul-8bit') {
        await pushReg('A', '04', "PC: LDA 2000H");
        await pushReg('B', '04', "PC: MOV B, A");
        await pushReg('A', '03', "PC: LDA 2001H (Multiplier)");
        await pushReg('C', '03', "PC: MOV C, A (Loop Counter)");
        await pushReg('A', '00', "PC: MVI A, 00H (Clear Acc)");
        logMsg("PC: Entering Repeated Addition Loop...");
        await new Promise(r => setTimeout(r, 400));
        await pushReg('A', '0C', "ALU: Final Sum calculated = 0CH (12 dec)");
        await pushReg('C', '00', "ALU: Counter reached 0, JNZ bypassed");
        await pushMem('2002', '0C', "PC: STA 2002H (Stored Product)");
    }
    else if (expId === 'asm-sum-array') {
        await pushReg('H', '30', "PC: LXI H, 3000H executed");
        await pushReg('L', '00', "PC: H-L Pair points to 3000H");
        await pushReg('C', '03', "PC: MVI C, 03H (Array Length)");
        await pushReg('A', '00', "PC: XRA A (Clear Accumulator)");
        logMsg("PC: Executing Array Addition Loop...");
        await new Promise(r => setTimeout(r, 400));
        await pushReg('A', '06', "ALU: Final Sum (01+02+03) = 06H");
        await pushReg('C', '00', "ALU: Counter reached 0");
        await pushMem('300A', '06', "PC: STA 300AH (Stored Sum)");
    }
    else {
        logMsg("PC: Simulating generic execution pass...");
        await new Promise(r => setTimeout(r, 1500));
        await pushReg('A', 'FF', "ALU: Operations processed successfully.");
    }

    logMsg("PC: Execution Halted (HLT). Output confirmed.");
    setActiveReg(null);
    setActiveMem(null);
    setIsRunning(false);
  };

  const resetSim = () => {
    setRegisters({ A: '00', B: '00', C: '00', D: '00', E: '00', H: '00', L: '00' });
    setMemory({
      '2000': '04', '2001': '03', '2002': '00', '2003': '00',
      '3000': '01', '3001': '02', '3002': '03', '300A': '00'
    });
    setLogs([]);
  };

  const handleExport = async (format: 'png' | 'pdf') => {
    if (!exportRef.current) return;
    setIsExporting(true);
    
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(exportRef.current!, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#050505'
        });
        const imgData = canvas.toDataURL('image/png');

        if (format === 'png') {
          const link = document.createElement('a');
          link.download = `PIEMR_Asm_${expId}.png`;
          link.href = imgData;
          link.click();
        } else {
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`PIEMR_Asm_${expId}.pdf`);
        }
      } catch (err) {
        console.error("Export failed", err);
      }
      setIsExporting(false);
    }, 100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: "'Inter', sans-serif" }}>

      {/* Export Toolbar */}
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

      {/* Exportable Area */}
      <div ref={exportRef} style={{ background: '#050505', padding: isExporting ? '2rem' : '0', borderRadius: '16px' }}>

         {isExporting && (
            <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
               <h2 style={{ color: 'white', margin: 0 }}>PIEMR Virtual Lab - 8085 Assembly</h2>
               <p style={{ color: 'var(--accent-primary)', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>Experiment: {title}</p>
               <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Performed by: <strong style={{color:'white'}}>{studentName || 'Anonymous Student'}</strong></p>
            </div>
         )}

         <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1.2fr) 1fr', gap: '2rem', textAlign: 'left' }}>
            
            {/* LEFT COLUMN: IDE EDITOR & CONSOLE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               
               {/* Advanced Assembly IDE */}
               <div style={{ background: '#090a0f', borderRadius: '12px', border: '1px solid #1f2937', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
               <div style={{ background: '#111827', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1f2937' }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.85rem', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <SquareTerminal size={14} color="var(--info)" /> kernel.asm
                  </span>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                     <button 
                     onClick={resetSim} disabled={isRunning}
                     data-html2canvas-ignore="true"
                     style={{ background: 'transparent', border: '1px solid #374151', color: '#9ca3af', cursor: 'pointer', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}>
                     <RotateCcw size={14} />
                     </button>
                     <button 
                     onClick={executeSimulation} disabled={isRunning}
                     data-html2canvas-ignore="true"
                     style={{ background: isRunning ? '#374151' : 'var(--success)', border: 'none', color: isRunning ? '#9ca3af' : '#000', cursor: isRunning ? 'default' : 'pointer', padding: '6px 16px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
                     {isRunning ? <Activity size={14} className="animate-spin" /> : <Play size={14} fill="#000" />} {isRunning ? 'Running...' : 'Execute'}
                     </button>
                  </div>
               </div>
               <div style={{ display: 'flex' }}>
                  <div style={{ padding: '1rem 0.5rem', background: '#111827', borderRight: '1px solid #1f2937', color: '#4b5563', fontFamily: 'monospace', fontSize: '0.9rem', textAlign: 'right', userSelect: 'none' }}>
                     {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                  </div>
                  <textarea 
                     value={code} 
                     onChange={e => setCode(e.target.value)}
                     spellCheck="false"
                     style={{ width: '100%', minHeight: '250px', background: 'transparent', border: 'none', color: '#e5e7eb', padding: '1rem', fontFamily: "'Fira Code', monospace", fontSize: '0.9rem', resize: 'vertical', outline: 'none', lineHeight: 1.5 }}
                  />
               </div>
               </div>

               {/* Execution Terminal */}
               <div style={{ background: 'linear-gradient(to bottom, #000 0%, #050505 100%)', borderRadius: '12px', padding: '1rem', border: '1px solid #222', minHeight: '180px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)' }}>
               <div style={{ color: '#4b5563', fontSize: '0.75rem', marginBottom: '0.8rem', borderBottom: '1px dashed #333', paddingBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Machine Cycle Output</div>
               <AnimatePresence>
                  {logs.map((log, i) => (
                     <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ color: '#4ade80', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem', marginBottom: '6px' }}>
                     <span style={{ color: '#6b7280' }}>$</span> {log}
                     </motion.div>
                  ))}
               </AnimatePresence>
               {!logs.length && <div style={{ color: '#444', fontStyle: 'italic', fontSize: '0.8rem', fontFamily: "'Fira Code', monospace" }}>[ Idle ] Waiting for kernel instruction...</div>}
               </div>

            </div>

            {/* RIGHT COLUMN: REGISTERS & MEMORY DASHBOARD */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               
               <div style={{ background: '#111827', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1f2937' }}>
               <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem', margin: 0 }}>
                  <Cpu size={18} /> Internal Registers
               </h3>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem', marginTop: '1.2rem' }}>
                  {Object.entries(registers).map(([reg, val]) => {
                     const isActive = activeReg === reg;
                     return (
                        <motion.div 
                        key={reg} 
                        animate={isActive ? { scale: 1.05, borderColor: 'var(--accent-primary)', backgroundColor: 'rgba(26,92,190,0.1)' } : { scale: 1, borderColor: '#374151', backgroundColor: 'rgba(255,255,255,0.02)' }}
                        style={{ position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'space-between', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid' }}
                        >
                        {isActive && <motion.div layoutId="flare" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'var(--accent-primary)' }} />}
                        <span style={{ color: '#9ca3af', fontWeight: 'bold' }}>{reg}</span>
                        <span style={{ color: isActive ? 'var(--info)' : '#e5e7eb', fontFamily: "'Fira Code', monospace", fontWeight: 'bold' }}>{val}H</span>
                        </motion.div>
                     );
                  })}
               </div>
               </div>

               <div style={{ background: '#111827', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1f2937', flex: 1 }}>
               <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-tertiary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem', margin: 0 }}>
                  <Database size={18} /> Memory Matrix (RAM)
               </h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', borderBottom: '1px solid #374151', paddingBottom: '6px' }}>
                     <span>Address</span><span>Data Cell</span>
                  </div>
                  {Object.entries(memory).map(([addr, val]) => {
                     const isActive = activeMem === addr;
                     return (
                        <motion.div 
                        key={addr}
                        animate={isActive ? { backgroundColor: 'rgba(15,158,110,0.15)', borderColor: 'var(--success)', paddingLeft: '8px' } : { backgroundColor: 'transparent', borderColor: 'transparent', paddingLeft: '0px' }}
                        style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)', borderLeft: '3px solid', transition: 'all 0.3s' }}
                        >
                        <span style={{ color: '#9ca3af', fontFamily: "'Fira Code', monospace", display: 'flex', alignItems: 'center', gap: '4px' }}>
                           <Hash size={12} color="#4b5563" />{addr}H
                        </span>
                        <span style={{ color: isActive ? 'var(--success)' : '#e5e7eb', fontFamily: "'Fira Code', monospace", fontWeight: 'bold', textShadow: isActive ? '0 0 8px var(--success)' : 'none' }}>
                           {val}H
                        </span>
                        </motion.div>
                     );
                  })}
               </div>
               </div>

            </div>

         </div>
      </div>
      
    </div>
  );
};

export default AssemblySimulator;
