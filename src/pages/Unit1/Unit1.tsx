import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } as any
  })
};

const headerStyle = {
  padding: '2rem 2.5rem',
  background: 'linear-gradient(135deg, rgba(0,48,115,0.5) 0%, rgba(26,92,190,0.2) 100%)',
  borderRadius: 'var(--border-radius-xl)',
  border: '1px solid var(--border-glow)',
  borderLeft: '5px solid var(--accent-tertiary)',
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '1.3rem',
  fontWeight: 700,
  color: 'var(--accent-secondary)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  marginBottom: '1rem',
};

const Unit1 = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header style={headerStyle} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-blue">Unit 1</span>
          <span className="badge badge-gold">Foundation</span>
        </div>
        <h1 className="text-gradient">Introduction to Operating Systems</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.5rem 0 0', maxWidth: '650px' }}>
          The foundational software layer that bridges user applications and raw hardware architecture.
        </p>
      </motion.header>

      {/* What is an OS */}
      <motion.div custom={1} variants={fadeUp}
        className="glass-panel-md"
        style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}
      >
        <h2 style={sectionTitleStyle}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block' }} />
          What is an Operating System?
        </h2>
        <p style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1.02rem' }}>
          An <strong>Operating System (OS)</strong> is the most critical software on a computer — the permanent
          resident that manages every hardware resource and provides services to all other software. It performs
          basic tasks such as recognising input, sending output to displays, tracking files on disks, and controlling
          peripherals like printers and network adapters.
        </p>
        <div style={{
          marginTop: '1.25rem',
          padding: '1rem 1.25rem',
          background: 'rgba(212,160,23,0.08)',
          borderLeft: '4px solid var(--accent-tertiary)',
          borderRadius: '0 var(--border-radius-sm) var(--border-radius-sm) 0',
        }}>
          <strong style={{ color: 'var(--accent-tertiary)', fontSize: '0.9rem' }}>💡 Real-World Analogy</strong>
          <p style={{ margin: '0.4rem 0 0', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            An OS is like a <em>city government</em>. The government doesn't grow crops or build products itself —
            it manages roads (memory bus), allocates land (disk space), enforces rules (access control), and
            coordinates all citizens (processes) so they can work efficiently without interfering with each other.
          </p>
        </div>
      </motion.div>

      {/* Core Responsibilities */}
      <motion.div custom={2} variants={fadeUp}>
        <h2 style={{ ...sectionTitleStyle, marginBottom: '1.25rem' }}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block' }} />
          Core OS Responsibilities
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {[
            { title: 'Process Management', color: '#2a78e8', icon: '⚙️', text: 'Creates, schedules, and terminates processes. Decides which process gets CPU time via scheduling algorithms and preempts running processes when needed.' },
            { title: 'Memory Management', color: '#D4A017', icon: '🧠', text: 'Loads programs into RAM, translates logical addresses to physical ones, protects one process\'s memory space from being corrupted by another, and handles page swapping.' },
            { title: 'File & Disk I/O', color: '#0f9e6e', icon: '💾', text: 'Abstracts raw disk tracks and sectors into a logical File System. Manages I/O device drivers, buffers cache-frequent reads, and schedules disk head movement.' },
            { title: 'Security & Protection', color: '#9B1C1C', icon: '🛡️', text: 'Enforces access control via permissions, user IDs, and system call sandboxing. Prevents user-mode programs from executing privileged kernel instructions directly.' },
          ].map(({ title, color, icon, text }, index) => (
            <motion.div
              key={title}
              custom={index + 2}
              variants={fadeUp}
              whileHover={{ 
                y: -8, 
                borderColor: color,
                boxShadow: `0 12px 30px -10px ${color}40`,
                backgroundColor: 'rgba(255,255,255,0.03)'
              }}
              whileTap={{ scale: 0.98 }}
              className="glass-panel-md"
              style={{ padding: '1.6rem', borderTop: `4px solid ${color}`, cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '10px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${color}15`, border: `1px solid ${color}30`
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                </div>
                <h3 style={{ color, fontSize: '1.05rem', margin: 0, fontWeight: 700 }}>{title}</h3>
              </div>
              <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* System Call Demo */}
      <motion.div custom={3} variants={fadeUp}
        className="glass-panel-md"
        style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}
      >
        <h2 style={sectionTitleStyle}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block' }} />
          System Calls — The OS API
        </h2>
        <p style={{ lineHeight: 1.75, color: 'var(--text-primary)', marginBottom: '1.1rem' }}>
          User applications run in <strong>User Mode</strong> with zero hardware access. To perform privileged
          operations (read files, allocate memory, create processes), they issue a <strong>System Call</strong> —
          a trap instruction that switches the CPU to <strong>Kernel Mode</strong>, runs the OS routine, and returns
          control to the application.
        </p>
        <div style={{
          background: '#0a0f1e',
          padding: '1.5rem',
          borderRadius: 'var(--border-radius-md)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.88rem',
          lineHeight: 2,
          border: '1px solid rgba(26,92,190,0.2)',
          overflowX: 'auto',
        }}>
          <div style={{ color: '#6b7280', marginBottom: '0.5rem' }}>{'// C Program — reading a file step-by-step'}</div>
          <div><span style={{ color: '#60a5fa' }}>int</span> fd = <span style={{ color: '#4ade80' }}>open</span>(<span style={{ color: '#f9a825' }}>"data.txt"</span>, O_RDONLY); &nbsp;<span style={{ color: '#4b5563' }}>// ① Trap → Kernel. OS checks permissions & returns a descriptor.</span></div>
          <div><span style={{ color: '#60a5fa' }}>ssize_t</span> n = <span style={{ color: '#4ade80' }}>read</span>(fd, buffer, <span style={{ color: '#fb923c' }}>512</span>); &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4b5563' }}>// ② Kernel drives the disk controller, copies 512 bytes to buffer.</span></div>
          <div><span style={{ color: '#4ade80' }}>close</span>(fd); &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#4b5563' }}>// ③ OS releases the file descriptor. CPU switches back to User Mode.</span></div>
        </div>
      </motion.div>

      {/* Mathematical Foundation */}
      <motion.div custom={4} variants={fadeUp} style={{
        background: 'rgba(212,160,23,0.05)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-gold)',
      }}>
        <h2 style={{ ...sectionTitleStyle, color: 'var(--accent-tertiary)' }}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block' }} />
          Mathematical Foundation: OS Performance
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1. System Throughput ($T$)</h4>
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <code style={{ fontSize: '1.2rem', color: 'var(--accent-tertiary)' }}>T = N / t</code>
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Where $N$ is the number of processes completed and $t$ is the total observation time.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2. CPU Utilization ($U$)</h4>
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <code style={{ fontSize: '1.2rem', color: 'var(--accent-tertiary)' }}>{'U = (T_busy / T_total) * 100'}</code>
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              The percentage of time the CPU is actively executing instructions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* OS Architecture Comparison */}
      <motion.div custom={5} variants={fadeUp} style={{
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <h2 style={{ ...sectionTitleStyle, justifyContent: 'center', marginBottom: '1.5rem' }}>
          OS Architecture Comparison
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Architecture</th>
                <th>Speed</th>
                <th>Stability</th>
                <th>Best Scenario</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Monolithic Kernel</strong></td>
                <td><span className="badge badge-green">Extreme</span></td>
                <td><span className="badge badge-maroon">Risky (driver crash = OS crash)</span></td>
                <td>Linux, Unix — General desktop & servers</td>
              </tr>
              <tr>
                <td><strong>Microkernel</strong></td>
                <td><span className="badge badge-blue">Moderate</span></td>
                <td><span className="badge badge-green">Very High</span></td>
                <td>Embedded systems, macOS (Hybrid)</td>
              </tr>
              <tr>
                <td><strong>Hybrid Kernel</strong></td>
                <td><span className="badge badge-blue">High</span></td>
                <td><span className="badge badge-blue">High</span></td>
                <td>Windows NT — Enterprise environments</td>
              </tr>
              <tr>
                <td><strong>Exokernel</strong></td>
                <td><span className="badge badge-green">Maximum</span></td>
                <td><span className="badge badge-gold">App-Dependent</span></td>
                <td>Research / Highly specialised systems</td>
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
            The <strong>Monolithic Kernel</strong> (Linux) dominates the world's servers and supercomputers
            due to raw performance. However, modern OS design typically uses a <strong>Hybrid</strong> approach —
            combining the best of both worlds — as seen in Windows NT and macOS XNU.
          </p>
        </motion.div>
      </motion.div>

    </motion.div>
  );
};

export default Unit1;
