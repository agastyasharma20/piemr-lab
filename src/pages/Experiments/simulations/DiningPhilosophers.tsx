import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Info } from 'lucide-react';

const DiningPhilosophers = () => {
  const [philosophers, setPhilosophers] = useState(
    Array(5).fill(0).map((_, i) => ({ id: i, state: 'thinking', forks: [] }))
  );
  const [forks, setForks] = useState(Array(5).fill(true)); // true = available
  const [logs, setLogs] = useState<string[]>(["Welcome to the Dining Philosophers Table."]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const togglePhilosopher = (id: number) => {
    const leftFork = id;
    const rightFork = (id + 1) % 5;

    setPhilosophers(prev => prev.map(p => {
      if (p.id !== id) return p;

      if (p.state === 'thinking') {
        if (forks[leftFork] && forks[rightFork]) {
          const newForks = [...forks];
          newForks[leftFork] = false;
          newForks[rightFork] = false;
          setForks(newForks);
          addLog(`Philosopher ${id + 1} is EATING 🍜`);
          return { ...p, state: 'eating' };
        } else {
          addLog(`Philosopher ${id + 1} is WAITING for forks...`);
          return { ...p, state: 'waiting' };
        }
      } else {
        const newForks = [...forks];
        newForks[leftFork] = true;
        newForks[rightFork] = true;
        setForks(newForks);
        addLog(`Philosopher ${id + 1} is THINKING 💡`);
        return { ...p, state: 'thinking' };
      }
    }));
  };

  const reset = () => {
    setPhilosophers(Array(5).fill(0).map((_, i) => ({ id: i, state: 'thinking', forks: [] })));
    setForks(Array(5).fill(true));
    setLogs(["Table reset."]);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div className="glass-panel-md" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ position: 'relative', width: '350px', height: '350px' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '4px solid rgba(255,255,255,0.1)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }} />
          {philosophers.map((p, i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180);
            const x = 175 + 130 * Math.cos(angle);
            const y = 175 + 130 * Math.sin(angle);
            return (
              <motion.div key={i} onClick={() => togglePhilosopher(i)} style={{ position: 'absolute', left: x - 35, top: y - 35, width: '70px', height: '70px', borderRadius: '50%', background: p.state === 'thinking' ? '#1e293b' : p.state === 'eating' ? 'var(--success)' : 'var(--danger)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.2)', boxShadow: p.state === 'eating' ? '0 0 20px rgba(16,185,129,0.5)' : 'none', zIndex: 10 }} whileHover={{ scale: 1.1 }} animate={{ scale: p.state === 'eating' ? [1, 1.05, 1] : 1 }} transition={{ repeat: Infinity, duration: 1 }}>
                <span style={{ fontSize: '1.2rem' }}>{p.state === 'thinking' ? '💡' : p.state === 'eating' ? '😋' : '⌛'}</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>P{i+1}</span>
              </motion.div>
            );
          })}
          {forks.map((available, i) => {
            const angle = (i * 72 - 54) * (Math.PI / 180);
            const x = 175 + 85 * Math.cos(angle);
            const y = 175 + 85 * Math.sin(angle);
            return (
              <motion.div key={i} style={{ position: 'absolute', left: x - 5, top: y - 15, width: '10px', height: '30px', background: available ? 'var(--accent-tertiary)' : 'rgba(255,255,255,0.1)', borderRadius: '10px', transform: `rotate(${i * 72 - 54}deg)`, transition: 'all 0.3s ease' }} />
            );
          })}
        </div>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>System Logs</h3>
            <button onClick={reset} className="btn-secondary" style={{ padding: '0.4rem 0.8rem' }}><RotateCcw size={16} /></button>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1rem', minHeight: '150px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1 - i * 0.2, x: 0 }} style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: i === 0 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(52,211,153,0.05)', borderRadius: '12px', borderLeft: '4px solid var(--success)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--success)', marginBottom: '0.5rem' }}>
              <Info size={16} />
              <b style={{ fontSize: '0.85rem' }}>Lab Instruction:</b>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Click on a philosopher to toggle their state. A philosopher can only eat if both adjacent forks are available.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiningPhilosophers;
