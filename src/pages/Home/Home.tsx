import { motion } from 'framer-motion';
import { Cpu, TerminalSquare, ChevronRight, BookOpen, Network, Boxes, Calculator, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const subjects = [
  { 
    id: 'os', 
    title: 'Operating Systems (OS)', 
    desc: 'Deep dive into computer resource management, scheduling algorithms, concurrencly, and file systems.', 
    icon: TerminalSquare, 
    color: 'var(--accent-primary)',
    path: '/os'
  },
  { 
    id: 'coa', 
    title: 'Computer Organization & Architecture', 
    desc: 'Explore the fundamental structure of computers, logic circuits, adders, and assembly language programming.', 
    icon: Cpu, 
    color: 'var(--accent-tertiary)',
    path: '/coa',
    comingSoon: true
  },
  { 
    id: 'ada', 
    title: 'Analysis & Design of Algorithms', 
    desc: 'Master algorithm design techniques, time/space complexity, sorting, and graph algorithms.', 
    icon: Network, 
    color: 'var(--warning)',
    path: '#',
    comingSoon: true
  },
  { 
    id: 'se', 
    title: 'Software Engineering', 
    desc: 'Learn about software development life cycles, agile methodologies, and testing principles.', 
    icon: Boxes, 
    color: 'var(--info)',
    path: '#',
    comingSoon: true
  },
  { 
    id: 'matlab', 
    title: 'Matlab Programming', 
    desc: 'Numerical computing, matrix manipulations, functions, and data visualization tools.', 
    icon: Calculator, 
    color: '#10b981',
    path: '#',
    comingSoon: true
  },
  { 
    id: 'dbms', 
    title: 'Database Management Systems', 
    desc: 'Study relational models, SQL queries, database design, and transaction management paradigms.', 
    icon: Database, 
    color: '#fbbf24',
    path: '#',
    comingSoon: true
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className={styles.home}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={styles.header}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', justifyContent: 'center' }}>
           <span className="badge badge-gold"><BookOpen size={14} style={{marginRight: 4}}/> Central Hub</span>
        </div>
        <h1 className="text-gradient">Welcome to PIEMR Virtual Lab</h1>
        <p className={styles.subtitle}>Select your subject domain to enter the interactive learning environment.</p>
      </header>

      <div className={styles.grid}>
        {subjects.map((subject, index) => {
          const Icon = subject.icon;
          return (
            <motion.div
              key={subject.id}
              className={`glass-panel-md ${styles.card}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
              onClick={() => !subject.comingSoon && navigate(subject.path)}
              whileHover={{ y: -8, boxShadow: `0 15px 35px -10px ${subject.color}50`, borderColor: subject.color }}
              whileTap={subject.comingSoon ? {} : { scale: 0.98 }}
              style={{ padding: '2.5rem', borderTop: `4px solid ${subject.color}`, cursor: subject.comingSoon ? 'default' : 'pointer' }}
            >
              {subject.comingSoon && (
                <div className={styles.comingSoonOverlay}>
                   Coming Soon...
                </div>
              )}
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className={styles.iconBox} style={{ backgroundColor: `${subject.color}15`, border: `1px solid ${subject.color}30`, color: subject.color }}>
                    <Icon size={32} />
                  </div>

                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '50%' }}>
                  <ChevronRight className={styles.arrow} size={24} />
                </div>
              </div>
              <h2 className={styles.cardTitle} style={{ fontSize: '1.8rem', marginTop: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                 {subject.title}
              </h2>
              <p className={styles.cardDesc} style={{ fontSize: '1.05rem', marginTop: '0.5rem', opacity: 0.8 }}>
                 {subject.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Home;
