import { motion } from 'framer-motion';
import { HardDrive, Cpu, Network, BookOpen, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const units = [
  { id: 'unit-1', title: 'Introduction to OS', desc: 'Functions, types, and system calls', icon: BookOpen, color: 'var(--info)' },
  { id: 'unit-2', title: 'File System & Disk Mgt', desc: 'Disk scheduling algorithms & simulations', icon: HardDrive, color: 'var(--accent-primary)' },
  { id: 'unit-3', title: 'CPU Scheduling & Memory', desc: 'Process scheduling & paging visualizations', icon: Cpu, color: 'var(--accent-tertiary)' },
  { id: 'unit-4', title: 'Concurrency & Deadlock', desc: 'Semaphores & deadlock detections', icon: Network, color: 'var(--warning)' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className={styles.home}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className={styles.header}>
        <h1 className="text-gradient">Welcome to PIEMR Virtual Lab</h1>
        <p className={styles.subtitle}>Interactive OS visualizations and step-by-step learning</p>
      </header>

      <div className={styles.grid}>
        {units.map((unit, index) => {
          const Icon = unit.icon;
          return (
            <motion.div
              key={unit.id}
              className={`glass-panel ${styles.card}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/${unit.id}`)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconBox} style={{ backgroundColor: `${unit.color}33`, color: unit.color }}>
                  <Icon size={24} />
                </div>
                <ChevronRight className={styles.arrow} size={20} />
              </div>
              <h3 className={styles.cardTitle}>{unit.title}</h3>
              <p className={styles.cardDesc}>{unit.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Home;
