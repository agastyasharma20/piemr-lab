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
  { name: 'FCFS', desc: 'First Come First Serve - Simplest but prone to convoy effect.' },
  { name: 'SJF', desc: 'Shortest Job First - Non-preemptive, minimum average wait time.' },
  { name: 'SRTF', desc: 'Shortest Remaining Time First - Preemptive approach for maximum responsiveness.' },
  { name: 'Round-Robin', desc: 'Time slicing approach - Perfect for interactive/desktop systems.' },
  { name: 'Priority', desc: 'Executes highest priority first - Risk of starvation.' },
];

const CPUHub = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      animate="visible"
    >
      <motion.header className={styles.header} custom={0} variants={fadeUp}>
        <div className={styles.headerMeta} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-gold">Interactive Lab</span>
        </div>
        <h1 className="text-gradient" style={{ marginTop: '0.25rem' }}>
          CPU Scheduling
        </h1>
        <p>
          Analyze CPU scheduling metrics step-by-step. Simulate Gantt charts, compute turnaround times, and understand the core of modern operating system dispatchers.
        </p>
      </motion.header>

      <motion.section className={styles.theorySection} custom={1} variants={fadeUp}>
        <div className={`glass-panel-md ${styles.card}`}>
          <h2 className={styles.sectionTitle}>What is CPU Scheduling?</h2>
          <p style={{ marginTop: '0.75rem' }}>
            In a multiprogrammed OS, multiple processes reside in main memory competing for the CPU. The 
            <strong style={{ color: 'var(--accent-tertiary)' }}> Short-Term Scheduler</strong> (dispatcher) 
            selects which process executes next to maximize CPU utilization and minimize response time.
          </p>
        </div>
        <div className={`glass-panel-md ${styles.card}`}>
          <h2 className={styles.sectionTitle}>Metrics & Parameters</h2>
          <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2, color: 'var(--text-secondary)' }}>
            <li><strong style={{ color: 'var(--text-primary)' }}>Turnaround Time</strong> — Total time from submission to completion.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Waiting Time</strong> — Total time spent waiting in the ready queue.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Response Time</strong> — Time to first execution prompt.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Throughput</strong> — Number of processes completed per unit time.</li>
          </ul>
        </div>
      </motion.section>

      <motion.section custom={2} variants={fadeUp} style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>
          Explore Dispatchers
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {algorithms.map((algo) => (
             <motion.div
               key={algo.name}
               onClick={() => navigate(`/os/cpu-scheduling/${algo.name.toLowerCase()}`)}
               whileHover={{ y: -5, borderColor: 'var(--accent-tertiary)', boxShadow: '0 8px 25px -10px rgba(212,160,23,0.3)' }}
               className="glass-panel-md"
               style={{ padding: '1.5rem', cursor: 'pointer', borderTop: '3px solid var(--accent-primary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
             >
               <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem' }}>{algo.name}</h3>
               <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                 {algo.desc}
               </p>
               <div style={{ marginTop: 'auto', paddingTop: '1rem', color: 'var(--accent-tertiary)', fontSize: '0.8rem', fontWeight: 'bold' }}>
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
                <th>Avg Wait Time</th>
                <th>Preemptive?</th>
                <th>Starvation Risk</th>
                <th>Best Scenario</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>FCFS</strong></td>
                <td><span className="badge badge-maroon">Worst</span></td>
                <td>No</td>
                <td><span className="badge badge-green">None</span></td>
                <td>Batch processing</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>SJF</strong></td>
                <td><span className="badge badge-green">Minimum</span></td>
                <td>No</td>
                <td><span className="badge badge-maroon">High</span></td>
                <td>Known burst lengths</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>SRTF</strong></td>
                <td><span className="badge badge-green">Near Optimal</span></td>
                <td>Yes</td>
                <td><span className="badge badge-maroon">High</span></td>
                <td>Preempt short processes</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>Priority</strong></td>
                <td>Varies</td>
                <td>Optional</td>
                <td><span className="badge badge-maroon">High</span></td>
                <td>Critical/Real-time OS</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>Round Robin</strong></td>
                <td><span className="badge badge-blue">Good</span></td>
                <td>Yes</td>
                <td><span className="badge badge-green">None</span></td>
                <td>Interactive OS</td>
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
            For modern interactive systems, <strong>Round Robin with Multilevel Feedback Queues</strong> is the gold standard — 
            guaranteed zero starvation, great response time, and used in Linux/Windows schedulers today.
          </p>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default CPUHub;
