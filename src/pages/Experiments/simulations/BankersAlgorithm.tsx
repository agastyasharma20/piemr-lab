import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, RefreshCcw, Play } from 'lucide-react';

const BankersAlgorithm = () => {
  const [available] = useState([3, 3, 2]); // Total Available Resources (A, B, C)
  const [allocation] = useState([
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]
  ]);
  const [max] = useState([
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3]
  ]);
  const [result, setResult] = useState<{ safe: boolean, sequence?: number[], message: string } | null>(null);

  const calculateNeed = () => {
    return max.map((row, i) => row.map((val, j) => val - allocation[i][j]));
  };

  const checkSafeState = () => {
    const n = 5; // processes
    const m = 3; // resource types
    const need = calculateNeed();
    let work = [...available];
    let finish = new Array(n).fill(false);
    let safeSequence: number[] = [];

    while (safeSequence.length < n) {
      let foundStep = false;
      for (let p = 0; p < n; p++) {
        if (!finish[p]) {
          // Check if Need <= Work
          let possible = true;
          for (let r = 0; r < m; r++) {
            if (need[p][r] > work[r]) {
              possible = false;
              break;
            }
          }

          if (possible) {
            for (let r = 0; r < m; r++) {
              work[r] += allocation[p][r];
            }
            finish[p] = true;
            safeSequence.push(p);
            foundStep = true;
          }
        }
      }

      if (!foundStep) {
        setResult({ safe: false, message: "System is in an UNSAFE state! Deadlock possible." });
        return;
      }
    }

    setResult({ 
      safe: true, 
      sequence: safeSequence, 
      message: `System is in a SAFE state. Sequence: P${safeSequence.join(' -> P')}` 
    });
  };

  const reset = () => {
    setResult(null);
  };

  const need = calculateNeed();

  return (
    <div style={{ padding: '1rem' }}>
      <div className="glass-panel-md" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ margin: 0, color: 'var(--accent-primary)' }}>Deadlock Avoidance Engine</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Observe how the Banker's algorithm determines if a resource request is safe.</p>
          </div>
          <button onClick={reset} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}><RefreshCcw size={16} /></button>
        </div>

        {/* INPUTS SUMMARY */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
           <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-tertiary)', fontWeight: 700, textTransform: 'uppercase' }}>Available Resources</span>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                <span>A: {available[0]}</span>
                <span>B: {available[1]}</span>
                <span>C: {available[2]}</span>
              </div>
           </div>
        </div>

        {/* TABLE */}
        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                <th style={{ padding: '1rem' }}>Process</th>
                <th style={{ padding: '1rem' }}>Allocation (A B C)</th>
                <th style={{ padding: '1rem' }}>Max (A B C)</th>
                <th style={{ padding: '1rem' }}>Need (A B C)</th>
              </tr>
            </thead>
            <tbody>
              {allocation.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>P{i}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{row.join(' ')}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{max[i].join(' ')}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--accent-tertiary)', fontWeight: 'bold' }}>{need[i].join(' ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RESULT AREA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!result ? (
            <button 
              onClick={checkSafeState}
              className="btn-primary" 
              style={{ padding: '1rem 2.5rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700 }}
            >
              <Play size={20} fill="currentColor" />
              Analyze Safety State
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ 
                width: '100%', padding: '1.5rem', borderRadius: '12px', textAlign: 'center',
                background: result.safe ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${result.safe ? 'var(--success)' : 'var(--danger)'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                {result.safe ? <Check color="var(--success)" size={24} /> : <AlertCircle color="var(--danger)" size={24} />}
                <h3 style={{ margin: 0, color: result.safe ? 'var(--success)' : 'var(--danger)' }}>
                  {result.safe ? 'Safe State Detected' : 'Safety Violation'}
                </h3>
              </div>
              <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 600 }}>{result.message}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankersAlgorithm;
