import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Cpu, TerminalSquare } from 'lucide-react';
import { coaExperiments } from '../../data/coaExperimentData';
import styles from '../Experiments/ExperimentDetails.module.css';

// Imports for the advanced simulators
import LogicSimulator from './LogicSimulator';
import AssemblySimulator from './AssemblySimulator';

const COAExperimentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'theory' | 'algorithm' | 'simulation'>('theory');
  const [experiment, setExperiment] = useState(coaExperiments[0]);

  useEffect(() => {
    const found = coaExperiments.find(exp => exp.id === id);
    if (found) {
      setExperiment(found);
    } else {
      navigate('/coa/experiments');
    }
  }, [id, navigate]);

  const tabs = [
    { id: 'theory', label: 'Theory', icon: BookOpen },
    { id: 'algorithm', label: 'Algorithm & Logic', icon: Cpu },
    { id: 'simulation', label: 'Interactive Simulator', icon: TerminalSquare },
  ] as const;

  const isLogic = experiment.simulationType === 'logic';
  const colorTheme = isLogic ? 'var(--info)' : 'var(--accent-tertiary)';

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/coa/experiments')}>
          <ArrowLeft size={20} />
          <span>Back to Labs</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="badge" style={{ background: `${colorTheme}15`, color: colorTheme, border: `1px solid ${colorTheme}30` }}>
             {isLogic ? 'Digital Logic Workbench' : 'Assembly Emulator'}
          </span>
        </div>
      </div>

      <div className={styles.titleSection}>
        <h1 className="text-gradient" style={{ background: `linear-gradient(135deg, var(--text-primary) 0%, ${colorTheme} 100%)`, WebkitBackgroundClip: 'text' }}>
          {experiment.title}
        </h1>
        <p className={styles.aim}>{experiment.aim}</p>
      </div>

      <div className={styles.tabsContainer}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            style={activeTab === tab.id ? { borderBottomColor: colorTheme, color: colorTheme } : {}}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.contentArea}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={styles.tabContent}
          >
            {activeTab === 'theory' && (
              <div 
                className={styles.theoryContent} 
                dangerouslySetInnerHTML={{ __html: experiment.theory }} 
              />
            )}
            {activeTab === 'algorithm' && (
              <div 
                className={styles.algorithmContent}
                dangerouslySetInnerHTML={{ __html: experiment.algorithm }}
              />
            )}
            {activeTab === 'simulation' && (
              <div style={{ minHeight: '400px' }}>
                 {isLogic ? (
                   <div className="glass-panel" style={{ borderRadius: 'var(--border-radius-xl)', border: '1px solid var(--border-glow)', overflow: 'hidden' }}>
                     <LogicSimulator type={experiment.logicType as any} />
                   </div>
                 ) : (
                   <AssemblySimulator expId={experiment.id} />
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
