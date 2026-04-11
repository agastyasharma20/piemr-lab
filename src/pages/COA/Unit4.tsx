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

const Unit4 = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header style={headerStyle} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>

          <span className="badge badge-blue">Memory Hierarchy</span>
        </div>
        <h1 className="text-gradient">Memory Organization</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.5rem 0 0', maxWidth: '650px' }}>
          Understand the memory hierarchy, Cache design, virtual memory translations, and mapping schemes that enable fast computation.
        </p>
      </motion.header>

      {/* The Memory Hierarchy */}
      <motion.div custom={1} variants={fadeUp}
        className="glass-panel-md"
        style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}
      >
        <h2 style={sectionTitleStyle}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block' }} />
          The Memory Hierarchy
        </h2>
        
        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-primary)', margin: 0 }}>
            <strong>Goal:</strong> Achieve the speed of the fastest internal memory at the cost of the cheapest mass storage.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { level: '1. CPU Registers', speed: 'Picoseconds', size: 'Bytes', desc: 'Internal CPU storage. Fastest but extremely limited.', color: 'var(--danger)' },
            { level: '2. Cache Memory (L1, L2, L3)', speed: 'Nanoseconds', size: 'Megabytes', desc: 'SRAM placed near or on the CPU to mask main memory latency.', color: 'var(--warning)' },
            { level: '3. Main Memory (RAM)', speed: '10s of Nanoseconds', size: 'Gigabytes', desc: 'DRAM holding currently executing programs and datasets.', color: 'var(--info)' },
            { level: '4. Secondary / Mass Storage', speed: 'Milliseconds', size: 'Terabytes', desc: 'Magnetic disks, SSDs, and optical storage holding persistent data.', color: 'var(--success)' },
          ].map((mem, idx) => (
             <div key={idx} style={{ 
               display: 'flex', alignItems: 'center', padding: '1rem 1.5rem',
               background: 'rgba(0,0,0,0.2)', borderLeft: `4px solid ${mem.color}`,
               borderRadius: 'var(--border-radius-sm)', gap: '2rem'
             }}>
               <div style={{ flex: '1', minWidth: '150px' }}>
                 <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>{mem.level}</h4>
               </div>
               <div style={{ flex: '1' }}>
                 <span style={{ color: 'var(--accent-tertiary)', fontSize: '0.85rem' }}>Speed: {mem.speed}</span><br />
                 <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Capacity: {mem.size}</span>
               </div>
               <div style={{ flex: '2', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                 {mem.desc}
               </div>
             </div>
          ))}
        </div>
      </motion.div>

      {/* Cache Mapping */}
      <motion.div custom={2} variants={fadeUp} style={{
        background: 'rgba(212,160,23,0.05)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-gold)',
      }}>
        <h2 style={{ ...sectionTitleStyle, color: 'var(--accent-tertiary)' }}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block' }} />
          Cache Mapping Schemes
        </h2>
        <p style={{ lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: '1.2rem', fontSize: '0.95rem' }}>
          When data is pulled from Main Memory, it must be placed into a specific Cache Line. The mapping function determines where this data goes.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
          
          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Direct Mapping</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Each block of main memory maps to exactly <strong>one</strong> specific cache line. 
              Easy to implement, but suffers from high conflict misses if two active memory blocks map to the same line.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Associative Mapping</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              A block of main memory can map to <strong>any</strong> cache line. 
              Maximizes cache utilization but requires complex, expensive parallel hardware comparators to search the entire cache.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
            <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Set-Associative Mapping</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              The optimal compromise. The cache is divided into "sets". A memory block maps to a specific set, but can be placed <strong>anywhere within that set</strong>. (e.g., 4-way set associative).
            </p>
          </div>

        </div>
      </motion.div>

    </motion.div>
  );
};

export default Unit4;
