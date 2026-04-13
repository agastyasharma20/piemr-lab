import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DiskSimulation from './DiskSimulation';

const validAlgorithms = ['fcfs', 'sstf', 'scan', 'c-scan', 'look', 'c-look'];

// Map url param to the exact string expected by ALGORITHMS object in DiskSimulation
const algoNameMap: Record<string, string> = {
  'fcfs': 'FCFS',
  'sstf': 'SSTF',
  'scan': 'SCAN',
  'c-scan': 'C-SCAN',
  'look': 'LOOK',
  'c-look': 'C-LOOK'
};

const AlgorithmPage = () => {
  const { algorithm } = useParams<{ algorithm: string }>();

  if (!algorithm || !validAlgorithms.includes(algorithm.toLowerCase())) {
    return <Navigate to="/os/disk-scheduling" replace />;
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
        background: 'linear-gradient(135deg, rgba(0,48,115,0.5) 0%, rgba(26,92,190,0.2) 100%)',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-gold">Interactive Simulation</span>
        </div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          {exactAlgoName} Algorithm
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0' }}>
          Explore the mechanics and track optimization strategies of the {exactAlgoName} disk scheduling algorithm.
        </p>
      </header>

      <DiskSimulation forcedAlgorithm={exactAlgoName as any} />
    </motion.div>
  );
};

export default AlgorithmPage;
