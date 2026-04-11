import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCcw, ShoppingCart, UserCheck } from 'lucide-react';

const ProducerConsumer = () => {
  const [buffer, setBuffer] = useState<number[]>([]);
  const [bufferSize] = useState(5);
  const [logs, setLogs] = useState<string[]>(["Buffer is empty. Mutex is unlocked."]);
  const [isProducing, setIsProducing] = useState(false);
  const [isConsuming, setIsConsuming] = useState(false);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const produce = () => {
    if (buffer.length >= bufferSize) {
      addLog("⚠️ Buffer FULL! Producer is blocked.");
      return;
    }
    setIsProducing(true);
    setTimeout(() => {
      const newItem = Math.floor(Math.random() * 99) + 1;
      setBuffer(prev => [...prev, newItem]);
      addLog(`${newItem} produced and added to buffer.`);
      setIsProducing(false);
    }, 600);
  };

  const consume = () => {
    if (buffer.length === 0) {
      addLog("⚠️ Buffer EMPTY! Consumer is blocked.");
      return;
    }
    setIsConsuming(true);
    setTimeout(() => {
      setBuffer(prev => {
        const item = prev[0];
        addLog(`${item} consumed from buffer.`);
        return prev.slice(1);
      });
      setIsConsuming(false);
    }, 600);
  };

  const reset = () => {
    setBuffer([]);
    setLogs(["Buffer reset."]);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div className="glass-panel-md" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
          <div>
             <h3 style={{ margin: 0, color: 'var(--accent-primary)' }}>Producer-Consumer Lab</h3>
             <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Classical bounded-buffer synchronization problem.</p>
          </div>
          <button onClick={reset} className="btn-secondary" style={{ padding: '0.4rem 0.8rem' }}><RefreshCcw size={16} /></button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <motion.div animate={{ y: isProducing ? [0, -10, 0] : 0 }} style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(37,99,235,0.1)', border: '2px solid var(--accent-primary)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingCart size={32} color="var(--accent-primary)" />
            </motion.div>
            <button onClick={produce} disabled={isProducing || isConsuming} className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem', background: 'var(--accent-primary)' }}>Produce Item</button>
          </div>
          <div style={{ flex: 3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
               <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>BUFFER SLOTS ({buffer.length}/{bufferSize})</span>
               <div style={{ display: 'flex', gap: '4px' }}>
                 {Array(bufferSize).fill(0).map((_, i) => (
                   <div key={i} style={{ width: 12, height: 4, borderRadius: 2, background: i < buffer.length ? 'var(--accent-tertiary)' : 'rgba(255,255,255,0.1)' }} />
                 ))}
               </div>
            </div>
            <div style={{ height: '100px', background: 'rgba(0,0,0,0.2)', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '1rem', position: 'relative', overflowX: 'auto' }}>
              <AnimatePresence>
                {buffer.map((item, idx) => (
                  <motion.div key={item + '-' + idx} initial={{ opacity: 0, scale: 0.5, x: -20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5, x: 20 }} style={{ minWidth: '50px', height: '50px', background: 'var(--bg-card)', border: '2px solid var(--accent-tertiary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent-tertiary)' }}>{item}</motion.div>
                ))}
              </AnimatePresence>
              {buffer.length === 0 && <span style={{ opacity: 0.2, margin: '0 auto', fontSize: '0.8rem', fontWeight: 'bold' }}>BUFFER EMPTY</span>}
            </div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <motion.div animate={{ y: isConsuming ? [0, 10, 0] : 0 }} style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(212,160,23,0.1)', border: '2px solid var(--accent-tertiary)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={32} color="var(--accent-tertiary)" />
            </motion.div>
            <button onClick={consume} disabled={isProducing || isConsuming} className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem', background: 'var(--accent-tertiary)' }}>Consume Item</button>
          </div>
        </div>
        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
           {logs.map((log, i) => (
             <div key={i} style={{ fontSize: '0.85rem', color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               {i === 0 ? <Play size={10} fill="var(--accent-primary)" stroke="none" /> : <div style={{ width: 10 }} />}
               {log}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ProducerConsumer;
