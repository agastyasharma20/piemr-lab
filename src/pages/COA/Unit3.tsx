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

const Unit3 = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header style={headerStyle} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>

          <span className="badge badge-blue">Input/Output</span>
        </div>
        <h1 className="text-gradient">I/O Organization</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.5rem 0 0', maxWidth: '650px' }}>
          Explore how the CPU communicates with external peripherals through buses, interface protocols, and Direct Memory Access.
        </p>
      </motion.header>

      {/* Modes of Data Transfer */}
      <motion.div custom={1} variants={fadeUp}
        className="glass-panel-md"
        style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}
      >
        <h2 style={sectionTitleStyle}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block' }} />
          Modes of Data Transfer
        </h2>
        <p style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1.02rem', marginBottom: '1.5rem' }}>
          Peripheral devices are fundamentally slower than the CPU and RAM. To handle this mismatch, computer architecture outlines three primary mechanisms for I/O data transfer:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {[
            { title: 'Programmed I/O', badge: 'Slowest', info: 'The CPU constantly checks the I/O status register in a loop (Polling). Wastes massive amounts of CPU cycles.', color: 'var(--danger)' },
            { title: 'Interrupt-Driven I/O', badge: 'Efficient', info: 'The CPU issues an I/O command and goes to sleep or does other work. The device sends an Interrupt signal when ready.', color: 'var(--warning)' },
            { title: 'Direct Memory Access (DMA)', badge: 'Fastest', info: 'A dedicated DMA Controller takes over the system bus to transfer bulk data directly between the I/O device and Memory. The CPU is bypassed entirely for the transfer.', color: 'var(--success)' }
          ].map((mode, idx) => (
             <div key={idx} style={{ 
               background: 'rgba(255,255,255,0.03)', padding: '1.5rem', 
               borderRadius: '8px', borderLeft: `4px solid ${mode.color}`,
               display: 'flex', flexDirection: 'column', gap: '0.5rem'
             }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem' }}>{mode.title}</h4>
                 <span style={{ fontSize: '0.75rem', fontWeight: 'bold', background: `${mode.color}20`, color: mode.color, padding: '2px 8px', borderRadius: '4px' }}>
                   {mode.badge}
                 </span>
               </div>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>{mode.info}</p>
             </div>
          ))}
        </div>
      </motion.div>

      {/* Bus Terminology */}
      <motion.div custom={2} variants={fadeUp} style={{
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
         <h2 style={sectionTitleStyle}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-primary)', borderRadius: 4, display: 'inline-block' }} />
          Standard Interfaces & Buses
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>PCI Bus</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Peripheral Component Interconnect. High speed synchronous bus for attaching hardware devices.</p>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--accent-tertiary)', marginBottom: '0.5rem' }}>SCSI</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Small Computer System Interface. Older parallel standard for hard drives and scanners.</p>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>USB</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Universal Serial Bus. The modern standard for asynchronous serial data transfer.</p>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Unit3;
