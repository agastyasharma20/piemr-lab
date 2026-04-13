import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MemorySimulation from './MemorySimulation';

const validAlgorithms = ['fifo', 'lru', 'optimal'];

const algoNameMap: Record<string, string> = {
  'fifo': 'FIFO',
  'lru': 'LRU',
  'optimal': 'Optimal'
};

const MemoryAlgorithmPage = () => {
  const { algorithm } = useParams<{ algorithm: string }>();

  if (!algorithm || !validAlgorithms.includes(algorithm.toLowerCase())) {
    return <Navigate to="/os/memory-management" replace />;
  }

  const exactAlgoName = algoNameMap[algorithm.toLowerCase()];

  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header style={{
        padding: '2rem 2.5rem',
        background: 'linear-gradient(135deg, rgba(82,0,0,0.5) 0%, rgba(155,28,28,0.2) 100%)',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-maroon">Memory Manager</span>
        </div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          {exactAlgoName} Page Replacement
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0' }}>
          Explore frame allocations and page fault frequencies using the {exactAlgoName} algorithm.
        </p>
      </header>

      <MemorySimulation forcedAlgorithm={exactAlgoName as any} />
    </motion.div>
  );
};

export default MemoryAlgorithmPage;
