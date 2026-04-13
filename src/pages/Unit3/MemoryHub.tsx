import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Unit3.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeInOut" } as any
  })
};

const algorithms = [
  { name: 'FIFO', desc: 'First-In-First-Out - Oldest page is replaced first. Vulnerable to Belady\'s anomaly.' },
  { name: 'LRU', desc: 'Least Recently Used - Replaces page not used for the longest time.' },
  { name: 'Optimal', desc: 'Replaces page that will not be used for the longest time in future.' },
];

const MemoryHub = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      animate="visible"
    >
      <motion.header className={styles.header} custom={0} variants={fadeUp}>
        <div className={styles.headerMeta} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-maroon">Interactive Lab</span>
        </div>
        <h1 className="text-gradient" style={{ marginTop: '0.25rem' }}>
          Memory & Page Replacement
        </h1>
        <p>
          Dive into Virtual Memory algorithms. Visualise page frames, calculate page faults step-by-step, and understand how operating systems manage finite RAM.
        </p>
      </motion.header>

      <motion.section className={styles.theorySection} custom={1} variants={fadeUp}>
        <div className={`glass-panel-md ${styles.card}`}>
          <h2 className={styles.sectionTitle}>What is Paging?</h2>
          <p style={{ marginTop: '0.75rem' }}>
            Paging eliminates external fragmentation by dividing physical memory into fixed-sized blocks 
            called <strong style={{ color: 'var(--accent-tertiary)' }}>Frames</strong> and logical memory 
            into blocks of the same size called <strong style={{ color: 'var(--accent-tertiary)' }}>Pages</strong>.
          </p>
        </div>
        <div className={`glass-panel-md ${styles.card}`}>
          <h2 className={styles.sectionTitle}>Core Concepts</h2>
          <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2, color: 'var(--text-secondary)' }}>
            <li><strong style={{ color: 'var(--text-primary)' }}>Page Fault</strong> — Occurs when requested page is not in RAM.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Hit Ratio</strong> — Percentage of references found in memory.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Belady's Anomaly</strong> — The strange phenomenon where giving more frames actually increases page faults.</li>
          </ul>
        </div>
      </motion.section>

      <motion.section custom={2} variants={fadeUp} style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>
          Explore Algorithms
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {algorithms.map((algo) => (
             <motion.div
               key={algo.name}
               onClick={() => navigate(`/os/memory-management/${algo.name.toLowerCase()}`)}
               whileHover={{ y: -5, borderColor: 'var(--accent-maroon)', boxShadow: '0 8px 25px -10px rgba(155,28,28,0.3)' }}
               className="glass-panel-md"
               style={{ padding: '1.5rem', cursor: 'pointer', borderTop: '3px solid var(--danger)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
             >
               <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem' }}>{algo.name}</h3>
               <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                 {algo.desc}
               </p>
               <div style={{ marginTop: 'auto', paddingTop: '1rem', color: 'var(--danger)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                 Launch Simulation ➔
               </div>
             </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        custom={3}
        variants={fadeUp}
        style={{
          background: 'var(--bg-card)',
          padding: '2rem 2rem',
          borderRadius: 'var(--border-radius-xl)',
          border: '1px solid var(--border-glow)',
        }}
      >
        <h2 className={styles.sectionTitle} style={{ fontSize: '1.4rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
          Side-by-Side Comparison
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Page Fault Rate</th>
                <th>Belady's Anomaly</th>
                <th>Implementable?</th>
                <th>Best Scenario</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>Optimal (OPT)</strong></td>
                <td><span className="badge badge-green">Minimum</span></td>
                <td><span className="badge badge-green">Immune</span></td>
                <td><span className="badge badge-maroon">No (Future needs)</span></td>
                <td>Theoretical baseline</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>FIFO</strong></td>
                <td><span className="badge badge-maroon">High</span></td>
                <td><span className="badge badge-maroon">Vulnerable</span></td>
                <td><span className="badge badge-green">Yes (Queue)</span></td>
                <td>Simple, low overhead</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>LRU</strong></td>
                <td><span className="badge badge-blue">Very Low</span></td>
                <td><span className="badge badge-green">Immune</span></td>
                <td><span className="badge badge-gold">Hardware Assist</span></td>
                <td>Production Environments</td>
              </tr>
            </tbody>
          </table>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            marginTop: '1.5rem',
            padding: '1.25rem 1.5rem',
            background: 'linear-gradient(135deg, rgba(15,158,110,0.12), rgba(15,158,110,0.05))',
            borderRadius: 'var(--border-radius-md)',
            borderLeft: '4px solid var(--success)',
          }}
        >
          <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem', fontSize: '1rem' }}>
            🏆 Final Verdict
          </h3>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>
            Since <strong>Optimal</strong> is impossible in real systems (requires predicting the future), <strong>LRU</strong> is the practical gold standard. Modern kernels use the <em>Clock Algorithm</em> as an LRU approximation for O(1) efficiency.
          </p>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default MemoryHub;
