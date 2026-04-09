import React, { useState, useRef, useEffect } from 'react';
import styles from './Unit4.module.css';

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
      addLog('Wait', 'Buffer FULL. Producer is waiting...');
      return;
    }
    
    // Simulate Wait(empty) and Wait(mutex)
    setEmptyCount(prev => prev - 1);
    setMutex(0);
    
    setTimeout(() => {
      // Critical Section
      setBuffer(prev => {
        const next = [...prev];
        const emptyIdx = next.indexOf(null);
        if (emptyIdx !== -1) {
          next[emptyIdx] = '📦';
          addLog('Produce', `Produced item at slot ${emptyIdx + 1}`);
        }
        return next;
      });

      // Simulate Signal(mutex) and Signal(full)
      setMutex(1);
      setFullCount(prev => prev + 1);
      addLog('Signal', 'Signaled Consumer (Full++)');
    }, 500); // simulate some delay
  };

  const consume = () => {
    if (fullCount === 0) {
      addLog('Wait', 'Buffer EMPTY. Consumer is waiting...');
      return;
    }

    // Simulate Wait(full) and Wait(mutex)
    setFullCount(prev => prev - 1);
    setMutex(0);

    setTimeout(() => {
      // Critical Section
      setBuffer(prev => {
        const next = [...prev];
        // find last full slot
        const fullIdx = next.lastIndexOf('📦');
        if (fullIdx !== -1) {
          next[fullIdx] = null;
          addLog('Consume', `Consumed item from slot ${fullIdx + 1}`);
        }
        return next;
      });

      // Simulate Signal(mutex) and Signal(empty)
      setMutex(1);
      setEmptyCount(prev => prev + 1);
      addLog('Signal', 'Signaled Producer (Empty++)');
    }, 500);
  };

  const isLocked = mutex === 0;

  return (
    <div className={`glass-panel-md ${styles.labContainer}`}>
      <div className={styles.dashboard}>
        <div className={styles.statCard}>
          <span>Semaphore: Empty</span>
          <h2 style={{color: 'var(--success)'}}>{emptyCount}</h2>
        </div>
        <div className={styles.statCard}>
          <span>Mutex (Lock)</span>
          <h2 style={{color: mutex === 1 ? 'var(--success)' : 'var(--danger)'}}>{mutex}</h2>
        </div>
        <div className={styles.statCard}>
          <span>Semaphore: Full</span>
          <h2 style={{color: 'var(--info)'}}>{fullCount}</h2>
        </div>
      </div>

      <div className={styles.bufferContainer}>
        {buffer.map((item, idx) => (
          <div key={idx} className={`${styles.bufferSlot} ${item ? styles.full : ''}`}>
            {item}
          </div>
        ))}
      </div>

      <div className={styles.controls} style={{justifyContent: 'center', marginBottom: '1.5rem'}}>
        <button 
          className={`${styles.btn} ${styles.produceBtn}`} 
          onClick={produce}
          disabled={isLocked || emptyCount === 0 && fullCount === BUFFER_SIZE}
        >
          Producer: Produce
        </button>
        <button 
          className={`${styles.btn} ${styles.consumeBtn}`} 
          onClick={consume}
          disabled={isLocked || fullCount === 0 && emptyCount === BUFFER_SIZE}
        >
          Consumer: Consume
        </button>
      </div>

      <div className={styles.logger}>
        <h4 style={{marginBottom: '0.5rem', color: 'white'}}>Execution Log</h4>
        {logs.map(l => (
          <div key={l.id} className={`${styles.logEntry} ${styles[l.type] || ''}`}>
            [{l.type}] {l.msg}
          </div>
        ))}
        {logs.length === 0 && <span style={{opacity: 0.5}}>No operations yet...</span>}
      </div>
    </div>
  );
};

export default ProducerConsumer;
