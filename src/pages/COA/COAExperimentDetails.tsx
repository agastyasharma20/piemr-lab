import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, TerminalSquare } from 'lucide-react';

import LogicCanvas from './LogicCanvas';
import AssemblySimulator from './AssemblySimulator';
import { renderExperimentTheory } from './Logic/TheoryContent';

const coaPracticals = [
  { id: 'logic-mux', type: 'logic', title: "Study of Multiplexer and Demultiplexer", aim: "Analyze the truth table and simulate a physical Mux/Demux using interactive generic Logic Gates." },
  { id: 'logic-half-adder', type: 'logic', title: "Study of Half Adder and Subtractor", aim: "Construct basic addition and subtraction logic circuits using XOR, AND, and NOT configurations." },
  { id: 'logic-full-adder', type: 'logic', title: "Study of Full Adder and Subtractor", aim: "Simulate a complete ALU circuit module including Carry-In and Carry-Out transmission bits." },
  { id: 'asm-add-8bit', type: 'asm', title: "WAP to add two 8 bit numbers and store the result at memory location 2000", aim: "Learn basic 8085 Accumulator addition and memory loading instructions." },
  { id: 'asm-mul-8bit', type: 'asm', title: "WAP to multiply two 8 bit numbers stored at memory location 2000 and 2001", aim: "Implement software multiplication using repetitive addition or shifting loops in assembly." },
  { id: 'asm-add-16bit', type: 'asm', title: "WAP to add two 16-bit numbers. Store the result starting from 2000", aim: "Handle 16-bit payload arithmetic using register pairs (HL) and DAD commands." },
  { id: 'asm-test-bit', type: 'asm', title: "WAP which tests if any bit is '0' in a data byte specified at 2000", aim: "Master bit-wise logic, masking (ANI), and conditional jumping (CPI, JZ, JNZ)." },
  { id: 'asm-load-regs', type: 'asm', title: "Load Registers C, D, E, A with consecutive memory starting at 2000", aim: "Comprehend sequential memory pointer incrementing (INX H) and MOV operations." },
  { id: 'asm-inc-array', type: 'asm', title: "Increment all sixteen bytes of data starting at 2000 by 01", aim: "Develop looping architectures using counter registers (MVI C, 10H) and DCR evaluation." },
  { id: 'asm-sum-array', type: 'asm', title: "WAP to add 10 bytes starting from 3000. Store the result at 300A", aim: "Aggregate an array sequence while precisely maintaining Carry logs and conditional looping." }
];

const COAExperimentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'simulation' | 'theory'>('simulation');
  const [experiment, setExperiment] = useState(coaPracticals[0]);

  useEffect(() => {
    const found = coaPracticals.find(exp => exp.id === id);
    if (found) {
      setExperiment(found);
    } else {
      navigate('/coa/experiments');
    }
  }, [id, navigate]);

  const tabs = [
    { id: 'simulation', label: 'Interactive Simulator', icon: TerminalSquare },
    { id: 'theory', label: 'Experiment Aim Details', icon: BookOpen },
  ] as const;

  const isLogic = experiment.type === 'logic';
  const colorTheme = isLogic ? 'var(--info)' : 'var(--accent-tertiary)';

  return (
    <motion.div 
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '4rem' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
           onClick={() => navigate('/coa/experiments')}
           style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ArrowLeft size={16} /> Back to Labs
        </button>
        <span className="badge" style={{ background: `${colorTheme}15`, color: colorTheme, border: `1px solid ${colorTheme}30` }}>
           {isLogic ? 'Digital Logic Workbench' : '8085 Assembly Emulator'}
        </span>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-glow)' }}>
        <h1 className="text-gradient" style={{ background: `linear-gradient(135deg, var(--text-primary) 0%, ${colorTheme} 100%)`, WebkitBackgroundClip: 'text', margin: '0 0 1rem 0' }}>
          {experiment.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
          <strong>Aim:</strong> {experiment.aim}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              background: activeTab === tab.id ? `${colorTheme}15` : 'transparent', 
              color: activeTab === tab.id ? colorTheme : 'var(--text-secondary)', 
              border: activeTab === tab.id ? `1px solid ${colorTheme}40` : '1px solid transparent', 
              padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, transition: 'all 0.3s' 
            }}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div style={{ position: 'relative', minHeight: '500px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'theory' && (
              <div style={{ marginTop: '1rem' }}>
                 {renderExperimentTheory(experiment.id)}
              </div>
            )}
            
            {activeTab === 'simulation' && (
              <div>
                 {isLogic ? (
                   <LogicCanvas expTitle={experiment.title} />
                 ) : (
                   <AssemblySimulator expId={experiment.id} title={experiment.title} />
                 )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default COAExperimentDetails;
