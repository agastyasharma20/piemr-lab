import { motion } from 'framer-motion';
import styles from './Unit2.module.css';
import DiskSimulation from './DiskSimulation';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeInOut" } as any
  })
};

const Unit2 = () => {
  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      animate="visible"
    >
      {/* ---- Page Header ---- */}
      <motion.header className={styles.header} custom={0} variants={fadeUp}>
        <div className={styles.headerMeta}>

          <span className="badge badge-gold">Interactive Lab</span>
        </div>
        <h1 className="text-gradient" style={{ marginTop: '0.75rem' }}>
          File System &amp; Disk Management
        </h1>
        <p>
          Master all six disk scheduling algorithms through live 2D and 3D simulations.
          Step through each algorithm, inspect seek paths, and compare total head movement metrics.
        </p>
      </motion.header>

      {/* ---- Theory Cards ---- */}
      <motion.section className={styles.theorySection} custom={1} variants={fadeUp}>
        <div className={`glass-panel-md ${styles.card}`}>
          <h2 className={styles.sectionTitle}>Why Disk Scheduling?</h2>
          <p style={{ marginTop: '0.75rem' }}>
            A hard disk has a physical read/write head that must move mechanically across
            thousands of tracks. This movement is the largest contributor to disk I/O latency —
            called <strong style={{ color: 'var(--accent-tertiary)' }}>Seek Time</strong>. Disk
            Scheduling algorithms decide the optimal sequence to service pending I/O requests and
            minimize total head movement, directly improving OS throughput.
          </p>
        </div>
        <div className={`glass-panel-md ${styles.card}`}>
          <h2 className={styles.sectionTitle}>Performance Metrics</h2>
          <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2, color: 'var(--text-secondary)' }}>
            <li><strong style={{ color: 'var(--text-primary)' }}>Seek Time</strong> — Time to move head to the correct track.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Rotational Latency</strong> — Wait for the platter to rotate to the correct sector.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Transfer Time</strong> — Time to actually read/write the data.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Throughput</strong> — Total requests serviced per unit time.</li>
          </ul>
        </div>
      </motion.section>

      {/* Interactive Lab */}
      <motion.section className={styles.labSection} custom={2} variants={fadeUp}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '1.4rem' }}>
          Interactive Lab: Disk Scheduling Algorithms
        </h2>
        
        {/* Seek Formulas */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem',
          marginBottom: '1.5rem', background: 'rgba(26,92,190,0.05)', padding: '1.25rem',
          borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-glow)'
        }}>
          <div>
            <h4 style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Total Seek Distance (TSD)</h4>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.6rem', borderRadius: '6px', textAlign: 'center', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
              TSD = Σ |headᵢ - headᵢ₋₁|
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Sum of absolute differences between consecutive track positions.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Average Seek Time (AST)</h4>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.6rem', borderRadius: '6px', textAlign: 'center', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
              AST = TSD / n
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Where $n$ is the total number of serviced requests.</p>
          </div>
        </div>

        <DiskSimulation />
      </motion.section>

      {/* ---- Comparison Table ---- */}
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
          Algorithm Comparison
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Throughput</th>
                <th>Starvation</th>
                <th>Complexity</th>
                <th>Best Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>FCFS</strong></td>
                <td><span className="badge badge-maroon">Low</span></td>
                <td><span className="badge badge-green">None</span></td>
                <td>O(N)</td>
                <td>Simple streaming, low load</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>SSTF</strong></td>
                <td><span className="badge badge-blue">High</span></td>
                <td><span className="badge badge-maroon">High</span></td>
                <td>O(N²)</td>
                <td>General purpose, non-critical</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>SCAN</strong></td>
                <td><span className="badge badge-blue">High</span></td>
                <td><span className="badge badge-green">None</span></td>
                <td>O(N log N)</td>
                <td>Heavy data on disk edges</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>C-SCAN</strong></td>
                <td><span className="badge badge-blue">Very High</span></td>
                <td><span className="badge badge-green">None</span></td>
                <td>O(N log N)</td>
                <td>Uniform wait time priority</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>LOOK</strong></td>
                <td><span className="badge badge-blue">High</span></td>
                <td><span className="badge badge-green">None</span></td>
                <td>O(N log N)</td>
                <td>Avoids empty end traversal</td>
              </tr>
              <tr>
                <td><strong style={{ color: 'var(--text-primary)' }}>C-LOOK</strong></td>
                <td><span className="badge badge-gold">Best</span></td>
                <td><span className="badge badge-green">None</span></td>
                <td>O(N log N)</td>
                <td>Modern HDDs — industry standard</td>
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
            <strong>C-LOOK</strong> is widely recommended as the best disk scheduling algorithm. It avoids
            unnecessary full-edge traversal (unlike C-SCAN), eliminates starvation (unlike SSTF), and provides
            uniform wait times — making it the industry standard choice for modern hard disk controllers.
          </p>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Unit2;
