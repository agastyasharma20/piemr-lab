import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, BookOpen, Play, RotateCcw } from 'lucide-react';

const ReaderWriter = () => {
  const [readers, setReaders] = useState<number[]>([]);
  const [writer, setWriter] = useState<boolean>(false);
  const [waitingReaders, setWaitingReaders] = useState<number>(0);
  const [waitingWriters, setWaitingWriters] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>(["System initialized. Resource is idle."]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const addReader = () => {
    if (writer) {
      setWaitingReaders(prev => prev + 1);
      addLog("Reader added to waiting queue (Writer present).");
    } else {
      setReaders(prev => [...prev, Date.now()]);
      addLog(`Reader joined. Total Readers: ${readers.length + 1}`);
    }
  };

  const addWriter = () => {
    if (writer || readers.length > 0) {
      setWaitingWriters(prev => prev + 1);
      addLog("Writer added to waiting queue (Resource occupied).");
    } else {
      setWriter(true);
      addLog("Writer locked the resource 🔒");
    }
  };

  const removeReader = () => {
    if (readers.length > 0) {
      const newReaders = readers.slice(1);
      setReaders(newReaders);
      addLog(`Reader left. Remaining: ${newReaders.length}`);
      
      // If no more readers, check for waiting writers
      if (newReaders.length === 0 && waitingWriters > 0) {
        setWriter(true);
        setWaitingWriters(prev => prev - 1);
        addLog("Resource passed to waiting Writer.");
      }
    }
  };

  const removeWriter = () => {
    if (writer) {
      setWriter(false);
      addLog("Writer released the resource 🔓");

      // Priority check: Waiting readers or writers?
      if (waitingReaders > 0) {
        const count = waitingReaders;
        setWaitingReaders(0);
        setReaders(Array(count).fill(0).map((_, i) => Date.now() + i));
        addLog(`${count} waiting readers entered.`);
      } else if (waitingWriters > 0) {
        setWriter(true);
        setWaitingWriters(prev => prev - 1);
        addLog("Next waiting Writer entered.");
      }
    }
  };

  const reset = () => {
    setReaders([]);
    setWriter(false);
    setWaitingReaders(0);
    setWaitingWriters(0);
    setLogs(["Resource reset. Idle."]);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div className="glass-panel-md" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h3 style={{ margin: 0, color: 'var(--accent-primary)' }}>Shared Resource Sync</h3>
          <button onClick={reset} className="btn-secondary" style={{ padding: '0.4rem 0.8rem' }}><RotateCcw size={16} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center' }}>
          {/* READERS COLUMN */}
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: 'var(--accent-tertiary)', marginBottom: '1rem' }}>Readers Area</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', minHeight: '100px', background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '12px' }}>
              <AnimatePresence>
                {readers.map(r => (
                  <motion.div
                    key={r}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    style={{ background: 'rgba(37,99,235,0.2)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <BookOpen size={14} color="var(--accent-primary)" />
                    <span style={{ fontSize: '0.8rem' }}>Reading</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {readers.length === 0 && <span style={{ opacity: 0.3, alignSelf: 'center' }}>No active readers</span>}
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button onClick={addReader} className="btn-secondary" style={{ fontSize: '0.8rem' }}>Add Reader</button>
              <button onClick={removeReader} className="btn-secondary" style={{ fontSize: '0.8rem', opacity: readers.length > 0 ? 1 : 0.5 }} disabled={readers.length === 0}>Finish</button>
            </div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>Waiting: {waitingReaders}</div>
          </div>

          {/* SHARED RESOURCE */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
             <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Shared Object</div>
             <motion.div 
               animate={{ 
                 background: writer ? 'rgba(239,68,68,0.2)' : readers.length > 0 ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                 borderColor: writer ? 'var(--danger)' : readers.length > 0 ? 'var(--success)' : 'rgba(255,255,255,0.1)'
               }}
               style={{ width: '120px', height: '120px', borderRadius: '20px', border: '2px dashed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
             >
                {writer ? <Edit3 color="var(--danger)" size={40} /> : readers.length > 0 ? <BookOpen color="var(--success)" size={40} /> : <Play color="var(--text-muted)" size={40} />}
             </motion.div>
             <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: writer ? 'var(--danger)' : readers.length > 0 ? 'var(--success)' : 'var(--text-muted)' }}>
               {writer ? 'LOCKED (Writer)' : readers.length > 0 ? `SHARED (${readers.length})` : 'IDLE'}
             </div>
          </div>

          {/* WRITERS COLUMN */}
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Writers Area</h4>
            <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100px', background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '12px' }}>
               {writer && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   style={{ background: 'rgba(239,68,68,0.2)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--danger)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                 >
                   <Edit3 size={24} color="var(--danger)" />
                   <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>WRITING...</span>
                 </motion.div>
               )}
               {!writer && <span style={{ opacity: 0.3, alignSelf: 'center' }}>No active writer</span>}
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button onClick={addWriter} className="btn-secondary" style={{ fontSize: '0.8rem' }}>Add Writer</button>
              <button onClick={removeWriter} className="btn-secondary" style={{ fontSize: '0.8rem', opacity: writer ? 1 : 0.5 }} disabled={!writer}>Finish</button>
            </div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>Waiting: {waitingWriters}</div>
          </div>
        </div>

        {/* LOGS */}
        <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
           <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Process Log</div>
           {logs.map((log, i) => (
             <div key={i} style={{ fontSize: '0.85rem', color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom: '0.2rem' }}>
               {i === 0 ? '> ' : '  '} {log}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ReaderWriter;
