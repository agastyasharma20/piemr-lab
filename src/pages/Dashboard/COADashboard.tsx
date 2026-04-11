import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Cpu, HardDrive, Network, Zap } from 'lucide-react';

const coaTopics = [
  { path: '/coa/basic-structure', title: 'Basic Structure', desc: 'Registers, instruction cycles, and fundamental computer organization.', icon: BookOpen, color: 'var(--info)' },
  { path: '/coa/computer-arithmetic', title: 'Computer Arithmetic', desc: 'Booths algorithm, 2s complement, adders, and numeric hardware processors.', icon: Cpu, color: 'var(--accent-tertiary)' },
  { path: '/coa/io-organization', title: 'I/O Organization', desc: 'Bus architectures, DMA controllers, and high-speed memory interfaces.', icon: HardDrive, color: 'var(--accent-primary)' },
  { path: '/coa/memory-organization', title: 'Memory Organization', desc: 'Cache mapping, set-associative designs, and virtual memory translation.', icon: BookOpen, color: 'var(--warning)' },
  { path: '/coa/multiprocessors', title: 'Multiprocessors', desc: 'Pipelining hazards, RISC vs CISC, and parallel supercomputing.', icon: Network, color: 'var(--success)' },
  { path: '/coa/experiments', title: 'Logic & Assembly Labs', desc: 'Write 8085 Assembly code and interact with SVG-powered logic circuits.', icon: Zap, color: 'var(--text-primary)' },
];

const COADashboard = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '4rem' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header style={{
        padding: '3rem',
        background: 'linear-gradient(135deg, rgba(212,160,23,0.15) 0%, rgba(13,25,48,0.8) 100%)',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
        textAlign: 'center'
      }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff 0%, var(--accent-tertiary) 100%)', WebkitBackgroundClip: 'text' }}>
          Computer Architecture
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Discover the hardware and logic that power modern computing. Choose a theoretical topic or enter the labs.
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
      }}>
        {coaTopics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <motion.div
              key={topic.path}
              className="glass-panel-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(topic.path)}
              whileHover={{ y: -5, borderColor: topic.color, boxShadow: `0 10px 30px -10px ${topic.color}40` }}
              style={{ padding: '2rem', cursor: 'pointer', borderTop: `3px solid ${topic.color}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: `${topic.color}15`, color: topic.color, padding: '12px', borderRadius: '12px', border: `1px solid ${topic.color}30` }}>
                  <Icon size={24} />
                </div>
                <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>{topic.title}</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {topic.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default COADashboard;
