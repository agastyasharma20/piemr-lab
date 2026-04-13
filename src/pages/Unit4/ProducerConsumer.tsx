import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Package, Shield, Lock, Unlock, PlayCircle, StopCircle } from 'lucide-react';

const BUFFER_SIZE = 5;

const ProducerConsumer = () => {
  const [buffer, setBuffer] = useState<(string | null)[]>(Array(BUFFER_SIZE).fill(null));
  
  // Semaphores state representations (logical mapping)
  const [emptyCount, setEmptyCount] = useState(BUFFER_SIZE);
  const [fullCount, setFullCount] = useState(0);
  const [mutex, setMutex] = useState(1);
  
  const [logs, setLogs] = useState<{type: string, msg: string, id: number}[]>([]);
  const logIdCounter = useRef(0);

  const addLog = (type: string, msg: string) => {
    logIdCounter.current += 1;
    setLogs(prev => [{ type, msg, id: logIdCounter.current }, ...prev].slice(0, 10)); // keep last 10
  };

  const produce = () => {
    if (emptyCount === 0) {
      addLog('Wait', 'Buffer FULL. Producer blocked...');
      return;
    }
    
    setEmptyCount(prev => prev - 1);
    setMutex(0); // Lock mutex
    
    setTimeout(() => {
      setBuffer(prev => {
        const next = [...prev];
        const emptyIdx = next.indexOf(null);
        if (emptyIdx !== -1) {
          next[emptyIdx] = '📦';
          addLog('Produce', `Created resource at memory address [0x${(emptyIdx + 1) * 10}]`);
        }
        return next;
      });

      setMutex(1); // Unlock
      setFullCount(prev => prev + 1);
      addLog('Signal', 'Signaled Consumer (Full++)');
    }, 600); 
  };

  const consume = () => {
    if (fullCount === 0) {
      addLog('Wait', 'Buffer EMPTY. Consumer blocked...');
      return;
    }

    setFullCount(prev => prev - 1);
    setMutex(0);

    setTimeout(() => {
      setBuffer(prev => {
        const next = [...prev];
        const fullIdx = next.lastIndexOf('📦');
        if (fullIdx !== -1) {
          next[fullIdx] = null;
          addLog('Consume', `Process digested resource from [0x${(fullIdx + 1) * 10}]`);
        }
        return next;
      });

      setMutex(1);
      setEmptyCount(prev => prev + 1);
      addLog('Signal', 'Signaled Producer (Empty++)');
    }, 600);
  };

  const isLocked = mutex === 0;

  return (
    <div style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
      
      {/* Synchronization Primitives Dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(16,185,129,0.1)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem' }}>Semaphore: Empty</span>
            <Database size={18} color="var(--success)" />
          </div>
          <h2 style={{ color: 'white', fontSize: '2.4rem', margin: '0.5rem 0 0 0' }}>{emptyCount}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0, marginTop: '0.2rem' }}>Tracks remaining buffer capacity.</p>
        </div>

        <div style={{ background: mutex === 1 ? 'rgba(37,99,235,0.1)' : 'rgba(239,68,68,0.1)', padding: '1.25rem', borderRadius: '12px', border: `1px solid ${mutex === 1 ? 'rgba(37,99,235,0.2)' : 'rgba(239,68,68,0.2)'}`, transition: 'all 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: mutex === 1 ? '#60a5fa' : '#f87171', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem' }}>Mutex (Lock)</span>
            {mutex === 1 ? <Unlock size={18} color="#60a5fa" /> : <Lock size={18} color="#f87171" />}
          </div>
          <h2 style={{ color: 'white', fontSize: '2.4rem', margin: '0.5rem 0 0 0' }}>{mutex}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0, marginTop: '0.2rem' }}>{mutex === 1 ? 'Critical Section Unlocked.' : 'Critical Section LOCKED.'}</p>
        </div>

        <div style={{ background: 'rgba(212,160,23,0.1)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(212,160,23,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent-tertiary)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem' }}>Semaphore: Full</span>
            <Package size={18} color="var(--accent-tertiary)" />
          </div>
          <h2 style={{ color: 'white', fontSize: '2.4rem', margin: '0.5rem 0 0 0' }}>{fullCount}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0, marginTop: '0.2rem' }}>Tracks filled consumable slots.</p>
        </div>
      </div>

      {/* Shared Buffer Visualizer */}
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'white', textAlign: 'center' }}>Shared Memory Buffer</h3>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {buffer.map((item, idx) => (
          <motion.div 
            key={idx}
            layout
            animate={{ 
               borderColor: item ? 'var(--accent-tertiary)' : 'rgba(255,255,255,0.1)',
               background: item ? 'rgba(212,160,23,0.15)' : 'transparent',
               scale: item ? [0.9, 1.1, 1] : 1
            }}
            transition={{ duration: 0.3 }}
            style={{ 
              width: '80px', height: '80px', 
              border: '2px dashed rgba(255,255,255,0.2)', 
              borderRadius: '12px', 
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              fontSize: '2rem'
            }}
          >
            {item}
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Left Side: Controller Actions */}
        <div style={{ flex: 1, minWidth: '300px' }}>
             <h4 style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem' }}>Operating Thread Controllers</h4>
             <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <button 
                  onClick={produce}
                  disabled={isLocked || emptyCount === 0 && fullCount === BUFFER_SIZE}
                  style={{ 
                    padding: '1.25rem', background: 'var(--success)', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', 
                    borderRadius: '12px', border: 'none', cursor: (isLocked || emptyCount === 0) ? 'not-allowed' : 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: (isLocked || emptyCount === 0) ? 0.4 : 1,
                    transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(16,185,129,0.3)'
                  }}
                >
                  <span>Dispatch Producer()</span>
                  <PlayCircle size={24} />
                </button>
                <button 
                  onClick={consume}
                  disabled={isLocked || fullCount === 0 && emptyCount === BUFFER_SIZE}
                  style={{ 
                    padding: '1.25rem', background: 'var(--danger)', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', 
                    borderRadius: '12px', border: 'none', cursor: (isLocked || fullCount === 0) ? 'not-allowed' : 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: (isLocked || fullCount === 0) ? 0.4 : 1,
                    transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(239,68,68,0.3)'
                  }}
                >
                  <span>Dispatch Consumer()</span>
                  <StopCircle size={24} />
                </button>
             </div>
             
             <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: '3px solid var(--info)' }}>
                 <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Notice how the <strong style={{color:'white'}}>Mutex</strong> briefly locks to 0 during dispatch. This acts as the binary gateway lock for the Critical Section, preventing fatal race conditions!
                 </p>
             </div>
        </div>

        {/* Right Side: Execution Terminal */}
        <div style={{ flex: 1, minWidth: '300px', background: '#0a0f1c', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={16} color="var(--accent-primary)" />
              <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>Kernel System Event Log</span>
          </div>
          <div style={{ padding: '1rem', height: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'monospace' }}>
            <AnimatePresence>
              {logs.map(l => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  key={l.id} 
                  style={{ 
                    padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem',
                    background: l.type === 'Produce' || l.type === 'Consume' ? 'rgba(255,255,255,0.05)' : 'transparent',
                    color: l.type === 'Wait' ? 'var(--danger)' : (l.type === 'Signal' ? 'var(--info)' : 'var(--text-primary)'),
                    borderLeft: l.type === 'Produce' ? '3px solid var(--success)' : (l.type === 'Consume' ? '3px solid var(--danger)' : 'none')
                  }}
                >
                  <strong style={{ opacity: 0.7 }}>[{l.type}]</strong> {l.msg}
                </motion.div>
              ))}
            </AnimatePresence>
            {logs.length === 0 && <span style={{ opacity: 0.5, color: 'var(--text-muted)' }}>Awaiting operations...</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerConsumer;
