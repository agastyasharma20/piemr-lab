import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Zap, 
  Activity, 
  BookOpen, 
  CheckCircle,
  HelpCircle,
  Code
} from 'lucide-react';

import { ParticleBackground } from '../../components/common/InteractiveEffects';
import { YouTubePiP } from '../../components/common/YouTubePiP';
import QuizComponent from '../Experiments/QuizComponent';

// Import all data sources
import { TOPIC_CONTENT as ADA_TOPIC_DATA } from '../../data/adaTopicHubData';
import { OS_TOPIC_DATA } from '../../data/osTopicHubData';
import { COA_TOPIC_DATA } from '../../data/coaTopicHubData';

// Simulation Components
import TerminalEmulator from '../Experiments/simulations/TerminalEmulator';
import PageReplacement from '../Experiments/simulations/PageReplacement';
import DiskSimulation from '../Unit2/DiskSimulation';
import CPUSimulation from '../Unit3/CPUSimulation';
import ProducerConsumer from '../Experiments/simulations/ProducerConsumer';
import ReaderWriter from '../Experiments/simulations/ReaderWriter';
import DiningPhilosophers from '../Experiments/simulations/DiningPhilosophers';
import BankersAlgorithm from '../Experiments/simulations/BankersAlgorithm';
import LogicCanvas from '../COA/LogicCanvas';
import AssemblySimulator from '../COA/AssemblySimulator';

const DATA_MAP: Record<string, any> = {
  'ada': ADA_TOPIC_DATA,
  'os': OS_TOPIC_DATA,
  'coa': COA_TOPIC_DATA
};

const COLOR_MAP: Record<string, string> = {
  'ada': '#3b82f6',
  'os': '#0ea5e9',
  'coa': '#8b5cf6'
};

