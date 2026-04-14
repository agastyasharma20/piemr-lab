import { motion } from 'framer-motion';
import { Database, Zap, Layers, MemoryStick, Cpu, ExternalLink, HelpCircle } from 'lucide-react';
import { YouTubePiP } from '../../components/common/YouTubePiP';
import { COA_VIDEOS } from '../../data/subjectVideoData';

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

const Unit4 = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      {/* Dynamic Header */}
      <motion.header style={headerStyle} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-blue">Hardware</span>
          <span className="badge badge-gold">Caching</span>
        </div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>Memory Organization</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0, maxWidth: '800px', lineHeight: 1.6 }}>
          Explore the physics and logistics of computer memory. Understand the hierarchical triangle, the immense speed implementations of SRAM caches, and the illusive mappings of Virtual Memory.
        </p>
      </motion.header>

      {/* Memory Hierarchy Triangle */}
      <motion.div custom={1} variants={fadeUp} className="glass-panel-md" style={{ padding: '2.5rem' }}>
        <h2 style={sectionTitleStyle}>
          <Layers color="var(--info)" /> The Memory Hierarchy Triangle
        </h2>
        <p style={{ color: 'var(--text-primary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
          It's architecturally impossible to build a single storage drive that is simultaneously highly capacious, inexpensive, and blazingly fast. Therefore, modern OS architectures rely on a <strong>tiered hierarchy pyramid</strong>.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
           <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--danger)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: 'var(--danger)', margin: 0, fontSize: '1.1rem' }}>Registers & L1 Cache</h4>
                <Cpu size={16} color="var(--danger)" />
             </div>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
               Extremely expensive static RAM built directly into the CPU die. The fastest theoretical speeds exist here. Capacity: Kilobytes to Megabytes.
             </p>
           </div>
           
           <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--warning)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: 'var(--warning)', margin: 0, fontSize: '1.1rem' }}>Main Memory (RAM)</h4>
                <MemoryStick size={16} color="var(--warning)" />
             </div>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
               Dynamic RAM serving as the operating workbench. Moderately expensive. Retains the system's live runtime data. Capacity: Gigabytes.
             </p>
           </div>

           <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--success)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ color: 'var(--success)', margin: 0, fontSize: '1.1rem' }}>Magnetic / Solid Drives</h4>
                <Database size={16} color="var(--success)" />
             </div>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
               Non-volatile secondary mass storage. Vastly cheap per byte, but astronomically slow mechanically. Capacity: Terabytes.
             </p>
           </div>
        </div>
      </motion.div>

      {/* Cache Memory */}
      <motion.div custom={2} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
         <div className="glass-panel-md" style={{ padding: '2rem', borderTop: '4px solid var(--accent-tertiary)' }}>
            <h3 style={{ color: 'var(--accent-tertiary)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={20} /> Cache Memory
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              A high-speed intermediary buffer between CPU Registers and Main Memory. Cache operates blindly on the <strong>Principle of Locality</strong> (Spatial and Temporal) — assuming that if the CPU requests a byte, it will mathematically request neighboring bytes very soon.
            </p>
         </div>
         <div className="glass-panel-md" style={{ padding: '2rem', borderTop: '4px solid var(--info)' }}>
            <h3 style={{ color: 'var(--info)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Database size={20} /> Cache Mapping Systems
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Because Cache is tiny (e.g. 8MB) and RAM is huge (e.g. 16GB), hardware must "Map" where blocks belong:
              <br/>• <strong>Direct Mapping:</strong> Block goes to exactly one rigid line. (Fast but high collisions).
              <br/>• <strong>Associative:</strong> Block can go anywhere. (No collisions, but slow searches).
              <br/>• <strong>Set-Associative:</strong> The ultimate compromise hybrid in modern CPUs.
            </p>
         </div>
      </motion.div>

      {/* Virtual Memory */}
      <motion.div custom={3} variants={fadeUp} style={{
        background: 'rgba(0,0,0,0.2)',
        padding: '2.5rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <h2 style={{ ...sectionTitleStyle, color: 'var(--accent-primary)', borderColor: 'rgba(37,99,235,0.2)' }}>
          <MemoryStick color="#3b82f6" /> Virtual Memory Translation
        </h2>
        
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
            Virtual Memory is a deceptive architectural technique that provides execution software with the absolute illusion of a massive, contiguous RAM block, even across highly fragmented hardware nodes.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', background: '#0a0f1c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <h3 style={{ color: '#60a5fa', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Paging System</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
              Secondary Memory is split into fixed-size logical "Pages". Main memory is split identically into physical "Frames". The hardware OS maps Pages into Frames sporadically as requested without needing continuous space.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: '#0a0f1c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--warning)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Translation Lookaside Buffer (TLB)</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
              The Page Table resides deep in RAM. Accessing the Page Table to then access the true RAM address doubles lookup delays! CPU designs embed a micro-cache called the TLB directly inside the MMU which caches highly active Page Translations to bypass this latency.
            </p>
          </div>
        </div>
      </motion.div>

      {/* References */}
      <motion.div custom={5} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {COA_VIDEOS['memory-organization'].refs?.map((ref, i) => (
          <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 1.2rem', background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '12px', color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>
            <ExternalLink size={14} />{ref.label}
          </a>
        ))}
      </motion.div>

      {/* Interview Questions */}
      <motion.div custom={6} variants={fadeUp} className="glass-panel-md" style={{ padding: '2.5rem', borderTop: '4px solid var(--warning)' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <HelpCircle color="var(--warning)" size={22} /> Interview Questions
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Cache & virtual memory questions — frequently tested in GATE & OS interviews.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {COA_VIDEOS['memory-organization'].interviewQs?.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.2rem', background: 'rgba(245,158,11,0.05)', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.12)' }}>
              <span style={{ color: 'var(--warning)', fontWeight: 700, flexShrink: 0 }}>Q{i + 1}</span>
              <span style={{ color: '#e2e8f0', lineHeight: 1.6, fontSize: '0.92rem' }}>{q}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <YouTubePiP
        videoId={COA_VIDEOS['memory-organization'].videoId}
        videoTitle={COA_VIDEOS['memory-organization'].videoTitle}
        color="var(--warning)"
      />

    </motion.div>
  );
};

export default Unit4;
