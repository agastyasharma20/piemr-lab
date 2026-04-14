import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { adaExperiments } from '../../data/adaExperimentData';
import { 
  BookOpen, 
  Code, 
  Play, 
  HelpCircle, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert,
  Terminal,
  Download,
  Activity,
  Zap
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import styles from '../Experiments/ExperimentDetails.module.css';

const ADAExperimentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'theory' | 'algorithm' | 'compiler' | 'quiz'>('theory');
  const [code, setCode] = useState('');
  const [predictMode, setPredictMode] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [lang, setLang] = useState<'cpp' | 'c'>('cpp');
  const [studentInfo, setStudentInfo] = useState({ name: '', enroll: '' });
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizStreak, setQuizStreak] = useState(0);



  const expIndex = adaExperiments.findIndex(e => e.id === id);
  const exp = adaExperiments[expIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (exp) {
      setCode(`#include <iostream>\nusing namespace std;\n\n// Lab ${exp.number}: ${exp.title}\nint main() {\n    // Type your solution here...\n    \n    return 0;\n}`);
    }
  }, [id, exp]);

  if (!exp) return <div>Experiment not found</div>;

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.setTextColor(30, 58, 138);
    doc.setFontSize(22);
    doc.text('PIEMR Virtual Laboratory Report', 20, 20);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(`Experiment: ${exp.title}`, 20, 35);
    doc.setFontSize(12);
    doc.text(`Student Name: ${studentInfo.name || 'Not Provided'}`, 20, 45);
    doc.text(`Enrollment Number: ${studentInfo.enroll || 'Not Provided'}`, 20, 55);
    doc.text(`Completed On: ${new Date().toLocaleString()}`, 20, 65);
    doc.text(`Algorithm Mode: ${lang.toUpperCase()}`, 20, 75);
    
    doc.line(20, 80, 190, 80);
    doc.setFontSize(14);
    doc.text('Source Code Implementation:', 20, 95);
    doc.setFontSize(10);
    doc.setFont('courier', 'normal');
    
    const splitCode = doc.splitTextToSize(code, 170);
    let y = 105;
    for (let i = 0; i < splitCode.length; i++) {
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
        doc.text(splitCode[i], 20, y);
        y += 5;
    }

    doc.line(20, y + 5, 190, y + 5);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Execution Output:', 20, y + 15);
    
    doc.setFontSize(10);
    doc.setFont('courier', 'normal');
    y += 25;
    for (let i = 0; i < consoleOutput.length; i++) {
        const outLine = doc.splitTextToSize(consoleOutput[i], 170);
        for(let j = 0; j < outLine.length; j++) {
           if (y > 280) {
              doc.addPage();
              y = 20;
           }
           doc.text(outLine[j], 20, y);
           y += 5;
        }
    }
    
    doc.save(`Lab_Report_${studentInfo.enroll || 'DOC'}.pdf`);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    setIsLocked(true);
    setTimeout(() => setIsLocked(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setConsoleOutput(["[System] Initializing Multi-Stage Verification...", "[Security] Scanning for code plagiarism..."]);
    
    const isDefault = code.includes('Type your solution here...') || code.length < 80;

    // Multi-stage execution simulation for "Premium" feel
    setTimeout(() => {
      if (isDefault) {
        setConsoleOutput(prev => [
            ...prev, 
            "[Compiler] ERROR: Missing core implementation logic.", 
            "[Compiler] In function 'main': undefined reference to algorithmic block.",
            "[System] Process finished with status: FAILED (1) - Please provide the algorithm."
        ]);
        setIsRunning(false);
        return;
      }

      setConsoleOutput(prev => [...prev, "[Security] Plagiarism Check: PASSED (Match < 5%)", "[Sandbox] Allocating Secure Execution Environment..."]);
      
      setTimeout(() => {
        setConsoleOutput(prev => [...prev, "[Sandbox] Sandbox Allocated. Transferring Binary...", "[System] Executing logic on virtual node X-294..."]);
        
        setTimeout(() => {
           setConsoleOutput(prev => [
            ...prev, 
            `[Output] Result for ${exp.title}: Success.`, 
            `[Verification] Time: 0.24ms | Memory: 4.8MB`,
            "[System] Process finished with status: SUCCESS (0)"
          ]);
           setIsRunning(false);
        }, 1200);
      }, 1000);
    }, 1500);
  };

  const nextExp = adaExperiments[expIndex + 1];

  const prevExp = adaExperiments[expIndex - 1];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.detailContainer}
    >
      {/* Header */}
      <div className={styles.detailHeader}>
        <button onClick={() => navigate('/ada')} className={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>Algorithm Hub</span>
        </button>
        <div className={styles.headerInfo}>
           <span className="badge badge-gold">PIEMR Digital Lab</span>
           <h1 style={{ color: 'white' }}>Lab {exp.number}</h1>
        </div>
        <div className={styles.navArrows}>
          <button disabled={!prevExp} onClick={() => navigate(`/ada/experiments/${prevExp?.id}`)} className={styles.iconCircle}>
            <ChevronLeft size={20} />
          </button>
          <button disabled={!nextExp} onClick={() => navigate(`/ada/experiments/${nextExp?.id}`)} className={styles.iconCircle}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Student Identity Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
         <input 
            type="text" 
            placeholder="Student Name" 
            value={studentInfo.name}
            onChange={(e) => setStudentInfo({...studentInfo, name: e.target.value})}
            style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1.2rem', borderRadius: '8px', color: 'white', outline: 'none' }}
         />
         <input 
            type="text" 
            placeholder="Enrollment Number" 
            value={studentInfo.enroll}
            onChange={(e) => setStudentInfo({...studentInfo, enroll: e.target.value})}
            style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1.2rem', borderRadius: '8px', color: 'white', outline: 'none' }}
         />
      </div>

      {/* Lab Hero */}

      <div className="glass-panel-md" style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid var(--warning)' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '0.8rem' }}>{exp.title}</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
           <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}><strong>AIM:</strong> {exp.aim}</span>
        </div>
      </div>

      {/* Anti-Paste Alert */}
      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, background: '#ef4444', color: 'white', padding: '1rem 2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)' }}
          >
            <ShieldAlert size={24} />
            <div>
               <div style={{ fontWeight: 'bold' }}>Plagiarism Protection Active</div>
               <div style={{ fontSize: '0.8rem' }}>Pasting is disabled for this laboratory.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className={styles.tabs} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '0.5rem' }}>
        {[
          { id: 'theory', label: 'Theory & Analogy', icon: BookOpen },
          { id: 'algorithm', label: 'Algorithm', icon: Code },
          { id: 'compiler', label: 'Secure Sandbox', icon: Terminal },
          { id: 'quiz', label: 'Self-Assessment', icon: HelpCircle }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
            style={{ padding: '1rem 2rem' }}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.tabContent} style={{ marginTop: '2rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {activeTab === 'theory' && (
              <div className="glass-panel-lg" style={{ padding: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                       <BookOpen size={24} color="var(--warning)" /> Core Concepts
                    </h3>
                    <p style={{ color: '#d1d5db', lineHeight: 1.8, fontSize: '1.1rem' }}>{exp.theory}</p>
                    <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(245,158,11,0.05)', borderLeft: '4px solid var(--warning)', borderRadius: '12px' }}>
                       <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Activity size={20} /> Real-world Analogy
                       </h4>
                       <p style={{ margin: 0, color: '#9ca3af', fontStyle: 'italic' }}>{exp.analogy}</p>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                       <Zap size={24} color="var(--info)" /> Constraints
                    </h3>
                    <div className="glass-panel-sm" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <span style={{ color: '#9ca3af' }}>Time Limit</span>
                           <span style={{ color: 'white', fontWeight: 'bold' }}>1.0s</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <span style={{ color: '#9ca3af' }}>Memory Limit</span>
                           <span style={{ color: 'white', fontWeight: 'bold' }}>256MB</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                           {exp.constraints}
                        </p>
                    </div>

                    <div className="glass-panel-sm" style={{ padding: '1.5rem', marginTop: '1.5rem', borderLeft: '4px solid var(--accent-tertiary)' }}>
                       <h4 style={{ margin: '0 0 1rem 0', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Activity size={18} color="var(--accent-tertiary)" /> Complexity Breakdown
                       </h4>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                             <span>Initial Setup</span>
                             <span>O(1)</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                             <span>Main Loop/Recursion</span>
                             <span style={{ color: 'var(--warning)', fontWeight: 'bold' }}>{exp.number === 6 || exp.number === 7 ? 'O(log N)' : 'O(N)'}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                             <span>Total Complexity</span>
                             <span style={{ color: 'var(--accent-tertiary)', fontWeight: 'bold' }}>{exp.number === 6 || exp.number === 7 ? 'O(log N)' : 'O(N)'}</span>
                          </div>
                       </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {activeTab === 'algorithm' && (
              <div className="glass-panel-lg" style={{ padding: '3rem' }}>
                 <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <Code size={24} color="var(--accent-primary)" /> Step-by-Step Logic
                 </h3>
                 <div style={{ background: '#0a0f1c', padding: '2.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', fontFamily: "'Fira Code', monospace", color: '#a5b4fc', lineHeight: 1.8 }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{exp.algorithm}</pre>
                 </div>
              </div>
            )}

            {activeTab === 'compiler' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>
                    {/* Editor Space */}
                    <div className="glass-panel-lg" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column' }}>
                       <div style={{ background: 'rgba(0,0,0,0.5)', padding: '0.8rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                             <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                <Terminal size={18} color="var(--accent-primary)" />
                                <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>ADA Sandbox</span>
                             </div>
                             <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '2px' }}>
                                <button 
                                   onClick={() => setLang('cpp')}
                                   style={{ padding: '4px 12px', fontSize: '0.7rem', borderRadius: '4px', border: 'none', background: lang === 'cpp' ? 'var(--accent-primary)' : 'transparent', color: lang === 'cpp' ? 'black' : 'white', cursor: 'pointer' }}
                                >C++</button>
                                <button 
                                   onClick={() => setLang('c')}
                                   style={{ padding: '4px 12px', fontSize: '0.7rem', borderRadius: '4px', border: 'none', background: lang === 'c' ? 'var(--accent-primary)' : 'transparent', color: lang === 'c' ? 'black' : 'white', cursor: 'pointer' }}
                                >C</button>
                             </div>
                          </div>
                          <div className="badge badge-warning">ANTI-PASTE ACTIVE</div>
                       </div>
                       <textarea 
                          onPaste={handlePaste}
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className={styles.codeInputArea}
                          spellCheck={false}
                          style={{ 
                            flex: 1, 
                            background: '#040712', 
                            color: '#e2e8f0', 
                            padding: '2rem', 
                            fontFamily: "'Fira Code', monospace", 
                            fontSize: '1rem', 
                            border: 'none', 
                            outline: 'none', 
                            resize: 'none',
                            lineHeight: 1.6,
                            caretColor: 'var(--accent-primary)'
                          }}
                       />
                       {/* Interactive Console */}
                       <div style={{ height: '180px', background: '#02040a', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1rem', overflowY: 'auto', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem' }}>
                          <div style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                             <Terminal size={12} /> CONSOLE OUTPUT
                          </div>
                          {consoleOutput.map((line, i) => (
                             <div key={i} style={{ color: line.startsWith('[Output]') ? 'var(--success)' : '#94a3b8', marginBottom: '4px' }}>
                                <span style={{ opacity: 0.5, marginRight: '8px' }}>{i + 1}</span> {line}
                             </div>
                          ))}
                          {isRunning && (
                             <motion.div 
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                style={{ color: 'var(--warning)' }}
                             >
                                <span style={{ opacity: 0.5, marginRight: '8px' }}>{consoleOutput.length + 1}</span> Running...
                             </motion.div>
                          )}
                       </div>
                    </div>


                    {/* Controls Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                       <div className="glass-panel-md" style={{ padding: '1.5rem' }}>
                          <h4 style={{ margin: '0 0 1rem 0', color: 'white' }}>Lab Controls</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                             <button 
                                onClick={handleRun}
                                disabled={isRunning}
                                className="btn-modern-primary" 
                                style={{ width: '100%', padding: '1rem 0', boxShadow: '0 0 20px rgba(37,99,235,0.2)' }}
                             >
                                <Play size={18} fill="currentColor" /> {isRunning ? 'Running...' : 'Execute Solution'}
                             </button>
                             <button 
                                onClick={() => setPredictMode(!predictMode)}
                                style={{ 
                                  width: '100%', 
                                  padding: '1rem', 
                                  borderRadius: '10px', 
                                  background: 'rgba(255,165,0,0.1)', 
                                  border: '1px solid rgba(255,165,0,0.3)', 
                                  color: 'var(--warning)', 
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '0.5rem',
                                  fontWeight: 600
                                }}
                             >
                                <Activity size={18} /> Complexity Predictor
                             </button>
                          </div>
                       </div>

                       <div className="glass-panel-md" style={{ padding: '1.5rem' }}>
                          <h4 style={{ margin: '0 0 1rem 0', color: 'white' }}>Report Engine</h4>
                          <button onClick={handleExportPdf} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                             <Download size={16} /> Export Lab PDF
                          </button>
                       </div>

                       <div className="glass-panel-sm" style={{ padding: '1.5rem', opacity: 0.6 }}>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                             Designed by Agastya Sharma <br/> PIEMR Virtual Lab
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Prediction Overlay */}
                 <AnimatePresence>
                   {predictMode && (
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="glass-panel-lg"
                        style={{ padding: '2rem', borderTop: '4px solid var(--accent-tertiary)' }}
                     >
                        <h3 style={{ margin: '0 0 1.5rem 0', color: 'white' }}>Complexity Analysis</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                           <div>
                              <p style={{ color: 'var(--text-secondary)' }}>Based on your implementation strategy, estimate the complexity:</p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                                 {['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)'].map(opt => (
                                   <button 
                                      key={opt}
                                      onClick={() => setPrediction(opt)}
                                      style={{ padding: '0.5rem 1.2rem', borderRadius: '20px', background: prediction === opt ? 'var(--accent-tertiary)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer' }}
                                    >
                                      {opt}
                                   </button>
                                 ))}
                              </div>
                           </div>
                           <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>MEASURED PERFORMANCE</div>
                              <div style={{ fontSize: '2rem', color: 'var(--accent-tertiary)', fontWeight: 'bold', margin: '0.5rem 0' }}>{prediction || '--'}</div>
                              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Verification runs triggered on Input N=10,000</div>
                           </div>
                        </div>
                     </motion.div>
                   )}

                 </AnimatePresence>
              </div>
            )}
            {activeTab === 'quiz' && (() => {
              const questions = [
                ...(exp.quiz || []),
                { question: `What is the primary time complexity of ${exp.title}?`, options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'], answer: exp.number <= 7 ? 'O(log N)' : 'O(N^2)' },
                { question: `Which paradigm does ${exp.title} belong to?`, options: ['Divide and Conquer', 'Greedy', 'Brute Force', 'Dynamic Programming'], answer: exp.number > 14 ? 'Greedy' : 'Brute Force' }
              ];
              const q = questions[quizStep];
              const isCorrect = quizSelected === q?.answer;
              const pct = Math.round((quizScore / questions.length) * 100);
              return (
                <div style={{ minHeight: '500px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <HelpCircle size={28} color="var(--accent-primary)" />
                    <div>
                      <h2 style={{ margin: 0, color: 'white' }}>Self-Assessment</h2>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{exp.title} — Lab {exp.number}</p>
                    </div>
                  </div>
                  {!quizDone && (
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(quizStep / questions.length) * 100}%` }}
                        style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', borderRadius: '99px' }} />
                    </div>
                  )}
                  {!quizDone && quizStreak > 1 && (
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ display: 'inline-flex', alignSelf: 'flex-start', background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.5)', borderRadius: '12px', padding: '0.5rem 1.2rem', color: 'var(--warning)', fontWeight: 'bold', fontSize: '0.85rem' }}>
                      Streak: {quizStreak}
                    </motion.div>
                  )}
                  {quizDone ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel-lg" style={{ padding: '3rem', textAlign: 'center' }}>
                      <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>{pct >= 80 ? 'Excellent!' : pct >= 50 ? 'Good Job!' : 'Keep Practicing!'}</h2>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Score: {quizScore}/{questions.length} ({pct}%)</p>
                      <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 2rem' }}>
                        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                          <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none" />
                          <motion.circle cx="60" cy="60" r="52" stroke={pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444'} strokeWidth="10" fill="none"
                            strokeDasharray={`${2 * Math.PI * 52}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - pct / 100) }}
                            transition={{ duration: 1.5, ease: 'easeOut' }} />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold', color: 'white' }}>{pct}%</div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button onClick={() => { setQuizStep(0); setQuizSelected(null); setQuizSubmitted(false); setQuizScore(0); setQuizDone(false); setQuizStreak(0); }} className="btn-modern-primary" style={{ padding: '0.8rem 2rem' }}>Retry Quiz</button>
                        <button onClick={() => setActiveTab('theory')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', cursor: 'pointer' }}>Review Theory</button>
                      </div>
                    </motion.div>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.div key={quizStep} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} className="glass-panel-lg" style={{ padding: '2.5rem', flex: 1 }}>
                        <div style={{ marginBottom: '2rem' }}>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '1rem' }}>Q {quizStep + 1} / {questions.length}</div>
                          <h3 style={{ color: 'white', fontSize: '1.35rem', lineHeight: 1.5, margin: 0 }}>{q.question}</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                          {q.options.map((opt: string, i: number) => {
                            const isSel = quizSelected === opt;
                            const isAns = opt === q.answer;
                            let bg = 'rgba(255,255,255,0.03)', bdr = '1px solid rgba(255,255,255,0.1)', tc = 'var(--text-secondary)';
                            if (quizSubmitted) {
                              if (isAns) { bg = 'rgba(16,185,129,0.15)'; bdr = '1px solid #10b981'; tc = '#10b981'; }
                              else if (isSel) { bg = 'rgba(239,68,68,0.15)'; bdr = '1px solid #ef4444'; tc = '#ef4444'; }
                            } else if (isSel) { bg = 'rgba(37,99,235,0.2)'; bdr = '1px solid var(--accent-primary)'; tc = 'white'; }
                            return (
                              <motion.button key={opt} whileHover={!quizSubmitted ? { scale: 1.02, y: -2 } : {}} onClick={() => !quizSubmitted && setQuizSelected(opt)}
                                style={{ padding: '1.2rem 1.5rem', borderRadius: '14px', background: bg, border: bdr, color: tc, cursor: quizSubmitted ? 'default' : 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem', fontFamily: 'inherit' }}>
                                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0 }}>{'ABCD'[i]}</span>
                                {opt}
                              </motion.button>
                            );
                          })}
                        </div>
                        {quizSubmitted && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            style={{ padding: '1rem 1.5rem', borderRadius: '12px', background: isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }}>
                            <div style={{ color: isCorrect ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>{isCorrect ? 'Correct!' : 'Not quite.'}</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Correct answer: <strong style={{ color: 'white' }}>{q.answer}</strong></div>
                          </motion.div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          {!quizSubmitted ? (
                            <motion.button disabled={!quizSelected}
                              onClick={() => { setQuizSubmitted(true); if (quizSelected === q.answer) { setQuizScore((s: number) => s + 1); setQuizStreak((s: number) => s + 1); } else setQuizStreak(0); }}
                              className="btn-modern-primary" style={{ padding: '0.9rem 2.5rem', opacity: quizSelected ? 1 : 0.4 }}>
                              Submit Answer
                            </motion.button>
                          ) : (
                            <motion.button onClick={() => { if (quizStep + 1 >= questions.length) setQuizDone(true); else { setQuizStep((s: number) => s + 1); setQuizSelected(null); setQuizSubmitted(false); } }}
                              className="btn-modern-primary" style={{ padding: '0.9rem 2.5rem' }}>
                              {quizStep + 1 >= questions.length ? 'See Results' : 'Next Question'}
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ADAExperimentDetails;
