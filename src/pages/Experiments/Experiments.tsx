import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { experiments } from '../../data/experimentData';
import { adaExperiments } from '../../data/adaExperimentData';
import { Book, Cpu, HardDrive, Network, Layers, ChevronRight, Hash, Activity, GitBranch } from 'lucide-react';
import { useState } from 'react';
import styles from './Experiments.module.css';
import { ParticleBackground, TiltCard } from '../../components/common/InteractiveEffects';


const OS_CATEGORIES = [
  { id: 'all', label: 'All Labs', icon: Book },
  { id: 'basics', label: 'OS Basics', icon: Layers },
  { id: 'scheduling', label: 'Scheduling', icon: Cpu },
  { id: 'memory', label: 'Memory', icon: HardDrive },
  { id: 'ipc', label: 'IPC & Deadlock', icon: Network }
];

const ADA_CATEGORIES = [
  { id: 'all', label: 'All ADA Labs', icon: Book },
  { id: 'arrays', label: 'Arrays & Search', icon: Hash },
  { id: 'sorting', label: 'Sorting', icon: Activity },
  { id: 'greedy', label: 'Greedy/DP', icon: GitBranch },
  { id: 'graphs', label: 'Graphs/Trees', icon: Network }
];


const Experiments = ({ mode = 'os' }: { mode?: 'os' | 'ada' }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const currentExperiments = mode === 'ada' ? adaExperiments : experiments;
  const categories = mode === 'ada' ? ADA_CATEGORIES : OS_CATEGORIES;

  const filteredExperiments = currentExperiments.filter(exp => {
    if (filter === 'all') return true;
    if (mode === 'os') {
      if (filter === 'basics') return exp.number <= 3;
      if (filter === 'scheduling') return exp.number >= 4 && exp.number <= 11;
      if (filter === 'memory') return exp.number >= 12 && exp.number <= 14;
      if (filter === 'ipc') return exp.number >= 15;
    } else {
      if (filter === 'arrays') return exp.number <= 7;
      if (filter === 'sorting') return exp.number >= 8 && exp.number <= 12;
      if (filter === 'greedy') return exp.number >= 15 && exp.number <= 20;
      if (filter === 'graphs') return exp.number >= 21;
    }
    return true;
  });


  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className={styles.container}
    >
      <ParticleBackground count={15} color="var(--accent-primary)" />

      <header className={styles.header}>
        <div className="badge badge-gold">PIEMR Digital Lab</div>
        <h1 className="text-gradient">{mode === 'ada' ? 'Algorithm Laboratory' : 'Laboratory Experiments'}</h1>
        <p>{mode === 'ada' ? 'Design and analyze complex algorithms with real-time performance metrics.' : 'Explore hands-on operating system labs with real-time simulations and interactive theory.'}</p>
      </header>


      {/* CATEGORY FILTER */}
      <div className={styles.filterBar}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`${styles.filterBtn} ${filter === cat.id ? styles.active : ''}`}
          >
            <cat.icon size={18} />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>


      <div className={styles.grid}>
        {filteredExperiments.map((exp) => (
          <TiltCard
            key={exp.id}
            className={styles.card}
            onClick={() => navigate(`/${mode}/experiments/${exp.id}`)}
          >
            <div className={styles.cardHeader}>
              <span className={styles.expNum}>Exp {exp.number}</span>
              <div className={styles.iconCircle}>
                {mode === 'os' ? (
                  exp.number <= 3 ? <Layers size={20} /> : 
                  exp.number <= 11 ? <Cpu size={20} /> :
                  exp.number <= 14 ? <HardDrive size={20} /> : <Network size={20} />
                ) : (
                  exp.number <= 7 ? <Hash size={20} /> :
                  exp.number <= 12 ? <Activity size={20} /> :
                  exp.number <= 20 ? <GitBranch size={20} /> : <Network size={20} />
                )}
              </div>
            </div>
            <h3 className={styles.cardTitle}>{exp.title}</h3>
            <p className={styles.cardAim}>{exp.aim}</p>
            <div className={styles.cardFooter}>
              <span>Start Laboratory</span>
              <ChevronRight size={16} />
            </div>
          </TiltCard>
        ))}
      </div>
    </motion.div>
  );
};

export default Experiments;
