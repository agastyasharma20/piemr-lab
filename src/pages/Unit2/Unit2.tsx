import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Unit2.module.css';
import { ExternalLink, HelpCircle } from 'lucide-react';
import { YouTubePiP } from '../../components/common/YouTubePiP';
import { OS_VIDEOS } from '../../data/subjectVideoData';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeInOut" } as any
  })
};

const algorithms = [
  { name: 'FCFS', desc: 'First Come First Serve - Simple streaming, but high seek time.' },
  { name: 'SSTF', desc: 'Shortest Seek Time First - Better throughput but risky starvation.' },
  { name: 'SCAN', desc: 'Elevator Algorithm - Sweeps back and forth across the tracks.' },
  { name: 'C-SCAN', desc: 'Circular SCAN - Sweeps one way, provides more uniform wait time.' },
  { name: 'LOOK', desc: 'Smart SCAN - Only sweeps as far as the last request.' },
  { name: 'C-LOOK', desc: 'Circular LOOK - Industry standard mapping.' },
];

const Unit2 = () => {
  const navigate = useNavigate();

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
          Master all six disk scheduling algorithms. Learn the theory, compare their behavior, and jump into specific live 2D and 3D simulations.
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

      {/* Algorithms Links Grid */}
      <motion.section custom={2} variants={fadeUp} style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>
          Explore Algorithms
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {algorithms.map((algo) => (
             <motion.div
               key={algo.name}
               onClick={() => navigate(`/os/disk-scheduling/${algo.name.toLowerCase()}`)}
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
      {/* References */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        {OS_VIDEOS['disk-scheduling'].refs?.map((ref, i) => (
          <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 1.2rem', background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '12px', color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>
            <ExternalLink size={14} />{ref.label}
          </a>
        ))}
      </div>

      {/* Interview Questions */}
      <div className="glass-panel-md" style={{ padding: '2.5rem', borderTop: '4px solid var(--warning)', marginTop: '1rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <HelpCircle color="var(--warning)" size={22} /> Interview Questions
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Disk scheduling questions from GATE & technical interviews.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {OS_VIDEOS['disk-scheduling'].interviewQs?.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.2rem', background: 'rgba(245,158,11,0.05)', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.12)' }}>
              <span style={{ color: 'var(--warning)', fontWeight: 700, flexShrink: 0 }}>Q{i + 1}</span>
              <span style={{ color: '#e2e8f0', lineHeight: 1.6, fontSize: '0.92rem' }}>{q}</span>
            </div>
          ))}
        </div>
      </div>

      <YouTubePiP
        videoId={OS_VIDEOS['disk-scheduling'].videoId}
        videoTitle={OS_VIDEOS['disk-scheduling'].videoTitle}
        color="var(--accent-primary)"
      />
    </motion.div>
  );
};

export default Unit2;
