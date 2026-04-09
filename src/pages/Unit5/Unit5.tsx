import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  })
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--accent-secondary)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  marginBottom: '1rem',
};

const Accent = () => (
  <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block', flexShrink: 0 }} />
);

const Unit5 = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header
        custom={0} variants={fadeUp}
        style={{
          padding: '2rem 2.5rem',
          background: 'linear-gradient(135deg, rgba(0,48,115,0.5), rgba(155,28,28,0.2))',
          borderRadius: 'var(--border-radius-xl)',
          border: '1px solid var(--border-glow)',
          borderLeft: '5px solid var(--accent-maroon)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-blue">Unit 5</span>
          <span className="badge badge-maroon">Advanced OS</span>
        </div>
        <h1 className="text-gradient">Advanced Operating Systems</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.5rem 0 0', maxWidth: '650px' }}>
          Scaling beyond a single core: Distributed Systems, Multiprocessor OS, and real-world kernel comparisons.
        </p>
      </motion.header>

      {/* Parallel Computing Context */}
      <motion.div custom={1} variants={fadeUp}
        className="glass-panel-md"
        style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}
      >
        <h2 style={sectionTitleStyle}><Accent /> The Parallel Computing Era</h2>
        <p style={{ color: 'var(--text-primary)', lineHeight: 1.8 }}>
          Classic OS algorithms maximise utilisation on a single CPU core. Modern computing demands executing workloads
          across <strong>hundreds of cores</strong> (Multiprocessing) or entirely separate physical machines
          distributed globally (Distributed Computing). This creates enormous challenges in
          <strong> state synchronisation, clock drift, partial failure, and data consistency</strong>.
        </p>
      </motion.div>

      {/* Distributed vs Multiprocessor */}
      <motion.div custom={2} variants={fadeUp}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}
      >
        {[
          {
            title: 'Distributed OS',
            color: '#2a78e8',
            icon: '🌐',
            points: [
              ['No Shared Clock', 'Clocks drift independently. Logical clocks (Lamport Timestamps) provide ordering.'],
              ['Fault Tolerance', 'If one node crashes, the OS reroutes execution transparently to another.'],
              ['Resource Sharing', 'Files and services are accessed via network transparently, as if local.'],
            ]
          },
          {
            title: 'Multiprocessor OS',
            color: '#D4A017',
            icon: '🖥️',
            points: [
              ['Shared Memory', 'All CPUs share the same physical RAM, requiring careful cache coherence protocols.'],
              ['SMP — Symmetric Multiprocessing', 'All processors are peers. Any CPU can run any process from the shared ready queue.'],
              ['Processor Affinity', 'Schedulers keep a process on the same core to reuse hot L1/L2 cache data.'],
            ]
          },
        ].map(({ title, color, icon, points }) => (
          <motion.div
            key={title}
            whileHover={{ y: -4 }}
            className="glass-panel-md"
            style={{ padding: '1.5rem', borderTop: `3px solid ${color}`, transition: 'all 0.3s' }}
          >
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{icon}</span>
              <h2 style={{ margin: 0, color, fontSize: '1.1rem' }}>{title}</h2>
            </div>
            <ul style={{ paddingLeft: '1.25rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              {points.map(([key, val]) => (
                <li key={key} style={{ paddingLeft: '1rem', borderLeft: `2px solid ${color}33` }}>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.92rem' }}>{key}:</strong>{' '}
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{val}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Kernel Case Study */}
      <motion.div custom={3} variants={fadeUp} style={{
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <h2 style={{ ...sectionTitleStyle, justifyContent: 'center', marginBottom: '1.5rem' }}>
          Case Study: Linux vs Windows NT Kernel
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th style={{ color: '#f5c842' }}>Linux Kernel</th>
                <th style={{ color: '#60a5fa' }}>Windows NT Kernel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Architecture</strong></td>
                <td>Monolithic — drivers run natively in kernel space for ultra-fast IPC-free execution.</td>
                <td>Hybrid — critical services in kernel, GUI and some drivers semi-isolated above it.</td>
              </tr>
              <tr>
                <td><strong>Process Creation</strong></td>
                <td><code style={{ color: '#4ade80', background: 'rgba(0,0,0,0.3)', padding: '1px 6px', borderRadius: 3 }}>fork()</code> duplicates a process extremely cheaply using copy-on-write pages.</td>
                <td><code style={{ color: '#60a5fa', background: 'rgba(0,0,0,0.3)', padding: '1px 6px', borderRadius: 3 }}>CreateProcess()</code> spawns a heavy fully initialised, independent process.</td>
              </tr>
              <tr>
                <td><strong>File System</strong></td>
                <td>ext4 / Btrfs. Everything is a file (VFS abstraction). Sockets, devices, pipes — all files.</td>
                <td>NTFS with strict ACLs and Registry. GUI tightly integrated via Win32 subsystem.</td>
              </tr>
              <tr>
                <td><strong>Scheduler</strong></td>
                <td>CFS (Completely Fair Scheduler) — virtual runtime based fairness with cgroup support.</td>
                <td>Multilevel priority queue with aging. Real-time threads get strict priority boost.</td>
              </tr>
              <tr>
                <td><strong>Security Model</strong></td>
                <td>DAC (owner/group/other bits) + SELinux/AppArmor MAC layers + namespaces + cgroups.</td>
                <td>ACL-based DACL/SACL + mandatory integrity levels + UAC (User Account Control).</td>
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
            There is no single "best" — each excels in its domain. <strong>Linux</strong> dominates distributed cloud
            infrastructure (AWS, Google Cloud, Azure VMs all run Linux). <strong>Windows NT</strong> dominates the
            enterprise desktop, Active Directory environments, and gaming workloads due to superior driver compatibility.
          </p>
        </motion.div>
      </motion.div>

    </motion.div>
  );
};

export default Unit5;
