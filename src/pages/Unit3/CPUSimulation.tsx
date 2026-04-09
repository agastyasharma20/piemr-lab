import React, { useState, useEffect } from 'react';
import { fcfsScheduler, sjfNonPreemptive, srtfPreemptive, roundRobin, priorityScheduling } from '../../algorithms/cpuScheduling';
import type { Process, CPUSchedulingResult } from '../../algorithms/cpuScheduling';
import { cpuAlgorithmDetails } from '../../algorithms/CPUAlgorithmDetails';
import { Play } from 'lucide-react';
import styles from './Unit3.module.css';

const ALOGS = {
  FCFS: fcfsScheduler,
  SJF: sjfNonPreemptive,
  SRTF: srtfPreemptive,
  Priority: priorityScheduling,
  'Round Robin': (p: Process[]) => roundRobin(p, 2), // Default quantum 2
};

const CPUSimulation = () => {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 2 },
    { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 1 },
    { id: 'P3', arrivalTime: 2, burstTime: 8, priority: 4 },
    { id: 'P4', arrivalTime: 3, burstTime: 6, priority: 3 },
  ]);
  const [algorithm, setAlgorithm] = useState<keyof typeof ALOGS>('FCFS');
  const [quantum, setQuantum] = useState(2);
  
  const [result, setResult] = useState<CPUSchedulingResult | null>(null);

  useEffect(() => {
    try {
      if (processes.length === 0) return;
      if (algorithm === 'Round Robin') {
        setResult(roundRobin(processes, quantum));
      } else {
        const algoFunc = ALOGS[algorithm];
        setResult(algoFunc(processes));
      }
    } catch (e) { }
  }, [processes, algorithm, quantum]);

  const totalTime = result?.gantt.length ? result.gantt[result.gantt.length - 1].endTime : 1;

  // Process Color Mapper
  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#3b82f6'];
  const getColor = (pid: string) => {
    if (pid === 'IDLE') return '#1b1d2c';
    const index = parseInt(pid.replace('P', '')) - 1;
    return colors[index % colors.length] || colors[0];
  };

  return (
    <div className={`glass-panel-md ${styles.labContainer}`}>
      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <label>Algorithm</label>
          <select value={algorithm} onChange={e => setAlgorithm(e.target.value as any)}>
            {Object.keys(ALOGS).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        {algorithm === 'Round Robin' && (
          <div className={styles.inputGroup}>
            <label>Time Quantum</label>
            <input type="number" min="1" value={quantum} onChange={e => setQuantum(parseInt(e.target.value) || 1)} />
          </div>
        )}
      </div>

      <div className={styles.ganttSection}>
        <h3 style={{marginBottom: '1rem'}}>Gantt Chart</h3>
        <div className={styles.ganttContainer}>
          {result?.gantt.map((step, idx) => {
            const widthPct = ((step.endTime - step.startTime) / totalTime) * 100;
            return (
              <div 
                key={idx} 
                className={styles.ganttBlock} 
                style={{ width: `${widthPct}%`, backgroundColor: getColor(step.processId) }}
              >
                <span>{step.processId}</span>
                <small className={styles.ganttTime}>{step.endTime}</small>
              </div>
            )
          })}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)'}}>
            <span>0</span>
        </div>
      </div>

      <div className={styles.resultsGrid}>
        <div className={styles.resultCard}>
          <p>Average Turnaround Time</p>
          <h2>{result?.averageTurnaroundTime} ms</h2>
        </div>
        <div className={styles.resultCard}>
          <p>Average Waiting Time</p>
          <h2>{result?.averageWaitingTime} ms</h2>
        </div>
      </div>

      <table className={styles.processTable}>
        <thead>
          <tr>
            <th>Process</th>
            <th>Arrival</th>
            <th>Burst</th>
            <th>Priority</th>
            <th>Wait Time</th>
            <th>Turnaround</th>
          </tr>
        </thead>
        <tbody>
          {processes.map(p => (
            <tr key={p.id}>
              <td>
                <span className={styles.badge} style={{backgroundColor: getColor(p.id)}}>{p.id}</span>
              </td>
              <td>{p.arrivalTime}</td>
              <td>{p.burstTime}</td>
              <td>{p.priority}</td>
              <td>{result?.waitingTimes[p.id] ?? '-'}</td>
              <td>{result?.turnaroundTimes[p.id] ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {result && (
        <div style={{marginTop: '2rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-glow)', boxShadow: 'var(--shadow-glow)'}}>
            <h2 style={{color: 'var(--accent-primary)', marginBottom: '1rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}>
                {cpuAlgorithmDetails[algorithm].name} Insight
            </h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
               <div>
                   <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Definition</h4>
                   <p style={{lineHeight: 1.6}}>{cpuAlgorithmDetails[algorithm].definition}</p>
                   
                   <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', margin: '1.5rem 0 0.5rem 0'}}>Real-World Analogy</h4>
                   <p style={{lineHeight: 1.6, color: 'var(--warning)', fontStyle: 'italic'}}>"{cpuAlgorithmDetails[algorithm].analogy}"</p>
               </div>
               
               <div>
                  <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Algorithm Logic / Pseudocode</h4>
                  <pre style={{background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', color: 'var(--success)', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem'}}>
                      {cpuAlgorithmDetails[algorithm].pseudocode}
                  </pre>
               </div>
            </div>
            
            <div style={{display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap'}}>
                <span style={{background: 'rgba(37,99,235,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem'}}>
                    ⏱️ <b>Complexity:</b> {cpuAlgorithmDetails[algorithm].timeComplexity}
                </span>
                <span style={{background: 'rgba(16,185,129,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--success)'}}>
                    ✔️ <b>Advantage:</b> {cpuAlgorithmDetails[algorithm].advantage}
                </span>
                <span style={{background: 'rgba(239,68,68,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', color: '#ff8a8a'}}>
                    ❌ <b>Disadvantage:</b> {cpuAlgorithmDetails[algorithm].disadvantage}
                </span>
            </div>
        </div>
      )}
    </div>
  );
};

export default CPUSimulation;
