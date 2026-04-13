import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeadlockGraph = () => {
  const [showDeadlock, setShowDeadlock] = useState(false);

  return (
    <div style={{ background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
      
      {/* Header and Controller */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ maxWidth: '60%' }}>
            <h3 style={{ color: 'white', marginBottom: '0.25rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', background: showDeadlock ? 'var(--danger)' : 'var(--success)', borderRadius: '50%', boxShadow: showDeadlock ? '0 0 10px var(--danger)' : '0 0 10px var(--success)' }}></span>
              Interactive Resource Allocation Graph (RAG)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
              Circles represent active <strong>Processes</strong>. Squares represent <strong>Resources</strong>. 
              An edge from a Process to a Resource signifies a <em>Request</em>. An edge from a Resource to a Process signifies an <em>Assignment</em>.
            </p>
        </div>
        <button 
           onClick={() => setShowDeadlock(!showDeadlock)}
           style={{
             background: showDeadlock ? 'var(--success)' : 'var(--danger)',
             color: 'white', fontWeight: 'bold', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '8px', cursor: 'pointer',
             transition: 'all 0.3s', boxShadow: showDeadlock ? '0 4px 15px rgba(16,185,129,0.3)' : '0 4px 15px rgba(239,68,68,0.3)',
             fontSize: '0.95rem'
           }}
        >
          {showDeadlock ? 'Resolve Deadlock (Release R1)' : 'Simulate Request (P2 → R1)'}
        </button>
      </div>

      {/* Main Graph Visualization Area */}
      <div style={{ position: 'relative', height: '380px', background: '#0a0f1c', borderRadius: '12px', marginTop: '1.5rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
        
        {/* Dynamic Topology Grid Background */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

        {/* Nodes layer */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* Process 1 */}
          <motion.div 
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(59,130,246,0.6)' }}
            style={{ position: 'absolute', top: '70px', left: '20%', width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'white', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.4)', zIndex: 10 }}
          >
            P1
          </motion.div>
          
          {/* Process 2 */}
          <motion.div 
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(59,130,246,0.6)' }}
            style={{ position: 'absolute', top: '70px', right: '20%', width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'white', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.4)', zIndex: 10 }}
          >
            P2
          </motion.div>
          
          {/* Resource 1 */}
          <motion.div 
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(16,185,129,0.5)' }}
            style={{ position: 'absolute', bottom: '70px', left: '20%', width: '70px', height: '70px', background: 'linear-gradient(135deg, #10b981, #047857)', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'white', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.4)', zIndex: 10 }}
          >
            R1
            <div style={{ position: 'absolute', bottom: -25, fontSize: '0.7rem', color: 'var(--text-secondary)' }}>1 Instance</div>
          </motion.div>

          {/* Resource 2 */}
          <motion.div 
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(245,158,11,0.5)' }}
            style={{ position: 'absolute', bottom: '70px', right: '20%', width: '70px', height: '70px', background: 'linear-gradient(135deg, #f59e0b, #b45309)', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'white', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.4)', zIndex: 10 }}
          >
            R2
            <div style={{ position: 'absolute', bottom: -25, fontSize: '0.7rem', color: 'var(--text-secondary)' }}>1 Instance</div>
          </motion.div>
        </div>

        {/* Dynamic Edges SVG */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
           <defs>
             <marker id="arrow-white" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
               <path d="M0,0 L0,6 L9,3 z" fill="rgba(255,255,255,0.7)" />
             </marker>
             <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
               <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
             </marker>
             <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur stdDeviation="4" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
             </filter>
           </defs>

           {/* Edge: R1 -> P1 (Assignment) */}
           <line x1="calc(20% + 35px)" y1="calc(100% - 140px)" x2="calc(20% + 35px)" y2="150" stroke="rgba(255,255,255,0.5)" strokeWidth="4" markerEnd="url(#arrow-white)" />
           <text x="calc(20% + 45px)" y="210" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="bold">Holds</text>

           {/* Edge: R2 -> P2 (Assignment) */}
           <line x1="calc(80% - 35px)" y1="calc(100% - 140px)" x2="calc(80% - 35px)" y2="150" stroke="rgba(255,255,255,0.5)" strokeWidth="4" markerEnd="url(#arrow-white)" />
           <text x="calc(80% - 30px)" y="210" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="bold">Holds</text>

           {/* Edge: P1 -> R2 (Request) */}
           <line x1="calc(20% + 70px)" y1="120" x2="calc(80% - 70px)" y2="calc(100% - 120px)" stroke="rgba(255,255,255,0.5)" strokeWidth="4" markerEnd="url(#arrow-white)" />
           <text x="50%" y="130" fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="bold" textAnchor="middle">Requests</text>

           {/* Conditional Edge: P2 -> R1 (Dangerous Request creating Deadlock) */}
           <AnimatePresence>
             {showDeadlock && (
               <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                 <line x1="calc(80% - 70px)" y1="100" x2="calc(20% + 70px)" y2="calc(100% - 100px)" stroke="#ef4444" strokeWidth="5" strokeDasharray="8,6" markerEnd="url(#arrow-red)" filter="url(#glow)">
                    <animate attributeName="stroke-dashoffset" from="14" to="0" dur="0.6s" repeatCount="indefinite" />
                 </line>
                 <text x="50%" y="270" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle" filter="url(#glow)">Requests (Wait)</text>
               </motion.g>
             )}
           </AnimatePresence>
        </svg>

        {/* Deadlock overlay alert */}
        <AnimatePresence>
          {showDeadlock && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: '-50%', x: '-50%' }} 
              animate={{ scale: 1, opacity: 1, y: '-50%', x: '-50%' }} 
              exit={{ scale: 0.8, opacity: 0, y: '-50%', x: '-50%' }}
              style={{ position: 'absolute', top: '50%', left: '50%', background: 'rgba(220, 38, 38, 0.95)', padding: '1.25rem 2.5rem', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 0 40px rgba(239, 68, 68, 0.8)', border: '2px solid #fecaca', zIndex: 20, textAlign: 'center' }}
            >
               <h2 style={{ margin: 0, color: 'white', letterSpacing: '0.1em', fontSize: '1.8rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>DEADLOCK CYCLE</h2>
               <p style={{ margin: '0.25rem 0 0 0', color: '#fecaca', fontSize: '0.9rem', fontWeight: 500 }}>All 4 Coffman conditions fulfilled. System Halted.</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default DeadlockGraph;
