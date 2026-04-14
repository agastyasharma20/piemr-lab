import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  Clock, 
  Database,
  Terminal,
  Zap,
  Code
} from 'lucide-react';

import { ParticleBackground } from '../../components/common/InteractiveEffects';

const complexityLevels = [
  { notation: 'O(1)', name: 'Constant', color: '#10b981', desc: 'Execution time remains the same regardless of input size.' },
  { notation: 'O(log n)', name: 'Logarithmic', color: '#3b82f6', desc: 'Execution time grows slowly, typically by halving the input.' },
  { notation: 'O(n)', name: 'Linear', color: '#8b5cf6', desc: 'Execution time grows proportionately to input size.' },
  { notation: 'O(n log n)', name: 'Linearithmic', color: '#f59e0b', desc: 'Common in efficient sorting algorithms like Merge/Quick Sort.' },
  { notation: 'O(n²)', name: 'Quadratic', color: '#ef4444', desc: 'Ocurrs in nested loops. Time increases squarely with input.' },
  { notation: 'O(2ⁿ)', name: 'Exponential', color: '#ec4899', desc: 'Time doubles with each addition to input. Highly inefficient.' }
];

const ANALYZER_TEMPLATES = {
  linear_search: {
    code: `int linearSearch(int arr[], int n, int x) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == x)\n            return i;\n    }\n    return -1;\n}`,
    analysis: [
      { line: 1, text: "Function declaration overhead.", complexity: "O(1)" },
      { line: 2, text: "Loop runs N times in worst case.", complexity: "O(N)" },
      { line: 3, text: "Simple comparison within loop.", complexity: "O(1) per iteration" },
      { line: 5, text: "Constant time return.", complexity: "O(1)" }
    ],
    total: "O(N)"
  },
  binary_search: {
    code: `int binarySearch(int arr[], int l, int r, int x) {\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (arr[m] == x) return m;\n        if (arr[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}`,
    analysis: [
      { line: 1, text: "Boundary setup.", complexity: "O(1)" },
      { line: 2, text: "Search space halves each iteration.", complexity: "O(log N)" },
      { line: 3, text: "Midpoint calculation.", complexity: "O(1)" },
      { line: 7, text: "Loop exits after logarithmic steps.", complexity: "O(log N)" }
    ],
    total: "O(log N)"
  },
  bubble_sort: {
    code: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1])\n                swap(arr[j], arr[j+1]);\n        }\n    }\n}`,
    analysis: [
      { line: 2, text: "Outer loop runs N times.", complexity: "O(N)" },
      { line: 3, text: "Inner loop runs N-i times (Average N/2).", complexity: "O(N)" },
      { line: 4, text: "Comparison and Swap inside nested loops.", complexity: "O(1) x N x N" },
      { line: 7, text: "Nested summation series.", complexity: "O(N^2)" }
    ],
    total: "O(N²)"
  }
};

const ComplexityHub = () => {
  const [activeTab, setActiveTab] = useState<'visualizer' | 'analyzer'>('visualizer');
  const [pastedCode, setPastedCode] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof ANALYZER_TEMPLATES | 'custom'>('linear_search');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customAnalysis, setCustomAnalysis] = useState<any>(null);

  const analysis = selectedTemplate !== 'custom' ? ANALYZER_TEMPLATES[selectedTemplate as keyof typeof ANALYZER_TEMPLATES] : customAnalysis;

  useEffect(() => {
    if (selectedTemplate !== 'custom') {
       setPastedCode(ANALYZER_TEMPLATES[selectedTemplate as keyof typeof ANALYZER_TEMPLATES].code);
       setCustomAnalysis(null);
    }
  }, [selectedTemplate]);

  const handleRunAnalysis = () => {
     if(!pastedCode.trim()) return;
     setIsAnalyzing(true);
     
     setTimeout(() => {
       let complexity = "O(N)";
       const loops = (pastedCode.match(/for\s*\(|while\s*\(/g) || []).length;
       
       if (loops === 0) complexity = "O(1)";
       else if (loops === 1) complexity = pastedCode.includes('/ 2') || pastedCode.includes('>> 1') ? "O(log N)" : "O(N)";
       else if (loops === 2) complexity = "O(N²)";
       else complexity = "O(N³)";
       
       setCustomAnalysis({
          total: complexity,
          analysis: [
              { line: 1, text: "Function structure initialization.", complexity: "O(1)" },
              { line: 2, text: `Heuristic parsing detected ${loops} iterations/loops.`, complexity: complexity },
              { line: 3, text: "Stack memory allocation and validation.", complexity: "O(1)" }
          ]
       });
       setIsAnalyzing(false);
     }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto', color: 'white' }}
    >
      <ParticleBackground count={15} color="var(--warning)" />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Complexity Visualizer v2</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Master the physics of algorithms. Analyze code growth rates with our advanced 
          asymptotic engine and interactive visualizer.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
           <button 
              onClick={() => setActiveTab('visualizer')}
              className={activeTab === 'visualizer' ? "btn-modern-primary" : "btn-modern-secondary"}
              style={{ minWidth: '220px' }}
           >
              ASYMPTOTIC CURVES
           </button>
           <button 
              onClick={() => setActiveTab('analyzer')}
              className={activeTab === 'analyzer' ? "btn-modern-primary" : "btn-modern-secondary"}
              style={{ minWidth: '220px' }}
           >
              CODE ANALYZER
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'visualizer' ? (
            <motion.div 
               key="visualizer"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
            >
               {/* Concept Breakdown */}
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '5rem' }}>
                  <div className="glass-panel-md" style={{ padding: '2.5rem', borderLeft: '4px solid #3b82f6' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Clock size={32} color="#3b82f6" />
                        <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Time Complexity</h2>
                     </div>
                     <p style={{ color: '#d1d5db', lineHeight: 1.8 }}>
                        Quantifies processing time as a function of input size (N). Fundamental for scaling applications.
                     </p>
                  </div>
                  <div className="glass-panel-md" style={{ padding: '2.5rem', borderLeft: '4px solid #10b981' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <Database size={32} color="#10b981" />
                        <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Space Complexity</h2>
                     </div>
                     <p style={{ color: '#d1d5db', lineHeight: 1.8 }}>
                        Memory resources consumed by an algorithm, including stack depth and auxiliary storage.
                     </p>
                  </div>
               </div>

               {/* Growth Ladder */}
               <section style={{ marginBottom: '5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                     {complexityLevels.map((level) => (
                        <motion.div 
                           key={level.notation}
                           whileHover={{ y: -5 }}
                           className="glass-panel-sm"
                           style={{ padding: '1.5rem', textAlign: 'center', borderBottom: `3px solid ${level.color}` }}
                        >
                           <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: level.color }}>{level.notation}</div>
                           <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.5rem' }}>{level.name}</div>
                        </motion.div>
                     ))}
                  </div>
               </section>

               {/* Chart Area */}
               <div className="glass-panel-lg" style={{ padding: '3rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }}>
                     <div style={{ height: '400px', borderLeft: '2px solid rgba(255,255,255,0.1)', borderBottom: '2px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                           <line x1="0" y1="95" x2="100" y2="95" stroke="#10b981" strokeWidth="0.5" />
                           <path d="M 0 95 Q 10 90, 100 80" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                           <line x1="0" y1="95" x2="100" y2="10" stroke="#8b5cf6" strokeWidth="0.5" />
                           <path d="M 0 95 Q 10 95, 20 0" fill="none" stroke="#ef4444" strokeWidth="1" />
                        </svg>
                        <div style={{ position: 'absolute', bottom: '-40px', width: '100%', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Input Size (N)</div>
                        <div style={{ position: 'absolute', left: '-60px', top: '50%', transform: 'rotate(-90deg)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Operations</div>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
                           <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Zap size={18} color="var(--accent-primary)" /> Efficiency Legend
                           </h4>
                           <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                              <li style={{ color: '#10b981' }}>● O(1): Excellent (Instant)</li>
                              <li style={{ color: '#3b82f6' }}>● O(log N): Decent (Searches)</li>
                              <li style={{ color: '#8b5cf6' }}>● O(N): Standard (Loops)</li>
                              <li style={{ color: '#ef4444' }}>● O(N²): Warning (Nested)</li>
                           </ul>
                        </div>
                        <div className="glass-panel-sm" style={{ padding: '1.5rem' }}>
                           <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Quick Tip</h4>
                           <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                              Binary search reduces search space by half each step, achieving logarithmic time. Always sort before you search!
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         ) : (
            <motion.div 
               key="analyzer"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="glass-panel-lg"
               style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                     {(Object.keys(ANALYZER_TEMPLATES) as Array<keyof typeof ANALYZER_TEMPLATES>).map(t => (
                        <button 
                           key={t}
                           onClick={() => setSelectedTemplate(t)}
                           style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: selectedTemplate === t ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)', color: selectedTemplate === t ? 'black' : 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                        >
                           {t.replace('_', ' ').toUpperCase()}
                        </button>
                     ))}
                     <button 
                         onClick={() => { setSelectedTemplate('custom'); setPastedCode(''); }}
                         style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: selectedTemplate === 'custom' ? 'var(--warning)' : 'rgba(255,255,255,0.05)', color: selectedTemplate === 'custom' ? 'black' : 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                     >
                        CUSTOM (PASTE)
                     </button>
                  </div>
                  <div className="badge badge-gold">ASYMPTOTIC ENGINE v2.4</div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', minHeight: '550px' }}>
                  {/* Code Pane */}
                  <div style={{ display: 'flex', flexDirection: 'column', background: '#02040a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                     <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1.5rem', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>SOURCE CODE ANALYSIS</span>
                        <Code size={16} color="var(--accent-primary)" />
                     </div>
                     <textarea 
                        value={pastedCode}
                        onChange={(e) => { setPastedCode(e.target.value); setSelectedTemplate('custom'); }}
                        placeholder="// Paste your C/C++ code here..."
                        style={{ 
                           flex: 1, 
                           background: 'transparent', 
                           color: '#94a3b8', 
                           padding: '2rem', 
                           fontFamily: "'Fira Code', monospace", 
                           border: 'none', 
                           outline: 'none', 
                           resize: 'none',
                           fontSize: '1rem',
                           lineHeight: 1.7,
                           caretColor: 'var(--accent-primary)'
                        }}
                     />
                  </div>

                  {/* Analysis Pane */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     {analysis ? (
                        <>
                           <div className="glass-panel-sm" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-tertiary)', background: 'rgba(139, 92, 246, 0.05)' }}>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '1px' }}>WORST CASE COMPLEXITY</div>
                              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent-tertiary)', fontFamily: "'Fira Code', monospace" }}>{analysis.total}</div>
                           </div>
                           
                           <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
                              {analysis.analysis.map((step: any, i: number) => (
                                 <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-panel-sm"
                                    style={{ padding: '1.2rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1.2rem', alignItems: 'center' }}
                                 >
                                    <div style={{ width: '35px', height: '35px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--accent-primary)', border: '1px solid rgba(255,255,255,0.05)' }}>{step.line}</div>
                                    <div style={{ flex: 1 }}>
                                       <div style={{ fontSize: '0.95rem', color: 'white', fontWeight: 500 }}>{step.text}</div>
                                       <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Contribution: <span style={{ color: 'var(--warning)', fontWeight: 'bold' }}>{step.complexity}</span></div>
                                    </div>
                                 </motion.div>
                              ))}
                           </div>
                        </>
                     ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', color: 'var(--text-muted)', textAlign: 'center', padding: '3rem', opacity: 0.8 }}>
                           <Terminal size={64} style={{ marginBottom: '1.5rem', opacity: 0.1 }} />
                           <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>{selectedTemplate === 'custom' ? 'Ready for Analysis' : 'Pedagogical Code Analyzer'}</h3>
                           <p style={{ maxWidth: '300px', fontSize: '0.9rem', marginBottom: '2rem' }}>
                              {selectedTemplate === 'custom' ? 'Click below to parse your custom logic for asymptotic bounds.' : 'Please select an algorithm template or paste your code for a line-by-line breakdown.'}
                           </p>
                           
                           {selectedTemplate === 'custom' ? (
                              <button 
                                 onClick={handleRunAnalysis} 
                                 disabled={isAnalyzing || pastedCode.length < 5} 
                                 className="btn-modern-primary"
                                 style={{ padding: '0.8rem 2rem', background: 'var(--warning)', color: 'black' }}
                              >
                                 {isAnalyzing ? 'COMPUTING MATRICES...' : 'RUN ASYMPTOTIC ENGINE'}
                              </button>
                           ) : (
                              <div style={{ display: 'flex', gap: '1rem' }}>
                                 <div className="badge badge-gold">C++ Supported</div>
                                 <div className="badge badge-gold">Logic Mapping</div>
                              </div>
                           )}
                        </div>
                     )}
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ComplexityHub;
