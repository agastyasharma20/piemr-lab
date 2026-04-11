import { useState } from 'react';
import styles from './Unit4.module.css';

const DeadlockGraph = () => {
  const [showDeadlock, setShowDeadlock] = useState(false);

  return (
    <div className={`glass-panel-md ${styles.labContainer}`}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
            <h3 style={{color: 'var(--text-primary)', marginBottom: '0.5rem'}}>Resource Allocation Graph</h3>
            <p style={{color: 'var(--text-secondary)'}}>A cycle in the graph indicates a deadlock if each resource has exactly one instance.</p>
        </div>
        <button 
          className={`${styles.btn} ${showDeadlock ? styles.consumeBtn : styles.produceBtn}`} 
          onClick={() => setShowDeadlock(!showDeadlock)}
        >
          {showDeadlock ? 'Resolve Deadlock' : 'Simulate Request (Create Cycle)'}
        </button>
      </div>

      <div style={{ position: 'relative', height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', marginTop: '1rem', overflow: 'hidden' }}>
        {/* Nodes */}
        {/* Process 1 */}
        <div style={{ position: 'absolute', top: '50px', left: '150px', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>P1</div>
        
        {/* Process 2 */}
        <div style={{ position: 'absolute', top: '50px', right: '150px', width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>P2</div>
        
        {/* Resource 1 */}
        <div style={{ position: 'absolute', bottom: '50px', left: '150px', width: '60px', height: '60px', background: 'var(--info)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>R1</div>

        {/* Resource 2 */}
        <div style={{ position: 'absolute', bottom: '50px', right: '150px', width: '60px', height: '60px', background: 'var(--warning)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '#000' }}>R2</div>

        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
           <defs>
             <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
               <path d="M0,0 L0,6 L9,3 z" fill="#fff" />
             </marker>
             <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
               <path d="M0,0 L0,6 L9,3 z" fill="var(--danger)" />
             </marker>
           </defs>

           {/* R1 assigned to P1 (arrow from R1 to P1) */}
           <line x1="180" y1="250" x2="180" y2="120" stroke="#fff" strokeWidth="3" markerEnd="url(#arrow)" />

           {/* R2 assigned to P2 (arrow from R2 to P2) */}
           <line x1="calc(100% - 180px)" y1="250" x2="calc(100% - 180px)" y2="120" stroke="#fff" strokeWidth="3" markerEnd="url(#arrow)" />

           {/* P1 requests R2 (arrow from P1 to R2) */}
           <line x1="220" y1="80" x2="calc(100% - 220px)" y2="250" stroke="#fff" strokeWidth="3" markerEnd="url(#arrow)" />

           {/* P2 requests R1 (Creates cycle) ONLY IF showDeadlock */}
           {showDeadlock && (
             <line x1="calc(100% - 220px)" y1="80" x2="220" y2="250" stroke="var(--danger)" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrow-red)">
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.5s" repeatCount="indefinite" />
             </line>
           )}
        </svg>

        {/* Deadlock overlay */}
        {showDeadlock && (
          <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(239, 68, 68, 0.9)', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' }}>
             DEADLOCK DETECTED!
          </div>
        )}
      </div>
    </div>
  );
};

export default DeadlockGraph;
