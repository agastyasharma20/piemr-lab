import { useState, useEffect } from 'react';
import { fifoReplacement, lruReplacement, optimalReplacement } from '../../algorithms/pageReplacement';
import type { PageReplacementResult } from '../../algorithms/pageReplacement';
import { memoryAlgorithmDetails } from '../../algorithms/MemoryAlgorithmDetails';
import { memoryPracticeQuestions } from '../../data/practiceQuestions';
import { HelpCircle } from 'lucide-react';
import styles from './Unit3.module.css';

const ALOGS = {
  FIFO: fifoReplacement,
  LRU: lruReplacement,
  Optimal: optimalReplacement,
};

const MemorySimulation = () => {
  const [pagesStr, setPagesStr] = useState(memoryPracticeQuestions[0].referenceString);
  const [frameCount, setFrameCount] = useState(memoryPracticeQuestions[0].frames);
  const [selectedQuestion, setSelectedQuestion] = useState(memoryPracticeQuestions[0].id);
  const [algorithm, setAlgorithm] = useState<keyof typeof ALOGS>('LRU');
  
  // Animation/Playback State
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const [result, setResult] = useState<PageReplacementResult | null>(null);
  const pagesArray = pagesStr.split(',').map(r => parseInt(r.trim(), 10)).filter(n => !isNaN(n));

  useEffect(() => {
    try {
      if (pagesArray.length === 0) return;
      const algoFunc = ALOGS[algorithm];
      setResult(algoFunc(pagesArray, frameCount));
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (e) { }
  }, [pagesStr, frameCount, algorithm]);

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && result) {
      const interval = setInterval(() => {
        setCurrentStep(s => {
          if (s >= pagesArray.length) {
            setIsPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isPlaying, result]);

  const handleQuestionChange = (id: string) => {
    const question = memoryPracticeQuestions.find(q => q.id === id);
    if (question) {
      setSelectedQuestion(id);
      setPagesStr(question.referenceString);
      setFrameCount(question.frames);
      setQuizIndex(0);
      setUserAnswer(null);
      setShowExplanation(false);
      setCurrentStep(0);
    }
  };

  const currentQuizzes = memoryPracticeQuestions.find(q => q.id === selectedQuestion)?.quizzes || [];
  const currentQuiz = currentQuizzes[quizIndex];

  // Derived Metrics based on currentStep
  const visibleResult = result ? {
      pageFaults: result.isFault.slice(0, currentStep).filter(f => f).length,
      pageHits: result.isFault.slice(0, currentStep).filter(f => !f).length,
  } : { pageFaults: 0, pageHits: 0 };

  return (
    <div className={`glass-panel-md ${styles.labContainer}`}>
       {/* PRACTICE QUESTIONS SECTION */}
       <div style={{background: 'rgba(212,160,23,0.05)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-gold)', marginBottom: '1.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem'}}>
          <HelpCircle size={18} style={{color: 'var(--accent-tertiary)'}} />
          <h4 style={{margin: 0, color: 'var(--accent-tertiary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Practice Questions</h4>
        </div>
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start'}}>
          <div style={{flex: 1, minWidth: '200px'}}>
            <select 
              value={selectedQuestion} 
              onChange={e => handleQuestionChange(e.target.value)}
              style={{background: 'var(--bg-secondary)', border: '1px solid var(--border-gold)', color: 'white', padding: '0.5rem', borderRadius: '6px', width: '100%'}}
            >
              {memoryPracticeQuestions.map(q => <option key={q.id} value={q.id}>{q.title}</option>)}
            </select>
          </div>
          <p style={{flex: 2, margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5}}>
             {memoryPracticeQuestions.find(q => q.id === selectedQuestion)?.description}
          </p>
        </div>

        {/* QUIZ SUB-SECTION */}
        {currentQuiz && (
          <div style={{marginTop: '1.25rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)'}}>
            <p style={{margin: '0 0 0.75rem 0', fontWeight: 600, fontSize: '0.95rem'}}>
              <span style={{color: 'var(--accent-tertiary)', marginRight: '0.5rem'}}>Quiz:</span>
              {currentQuiz.question}
            </p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem'}}>
              {currentQuiz.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => { setUserAnswer(idx); setShowExplanation(true); }}
                  disabled={userAnswer !== null}
                  style={{
                    padding: '0.6rem 1rem',
                    textAlign: 'left',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: userAnswer === idx 
                      ? (idx === currentQuiz.correctIndex ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)')
                      : 'rgba(255,255,255,0.05)',
                    color: userAnswer === idx 
                      ? (idx === currentQuiz.correctIndex ? 'var(--success)' : '#ff8a8a')
                      : 'var(--text-primary)',
                    cursor: userAnswer === null ? 'pointer' : 'default',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {userAnswer === idx && (idx === currentQuiz.correctIndex ? '✓ ' : '✗ ')}
                  {opt}
                </button>
              ))}
            </div>
            {showExplanation && (
              <div style={{marginTop: '1rem', padding: '0.75rem', borderRadius: '6px', background: 'rgba(26,92,190,0.1)', borderLeft: '3px solid var(--accent-primary)'}}>
                <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                  <strong style={{color: 'var(--accent-primary)'}}>Explanation:</strong> {currentQuiz.explanation}
                </p>
                {quizIndex < currentQuizzes.length - 1 && (
                  <button 
                    onClick={() => { setQuizIndex(quizIndex+1); setUserAnswer(null); setShowExplanation(false); }}
                    style={{marginTop: '0.75rem', background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer'}}
                  >
                    Next Question
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

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

        {/* Playback Controls */}
        <div className={styles.playbackControls} style={{marginTop: '1rem', width: '100%', display: 'flex', gap: '0.75rem', alignItems: 'center'}}>
           <button 
             className={styles.iconBtn} 
             onClick={() => setIsPlaying(!isPlaying)}
             style={{background: isPlaying ? 'var(--accent-maroon)' : 'var(--success)', color: 'white', border: 'none'}}
           >
             {isPlaying ? 'Pause' : 'Play Simulation'}
           </button>
           <button className={styles.iconBtn} onClick={() => {setCurrentStep(0); setIsPlaying(false);}}>Reset</button>
           <div style={{flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative'}}>
              <div style={{width: `${(currentStep/pagesArray.length)*100}%`, height: '100%', background: 'var(--accent-tertiary)', borderRadius: '2px', transition: 'width 0.3s'}}></div>
           </div>
           <span style={{fontSize: '0.9rem', color: 'var(--accent-tertiary)', fontWeight: 'bold'}}>Step: {currentStep} / {pagesArray.length}</span>
        </div>
      </div>

      <div className={styles.resultsGrid}>
        <div className={styles.resultCard}>
          <p>Total Page Faults</p>
          <h2 style={{color: 'var(--danger)'}}>{visibleResult.pageFaults}</h2>
        </div>
        <div className={styles.resultCard}>
          <p>Total Page Hits</p>
          <h2 style={{color: 'var(--success)'}}>{visibleResult.pageHits}</h2>
        </div>
        <div className={styles.resultCard}>
          <p>Hit Ratio</p>
          <h2 style={{color: 'var(--info)'}}>
            {currentStep > 0 ? ((visibleResult.pageHits / currentStep) * 100).toFixed(1) : 0}%
          </h2>
        </div>
      </div>

      {/* Memory Formulas */}
      <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', 
          marginBottom: '1.5rem', background: 'rgba(0,48,115,0.1)', padding: '1.5rem', borderRadius: '12px'
      }}>
          <div style={{borderLeft: '4px solid var(--accent-tertiary)', paddingLeft: '1rem'}}>
              <h4 style={{fontSize: '0.8rem', color: 'var(--accent-tertiary)', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Page Fault Rate</h4>
              <code style={{fontSize: '1rem', display: 'block', margin: '0.5rem 0'}}>PFR = (Total Faults / Total References) × 100</code>
          </div>
          <div style={{borderLeft: '4px solid var(--success)', paddingLeft: '1rem'}}>
              <h4 style={{fontSize: '0.8rem', color: 'var(--success)', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Hit Ratio</h4>
              <code style={{fontSize: '1rem', display: 'block', margin: '0.5rem 0'}}>HR = (Total Hits / Total References) × 100</code>
          </div>
      </div>

      <div className={styles.memoryGridWrapper}>
        <div className={styles.memoryGrid}>
          {pagesArray.map((page, stepIdx) => (
            <div 
                key={stepIdx} 
                className={styles.memoryStep}
                style={{
                  opacity: stepIdx < currentStep ? 1 : (stepIdx === currentStep ? 1 : 0.3),
                  transform: stepIdx === currentStep ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.3s'
                }}
            >
              <div 
                className={styles.pageRequest}
                style={{
                    background: stepIdx === currentStep - 1 ? 'var(--accent-tertiary)' : 'transparent',
                    color: stepIdx === currentStep - 1 ? 'black' : 'var(--accent-tertiary)',
                    borderRadius: '4px'
                }}
              >
                {page}
              </div>
              <div className={styles.framesContainer}>
                {(result?.framesSteps[stepIdx] || Array(frameCount).fill(null)).map((frame, fIdx) => (
                  <div key={fIdx} className={`${styles.frameBox} ${frame !== null ? styles.frameFilled : ''}`}>
                    {frame !== null ? frame : '-'}
                  </div>
                ))}
              </div>
              <div className={`${styles.faultIndicator} ${result?.isFault[stepIdx] ? styles.fault : styles.hit}`}>
                {stepIdx < currentStep ? (result?.isFault[stepIdx] ? 'F' : 'H') : '?'}
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
                   <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Logical Concept</h4>
                   <p style={{lineHeight: 1.6}}>{memoryAlgorithmDetails[algorithm].definition}</p>
                   
                   <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', margin: '1.5rem 0 0.5rem 0'}}>Real-World Analogy</h4>
                   <p style={{lineHeight: 1.6, color: 'var(--warning)', fontStyle: 'italic'}}>"{memoryAlgorithmDetails[algorithm].analogy}"</p>
               </div>
               
               <div>
                  <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem'}}>Internal OS Logic (Pseudocode)</h4>
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
