import { motion } from 'framer-motion';

import { useNavigate, useParams } from 'react-router-dom';
import { 
  Zap, 
  Activity, 
  BookOpen, 
  ChevronRight,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

import { ParticleBackground } from '../../components/common/InteractiveEffects';
import { TOPIC_CONTENT } from '../../data/adaTopicHubData';
import { TopicVisualizer } from './TopicVisualizer';

const ADATopicHub = () => {
  const { topicId, subTopicId } = useParams();
  const navigate = useNavigate();
  
  let currentTopicId = subTopicId ? `${topicId}/${subTopicId}` : topicId || '';
  let topic = TOPIC_CONTENT[currentTopicId];

  if (!topic) return (
     <div style={{ padding: '5rem', textAlign: 'center', color: 'white' }}>
        <h2 className="text-gradient">Topic Coming Soon</h2>
        <p>The academic content for "{topicId}" is being finalized.</p>
        <button onClick={() => navigate('/ada')} className="btn-modern-primary" style={{ marginTop: '2rem' }}>Return to Hub</button>
     </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto', color: 'white' }}
    >
      <ParticleBackground count={12} color={topic.color} />

      {/* Header */}
      <header style={{ marginBottom: '4rem' }}>
         <button onClick={() => navigate('/ada')} className="btn-modern-secondary" style={{ marginBottom: '2rem', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
            ← Back to Algorithm Hub
         </button>
         <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ background: `${topic.color}20`, padding: '2rem', borderRadius: '30px', border: `1px solid ${topic.color}40`, boxShadow: `0 0 30px ${topic.color}20` }}>
               <topic.icon size={56} color={topic.color} />
            </div>
            <div>
               <div className="badge badge-gold" style={{ marginBottom: '0.8rem' }}>PIEMR ACADEMIC HUB</div>
               <h1 className="text-gradient" style={{ fontSize: '3.8rem', marginBottom: '0.5rem' }}>{topic.title}</h1>
               <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '800px', lineHeight: 1.6 }}>{topic.desc}</p>
            </div>
         </div>
      </header>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', marginBottom: '5rem' }}>
         {/* Detailed Theory */}
         <div className="glass-panel-lg" style={{ padding: '3rem', borderTop: `6px solid ${topic.color}` }}>
            <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
               <BookOpen size={28} color={topic.color} /> Deep-Dive: Properties & Logic
            </h2>
            <p style={{ color: '#d1d5db', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>{topic.detailedTheory}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
               {topic.properties.map((prop: { name: string; desc: string }, i: number) => (
                  <div key={i} className="glass-panel-sm" style={{ padding: '1.8rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                     <div style={{ color: topic.color, fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.7rem' }}>{prop.name}</div>
                     <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{prop.desc}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* Visual/Quick Info Sidebar */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-panel-md" style={{ padding: '2.5rem', textAlign: 'center', border: `1px solid ${topic.color}20` }}>
               <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `${topic.color}15`, margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={36} color="var(--warning)" />
               </div>
               <h3 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>Efficiency Insight</h3>
               <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Algorithms in this category focus on minimizing resource consumption through intelligent {topicId === 'greedy' ? 'local decision making' : (topicId === 'dp' ? 'state caching' : 'comparative logic')}.
               </p>
               <button onClick={() => navigate('/ada/complexity')} className="btn-modern-primary" style={{ width: '100%', marginTop: '1.5rem', background: topic.color, color: 'black' }}>
                  VIEW ASYMPTOTIC ENGINE
               </button>
            </div>

            <div className="glass-panel-md" style={{ padding: '2rem', borderLeft: '4px solid var(--warning)' }}>
               <h4 style={{ margin: '0 0 1.2rem 0', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <HelpCircle size={20} color="var(--warning)" /> Common Interview Logic
               </h4>
               <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: '#94a3b8' }}>
                  <li>• Explain the {topic.properties[0].name}.</li>
                  <li>• Why prefer {topicId === 'dp' ? 'Memoization over Recursion' : 'O(N log N) over O(N²)'}?</li>
                  <li>• Contrast Stability vs Space Complexity.</li>
               </ul>
            </div>
         </div>
      </div>

      {/* Interactive Visual Sandbox - PREMIUM ADDITION */}
      <section style={{ marginBottom: '5rem' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <Zap size={32} color="var(--warning)" />
            <h2 style={{ fontSize: '2.2rem', margin: 0 }}>Interactive Pedagogical Visuals</h2>
         </div>
         
         <div className="glass-panel-lg" style={{ padding: '3rem', position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${topic.color}, transparent)` }} />
            
            <TopicVisualizer visualType={topic.visualType} color={topic.color} />
         </div>
      </section>

      {/* Algorithm Catalog */}
      <section>
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
            <Activity size={32} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '2.4rem', margin: 0 }}>Full Curricular Path</h2>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)' }} />
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {topic.algorithms.map((algo: any, i: number) => (
               <motion.div 
                  key={i}
                  whileHover={{ y: -10, borderColor: topic.color, boxShadow: `0 10px 40px -10px ${topic.color}30` }}
                  onClick={() => navigate(`/ada/experiments/${algo.id}`)}
                  className="glass-panel-md"
                  style={{ padding: '2.5rem', cursor: 'pointer', borderTop: `4px solid ${topic.color}`, position: 'relative', overflow: 'hidden' }}
               >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                     <h3 style={{ margin: 0, color: 'white', fontSize: '1.3rem' }}>{algo.name}</h3>
                     <ChevronRight size={22} color={topic.color} />
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6, height: '45px' }}>{algo.desc}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        <CheckCircle size={14} /> CERTIFIED CONTENT
                     </div>
                     <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: topic.color, letterSpacing: '0.5px' }}>OPEN LAB ➔</span>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
    </motion.div>
  );
};

export default ADATopicHub;
