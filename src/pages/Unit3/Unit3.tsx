import React from 'react';
import { motion } from 'framer-motion';
import styles from './Unit3.module.css';
import CPUSimulation from './CPUSimulation';
import MemorySimulation from './MemorySimulation';
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

const CompareTable = ({
  title, rows, headers, verdict,
}: {
  title: string;
  headers: string[];
  rows: React.ReactNode[][];
  verdict: string;
  accentColor?: string;
}) => (
  <div style={{
    background: 'var(--bg-card)',
    padding: '2rem',
    borderRadius: 'var(--border-radius-xl)',
    border: '1px solid var(--border-glow)',
  }}>
    <h2 className={styles.sectionTitle} style={{ justifyContent: 'center', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
      {title}
    </h2>
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
    <motion.div whileHover={{ scale: 1.01 }} style={{
      marginTop: '1.25rem',
      padding: '1.1rem 1.4rem',
      background: 'rgba(15,158,110,0.1)',
      borderRadius: 'var(--border-radius-md)',
      borderLeft: `4px solid var(--success)`,
    }}>
      <h3 style={{ color: 'var(--success)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>🏆 Final Verdict</h3>
      <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, margin: 0, fontSize: '0.93rem' }} dangerouslySetInnerHTML={{ __html: verdict }} />
    </motion.div>
  </div>
);

const Unit3 = () => {
  return (
    <motion.div className={styles.container} initial="hidden" animate="visible">
      {/* Header */}
      <motion.header className={styles.header} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>

          <span className="badge badge-gold">CPU Scheduling</span>
          <span className="badge badge-maroon">Memory Management</span>
        </div>
        <h1 className="text-gradient">CPU Scheduling &amp; Memory Management</h1>
        <p>Interactive Gantt chart engine and Page Replacement frame simulator. Select an algorithm and instantly visualise every step.</p>
      </motion.header>

      {/* Lab 1 — CPU */}
      <motion.section className={styles.labSection} custom={1} variants={fadeUp}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '1.3rem' }}>Lab 1 — CPU Scheduling Algorithms</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '-0.5rem', fontSize: '0.95rem' }}>
          Simulate Gantt charts, waiting times, and turnaround metrics for FCFS, SJF, SRTF, Round Robin, and Priority scheduling.
        </p>
        <CPUSimulation />
      </motion.section>

      {/* Lab 2 — Memory */}
      <motion.section className={styles.labSection} custom={2} variants={fadeUp}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '1.3rem' }}>Lab 2 — Page Replacement Simulation</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '-0.5rem', fontSize: '0.95rem' }}>
          Visualise memory frames step-by-step and compute page faults for FIFO, LRU, and Optimal algorithms.
        </p>
        <MemorySimulation />
      </motion.section>

      {/* Comparison Tables */}
      <motion.div custom={3} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <CompareTable
          title="CPU Scheduling — Side-by-Side Comparison"
          headers={['Algorithm', 'Avg Wait Time', 'Preemptive?', 'Starvation', 'Best Scenario']}
          rows={[
            [<strong>FCFS</strong>, <span className="badge badge-maroon">Worst</span>, 'No', <span className="badge badge-green">None</span>, 'Batch processing'],
            [<strong>SJF</strong>, <span className="badge badge-green">Minimum</span>, 'No', <span className="badge badge-maroon">High</span>, 'Known burst lengths'],
            [<strong>SRTF</strong>, <span className="badge badge-green">Near Optimal</span>, 'Yes', <span className="badge badge-maroon">High</span>, 'Preempt short processes'],
            [<strong>Priority</strong>, 'Varies', 'Optional', <span className="badge badge-maroon">Yes</span>, 'Critical/Real-time OS'],
            [<strong style={{ color: '#f5c842' }}>Round Robin</strong>, <span className="badge badge-blue">Good</span>, 'Yes', <span className="badge badge-green">None</span>, 'Interactive OS (Linux, Windows)'],
          ]}
          verdict="For modern interactive systems, <strong>Round Robin with Multilevel Feedback Queues</strong> is the gold standard — guaranteed zero starvation, great response time, and used in Linux/Windows schedulers today."
        />

        <CompareTable
          title="Page Replacement — Side-by-Side Comparison"
          headers={['Algorithm', 'Page Fault Rate', "Belady's Anomaly", 'Implementable?', 'Best Scenario']}
          rows={[
            [<strong>Optimal (OPT)</strong>, <span className="badge badge-green">Minimum</span>, <span className="badge badge-green">Immune</span>, <span className="badge badge-maroon">No (Future needs)</span>, 'Theoretical baseline'],
            [<strong>FIFO</strong>, <span className="badge badge-maroon">High</span>, <span className="badge badge-maroon">Vulnerable</span>, <span className="badge badge-green">Yes (Queue)</span>, 'Simple, low overhead'],
            [<strong style={{ color: '#f5c842' }}>LRU</strong>, <span className="badge badge-blue">Very Low</span>, <span className="badge badge-green">Immune</span>, <span className="badge badge-gold">Hardware Assist</span>, 'Production OS environments'],
          ]}
          verdict="Since <strong>Optimal</strong> is impossible in real systems (requires future knowledge), <strong>LRU</strong> is the practical gold standard. Modern kernels use the <em>Clock Algorithm</em> as an LRU approximation for O(1) efficiency."
        />
      </motion.div>
      {/* References */}
      <motion.div custom={4} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {OS_VIDEOS['cpu-memory'].refs?.map((ref, i) => (
          <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 1.2rem', background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '12px', color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>
            <ExternalLink size={14} />{ref.label}
          </a>
        ))}
      </motion.div>

      <motion.div custom={5} variants={fadeUp} className="glass-panel-md" style={{ padding: '2.5rem', borderTop: '4px solid var(--warning)' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <HelpCircle color="var(--warning)" size={22} /> Interview Questions
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>CPU scheduling and memory management questions from GATE & FAANG.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {OS_VIDEOS['cpu-memory'].interviewQs?.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.2rem', background: 'rgba(245,158,11,0.05)', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.12)' }}>
              <span style={{ color: 'var(--warning)', fontWeight: 700, flexShrink: 0 }}>Q{i + 1}</span>
              <span style={{ color: '#e2e8f0', lineHeight: 1.6, fontSize: '0.92rem' }}>{q}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <YouTubePiP
        videoId={OS_VIDEOS['cpu-memory'].videoId}
        videoTitle={OS_VIDEOS['cpu-memory'].videoTitle}
        color="var(--accent-tertiary)"
      />
    </motion.div>
  );
};

export default Unit3;
