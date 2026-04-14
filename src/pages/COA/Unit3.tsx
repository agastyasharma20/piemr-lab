import { motion } from 'framer-motion';
import { Cable, Zap, RefreshCw, Cpu } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } as any
  })
};

const headerStyle = {
  padding: '2.5rem 3rem',
  background: 'linear-gradient(135deg, rgba(26,92,190,0.1) 0%, rgba(212,160,23,0.15) 100%)',
  borderRadius: 'var(--border-radius-xl)',
  border: '1px solid var(--border-glow)',
  borderLeft: '5px solid var(--accent-tertiary)',
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

const sectionTitleStyle = {
  fontSize: '1.4rem',
  fontWeight: 700,
  color: 'var(--text-primary)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  marginBottom: '1.5rem',
  borderBottom: '2px solid rgba(255,255,255,0.05)',
  paddingBottom: '0.75rem'
};

const Unit3 = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      {/* Dynamic Header */}
      <motion.header style={headerStyle} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-blue">Peripherals</span>
          <span className="badge badge-gold">Interface</span>
        </div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>Input & Output Organization</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0, maxWidth: '800px', lineHeight: 1.6 }}>
          Investigate the hardware mechanisms that bridge the massive speed differential between the CPU and external peripherals. Explore DMA channels, Synchronous interfaces, and global commercial standards like USB and PCI.
        </p>
      </motion.header>

      {/* Sync vs Async Data Transfer */}
      <motion.div custom={1} variants={fadeUp} className="glass-panel-md" style={{ padding: '2.5rem' }}>
        <h2 style={sectionTitleStyle}>
          <RefreshCw color="var(--info)" /> Asynchronous & Synchronous Data Transfer
        </h2>
        <p style={{ color: 'var(--text-primary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Because peripherals (like keyboards or disk drives) operate at vastly slower speeds than internal CPU registers, the method of timing and data handshaking is critically important.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', borderLeft: '3px solid var(--info)' }}>
             <h4 style={{ color: 'var(--info)', marginBottom: '0.75rem', fontSize: '1.05rem' }}>Synchronous Transfers</h4>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
               Both the CPU and the peripheral device share a <strong>common centralized clock signal</strong>. Data is blindly transmitted exactly when the clock ticks.
               <br/><br/>
               <em>Advantage:</em> Extremely fast throughput.<br/>
               <em>Disadvantage:</em> Only works efficiently if both components truly share the identically high bandwidth capabilities (e.g., CPU to cache).
             </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', borderLeft: '3px solid var(--accent-tertiary)' }}>
             <h4 style={{ color: 'var(--accent-tertiary)', marginBottom: '0.75rem', fontSize: '1.05rem' }}>Asynchronous Transfers (Handshaking)</h4>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
               There is no common clock. Instead, specific control signals (<strong>Strobe or Handshake</strong>) dictate transfers. The sender asserts a "Data Valid" line; the receiver acknowledges it via a "Data Accepted" line.
               <br/><br/>
               <em>Advantage:</em> Flawlessly bridges slow speed gaps without data loss.
             </p>
          </div>
        </div>
      </motion.div>

      {/* Direct Memory Access (DMA) & I/O Processors */}
      <motion.div custom={2} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
         <div className="glass-panel-md" style={{ padding: '2rem', borderTop: '4px solid var(--success)' }}>
            <h3 style={{ color: 'var(--success)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={20} /> Direct Memory Access (DMA)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Usually, I/O requires the CPU to execute instructions per byte transferred. <strong>DMA bypasses the CPU entirely</strong>, establishing a direct hardware highway straight into Main Memory to load heavy payloads (like entire network packets or HDD sectors). The CPU uses "Cycle Stealing" while the DMA holds the bus.
            </p>
         </div>
         <div className="glass-panel-md" style={{ padding: '2rem', borderTop: '4px solid var(--danger)' }}>
            <h3 style={{ color: 'var(--danger)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={20} /> Intelligent I/O Processors (IOP)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              An evolution of DMA logic. An I/O Channel or I/O Processor is practically an independent microcomputer physically installed on the motherboard, dedicated exclusively to routing complex peripheral instructions so the primary CPU does zero processing work.
            </p>
         </div>
      </motion.div>

      {/* Commercial Interfaces */}
      <motion.div custom={3} variants={fadeUp} style={{
        background: 'rgba(0,0,0,0.2)',
        padding: '2.5rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <h2 style={{ ...sectionTitleStyle, color: 'var(--accent-primary)', borderColor: 'rgba(37,99,235,0.2)' }}>
          <Cable color="#3b82f6" /> Universal Bus Architectures
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', background: '#0a0f1c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <h3 style={{ color: '#60a5fa', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Peripheral Component Interconnect (PCI)</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
              The high-bandwidth standard hardware bus historically utilized for connecting Graphics Cards (GPUs), Network Interface Cards (NICs), and internal components directly to the local processor bus via a bridge.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: '#0a0f1c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--warning)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Small Computer System Interface (SCSI)</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
              A set of parallel standards historically designed for linking enterprise-grade hard drives and scanners. Often daisy-chained with terminators, offering robust server-level block data transfers.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: '#0a0f1c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', gridColumn: '1 / -1' }}>
            <h3 style={{ color: 'var(--success)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Universal Serial Bus (USB)</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
              The ultimate commercial standard replacing almost all legacy ports. Built on a strict master-slave tiered topology. A core Host Controller coordinates massive hubs globally. It supplies both continuous data payload streams and native DC power, rendering it universally accepted for modern computing peripherals context.
            </p>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Unit3;
