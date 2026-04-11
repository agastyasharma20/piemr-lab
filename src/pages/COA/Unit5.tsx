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
  background: 'linear-gradient(135deg, rgba(26,92,190,0.1) 0%, rgba(212,160,23,0.15) 100%)',
  borderRadius: 'var(--border-radius-xl)',
  border: '1px solid var(--border-glow)',
  borderLeft: '5px solid var(--accent-tertiary)',
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

const sectionTitleStyle = {
  fontSize: '1.3rem',
  fontWeight: 700,
  color: 'var(--accent-secondary)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  marginBottom: '1rem',
};

const Unit5 = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header style={headerStyle} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>

          <span className="badge badge-blue">Advanced Compute</span>
        </div>
        <h1 className="text-gradient">Multiprocessors</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.5rem 0 0', maxWidth: '650px' }}>
          Break the speed limit of a single CPU. Explore parallel architectures, pipelining, and multicore networking.
        </p>
      </motion.header>

      {/* RISC vs CISC */}
      <motion.div custom={1} variants={fadeUp}
        className="glass-panel-md"
        style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}
      >
         <h2 style={sectionTitleStyle}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-primary)', borderRadius: 4, display: 'inline-block' }} />
          Instruction Set Architectures
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', borderTop: '4px solid var(--info)' }}>
             <h3 style={{ color: 'var(--info)' }}>RISC (Reduced Instruction Set Computer)</h3>
             <ul style={{ color: 'var(--text-secondary)', marginTop: '1rem', paddingLeft: '1.2rem', lineHeight: 1.8 }}>
               <li>Highly optimized, simple instructions.</li>
               <li>Each instruction takes exactly one clock cycle.</li>
               <li>Relies heavily on compilers to write complex series of basic instructions.</li>
               <li><strong style={{ color: 'var(--text-primary)' }}>Examples:</strong> ARM (Apple M-Series, Mobile Processors).</li>
             </ul>
          </div>
          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', borderTop: '4px solid var(--accent-tertiary)' }}>
             <h3 style={{ color: 'var(--accent-tertiary)' }}>CISC (Complex Instruction Set Computer)</h3>
             <ul style={{ color: 'var(--text-secondary)', marginTop: '1rem', paddingLeft: '1.2rem', lineHeight: 1.8 }}>
               <li>A single instruction can execute multiple low-level operations (e.g., Load, Add, Store all at once).</li>
               <li>Variable length instructions taking multiple clock cycles.</li>
               <li>Prioritizes code-density and simpler compiler design.</li>
               <li><strong style={{ color: 'var(--text-primary)' }}>Examples:</strong> x86 (Intel / AMD Desktop processors).</li>
             </ul>
          </div>
        </div>
      </motion.div>

      {/* Pipelining & Parallelism */}
      <motion.div custom={2} variants={fadeUp} style={{
        background: 'rgba(15,158,110,0.05)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid rgba(15, 158, 110, 0.3)',
      }}>
        <h2 style={{ ...sectionTitleStyle, color: 'var(--success)' }}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--success)', borderRadius: 4, display: 'inline-block' }} />
          Pipelining & Parallel Processing
        </h2>
        
        <p style={{ lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          To dramatically increase CPU throughput, modern architectures overlap the execution of instructions. Instead of waiting for Instruction 1 to completely finish before starting Instruction 2, the CPU acts like a factory assembly line.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-primary)', padding: '1.2rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📥</div>
            <strong style={{ color: 'var(--text-primary)' }}>Fetch Stage</strong>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '1.2rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</div>
            <strong style={{ color: 'var(--text-primary)' }}>Decode Stage</strong>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '1.2rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚙️</div>
            <strong style={{ color: 'var(--text-primary)' }}>Execute Stage</strong>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '1.2rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💾</div>
            <strong style={{ color: 'var(--text-primary)' }}>Writeback Stage</strong>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', borderLeft: '4px solid var(--warning)' }}>
          <strong style={{ color: 'var(--warning)' }}>⚠️ Pipeline Hazards:</strong>
          <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            When instructions depend on each other (Data Dependency) or branching logic disrupts the flow (Control Dependency), the pipeline must be flushed or stalled, reducing efficiency.
          </p>
        </div>

      </motion.div>

    </motion.div>
  );
};

export default Unit5;
