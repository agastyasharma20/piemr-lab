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

const InfoBox = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <div style={{
    flex: 1, minWidth: '260px',
    background: `rgba(${color}, 0.08)`,
    border: `1px solid rgba(${color}, 0.25)`,
    padding: '1rem 1.25rem',
    borderRadius: 'var(--border-radius-md)',
  }}>
    {children}
  </div>
);

const Unit4 = () => {
  return (
    <motion.div className={styles.container} initial="hidden" animate="visible">

      {/* Header */}
      <motion.header className={styles.header} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>

          <span className="badge badge-maroon">Concurrency</span>
          <span className="badge badge-gold">Deadlock</span>
        </div>
        <h1 className="text-gradient">Concurrency &amp; Deadlock</h1>
        <p>
          Explore process synchronization using semaphores, simulate the Producer–Consumer
          problem, and visually detect deadlock cycles in Resource Allocation Graphs.
        </p>
      </motion.header>

      {/* Lab 1 — Producer Consumer */}
      <motion.section className={styles.labSection} custom={1} variants={fadeUp}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '1.3rem' }}>
          Lab 1 — Producer-Consumer (Semaphore Simulation)
        </h2>

        <div style={{
          background: 'rgba(0,0,0,0.2)',
          padding: '1.5rem',
          borderRadius: 'var(--border-radius-lg)',
          border: '1px solid var(--border-glow)',
        }}>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            The <strong>Producer-Consumer</strong> problem models two concurrent processes sharing a fixed-size
            buffer. The Producer adds items; the Consumer removes them. Three semaphores coordinate access and
            eliminate race conditions.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <InfoBox color="26,92,190">
              <h4 style={{ color: '#60a5fa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Mutex (Binary Semaphore)</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>
                Ensures mutual exclusion — only one process accesses the shared buffer at any instant.
                Initialized to <strong style={{ color: 'var(--text-primary)' }}>1</strong>.
              </p>
            </InfoBox>
            <InfoBox color="15,158,110">
              <h4 style={{ color: '#4ade80', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Empty (Counting Semaphore)</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>
                Tracks remaining empty buffer slots. Initialized to
                <strong style={{ color: 'var(--text-primary)' }}> N</strong> (buffer size). Producer waits when 0.
              </p>
            </InfoBox>
            <InfoBox color="212,160,23">
              <h4 style={{ color: '#f5c842', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Full (Counting Semaphore)</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>
                Tracks filled buffer slots. Initialized to
                <strong style={{ color: 'var(--text-primary)' }}> 0</strong>. Consumer waits when 0.
              </p>
            </InfoBox>
          </div>

          <ProducerConsumer />
        </div>
      </motion.section>

      {/* Lab 2 — Deadlock */}
      <motion.section className={styles.labSection} custom={2} variants={fadeUp}>
        <h2 className={styles.sectionTitle} style={{ fontSize: '1.3rem' }}>
          Lab 2 — Deadlock Detection &amp; Resource Allocation Graph
        </h2>

        <div style={{
          background: 'rgba(0,0,0,0.2)',
          padding: '1.5rem',
          borderRadius: 'var(--border-radius-lg)',
          border: '1px solid rgba(155,28,28,0.35)',
        }}>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            A <strong>deadlock</strong> occurs when a set of processes are each waiting for a resource held
            by another process in the set — creating a permanent standstill. All four
            <strong> Coffman Conditions</strong> must hold simultaneously for deadlock to arise.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[
              ['Mutual Exclusion', 'Resources cannot be shared simultaneously.'],
              ['Hold & Wait', 'Process holds a resource while waiting for another.'],
              ['No Preemption', 'OS cannot forcibly take a resource away.'],
              ['Circular Wait', 'Cycle exists in the Resource Allocation Graph.'],
            ].map(([title, desc]) => (
              <div key={title} style={{
                flex: '1', minWidth: '200px',
                background: 'rgba(192,57,43,0.1)',
                border: '1px solid rgba(192,57,43,0.25)',
                padding: '0.9rem 1rem',
                borderRadius: 'var(--border-radius-sm)',
              }}>
                <h4 style={{ color: '#fc8080', marginBottom: '0.35rem', fontSize: '0.87rem' }}>{title}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>

          <DeadlockGraph />
        </div>
      </motion.section>

      {/* Comparison Table */}
      <motion.section custom={3} variants={fadeUp} style={{
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <h2 className={styles.sectionTitle} style={{ justifyContent: 'center', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
          Deadlock Handling Strategies
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Strategy</th>
                <th>Overhead</th>
                <th>Approach</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Prevention</strong></td>
                <td><span className="badge badge-maroon">Extremely High</span></td>
                <td>Design system to always negate at least one Coffman condition.</td>
              </tr>
              <tr>
                <td><strong>Avoidance (Banker's Algo)</strong></td>
                <td><span className="badge badge-maroon">High</span></td>
                <td>OS checks "Safe State" before every resource grant.</td>
              </tr>
              <tr>
                <td><strong>Detection &amp; Recovery</strong></td>
                <td><span className="badge badge-blue">Medium</span></td>
                <td>Allow deadlock, periodically scan RAG, kill/rollback to recover.</td>
              </tr>
              <tr>
                <td><strong style={{ color: '#f5c842' }}>Ostrich Algorithm</strong></td>
                <td><span className="badge badge-green">None</span></td>
                <td>Ignore deadlocks — assume they are rare. User reboots if frozen.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <motion.div whileHover={{ scale: 1.01 }} style={{
          marginTop: '1.25rem', padding: '1.1rem 1.4rem',
          background: 'rgba(15,158,110,0.1)', borderRadius: 'var(--border-radius-md)',
          borderLeft: '4px solid var(--success)',
        }}>
          <h3 style={{ color: 'var(--success)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>🏆 Final Verdict</h3>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, margin: 0, fontSize: '0.93rem' }}>
            Surprisingly, the <strong>Ostrich Algorithm</strong> is used by Windows, Linux, and macOS.
            Running Banker's algorithm thousands of times per second would cripple performance.
            Only safety-critical systems (aerospace, nuclear, medical) justify the overhead of full prevention.
          </p>
        </motion.div>
      </motion.section>

      {/* Mathematical Foundation: Banker's Algorithm */}
      <motion.section custom={4} variants={fadeUp} style={{
        background: 'rgba(155,28,28,0.05)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid rgba(155,28,28,0.2)',
        marginBottom: '2rem'
      }}>
        <h2 className={styles.sectionTitle} style={{ color: 'var(--accent-maroon)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-maroon)', borderRadius: 4, display: 'inline-block' }} />
          Mathematical Foundation: Banker's Algorithm
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          The Banker's algorithm is a resource allocation and deadlock avoidance algorithm that tests for safety by simulating the allocation for predetermined maximum possible amounts of all resources.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h4 style={{ color: 'var(--accent-maroon)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>1. THE NEED MATRIX</h4>
             <code style={{ fontSize: '1.1rem', color: 'var(--text-primary)', display: 'block', margin: '0.5rem 0' }}>Need[i,j] = Max[i,j] - Allocation[i,j]</code>
             <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Represents the remaining resources required by process $i$ to complete its task.</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h4 style={{ color: 'var(--accent-maroon)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>2. SAFETY CONDITION</h4>
             <code style={{ fontSize: '1.1rem', color: 'var(--text-primary)', display: 'block', margin: '0.5rem 0' }}>Need<sub>i</sub> ≤ Available</code>
             <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>A state is <b>SAFE</b> if there exists a sequence of processes such that each can be satisfied by current available resources.</p>
          </div>
        </div>
      </motion.section>

      {/* OS Insights */}
      <motion.section custom={5} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="glass-panel-md" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-tertiary)' }}>
              <h3 style={{ color: 'var(--accent-tertiary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>💡 Deadlock Prevention vs Avoidance</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                <b>Prevention</b> works by ensuring that at least one of the four Coffman conditions cannot hold.
                <b>Avoidance</b> (Banker's) allows the conditions to exist but dynamically decides if a resource request
                can be granted without leading to an unsafe state.
              </p>
          </div>
          <div className="glass-panel-md" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)' }}>
              <h3 style={{ color: 'var(--success)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🚦 Semaphore Invariants</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                For a binary semaphore $S$:
                <br/>• $wait(S)$: <code>while(S ≤ 0); S--;</code>
                <br/>• $signal(S)$: <code>S++;</code>
                <br/>This ensures <b>Mutual Exclusion</b> in the critical section.
              </p>
          </div>
      </motion.section>

    </motion.div>
  );
};

export default Unit4;
