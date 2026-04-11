import { motion } from 'framer-motion';
import { Cpu, TerminalSquare, ChevronRight, BookOpen, Network, Boxes, Calculator, Database, Binary } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const subjects = [
  { 
    id: 'os', 
    title: 'Operating Systems (OS)', 
    desc: 'Deep dive into computer resource management, scheduling algorithms, concurrencly, and file systems.', 
    icon: TerminalSquare, 
    color: 'var(--accent-primary)',
    path: '/os',
    semester: '4th Semester'
  },
  { 
    id: 'coa', 
    title: 'Computer Organization & Architecture', 
    desc: 'Explore the fundamental structure of computers, logic circuits, adders, and assembly language programming.', 
    icon: Cpu, 
    color: 'var(--accent-tertiary)',
    path: '/coa',
    semester: '4th Semester',
    comingSoon: true
  },
  { 
    id: 'ada', 
    title: 'Analysis & Design of Algorithms', 
    desc: 'Master algorithm design techniques, time/space complexity, sorting, and graph algorithms.', 
    icon: Network, 
    color: 'var(--warning)',
    path: '#',
    semester: '4th Semester',
    comingSoon: true
  },
  { 
    id: 'se', 
    title: 'Software Engineering', 
    desc: 'Learn about software development life cycles, agile methodologies, and testing principles.', 
    icon: Boxes, 
    color: 'var(--info)',
    path: '#',
    semester: '4th Semester',
    comingSoon: true
  },
  { 
    id: 'matlab', 
    title: 'Matlab Programming', 
    desc: 'Numerical computing, matrix manipulations, functions, and data visualization tools.', 
    icon: Calculator, 
    color: '#10b981',
    path: '#',
    semester: '4th Semester',
    comingSoon: true
  },
  { 
    id: 'dbms', 
    title: 'Database Management Systems', 
    desc: 'Study relational models, SQL queries, database design, and transaction management paradigms.', 
    icon: Database, 
    color: '#fbbf24',
    path: '#',
    semester: '4th Semester',
    comingSoon: true
  },
  { 
    id: 'toc', 
    title: 'Theory of Computation', 
    desc: 'Discover automata theory, formal languages, Turing machines, and computational decidability.', 
    icon: Binary, 
    color: '#8b5cf6',
    path: '#',
    semester: '4th Semester',
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
              whileHover={subject.comingSoon ? {} : { y: -8, boxShadow: `0 15px 35px -10px ${subject.color}50`, borderColor: subject.color }}
              whileTap={subject.comingSoon ? {} : { scale: 0.98 }}
              style={{ padding: '2.5rem', borderTop: `4px solid ${subject.color}`, opacity: subject.comingSoon ? 0.8 : 1, cursor: subject.comingSoon ? 'default' : 'pointer' }}
            >
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className={styles.iconBox} style={{ backgroundColor: `${subject.color}15`, border: `1px solid ${subject.color}30`, color: subject.color }}>
                    <Icon size={32} />
                  </div>
                  {subject.semester && (
                    <span className="badge" style={{ backgroundColor: `${subject.color}15`, color: subject.color, border: `1px solid ${subject.color}30` }}>
                      {subject.semester}
                    </span>
                  )}
                </div>
                {subject.comingSoon ? (
                   <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.1)' }}>
                     Coming Soon
                   </div>
                ) : (
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '50%' }}>
                    <ChevronRight className={styles.arrow} size={24} />
                  </div>
                )}
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
