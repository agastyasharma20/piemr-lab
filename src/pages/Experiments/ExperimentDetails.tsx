import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { experiments } from '../../data/experimentData';
import { ChevronLeft, ChevronRight, Play, BookOpen, Code, HelpCircle, ArrowLeft } from 'lucide-react';
import styles from './ExperimentDetails.module.css';
import QuizComponent from './QuizComponent';
import TerminalEmulator from './simulations/TerminalEmulator';
import PageReplacement from './simulations/PageReplacement';
import DiskSimulation from '../Unit2/DiskSimulation';
import CPUSimulation from '../Unit3/CPUSimulation';
import ProducerConsumer from './simulations/ProducerConsumer';
import ReaderWriter from './simulations/ReaderWriter';
import DiningPhilosophers from './simulations/DiningPhilosophers';
import BankersAlgorithm from './simulations/BankersAlgorithm';

const ExperimentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'theory' | 'algorithm' | 'simulation' | 'quiz'>('theory');

  const expIndex = experiments.findIndex(e => e.id === id);
  const exp = experiments[expIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('theory');
  }, [id]);

  if (!exp) return <div className={styles.container}><h1>Experiment not found</h1></div>;

  const nextExp = experiments[expIndex + 1];
  const prevExp = experiments[expIndex - 1];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.detailContainer}
    >
      {/* HEADER NAVIGATION */}
      <div className={styles.detailHeader}>
        <button onClick={() => navigate('/experiments')} className={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>Back to Labs</span>
        </button>
        <div className={styles.headerInfo}>
          <span className="badge badge-gold">PIEMR Digital Laboratory</span>
          <h1>Experiment No. {exp.number}</h1>
        </div>
        <div className={styles.navArrows}>
          <button 
            disabled={!prevExp} 
            onClick={() => navigate(`/experiments/${prevExp?.id}`)}
            className={styles.iconCircle}
            style={{ opacity: prevExp ? 1 : 0.3, cursor: prevExp ? 'pointer' : 'not-allowed' }}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            disabled={!nextExp} 
            onClick={() => navigate(`/experiments/${nextExp?.id}`)}
            className={styles.iconCircle}
            style={{ opacity: nextExp ? 1 : 0.3, cursor: nextExp ? 'pointer' : 'not-allowed' }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="glass-panel-md" style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid var(--accent-primary)' }}>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{exp.title}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
          <b style={{ color: 'var(--accent-primary)' }}>AIM:</b> {exp.aim}
        </p>
      </div>

      {/* TABS CONTROLS */}
      <div className={styles.tabs}>
        {[
          { id: 'theory', label: 'Theory', icon: BookOpen },
          { id: 'algorithm', label: 'Algorithm', icon: Code },
          { id: 'simulation', label: 'Interactive Lab', icon: Play },
          { id: 'quiz', label: 'Assessment', icon: HelpCircle }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className={styles.tabContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {activeTab === 'theory' && (
              <div className={styles.theoryBox} dangerouslySetInnerHTML={{ __html: exp.theory }} />
            )}

            {activeTab === 'algorithm' && (
              <div className={styles.algorithmBox}>
                <div className={styles.algorithmHeader}>
                   <Code size={24} color="var(--accent-primary)" />
                   <h3 style={{ margin: 0 }}>Step-by-Step Logic</h3>
                </div>
                <div className={styles.algorithmContent} dangerouslySetInnerHTML={{ __html: exp.algorithm || 'Generic conceptual study. No specific code implementation required.' }} />
              </div>
            )}

            {activeTab === 'simulation' && (
              <div className={styles.simulationBox}>
                {exp.simulationType === 'unix-commands' ? (
                  <TerminalEmulator />
                ) : exp.simulationType.startsWith('page-') ? (
                  <PageReplacement algorithm={exp.simulationType.split('-')[1] as any} />
                ) : exp.simulationType.startsWith('disk-') ? (
                  <div className="glass-panel-lg" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Interactive Disk Lab</h3>
                    <DiskSimulation />
                  </div>
                ) : exp.simulationType.startsWith('cpu-') ? (
                  <div className="glass-panel-lg" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Interactive CPU Lab</h3>
                    <CPUSimulation />
                  </div>
                ) : exp.simulationType === 'ipc-producer' ? (
                  <ProducerConsumer />
                ) : exp.simulationType === 'ipc-reader' ? (
                  <ReaderWriter />
                ) : exp.simulationType === 'ipc-philosopher' ? (
                  <DiningPhilosophers />
                ) : exp.simulationType === 'bankers' ? (
                  <BankersAlgorithm />
                ) : (
                  <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    <div className={styles.iconCircle} style={{ width: 80, height: 80, margin: '0 auto 1.5rem', background: 'rgba(37,99,235,0.1)' }}>
                      <Play size={40} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Lab Simulation Environment</h3>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                      We are initializing the interactive <b>{exp.simulationType}</b> core.
                      This module provides real-time experimentation with the concepts discussed in the theory.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className={styles.quizBox}>
                 <QuizComponent questions={exp.quiz} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ExperimentDetails;