const SubjectTopicHub = ({ subject }: { subject: 'ada' | 'os' | 'coa' }) => {
  const navigate = useNavigate();
  const { topicId, subTopicId } = useParams<{ topicId: string; subTopicId: string }>();
  const [activeSection, setActiveSection] = useState<'theory' | 'visual' | 'math' | 'interview' | 'assessment'>('theory');

  const topicData = DATA_MAP[subject];
  // Try multiple key patterns: "topicId/subTopicId", "subTopicId", then "topicId"
  const lookupKey = subTopicId 
    ? (topicData[`${topicId}/${subTopicId}`] ? `${topicId}/${subTopicId}` : (topicData[subTopicId] ? subTopicId : topicId))
    : (topicId || '');
  const topic = topicData[lookupKey || ''];
  const color = topic?.color || COLOR_MAP[subject];

  if (!topic) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '4rem' }}>
        <h2>Topic not found: {topicId}</h2>
        <button onClick={() => navigate(`/${subject}`)} className="btn-modern-secondary" style={{ marginTop: '1rem' }}>
          ← Back to Hub
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'theory', label: 'Theory', icon: BookOpen },
    { id: 'visual', label: topic?.simulation ? 'Interactive Lab' : 'Visuals', icon: Zap },
    { id: 'math', label: 'Mathematics', icon: Code },
    { id: 'interview', label: 'Interview Prep', icon: HelpCircle },
    { id: 'assessment', label: 'Self Assessment', icon: CheckCircle },
  ] as const;

  const renderSimulation = () => {
    if (!topic?.simulation) return null;

    const { type, algorithm } = topic.simulation;

    switch (type) {
      case 'terminal': return <TerminalEmulator />;
      case 'disk': return <DiskSimulation forcedAlgorithm={algorithm as any} />;
      case 'cpu': return <CPUSimulation forcedAlgorithm={algorithm as any} />;
      case 'page': return <PageReplacement algorithm={algorithm as any} />;
      case 'ipc-producer': return <ProducerConsumer />;
      case 'ipc-reader': return <ReaderWriter />;
      case 'ipc-philosopher': return <DiningPhilosophers />;
      case 'bankers': return <BankersAlgorithm />;
      case 'logic': return <LogicCanvas expTitle={topic.title} />;
      case 'asm': return <AssemblySimulator expId={topic.id} title={topic.title} />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto', color: 'white' }}
    >
      <ParticleBackground count={12} color={color} />

      {subject === 'ada' && topic.videoId && (
        <YouTubePiP
          videoId={topic.videoId}
          videoTitle={topic.videoTitle}
          color={color}
        />
      )}

      <header style={{ marginBottom: '3rem' }}>
        <button onClick={() => navigate(`/${subject}`)} className="btn-modern-secondary" style={{ marginBottom: '2rem', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
          ← Back to {subject.toUpperCase()} Dashboard
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ background: `${color}20`, padding: '1.8rem', borderRadius: '28px', border: `1px solid ${color}40`, flexShrink: 0 }}>
             <h1 style={{ margin: 0, color: color, fontSize: '2.5rem' }}>{topic.title?.[0] || '?'}</h1>
          </div>
          <div style={{ flex: 1 }}>
            <div className="badge badge-gold" style={{ marginBottom: '0.8rem' }}>PIEMR ACADEMIC HUB</div>
            <h1 className="text-gradient" style={{ fontSize: '3.4rem', marginBottom: '0.5rem', lineHeight: 1.1 }}>{topic.title}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', lineHeight: 1.6 }}>{topic.description || topic.desc}</p>
          </div>
        </div>
      </header>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '0.4rem' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveSection(tab.id)}
            style={{ flex: 1, padding: '0.9rem 1rem', borderRadius: '10px', background: activeSection === tab.id ? `${color}20` : 'transparent', border: activeSection === tab.id ? `1px solid ${color}50` : '1px solid transparent', color: activeSection === tab.id ? color : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: activeSection === tab.id ? 700 : 400, transition: 'all 0.2s', fontFamily: 'inherit' }}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          
          {/* ═══ THEORY TAB ═══ */}
          {activeSection === 'theory' && (
            <div className="glass-panel-lg" style={{ padding: '3rem', borderTop: `6px solid ${color}` }}>
              <h2 style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <BookOpen size={24} color={color} /> Core Theory
              </h2>
              <p style={{ color: '#d1d5db', lineHeight: 1.9, fontSize: '1.05rem', marginBottom: '2.5rem' }}>
                {topic.detailedTheory || topic.fullTheory || 'Content for this module is currently being finalized.'}
              </p>
              
              {topic.analogy && (
                <div style={{ padding: '1.5rem', background: `${color}10`, borderLeft: `4px solid ${color}`, borderRadius: '12px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: color, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Activity size={20} /> Real-world Analogy
                  </h4>
                  <p style={{ margin: 0, color: '#9ca3af', fontStyle: 'italic' }}>{topic.analogy}</p>
                </div>
              )}

              {topic.properties && (
                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                   {topic.properties.map((p: any, i: number) => (
                     <div key={i} style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ color: color, fontWeight: 700, fontSize: '0.9rem' }}>{p.name || p.label}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{p.desc || p.value}</div>
                     </div>
                   ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ VISUAL TAB ═══ */}
          {activeSection === 'visual' && (
            <div className="glass-panel-lg" style={{ padding: topic?.simulation ? '2rem' : '4rem', textAlign: topic?.simulation ? 'left' : 'center' }}>
              {topic?.simulation ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: `${color}15`, padding: '1rem', borderRadius: '14px', border: `1px solid ${color}30` }}>
                          <Zap size={24} color={color} />
                        </div>
                        <div>
                          <h3 style={{ color: 'white', margin: 0 }}>Interactive Lab Environment</h3>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Step-by-step visual demonstration of {topic.title} concepts.</p>
                        </div>
                      </div>
                      <div className="badge badge-gold" style={{ letterSpacing: '0.1em' }}>PIEMR SIMULATOR</div>
                   </div>
                   {renderSimulation()}
                </div>
              ) : (
                <>
                  <Zap size={48} color={color} style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                  <h3 style={{ color: 'white' }}>Experimental Visualizer</h3>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>
                    Interactive pedagogical simulation for {topic.title} is being optimized for this subject tier.
                    Please refer to the Video PiP at the bottom right for the conceptual walkthrough.
                  </p>
                </>
              )}
            </div>
          )}

          {/* ═══ MATHEMATICS TAB ═══ */}
          {activeSection === 'math' && (
            <div className="glass-panel-lg" style={{ padding: '3rem', borderTop: `6px solid ${color}` }}>
              <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                <Code size={22} color={color} /> Mathematical Foundation
              </h2>
              {(topic.mathematics || topic.math || []).length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                  {(topic.mathematics || topic.math || []).map((math: any, i: number) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <code style={{ fontSize: '1.3rem', color: color, display: 'block', marginBottom: '1rem' }}>{math.formula}</code>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{math.explanation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No mathematical formulations defined for this topic yet.</p>
              )}
            </div>
          )}

          {/* ═══ INTERVIEW PREP TAB ═══ */}
          {activeSection === 'interview' && (
            <div className="glass-panel-lg" style={{ padding: '3rem', borderTop: `6px solid var(--warning)` }}>
              <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                <HelpCircle size={22} color="var(--warning)" /> Interview Prep
              </h2>
              {(topic.interviewQs || topic.qa || []).length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(topic.interviewQs || topic.qa || []).map((q: any, i: number) => (
                    <div key={i} style={{ padding: '1.2rem 1.5rem', background: 'rgba(245,158,11,0.05)', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.15)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--warning)', fontWeight: 700, flexShrink: 0 }}>Q{i + 1}</span>
                      <span style={{ color: '#e2e8f0' }}>{typeof q === 'string' ? q : q.question}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Interview prep content is coming soon.</p>
              )}
            </div>
          )}

          {/* ═══ ASSESSMENT TAB ═══ */}
          {activeSection === 'assessment' && (
            <div className="glass-panel-lg" style={{ padding: '3rem', borderTop: `6px solid var(--success)` }}>
              {topic.quiz && topic.quiz.length > 0 ? (
                <QuizComponent questions={topic.quiz} />
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Knowledge assessment module is under development.</p>
              )}
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default SubjectTopicHub;
