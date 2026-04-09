import React, { useState, useEffect } from 'react';
import { fifoReplacement, lruReplacement, optimalReplacement } from '../../algorithms/pageReplacement';
import type { PageReplacementResult } from '../../algorithms/pageReplacement';
import { memoryAlgorithmDetails } from '../../algorithms/MemoryAlgorithmDetails';
import styles from './Unit3.module.css';

const ALOGS = {
  FIFO: fifoReplacement,
  LRU: lruReplacement,
  Optimal: optimalReplacement,
};

const MemorySimulation = () => {
  const [pagesStr, setPagesStr] = useState('7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1');
  const [frameCount, setFrameCount] = useState(3);
  const [algorithm, setAlgorithm] = useState<keyof typeof ALOGS>('LRU');
  
  const [result, setResult] = useState<PageReplacementResult | null>(null);

  useEffect(() => {
    try {
      const pages = pagesStr.split(',').map(r => parseInt(r.trim(), 10)).filter(n => !isNaN(n));
      if (pages.length === 0) return;
      const algoFunc = ALOGS[algorithm];
      setResult(algoFunc(pages, frameCount));
    } catch (e) { }
  }, [pagesStr, frameCount, algorithm]);

  const pagesArray = pagesStr.split(',').map(r => parseInt(r.trim(), 10)).filter(n => !isNaN(n));

  return (
    <div className={`glass-panel-md ${styles.labContainer}`}>
      <div className={styles.controls}>
        <div className={styles.inputGroup} style={{flex: 2}}>
          <label>Page Reference String</label>
          <input type="text" value={pagesStr} onChange={e => setPagesStr(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <label>Frames</label>
          <input type="number" min="1" max="10" value={frameCount} onChange={e => setFrameCount(parseInt(e.target.value) || 1)} />
        </div>
        <div className={styles.inputGroup}>
          <label>Algorithm</label>
          <select value={algorithm} onChange={e => setAlgorithm(e.target.value as any)}>
            {Object.keys(ALOGS).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.resultsGrid}>
        <div className={styles.resultCard}>
          <p>Total Page Faults</p>
          <h2 style={{color: 'var(--danger)'}}>{result?.pageFaults}</h2>
        </div>
        <div className={styles.resultCard}>
          <p>Total Page Hits</p>
          <h2 style={{color: 'var(--success)'}}>{result?.pageHits}</h2>
        </div>
        <div className={styles.resultCard}>
          <p>Hit Ratio</p>
          <h2 style={{color: 'var(--info)'}}>
            {result ? ((result.pageHits / (result.pageHits + result.pageFaults)) * 100).toFixed(1) : 0}%
          </h2>
        </div>
      </div>

      <div className={styles.memoryGridWrapper}>
        <div className={styles.memoryGrid}>
          {pagesArray.map((page, stepIdx) => (
            <div key={stepIdx} className={styles.memoryStep}>
              <div className={styles.pageRequest}>{page}</div>
              <div className={styles.framesContainer}>
                {result?.framesSteps[stepIdx]?.map((frame, fIdx) => (
                  <div key={fIdx} className={`${styles.frameBox} ${frame !== null ? styles.frameFilled : ''}`}>
                    {frame !== null ? frame : '-'}
                  </div>
                ))}
              </div>
              <div className={`${styles.faultIndicator} ${result?.isFault[stepIdx] ? styles.fault : styles.hit}`}>
                {result?.isFault[stepIdx] ? 'F' : 'H'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {result && (
        <div style={{marginTop: '2rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-glow)', boxShadow: 'var(--shadow-glow)'}}>
            <h2 style={{color: 'var(--accent-primary)', marginBottom: '1rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}>
                {memoryAlgorithmDetails[algorithm].name} Insight
            </h2>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
               <div>
                   <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Definition</h4>
                   <p style={{lineHeight: 1.6}}>{memoryAlgorithmDetails[algorithm].definition}</p>
                   
                   <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', margin: '1.5rem 0 0.5rem 0'}}>Real-World Analogy</h4>
                   <p style={{lineHeight: 1.6, color: 'var(--warning)', fontStyle: 'italic'}}>"{memoryAlgorithmDetails[algorithm].analogy}"</p>
               </div>
               
               <div>
                  <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Algorithm Logic / Pseudocode</h4>
                  <pre style={{background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', color: 'var(--success)', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem'}}>
                      {memoryAlgorithmDetails[algorithm].pseudocode}
                  </pre>
               </div>
            </div>
            
            <div style={{display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap'}}>
                <span style={{background: 'rgba(37,99,235,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem'}}>
                    ⏱️ <b>Complexity:</b> {memoryAlgorithmDetails[algorithm].timeComplexity}
                </span>
                <span style={{background: 'rgba(16,185,129,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--success)'}}>
                    ✔️ <b>Advantage:</b> {memoryAlgorithmDetails[algorithm].advantage}
                </span>
                <span style={{background: 'rgba(239,68,68,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', color: '#ff8a8a'}}>
                    ❌ <b>Disadvantage:</b> {memoryAlgorithmDetails[algorithm].disadvantage}
                </span>
            </div>
        </div>
      )}
    </div>
  );
};

export default MemorySimulation;
