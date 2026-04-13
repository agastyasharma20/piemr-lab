import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" } as any
  })
};

const sectionTitleStyle = {
  fontSize: '1.4rem',
  fontWeight: 700,
  color: 'var(--accent-secondary)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  marginBottom: '1.25rem',
};

const FunctionsTypes = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      <motion.header custom={0} variants={fadeUp} style={{
        padding: '2rem 2.5rem',
        background: 'linear-gradient(135deg, rgba(0,48,115,0.5) 0%, rgba(26,92,190,0.2) 100%)',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
        borderLeft: '5px solid var(--accent-tertiary)',
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-gold">Expansion</span>
        </div>
        <h1 className="text-gradient">Functions & Types of OS</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.5rem 0 0', maxWidth: '700px' }}>
          Dive into the core responsibilities of an Operating System and explore how different environments dictate different architectural approaches.
        </p>
      </motion.header>

      {/* Core OS Responsibilities */}
      <motion.div custom={1} variants={fadeUp}>
        <h2 style={sectionTitleStyle}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block' }} />
          Core Responsibilities of an OS
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

      {/* OS Architecture Comparison */}
      <motion.div custom={6} variants={fadeUp} style={{
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <h2 style={{ ...sectionTitleStyle, justifyContent: 'center', marginBottom: '1.5rem' }}>
          Types of Operating Systems
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Architecture / Type</th>
                <th>Performance</th>
                <th>Stability</th>
                <th>Examples / Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Monolithic Kernel</strong></td>
                <td><span className="badge badge-green">Extreme</span></td>
                <td><span className="badge badge-maroon">Risky</span></td>
                <td>Linux — General desktop & servers</td>
              </tr>
              <tr>
                <td><strong>Microkernel</strong></td>
                <td><span className="badge badge-blue">Moderate</span></td>
                <td><span className="badge badge-green">Very High</span></td>
                <td>QNX — Embedded / Automotive systems</td>
              </tr>
              <tr>
                <td><strong>Hybrid Kernel</strong></td>
                <td><span className="badge badge-blue">High</span></td>
                <td><span className="badge badge-blue">High</span></td>
                <td>Windows NT, macOS — Desktops</td>
              </tr>
              <tr>
                <td><strong>Real-Time OS (RTOS)</strong></td>
                <td><span className="badge badge-gold">Deterministic</span></td>
                <td><span className="badge badge-green">Critical</span></td>
                <td>VxWorks — Medical implants, aerospace</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default FunctionsTypes;
