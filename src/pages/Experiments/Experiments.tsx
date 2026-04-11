import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { experiments } from '../../data/experimentData';
import { Book, Cpu, HardDrive, Network, Layers, ChevronRight } from 'lucide-react';
import styles from './Experiments.module.css';
import { useState } from 'react';

const CATEGORIES = [
  { id: 'all', label: 'All Labs', icon: Book },
  { id: 'basics', label: 'OS Basics', icon: Layers },
  { id: 'scheduling', label: 'Scheduling', icon: Cpu },
  { id: 'memory', label: 'Memory', icon: HardDrive },
  { id: 'ipc', label: 'IPC & Deadlock', icon: Network }
];

const Experiments = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filteredExperiments = experiments.filter(exp => {
    if (filter === 'all') return true;
    if (filter === 'basics') return exp.number <= 3;
    if (filter === 'scheduling') return exp.number >= 4 && exp.number <= 11;
    if (filter === 'memory') return exp.number >= 12 && exp.number <= 14;
    if (filter === 'ipc') return exp.number >= 15;
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className={styles.container}
    >
      <header className={styles.header}>
        <div className="badge badge-gold">PIEMR Digital Lab</div>
        <h1 className="text-gradient">Laboratory Experiments</h1>
        <p>Explore hands-on operating system labs with real-time simulations and interactive theory.</p>
      </header>

      {/* CATEGORY FILTER */}
      <div className={styles.filterBar}>
        {CATEGORIES.map(cat => (
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
        {filteredExperiments.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={styles.card}
            onClick={() => navigate(`/experiments/${exp.id}`)}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.expNum}>Exp {exp.number}</span>
              <div className={styles.iconCircle}>
                {exp.number <= 3 ? <Layers size={20} /> : 
                 exp.number <= 11 ? <Cpu size={20} /> :
                 exp.number <= 14 ? <HardDrive size={20} /> : <Network size={20} />}
              </div>
            </div>
            <h3 className={styles.cardTitle}>{exp.title}</h3>
            <p className={styles.cardAim}>{exp.aim}</p>
            <div className={styles.cardFooter}>
              <span>Start Laboratory</span>
              <ChevronRight size={16} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experiments;
