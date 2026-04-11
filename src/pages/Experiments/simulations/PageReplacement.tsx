import { useState, useEffect } from 'react';

import { RotateCcw, ChevronRight } from 'lucide-react';

interface PageReplacementProps {
  algorithm: 'fifo' | 'lru' | 'optimal';
}

const PageReplacement: React.FC<PageReplacementProps> = ({ algorithm }) => {
  const [framesCount, setFramesCount] = useState(3);
  const [referenceString, setReferenceString] = useState('7,0,1,2,0,3,0,4,2,3');
  const [pages, setPages] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [frames, setFrames] = useState<(number | null)[]>([]);
  const [faults, setFaults] = useState(0);
  const [history, setHistory] = useState<{ step: number; frames: (number | null)[]; fault: boolean }[]>([]);

  useEffect(() => {
    reset();
  }, [algorithm, framesCount, referenceString]);

  const reset = () => {
    setPages(referenceString.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)));
    setCurrentStep(-1);
    setFrames(Array(framesCount).fill(null));
    setFaults(0);
    setHistory([]);
  };

  const stepForward = () => {
    if (currentStep >= pages.length - 1) return;

    const nextPageStep = currentStep + 1;
    const page = pages[nextPageStep];
    let newFrames = [...frames];
    let isFault = false;

    if (!newFrames.includes(page)) {
      isFault = true;
      setFaults(f => f + 1);

      if (algorithm === 'fifo') {
        // FIFO: Replacement based on arrival order
        const occupied = newFrames.filter(f => f !== null).length;
        if (occupied < framesCount) {
          const emptyIdx = newFrames.indexOf(null);
          newFrames[emptyIdx] = page;
        } else {
          // Simplified FIFO: find index to replace based on fault count
          const replaceIdx = faults % framesCount;
          newFrames[replaceIdx] = page;
        }
      } else if (algorithm === 'lru') {
        const emptyIdx = newFrames.indexOf(null);
        if (emptyIdx !== -1) {
          newFrames[emptyIdx] = page;
        } else {
          // LRU: Find the page used longest ago
          const lastUsed = new Map();
          for (let i = 0; i < nextPageStep; i++) {
            lastUsed.set(pages[i], i);
          }
          let lruPage = newFrames[0];
          let minIdx = lastUsed.get(newFrames[0]);
          newFrames.forEach(f => {
            if (lastUsed.get(f) < minIdx) {
              minIdx = lastUsed.get(f);
              lruPage = f;
            }
          });
          const replaceIdx = newFrames.indexOf(lruPage);
          newFrames[replaceIdx] = page;
        }
      } else if (algorithm === 'optimal') {
        const emptyIdx = newFrames.indexOf(null);
        if (emptyIdx !== -1) {
          newFrames[emptyIdx] = page;
        } else {
          // Optimal: Find page that won't be used for the longest time
          let replaceIdx = -1;
          let farthest = -1;
          for (let i = 0; i < framesCount; i++) {
            let nextUse = Infinity;
            for (let j = nextPageStep + 1; j < pages.length; j++) {
              if (newFrames[i] === pages[j]) {
                nextUse = j;
                break;
              }
            }
            if (nextUse > farthest) {
              farthest = nextUse;
              replaceIdx = i;
            }
          }
          newFrames[replaceIdx] = page;
        }
      }
    }

    setFrames(newFrames);
    setCurrentStep(nextPageStep);
    setHistory([...history, { step: nextPageStep, frames: newFrames, fault: isFault }]);
  };

  return (
    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
      {/* CONTROLS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Reference String</label>
          <input 
            type="text" 
            value={referenceString} 
            onChange={e => setReferenceString(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Frames</label>
          <select 
            value={framesCount} 
            onChange={e => setFramesCount(parseInt(e.target.value))}
            style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white' }}
          >
            {[3, 4, 5].map(n => <option key={n} value={n}>{n} Frames</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button onClick={reset} style={{ padding: '0.6rem', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer' }}>
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* VISUALIZER */}
      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {pages.map((p, i) => (
            <div key={i} style={{ 
              minWidth: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: i === currentStep ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
              borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
              color: i === currentStep ? 'white' : 'var(--text-secondary)',
              fontWeight: 700
            }}>
              {p}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {frames.map((f, i) => (
              <div key={i} style={{ 
                width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: f === null ? 'transparent' : 'rgba(212,160,23,0.1)',
                borderRadius: '8px', border: '1px solid rgba(212,160,23,0.2)',
                color: 'var(--accent-tertiary)', fontWeight: 600
              }}>
                {f}
              </div>
            ))}
            <div style={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {history[currentStep]?.fault && <span style={{ color: 'var(--danger)', fontSize: '0.7rem', fontWeight: 900 }}>FAULT</span>}
            </div>
          </div>
        </div>
      </div>

      {/* STATS & STEPPER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Page Faults</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger)' }}>{faults}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Page Hits</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>{(currentStep + 1) - faults}</div>
          </div>
        </div>

        <button 
          onClick={stepForward}
          disabled={currentStep >= pages.length - 1}
          style={{ 
            padding: '1rem 2rem', borderRadius: '12px', background: 'var(--accent-primary)', color: 'white', 
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700,
            opacity: currentStep >= pages.length - 1 ? 0.3 : 1
          }}
        >
          {currentStep === -1 ? 'Start Simulation' : 'Next Step'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PageReplacement;
