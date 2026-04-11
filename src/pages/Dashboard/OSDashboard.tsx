import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, HardDrive, Cpu, Network, TerminalSquare } from 'lucide-react';

const osTopics = [
  { path: '/os/intro', title: 'Introduction to OS', desc: 'Core functionalities, dual-mode operations, and system calls.', icon: BookOpen, color: 'var(--info)' },
  { path: '/os/disk-scheduling', title: 'Disk Scheduling', desc: 'FCFS, SSTF, SCAN, C-SCAN scheduling algorithms applied to rotating media.', icon: HardDrive, color: 'var(--accent-primary)' },
  { path: '/os/cpu-memory', title: 'CPU & Memory Allocation', desc: 'Process state transitions, paging, swapping, and memory segmentation.', icon: Cpu, color: 'var(--accent-tertiary)' },
  { path: '/os/concurrency', title: 'Concurrency & Deadlocks', desc: 'Semaphores, Mutex locks, and Bankers Algorithm for deadlock avoidance.', icon: Network, color: 'var(--warning)' },
  { path: '/os/advanced-os', title: 'Advanced Concepts', desc: 'Distributed systems, virtualization, and modern OS architectures.', icon: BookOpen, color: 'var(--success)' },
  { path: '/os/experiments', title: 'Interactive Laboratory', desc: 'Access the suite of interactive process and memory simulation engines.', icon: TerminalSquare, color: 'var(--text-primary)' },
];

const OSDashboard = () => {
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
        background: 'linear-gradient(135deg, rgba(42,120,232,0.15) 0%, rgba(13,25,48,0.8) 100%)',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
        textAlign: 'center'
      }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Operating Systems</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Explore the core software that manages hardware resources. Select a topic to begin learning.
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
      }}>
        {osTopics.map((topic, index) => {
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

export default OSDashboard;
