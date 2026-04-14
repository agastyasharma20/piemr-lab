import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Zap, 
  Activity, 
  BookOpen, 
  ChevronRight,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  Code,
  FlaskConical,
  ArrowRight
} from 'lucide-react';

import { ParticleBackground } from '../../components/common/InteractiveEffects';
import { YouTubePiP } from '../../components/common/YouTubePiP';
import { TOPIC_CONTENT } from '../../data/adaTopicHubData';
import { TopicVisualizer } from './TopicVisualizer';

const ALIASES: Record<string, string> = {
  'fundamentals': 'intro',
  'sorting-searching': 'comparison',
  'greedy': 'greedy/intro',
  'dp': 'dp/knapsack',
  'backtracking': 'backtracking',
  'advanced': 'graph-rep',
};

export const ADATopicHub = () => {
  const navigate = useNavigate();
  const { topicId, subTopicId } = useParams<{ topicId: string; subTopicId?: string }>();
  const [activeSection, setActiveSection] = useState<'theory' | 'visual' | 'proofs' | 'interview'>('theory');

  let currentKey = subTopicId ? `${topicId}/${subTopicId}` : topicId || 'intro';
  if (!TOPIC_CONTENT[currentKey]) {
    currentKey = ALIASES[topicId || ''] || 'intro';
  }

  const topic = TOPIC_CONTENT[currentKey];
  if (!topic) {
    return (
      <div style={{ color: 'white', textAlign: 'center', padding: '4rem' }}>
        <h2>Topic not found: {currentKey}</h2>
        <button onClick={() => navigate('/ada')} className="btn-modern-secondary" style={{ marginTop: '1rem' }}>
          ← Back to Hub
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'theory', label: 'Theory & Properties', icon: BookOpen },
    { id: 'visual', label: 'Interactive Visual', icon: Zap },
    { id: 'proofs', label: 'Proofs & Math', icon: Code },
    { id: 'interview', label: 'Interview Prep', icon: HelpCircle },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto', color: 'white' }}
    >
      <ParticleBackground count={12} color={topic.color} />

      {/* Floating Gate Smashers PiP Video */}
      {topic.videoId && (
        <YouTubePiP
          videoId={topic.videoId}
          videoTitle={topic.videoTitle}
          color={topic.color}
        />
      )}

      {/* Header */}
      <header style={{ marginBottom: '3rem' }}>
        <button onClick={() => navigate('/ada')} className="btn-modern-secondary" style={{ marginBottom: '2rem', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
          ← Back to Algorithm Hub
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ background: `${topic.color}20`, padding: '1.8rem', borderRadius: '28px', border: `1px solid ${topic.color}40`, boxShadow: `0 0 40px ${topic.color}25`, flexShrink: 0 }}>
            <topic.icon size={52} color={topic.color} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="badge badge-gold" style={{ marginBottom: '0.8rem' }}>PIEMR ACADEMIC HUB</div>
            <h1 className="text-gradient" style={{ fontSize: '3.4rem', marginBottom: '0.5rem', lineHeight: 1.1 }}>{topic.title}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', lineHeight: 1.6, marginBottom: '1.5rem' }}>{topic.desc}</p>
            {/* Formula highlight */}
            {topic.formula && (
              <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.4)', border: `1px solid ${topic.color}50`, borderLeft: `4px solid ${topic.color}`, borderRadius: '8px', padding: '0.8rem 1.5rem' }}>
                <code style={{ color: topic.color, fontFamily: "'Fira Code', monospace", fontSize: '1rem', fontWeight: 'bold' }}>{topic.formula}</code>
                {topic.formulaDesc && (
                  <span style={{ marginLeft: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{topic.formulaDesc}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Key Facts Banner */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {topic.keyFacts?.map((fact, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
            style={{ flexShrink: 0, background: 'rgba(255,255,255,0.04)', border: `1px solid ${topic.color}25`, borderRadius: '10px', padding: '0.7rem 1.2rem', fontSize: '0.82rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: topic.color, fontSize: '1rem' }}>▸</span> {fact}
          </motion.div>
        ))}
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '0.4rem' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveSection(tab.id)}
            style={{ flex: 1, padding: '0.9rem 1rem', borderRadius: '10px', background: activeSection === tab.id ? `${topic.color}20` : 'transparent', border: activeSection === tab.id ? `1px solid ${topic.color}50` : '1px solid transparent', color: activeSection === tab.id ? topic.color : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: activeSection === tab.id ? 700 : 400, transition: 'all 0.2s', fontFamily: 'inherit' }}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeSection} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          
          {activeSection === 'theory' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2.5rem' }}>
              {/* Left: Main theory */}
              <div className="glass-panel-lg" style={{ padding: '2.5rem', borderTop: `6px solid ${topic.color}` }}>
                <h2 style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  <BookOpen size={24} color={topic.color} /> Core Theory
                </h2>
                <p style={{ color: '#d1d5db', lineHeight: 1.9, fontSize: '1.05rem', marginBottom: '2.5rem' }}>{topic.detailedTheory}</p>
                
                {/* Properties grid */}
                <h3 style={{ color: 'white', marginBottom: '1.2rem', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Activity size={18} color={topic.color} /> Key Properties
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: topic.properties.length > 2 ? '1fr 1fr' : '1fr', gap: '1rem' }}>
                  {topic.properties.map((prop, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.01 }} className="glass-panel-sm"
                      style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderLeft: `3px solid ${topic.color}` }}>
                      <div style={{ color: topic.color, fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{prop.name}</div>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{prop.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Complexity summary */}
                <div className="glass-panel-md" style={{ padding: '2rem', borderTop: `4px solid var(--warning)` }}>
                  <h3 style={{ margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '1.1rem' }}>
                    <Zap size={18} color="var(--warning)" /> Quick Facts
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {topic.keyFacts?.slice(0, 3).map((fact, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        <CheckCircle size={14} color={topic.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                        {fact}
                      </div>
                    ))}
                  </div>
                </div>

                {/* References */}
                <div className="glass-panel-md" style={{ padding: '2rem' }}>
                  <h3 style={{ margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '1.1rem' }}>
                    <ExternalLink size={18} color="var(--accent-primary)" /> References & Links
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {topic.references?.map((ref, i) => (
                      <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-primary)', fontSize: '0.88rem', textDecoration: 'none', padding: '0.6rem 0.8rem', borderRadius: '8px', background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.15)', transition: 'all 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.15)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.07)')}>
                        <ExternalLink size={12} /> {ref.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Navigate to Complexity Engine */}
                <button onClick={() => navigate('/ada/complexity')} className="btn-modern-primary"
                  style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem', background: `linear-gradient(135deg, ${topic.color}, ${topic.color}bb)`, color: 'black', fontWeight: 700 }}>
                  <FlaskConical size={18} /> View Complexity Engine <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {activeSection === 'visual' && (
            <div className="glass-panel-lg" style={{ padding: '3rem', position: 'relative', overflow: 'hidden', minHeight: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${topic.color}, transparent)` }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${topic.color}40, transparent)` }} />
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div className="badge badge-gold">INTERACTIVE PEDAGOGICAL VISUAL</div>
                <h2 style={{ marginTop: '0.5rem', fontSize: '1.5rem' }}>{topic.title} — Simulation</h2>
              </div>
              <TopicVisualizer visualType={topic.visualType} color={topic.color} />
            </div>
          )}

          {activeSection === 'proofs' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Mathematical Proof */}
              <div className="glass-panel-lg" style={{ padding: '2.5rem', borderTop: `6px solid ${topic.color}` }}>
                <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  <Code size={22} color={topic.color} /> Mathematical Proof Points
                </h2>
                {topic.proofPoints?.length ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {topic.proofPoints.map((point, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        style={{ padding: '1.2rem 1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', borderLeft: `4px solid ${topic.color}`, fontFamily: "'Fira Code', monospace", fontSize: '0.88rem', color: '#a5b4fc', lineHeight: 1.7 }}>
                        {point}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)' }}>Formal proof derivations are embedded in the theory section above.</p>
                )}

                {/* Formula Deep Dive */}
                {topic.formula && (
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: `${topic.color}10`, border: `1px solid ${topic.color}30`, borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>MASTER FORMULA</div>
                    <code style={{ color: topic.color, fontFamily: "'Fira Code', monospace", fontSize: '1.1rem', display: 'block', marginBottom: '0.7rem' }}>{topic.formula}</code>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{topic.formulaDesc}</p>
                  </div>
                )}
              </div>

              {/* Algorithm Catalog */}
              <div className="glass-panel-lg" style={{ padding: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  <Activity size={22} color={topic.color} /> Related Experiments
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {topic.algorithms.map((algo, i) => (
                    <motion.div key={i} whileHover={{ x: 4 }} onClick={() => navigate(`/ada/experiments/${algo.id}`)}
                      style={{ padding: '1.3rem 1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ color: 'white', fontWeight: 600, marginBottom: '0.3rem' }}>{algo.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{algo.desc}</div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                        {algo.complexity && (
                          <code style={{ color: topic.color, fontSize: '0.8rem', background: `${topic.color}15`, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>{algo.complexity}</code>
                        )}
                        <ChevronRight size={16} color="var(--text-muted)" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'interview' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
              {/* Interview Questions */}
              <div className="glass-panel-lg" style={{ padding: '2.5rem', borderTop: `6px solid var(--warning)` }}>
                <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                  <HelpCircle size={22} color="var(--warning)" /> Interview Questions
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Top questions asked by companies like Google, Amazon, Microsoft & more.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {topic.interviewQs.map((q, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      style={{ padding: '1.3rem 1.5rem', background: 'rgba(245,158,11,0.05)', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.15)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--warning)', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>Q{i + 1}</span>
                      <span style={{ color: '#e2e8f0', lineHeight: 1.6, fontSize: '0.95rem' }}>{q}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* All experiments + References */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-panel-lg" style={{ padding: '2rem' }}>
                  <h3 style={{ margin: '0 0 1.2rem', display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '1.1rem' }}>
                    <FlaskConical size={18} color={topic.color} /> Lab Experiments
                  </h3>
                  {topic.algorithms.map((algo, i) => (
                    <motion.button key={i} onClick={() => navigate(`/ada/experiments/${algo.id}`)}
                      whileHover={{ x: 4 }}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)', color: 'white', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}>
                      {algo.name}
                      <ArrowRight size={14} color={topic.color} />
                    </motion.button>
                  ))}
                </div>

                <div className="glass-panel-lg" style={{ padding: '2rem' }}>
                  <h3 style={{ margin: '0 0 1.2rem', display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '1.1rem' }}>
                    <ExternalLink size={18} color="var(--accent-primary)" /> Deep Dive Resources
                  </h3>
                  {topic.references?.map((ref, i) => (
                    <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-primary)', fontSize: '0.88rem', textDecoration: 'none', marginBottom: '0.7rem', padding: '0.6rem 0.8rem', borderRadius: '8px', background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.12)', transition: 'all 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.15)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,99,235,0.06)')}>
                      <ExternalLink size={12} /> {ref.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Curriculum Grid at the bottom — always visible */}
      <section style={{ marginTop: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <Activity size={28} color="var(--accent-primary)" />
          <h2 style={{ fontSize: '2rem', margin: 0 }}>Full Curricular Path</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {topic.algorithms.map((algo, i) => (
            <motion.div key={i}
              whileHover={{ y: -6, borderColor: topic.color, boxShadow: `0 10px 40px -10px ${topic.color}30` }}
              onClick={() => navigate(`/ada/experiments/${algo.id}`)}
              className="glass-panel-md"
              style={{ padding: '2rem', cursor: 'pointer', borderTop: `3px solid ${topic.color}`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>{algo.name}</h3>
                <ChevronRight size={20} color={topic.color} />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.6, margin: '0 0 1rem' }}>{algo.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--success)', fontSize: '0.72rem', fontWeight: 700 }}>
                  <CheckCircle size={12} /> CERTIFIED LAB
                </div>
                {algo.complexity && (
                  <code style={{ fontSize: '0.78rem', color: topic.color, background: `${topic.color}15`, padding: '0.2rem 0.6rem', borderRadius: '6px' }}>{algo.complexity}</code>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default ADATopicHub;
