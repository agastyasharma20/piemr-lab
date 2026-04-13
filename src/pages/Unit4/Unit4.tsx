import { motion } from 'framer-motion';
import styles from './Unit4.module.css';
import ProducerConsumer from './ProducerConsumer';
import DeadlockGraph from './DeadlockGraph';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeInOut" } as any
  })
};

const Unit4 = () => {
  return (
    <motion.div className={styles.container} initial="hidden" animate="visible">
      {/* Dynamic Header */}
      <motion.header className={styles.header} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-maroon">Advanced OS</span>
          <span className="badge badge-gold">Synchronization</span>
        </div>
        <h1 className="text-gradient" style={{ marginTop: '0.25rem' }}>
          Concurrency & Deadlock
        </h1>
        <p>
          Master the complexities of multi-processing. Analyze process synchronization using semaphores, 
          simulate the classical Producer-Consumer boundary, and visually execute deadlock cycle detection using Resource Allocation Graphs.
        </p>
      </motion.header>

      {/* Theory Introduction Grid */}
      <motion.section custom={1} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className={`glass-panel-md ${styles.card}`}>
          <h2 className={styles.sectionTitle}>What is Concurrency?</h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)' }}>
            Concurrency guarantees that multiple processes or threads can execute simultaneously or interleave dynamically without corrupting shared data. 
            Without proper synchronization (like Mutexes or Semaphores), systems succumb to <strong style={{ color: 'var(--danger)' }}>Race Conditions</strong>.
          </p>
        </div>
        <div className={`glass-panel-md ${styles.card}`}>
          <h2 className={styles.sectionTitle}>The Critical Section</h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)' }}>
            A code segment where shared variables are accessed. Only one process is allowed to execute its critical section at any given time.
            This forms the principle of <strong style={{ color: 'var(--accent-tertiary)' }}>Mutual Exclusion</strong>.
          </p>
        </div>
      </motion.section>

      {/* Lab 1 — Producer Consumer */}
      <motion.section className={styles.labSection} custom={2} variants={fadeUp} style={{ marginBottom: '3rem' }}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '1.4rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          Lab 1: The Producer-Consumer Synchronization
        </h2>
        <ProducerConsumer />
      </motion.section>

      {/* Lab 2 — Deadlock */}
      <motion.section className={styles.labSection} custom={3} variants={fadeUp} style={{ marginBottom: '3rem' }}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '1.4rem', borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          Lab 2: Deadlock Detection & Graph Theory
        </h2>
        <div style={{
          background: 'rgba(0,0,0,0.2)',
          padding: '2rem',
          borderRadius: 'var(--border-radius-xl)',
          border: '1px solid rgba(155,28,28,0.35)',
        }}>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.75, marginBottom: '2rem', fontSize: '1.05rem' }}>
            A <strong>deadlock</strong> occurs when a set of processes are each waiting for a resource inherently held
            by another process in the same system—triggering a permanent standstill. 
            All <strong style={{ color: 'var(--danger)' }}>Four Coffman Conditions</strong> must hold simultaneously for a deadlock to arise.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {[
              ['Mutual Exclusion', 'Resources cannot be shared simultaneously.', '#fc8080'],
              ['Hold & Wait', 'Process holds a resource while actively waiting for another.', '#fca5a5'],
              ['No Preemption', 'OS cannot forcibly strip a resource away from a process.', '#f87171'],
              ['Circular Wait', 'A closed loop exists in the active Resource Allocation Graph.', '#ef4444'],
            ].map(([title, desc, color]) => (
              <div key={title} style={{
                background: 'rgba(239, 68, 68, 0.05)',
                border: `1px solid rgba(239, 68, 68, 0.15)`,
                padding: '1.25rem',
                borderRadius: 'var(--border-radius-lg)',
                borderTop: `3px solid ${color}`
              }}>
                <h4 style={{ color: color as string, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{title}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            ))}
          </div>

          <DeadlockGraph />
        </div>
      </motion.section>

      {/* Advanced Academic Insights */}
      <motion.section custom={4} variants={fadeUp} style={{
        background: 'var(--bg-card)',
        padding: '2.5rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <h2 className={styles.sectionTitle} style={{ justifyContent: 'center', fontSize: '1.6rem', marginBottom: '2rem' }}>
          Deadlock Handling Strategies
        </h2>
        
        <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
          <table>
            <thead>
              <tr>
                <th>System Strategy</th>
                <th>Performance Overhead</th>
                <th>Theoretical Approach</th>
                <th>Real-World Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Prevention</strong></td>
                <td><span className="badge badge-maroon">Extremely High</span></td>
                <td>Architect system to constantly negate at least one Coffman condition.</td>
                <td>Nuclear, Aerospace Systems</td>
              </tr>
              <tr>
                <td><strong>Avoidance (Banker's Algo)</strong></td>
                <td><span className="badge badge-maroon">High</span></td>
                <td>OS verifies "Safe State" before granting every single resource request.</td>
                <td>Banking & Mission-Critical</td>
              </tr>
              <tr>
                <td><strong>Detection &amp; Recovery</strong></td>
                <td><span className="badge badge-blue">Medium</span></td>
                <td>Allow deadlock to occur, periodically scan RAG, kill/rollback to recover.</td>
                <td>Database Engines (DBMS)</td>
              </tr>
              <tr style={{ background: 'rgba(16,185,129,0.05)' }}>
                <td><strong style={{ color: 'var(--accent-tertiary)' }}>Ostrich Algorithm</strong></td>
                <td><span className="badge badge-green">None</span></td>
                <td>Ignore deadlocks—assume they are incredibly rare. End-user blindly restarts.</td>
                <td>Standard OS (Windows/Linux)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
           <div style={{ background: 'rgba(212,160,23,0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--accent-tertiary)' }}>
              <h4 style={{ color: 'var(--accent-tertiary)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Banker's Algorithm Core Constraint</h4>
              <code style={{ fontSize: '1.1rem', color: 'var(--text-primary)', display: 'block', margin: '0.75rem 0', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '6px' }}>Need[i,j] = Max[i,j] - Allocation[i,j]</code>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>By ensuring that total available resources always satisfy at least one process's max constraints linearly, the system never crosses into a deadlocked cycle.</p>
           </div>
           
           <div style={{ background: 'rgba(16,185,129,0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--success)' }}>
              <h4 style={{ color: 'var(--success)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>🏆 PIEMR Industrial Verdict</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                Surprisingly, the <strong>Ostrich Algorithm</strong> is used natively by Windows, Linux, and macOS. 
                Running Deadlock Avoidance algorithms dynamically thousands of times per second strictly cripples real-time CPU performance. 
              </p>
           </div>
        </div>
      </motion.section>

    </motion.div>
  );
};

export default Unit4;
