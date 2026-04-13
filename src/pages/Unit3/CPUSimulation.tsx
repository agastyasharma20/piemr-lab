import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fcfsScheduler, sjfNonPreemptive, srtfPreemptive, roundRobin, priorityScheduling } from '../../algorithms/cpuScheduling';
import type { Process, CPUSchedulingResult } from '../../algorithms/cpuScheduling';
import { cpuAlgorithmDetails } from '../../algorithms/CPUAlgorithmDetails';
import { cpuPracticeQuestions } from '../../data/practiceQuestions';
import { HelpCircle, BookOpen, Download } from 'lucide-react';
import styles from './Unit3.module.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ALOGS = {
  FCFS: fcfsScheduler,
  SJF: sjfNonPreemptive,
  SRTF: srtfPreemptive,
  Priority: priorityScheduling,
  'Round Robin': (p: Process[]) => roundRobin(p, 2), // Default quantum 2
};

type CPUSimulationProps = {
  forcedAlgorithm?: keyof typeof ALOGS;
};

const CPUSimulation = ({ forcedAlgorithm }: CPUSimulationProps = {}) => {
  const [processes, setProcesses] = useState<Process[]>(cpuPracticeQuestions[0].processes);
  const [selectedQuestion, setSelectedQuestion] = useState(cpuPracticeQuestions[0].id);
  const [algorithm, setAlgorithm] = useState<keyof typeof ALOGS>(forcedAlgorithm || 'FCFS');
  const [quantum, setQuantum] = useState(2);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const [result, setResult] = useState<CPUSchedulingResult | null>(null);
  
  const exportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (forcedAlgorithm) {
      setAlgorithm(forcedAlgorithm);
    }
  }, [forcedAlgorithm]);

  useEffect(() => {
    try {
      if (processes.length === 0) return;
      let res;
      if (algorithm === 'Round Robin') {
        res = roundRobin(processes, quantum);
      } else {
        const algoFunc = ALOGS[algorithm];
        res = algoFunc(processes);
      }
      setResult(res);
      setCurrentTime(0);
      setIsPlaying(false);
    } catch (e) { }
  }, [processes, algorithm, quantum]);

  useEffect(() => {
    if (isPlaying && result) {
      const interval = setInterval(() => {
        setCurrentTime(t => {
          const maxTime = result.gantt[result.gantt.length - 1].endTime;
          if (t >= maxTime) {
            setIsPlaying(false);
            return maxTime;
          }
          return t + 1;
        });
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isPlaying, result]);

  const handleQuestionChange = (id: string) => {
    const question = cpuPracticeQuestions.find(q => q.id === id);
    if (question) {
      setSelectedQuestion(id);
      setProcesses(question.processes);
      setQuizIndex(0);
      setUserAnswer(null);
      setShowExplanation(false);
      setCurrentTime(0);
    }
  };

  const handleExport = async (type: 'png' | 'pdf') => {
    if (!exportRef.current) return;
    setIsExporting(true);
    
    // Slight delay to allow CSS conditional rendering for export view
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(exportRef.current!, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#0f172a'
        });
        const imgData = canvas.toDataURL('image/png');

        if (type === 'png') {
          const link = document.createElement('a');
          link.download = `CPU_Simulation_${algorithm}.png`;
          link.href = imgData;
          link.click();
        } else {
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`CPU_Simulation_${algorithm}.pdf`);
        }
      } catch (err) {
        console.error("Export failed", err);
      }
      setIsExporting(false);
    }, 100);
  };

  const currentQuizzes = cpuPracticeQuestions.find(q => q.id === selectedQuestion)?.quizzes || [];
  const currentQuiz = currentQuizzes[quizIndex];
  const maxTotalTime = result?.gantt.length ? result.gantt[result.gantt.length - 1].endTime : 1;
  const visibleGantt = result?.gantt.filter(g => g.startTime < currentTime).map(g => ({
    ...g,
    endTime: Math.min(g.endTime, currentTime)
  })) || [];

  const readyQueue = processes
    .filter(p => {
        if (p.arrivalTime > currentTime) return false;
        const compTime = result?.gantt.filter(g => g.processId === p.id).pop()?.endTime || 0;
        return compTime > currentTime || compTime === 0;
    })
    .sort((a, b) => a.arrivalTime - b.arrivalTime);

  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#3b82f6'];
  const getColor = (pid: string) => {
    if (pid === 'IDLE') return '#1b1d2c';
    const index = parseInt(pid.replace('P', '')) - 1;
    return colors[index % colors.length] || colors[0];
  };

  return (
    <div className={`glass-panel-md ${styles.labContainer}`} style={{ position: 'relative' }}>
      
      {/* Export Action Bar */}
      <div style={{ position: 'absolute', top: 15, right: 20, display: 'flex', gap: '8px', zIndex: 10 }}>
        <button onClick={() => handleExport('png')} style={{ background: 'var(--accent-tertiary)', color: 'black', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
          <Download size={14} /> PNG
        </button>
        <button onClick={() => handleExport('pdf')} style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
          <Download size={14} /> PDF
        </button>
      </div>

      <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem', width: '100%', marginTop: '2.5rem' }}>
        <button 
          onClick={() => setIsCustomMode(false)}
          style={{flex:1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-gold)', background: !isCustomMode ? 'rgba(212,160,23,0.15)' : 'transparent', color: !isCustomMode ? 'var(--accent-tertiary)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600}}
        >
          🎓 Practice & Quiz Mode
        </button>
        <button 
          onClick={() => setIsCustomMode(true)}
          style={{flex:1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--accent-primary)', background: isCustomMode ? 'rgba(37,99,235,0.15)' : 'transparent', color: isCustomMode ? 'var(--accent-primary)' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600}}
        >
          🔧 Custom Manual Entry
        </button>
      </div>

      {!isCustomMode && (
        <div style={{background: 'rgba(212,160,23,0.05)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-gold)', marginBottom: '1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem'}}>
            <HelpCircle size={18} style={{color: 'var(--accent-tertiary)'}} />
            <h4 style={{margin: 0, color: 'var(--accent-tertiary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Curated Practice Cases</h4>
          </div>
          <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start'}}>
            <div style={{flex: 1, minWidth: '200px'}}>
              <select 
                value={selectedQuestion} 
                onChange={e => handleQuestionChange(e.target.value)}
                style={{background: 'var(--bg-secondary)', border: '1px solid var(--border-gold)', color: 'white', padding: '0.5rem', borderRadius: '6px', width: '100%', cursor: 'pointer', outline: 'none'}}
              >
                {cpuPracticeQuestions.map(q => <option key={q.id} value={q.id}>{q.title}</option>)}
              </select>
            </div>
            <p style={{flex: 2, margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5}}>
               {cpuPracticeQuestions.find(q => q.id === selectedQuestion)?.description}
            </p>
          </div>
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
                      background: userAnswer === idx ? (idx === currentQuiz.correctIndex ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)') : 'rgba(255,255,255,0.05)',
                      color: userAnswer === idx ? (idx === currentQuiz.correctIndex ? 'var(--success)' : '#ff8a8a') : 'var(--text-primary)',
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
                <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{marginTop: '1rem', padding: '0.75rem', borderRadius: '6px', background: 'rgba(26,92,190,0.1)', borderLeft: '3px solid var(--accent-primary)'}}>
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
                </motion.div>
              )}
            </div>
          )}
        </div>
      )}

      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <label>Scheduling Algorithm</label>
          <select value={algorithm} onChange={e => setAlgorithm(e.target.value as any)} disabled={!!forcedAlgorithm}>
            {Object.keys(ALOGS).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        {algorithm === 'Round Robin' && (
          <div className={styles.inputGroup}>
            <label>Time Quantum (T<sub>q</sub>)</label>
            <input type="number" min="1" value={quantum} onChange={e => setQuantum(parseInt(e.target.value) || 1)} />
          </div>
        )}
        
        <div className={styles.playbackControls}>
           <button 
             className={styles.iconBtn} 
             onClick={() => setIsPlaying(!isPlaying)}
             style={{background: isPlaying ? 'var(--accent-maroon)' : 'var(--success)', minWidth: '160px', color: 'white'}}
           >
             {isPlaying ? 'Pause Simulation' : '▶ Execute Algorithm'}
           </button>
           <button className={styles.iconBtn} onClick={() => {setCurrentTime(0); setIsPlaying(false);}}>Reset Clock</button>
           <div style={{flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', position: 'relative', margin: '0 1rem'}}>
              <div style={{width: `${(currentTime/maxTotalTime)*100}%`, height: '100%', background: 'var(--accent-tertiary)', borderRadius: '2px', transition: 'width 0.3s'}}></div>
           </div>
           <span style={{fontSize: '1rem', color: 'var(--accent-tertiary)', fontWeight: 'bold', minWidth: '60px'}}>T = {currentTime}</span>
        </div>
      </div>

      {/* --- EXPORT VIEWPORT TARGET --- */}
      <div ref={exportRef} style={{ background: isExporting ? '#0f172a' : 'transparent', padding: isExporting ? '2rem' : '0' }}>
        
        {isExporting && (
          <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <h2 style={{ color: 'white', margin: 0 }}>PIEMR Virtual Lab - CPU Scheduling</h2>
            <p style={{ color: 'var(--accent-tertiary)', margin: '0.2rem 0 0 0', fontWeight: 'bold' }}>Algorithm: {algorithm}</p>
            {!isCustomMode && <p style={{ color: 'var(--text-secondary)', margin: '0.2rem 0' }}>Problem details: {cpuPracticeQuestions.find(q => q.id === selectedQuestion)?.description}</p>}
          </div>
        )}

        {isCustomMode && !isExporting && (
           <motion.div initial={{opacity:0, y: -10}} animate={{opacity:1, y: 0}} style={{background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem', marginTop: '1.5rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
              <div>
                <h4 style={{margin: 0, color: 'var(--accent-primary)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.05em'}}>Real-Time Process Editor</h4>
                <p style={{margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Define process metrics to observe specific scheduling behaviors.</p>
              </div>
              <button 
                className={styles.iconBtn} 
                style={{background: 'var(--accent-primary)', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: 'bold'}}
                onClick={() => {
                  const newId = `P${processes.length + 1}`;
                  setProcesses([...processes, { id: newId, arrivalTime: 0, burstTime: 1, priority: 1 }]);
                }}
              >
                + Add Process
              </button>
            </div>
            <div style={{overflowX: 'auto'}}>
              {/* Note: In edit mode we keep inputs. When exporting we just show read-only data below */}
              <table className={styles.processTable}>
                <thead>
                  <tr>
                    <th style={{textAlign: 'left', paddingLeft: '1rem'}}>PID</th>
                    <th>Arrival <small>(AT)</small></th>
                    <th>Burst <small>(BT)</small></th>
                    <th>Priority <small>(Lower=Higher)</small></th>
                    <th style={{textAlign: 'right', paddingRight: '1rem'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.map((p, idx) => (
                    <tr key={p.id}>
                      <td><b style={{color: 'var(--accent-tertiary)'}}>{p.id}</b></td>
                      <td style={{textAlign: 'center'}}><input type="number" min="0" value={p.arrivalTime} onChange={e => {
                        const next = [...processes];
                        next[idx] = { ...p, arrivalTime: parseInt(e.target.value) || 0 };
                        setProcesses(next);
                      }} style={{width: '70px', textAlign: 'center', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '6px', color: 'white', fontSize: '0.9rem'}} /></td>
                      <td style={{textAlign: 'center'}}><input type="number" min="1" value={p.burstTime} onChange={e => {
                        const next = [...processes];
                        next[idx] = { ...p, burstTime: parseInt(e.target.value) || 1 };
                        setProcesses(next);
                      }} style={{width: '70px', textAlign: 'center', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '6px', color: 'white', fontSize: '0.9rem'}} /></td>
                      <td style={{textAlign: 'center'}}><input type="number" min="1" value={p.priority || 1} onChange={e => {
                        const next = [...processes];
                        next[idx] = { ...p, priority: parseInt(e.target.value) || 1 };
                        setProcesses(next);
                      }} style={{width: '70px', textAlign: 'center', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', padding: '6px', color: 'white', fontSize: '0.9rem'}} /></td>
                      <td style={{textAlign: 'right', paddingRight: '1rem'}}>
                        <button onClick={() => setProcesses(processes.filter(curr => curr.id !== p.id))} style={{background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', padding: '4px 10px', borderRadius: '4px', color: '#ff6b6b', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem'}}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        <div style={{marginTop: '2rem', overflowX: 'auto'}}>
          {isExporting && <h4 style={{marginBottom: '0.5rem', color: 'white', fontSize: '1.1rem'}}>Execution Statistics</h4>}
          {!isExporting && <h4 style={{marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.1rem'}}>Execution Statistics Table</h4>}
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
              {processes.map(p => {
                const isFinished = isExporting || (result?.gantt.filter(g => g.processId === p.id).pop()?.endTime || 0) <= currentTime;
                return (
                    <tr key={p.id} style={{opacity: (isExporting || p.arrivalTime <= currentTime) ? 1 : 0.3, transition: 'all 0.5s', background: isFinished ? 'rgba(16,185,129,0.03)' : 'transparent', color: isExporting ? 'white' : 'inherit'}}>
                    <td>
                        <span className={styles.badge} style={{backgroundColor: getColor(p.id), width: '40px', textAlign: 'center', color: 'white', display: 'inline-block', padding: '4px', borderRadius:'4px'}}>{p.id}</span>
                    </td>
                    <td><b>{p.arrivalTime}</b></td>
                    <td><b>{p.burstTime}</b></td>
                    <td><span style={{color: 'var(--text-muted)'}}>{p.priority}</span></td>
                    <td style={{color: isFinished ? 'var(--accent-tertiary)' : 'inherit', fontWeight: 'bold'}}>{isFinished ? result?.waitingTimes[p.id] : '-'}</td>
                    <td style={{color: isFinished ? 'var(--accent-primary)' : 'inherit', fontWeight: 'bold'}}>{isFinished ? result?.turnaroundTimes[p.id] : '-'}</td>
                    </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {!isExporting && (
          <div style={{marginBottom: '1.5rem', marginTop: '1.5rem'}}>
              <h4 style={{fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.05em'}}>Scheduler Ready Queue (Memory)</h4>
              <div style={{display: 'flex', gap: '0.75rem', minHeight: '44px', padding: '0.5rem', background: 'rgba(0,0,0,0.15)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)'}}>
                  {readyQueue.length === 0 ? <span style={{fontSize: '0.85rem', color: 'var(--text-muted)', alignSelf: 'center'}}>No processes arrived yet...</span> : readyQueue.map(p => (
                      <motion.div 
                        layoutId={p.id}
                        key={p.id} 
                        style={{padding: '0.5rem 1rem', borderRadius: '6px', background: getColor(p.id), color: 'white', fontWeight: 'bold', fontSize: '0.85rem', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'}}
                      >
                        {p.id}
                      </motion.div>
                  ))}
              </div>
          </div>
        )}

        <div className={styles.ganttSection} style={{ marginTop: '2rem' }}>
          <h3 style={{marginBottom: '1rem', fontSize: '1.2rem'}}>CPU Allocation Timeline (Gantt Chart)</h3>
          <div className={styles.ganttContainer} style={{height: '60px', background: isExporting ? 'rgba(255,255,255,0.05)' : ''}}>
            {(isExporting ? result?.gantt || [] : visibleGantt).map((step, idx) => {
              const widthPct = ((step.endTime - step.startTime) / maxTotalTime) * 100;
              return (
                <div 
                  key={idx} 
                  className={styles.ganttBlock} 
                  style={{ backgroundColor: getColor(step.processId), height: '100%', width: `${widthPct}%`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{fontSize: '0.9rem', color: 'white', fontWeight: 600}}>{step.processId}</span>
                  <small className={styles.ganttTime} style={{ position: 'absolute', bottom: -20, right: -5, color: isExporting ? 'white' : 'var(--text-secondary)' }}>{step.endTime}</small>
                  {idx === 0 && <small className={styles.ganttTime} style={{ position: 'absolute', bottom: -20, left: -2, color: isExporting ? 'white' : 'var(--text-secondary)' }}>{step.startTime}</small>}
                </div>
              )
            })}
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: isExporting ? 'white' : 'var(--text-secondary)', marginTop: '1.5rem', fontWeight: 500}}>
              <span>Time Start: 0</span>
              <span>Total System Time: {maxTotalTime} ms</span>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1rem'}}>
          <div className="glass-panel-md" style={{padding: '1.5rem', borderLeft: '4px solid var(--accent-primary)', background: isExporting ? 'rgba(37,99,235,0.1)' : 'rgba(26,92,190,0.05)'}}>
            <h4 style={{color: isExporting ? 'white' : 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em'}}>Mathematical Core</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
              <div style={{background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px'}}>
                 <code style={{color: 'var(--accent-tertiary)', fontSize: '1.05rem', fontWeight: 'bold'}}>TAT = Completeness - Arrival</code>
                 <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem'}}>Total time process spent in system.</p>
              </div>
              <div style={{background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px'}}>
                 <code style={{color: 'var(--accent-tertiary)', fontSize: '1.05rem', fontWeight: 'bold'}}>WT = Turnaround - Burst</code>
                 <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem'}}>Time wasted waiting in Ready Queue.</p>
              </div>
            </div>
          </div>

          <div className={styles.resultsGrid} style={{gap: '1rem', gridTemplateColumns: '1fr 1fr'}}>
              <div className={styles.resultCard} style={{background: isExporting ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)'}}>
                <p style={{fontSize: '0.85rem', textTransform: 'uppercase'}}>Average Turnaround</p>
                <h2 style={{fontSize: '2rem', color: 'var(--accent-primary)'}}>{(currentTime >= maxTotalTime || isExporting) ? result?.averageTurnaroundTime : '...'} ms</h2>
              </div>
              <div className={styles.resultCard} style={{background: isExporting ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)'}}>
                <p style={{fontSize: '0.85rem', textTransform: 'uppercase'}}>Average Waiting</p>
                <h2 style={{fontSize: '2rem', color: 'var(--accent-tertiary)'}}>{(currentTime >= maxTotalTime || isExporting) ? result?.averageWaitingTime : '...'} ms</h2>
              </div>
          </div>
        </div>

        {isExporting && (
          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
             <p style={{ margin: 0 }}>Designed and Developed by Agastya Sharma | PIEMR Virtual Lab</p>
          </div>
        )}

      </div>

      {result && !isExporting && (
        <div style={{marginTop: '3.5rem', background: 'rgba(0,0,0,0.2)', padding: '2.5rem', borderRadius: 'var(--border-radius-xl)', border: '1px solid var(--border-glow)'}}>
            <h2 style={{color: 'var(--accent-primary)', marginBottom: '1.5rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <BookOpen size={28} /> {cpuAlgorithmDetails[algorithm].name} Theoretical Analysis
            </h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem'}}>
               <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                   <div>
                       <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.75rem', letterSpacing: '0.1em'}}>Deep Concept</h4>
                       <p style={{lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1rem'}}>{cpuAlgorithmDetails[algorithm].definition}</p>
                   </div>
                   <div style={{padding: '1rem', background: 'rgba(212,160,23,0.1)', borderRadius: '12px', borderLeft: '4px solid var(--accent-tertiary)'}}>
                       <h4 style={{color: 'var(--accent-tertiary)', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.5rem'}}>Real-World Metaphor</h4>
                       <p style={{lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text-primary)'}}>"{cpuAlgorithmDetails[algorithm].analogy}"</p>
                   </div>
               </div>
               <div>
                  <h4 style={{color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.75rem', letterSpacing: '0.1em'}}>Internal Kernel Logic</h4>
                  <pre style={{background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', color: '#4ade80', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.05)'}}>
                      {cpuAlgorithmDetails[algorithm].pseudocode}
                  </pre>
               </div>
            </div>
            <div style={{display: 'flex', gap: '1.25rem', marginTop: '2.5rem', flexWrap: 'wrap'}}>
                <div style={{background: 'rgba(37,99,235,0.15)', padding: '0.6rem 1.25rem', borderRadius: '12px', fontSize: '0.92rem', border: '1px solid rgba(37,99,235,0.3)'}}>
                    ⏱️ <b>Time Complexity:</b> {cpuAlgorithmDetails[algorithm].timeComplexity}
                </div>
                <div style={{background: 'rgba(16,185,129,0.15)', padding: '0.6rem 1.25rem', borderRadius: '12px', fontSize: '0.92rem', color: 'var(--success)', border: '1px solid rgba(16,185,129,0.3)'}}>
                    ✔️ <b>Key Advantage:</b> {cpuAlgorithmDetails[algorithm].advantage}
                </div>
                <div style={{background: 'rgba(239,68,68,0.15)', padding: '0.6rem 1.25rem', borderRadius: '12px', fontSize: '0.92rem', color: '#ff8a8a', border: '1px solid rgba(239,68,68,0.3)'}}>
                    ❌ <b>Limitation:</b> {cpuAlgorithmDetails[algorithm].disadvantage}
                </div>
            </div>
            <div style={{marginTop: '3rem', padding: '2rem', background: 'rgba(212,160,23,0.03)', borderRadius: '16px', border: '1px solid rgba(212,160,23,0.1)'}}>
               <h4 style={{color: 'var(--accent-tertiary)', marginBottom: '1.25rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                 🎓 PIEMR Academic Research Corner
               </h4>
               <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem'}}>
                  <div style={{borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '1.25rem'}}>
                    <h5 style={{color: 'var(--text-primary)', marginBottom: '0.5rem'}}>Context Switching Cost</h5>
                    <p style={{fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6}}>In real systems, the OS takes ~10-100 microseconds to save state. Excessive switching kills L1/L2 cache locality.</p>
                  </div>
                  <div style={{borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '1.25rem'}}>
                    <h5 style={{color: 'var(--text-primary)', marginBottom: '0.5rem'}}>Priority Inversion</h5>
                    <p style={{fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6}}>A low-priority task holds a resource needed by a high-priority task. Resolved via <i>Priority Inheritance</i>.</p>
                  </div>
                  <div style={{borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '1.25rem'}}>
                    <h5 style={{color: 'var(--text-primary)', marginBottom: '0.5rem'}}>Aging Strategy</h5>
                    <p style={{fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6}}>Gradually increasing priority of long-waiting jobs to prevent starvation in Priority systems.</p>
                  </div>
               </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default CPUSimulation;
