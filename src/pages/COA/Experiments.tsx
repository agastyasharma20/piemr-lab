import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { coaExperiments } from '../../data/coaExperimentData';
import { Zap, Activity, ChevronRight } from 'lucide-react';
import styles from '../Experiments/Experiments.module.css';

const COAExperiments = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className={styles.header}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-gold">CS404</span>
          <span className="badge badge-blue">Practicals</span>
        </div>
        <h1 className="text-gradient">Logic & Assembly Labs</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.5rem 0 0', maxWidth: '650px' }}>
          Explore digital logic circuits and write 8085/8086 assembly code using our interactive emulator engines.
        </p>
      </header>

      <div className={styles.experimentGrid}>
        {coaExperiments.map((exp, index) => {
          const isLogic = exp.simulationType === 'logic';
          const Icon = isLogic ? Activity : Zap;
          const colorTheme = isLogic ? 'var(--info)' : 'var(--accent-tertiary)';
          
          return (
            <motion.div
              key={exp.id}
              className={`glass-panel-md ${styles.experimentCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/coa/experiments/${exp.id}`)}
              whileHover={{ y: -5, borderColor: colorTheme, boxShadow: `0 10px 25px -10px ${colorTheme}40` }}
              style={{ borderTop: `3px solid ${colorTheme}` }}
            >
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className={styles.iconBox} style={{ backgroundColor: `${colorTheme}15`, color: colorTheme, border: `1px solid ${colorTheme}30` }}>
                    <Icon size={20} />
                  </div>
                  <span className={styles.experimentId}>Experiment {index + 1}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '50%' }}>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </div>
              </div>
              
              <h3 className={styles.experimentTitle}>{exp.title}</h3>
              <p className={styles.experimentAim}>{exp.aim}</p>
              
              <div className={styles.cardFooter}>
                <span className="badge" style={{ background: `${colorTheme}15`, color: colorTheme, border: `1px solid ${colorTheme}30` }}>
                  {isLogic ? 'Digital Logic Workbench' : 'Assembly Emulator'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default COAExperiments;
