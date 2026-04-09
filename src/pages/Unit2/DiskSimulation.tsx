import React, { useState, useEffect, useMemo, useRef } from 'react';
import { fcfs, sstf, scan, cscan, look, clook } from '../../algorithms/diskScheduling';
import type { DiskSchedulingResult } from '../../algorithms/diskScheduling';
import { diskAlgorithmDetails } from '../../algorithms/AlgorithmDetails';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Play, Pause, RotateCcw, StepForward, StepBack } from 'lucide-react';
import styles from './Unit2.module.css';
import DiskSimulation3D from './DiskSimulation3D';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ALGORITMS = {
  FCFS: fcfs,
  SSTF: sstf,
  SCAN: scan,
  'C-SCAN': cscan,
  LOOK: look,
  'C-LOOK': clook,
};

const DiskSimulation = () => {
  const [requestsStr, setRequestsStr] = useState('82, 170, 43, 140, 24, 16, 190');
  const [head, setHead] = useState(50);
  const [diskSize, setDiskSize] = useState(200);
  const [algorithm, setAlgorithm] = useState<keyof typeof ALGORITMS>('FCFS');
  
  const [result, setResult] = useState<DiskSchedulingResult | null>(null);

  // Playback state
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const requests = requestsStr.split(',').map(r => parseInt(r.trim(), 10)).filter(n => !isNaN(n));
      if (requests.length === 0) return;
      const algoFunc = ALGORITMS[algorithm];
      const res = algoFunc({ requests, head, diskSize, direction: 'right' });
      setResult(res);
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (e) {
      // ignore
    }
  }, [requestsStr, head, diskSize, algorithm]);

  const sequence = result ? [head, ...result.sequence] : [head];
  const maxSteps = sequence.length - 1;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000); // 1 second per step
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, maxSteps]);

  const chartData = useMemo(() => {
    // We only show up to currentStep in the chart for animated effect
    const sequenceToShow = sequence.slice(0, currentStep + 1);
    
    // For vertical timeline (steps on Y axis, track on X axis)
    const dataPoints = sequenceToShow.map((track, step) => ({ x: track, y: step }));

    return {
      datasets: [
        {
          label: 'Head Path',
          data: dataPoints,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
          tension: 0,
          pointRadius: 6,
          pointHoverRadius: 8,
          borderWidth: 2,
        }
      ]
    };
  }, [sequence, currentStep]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 20 },
    scales: {
      x: {
        type: 'linear' as const,
        min: 0,
        max: diskSize - 1,
        title: { display: true, text: 'Disk Track / Cylinder', color: '#f0f4f8', font: { size: 14, weight: 'bold' } },
        ticks: { color: '#a0aec0', stepSize: 20, font: { size: 12 } },
        grid: { color: 'rgba(255, 255, 255, 0.15)', drawBorder: true, borderColor: 'rgba(255, 255, 255, 0.3)' }
      },
      y: {
        type: 'linear' as const,
        min: 0,
        max: maxSteps > 0 ? maxSteps : 1,
        reverse: true,
        title: { display: true, text: 'Sequence Step (Time →)', color: '#f0f4f8', font: { size: 14, weight: 'bold' } },
        ticks: { color: '#a0aec0', stepSize: 1, font: { size: 12 } },
        grid: { color: 'rgba(255, 255, 255, 0.15)', drawBorder: true, borderColor: 'rgba(255, 255, 255, 0.3)' }
      }
    },
    animation: { duration: 0 },
    plugins: {
      legend: { display: true, labels: { color: '#f0f4f8', font: { size: 13 } } },
      tooltip: {
        backgroundColor: '#081221',
        titleColor: '#3b82f6',
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
        bodyColor: '#f0f4f8',
        borderColor: '#3b82f6',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => `Seeking to Track: ${context.parsed.x} at Step: ${context.parsed.y}`
        }
      }
    }
  };

  const currentTrack = sequence[currentStep] ?? head;

  return (
    <div className={`glass-panel-md ${styles.labContainer}`}>
      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <label>Requests (comma separated)</label>
          <input type="text" value={requestsStr} onChange={e => setRequestsStr(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <label>Initial Head</label>
          <input type="number" value={head} onChange={e => setHead(parseInt(e.target.value) || 0)} />
        </div>
        <div className={styles.inputGroup}>
          <label>Algorithm</label>
          <select value={algorithm} onChange={e => setAlgorithm(e.target.value as any)}>
            {Object.keys(ALGORITMS).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>
      
      <div className={styles.playbackControls}>
         <button onClick={() => { setIsPlaying(false); setCurrentStep(0); }} className={styles.iconBtn} title="Reset">
           <RotateCcw size={20} />
         </button>
         <button onClick={() => { setIsPlaying(false); setCurrentStep(Math.max(0, currentStep - 1)); }} className={styles.iconBtn} title="Previous Step" disabled={currentStep === 0}>
           <StepBack size={20} />
         </button>
         <button onClick={() => setIsPlaying(!isPlaying)} className={`${styles.iconBtn} ${styles.primaryBtn}`}>
           {isPlaying ? <Pause size={20} /> : <Play size={20} />}
         </button>
         <button onClick={() => { setIsPlaying(false); setCurrentStep(Math.min(maxSteps, currentStep + 1)); }} className={styles.iconBtn} title="Next Step" disabled={currentStep >= maxSteps}>
           <StepForward size={20} />
         </button>
         <span className={styles.stepIndicator}>Step: {currentStep} / {maxSteps}</span>
      </div>

      <div className={styles.results}>
        <div className={styles.metric}>
          <span>Total Seek Time:</span>
          <strong>{result?.totalSeekTime || 0}</strong>
        </div>
        <div className={styles.metric}>
          <span>Current Target Track:</span>
          <strong>{currentTrack}</strong>
        </div>
        <div className={styles.metric}>
          <span>Status:</span>
          <strong>{currentStep === maxSteps ? 'Completed' : 'Running'}</strong>
        </div>
      </div>

      <div className={styles.visualizationGrid}>
        <div className={styles.chartContainer}>
          {chartData.datasets.length > 0 && <Line options={chartOptions as any} data={chartData as any} />}
        </div>
        <div className={styles.threeContainer}>
          <DiskSimulation3D currentTrack={currentTrack} diskSize={diskSize} />
        </div>
      </div>

      {result && (
        <div style={{marginTop: '2rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-glow)', boxShadow: 'var(--shadow-glow)'}}>
            <h2 style={{color: 'var(--accent-primary)', marginBottom: '1rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}>
                {diskAlgorithmDetails[algorithm].name} Insight
            </h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
               <div>
                   <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Definition</h4>
                   <p style={{lineHeight: 1.6}}>{diskAlgorithmDetails[algorithm].definition}</p>
                   
                   <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', margin: '1.5rem 0 0.5rem 0'}}>Real-World Analogy</h4>
                   <p style={{lineHeight: 1.6, color: 'var(--warning)', fontStyle: 'italic'}}>"{diskAlgorithmDetails[algorithm].analogy}"</p>
               </div>
               
               <div>
                  <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Algorithm Logic / Pseudocode</h4>
                  <pre style={{background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', color: 'var(--success)', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem'}}>
                      {diskAlgorithmDetails[algorithm].pseudocode}
                  </pre>
                  
                  <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', margin: '1.5rem 0 0.5rem 0'}}>Math Example</h4>
                  <p style={{lineHeight: 1.6, background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px'}}>{diskAlgorithmDetails[algorithm].example}</p>
               </div>
            </div>
            
            <div style={{display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap'}}>
                <span style={{background: 'rgba(37,99,235,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem'}}>
                    ⏱️ <b>Complexity:</b> {diskAlgorithmDetails[algorithm].timeComplexity}
                </span>
                <span style={{background: 'rgba(16,185,129,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--success)'}}>
                    ✔️ <b>Advantage:</b> {diskAlgorithmDetails[algorithm].advantage}
                </span>
                <span style={{background: 'rgba(239,68,68,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', color: '#ff8a8a'}}>
                    ❌ <b>Disadvantage:</b> {diskAlgorithmDetails[algorithm].disadvantage}
                </span>
            </div>
        </div>
      )}
    </div>
  );
};

export default DiskSimulation;
