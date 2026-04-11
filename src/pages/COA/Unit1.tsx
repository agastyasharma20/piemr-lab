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

          <span className="badge badge-blue">Foundation</span>
        </div>
        <h1 className="text-gradient">Basic Structure of Computer</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.5rem 0 0', maxWidth: '650px' }}>
          Understanding the fundamental architecture, register organization, and instruction formats that power modern desktop computers.
        </p>
      </motion.header>

      {/* Core Components */}
      <motion.div custom={1} variants={fadeUp}
        className="glass-panel-md"
        style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}
      >
        <h2 style={sectionTitleStyle}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block' }} />
          CPU & General Register Organization
        </h2>
        <p style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1.02rem', marginBottom: '1.5rem' }}>
          The Central Processing Unit (CPU) contains a set of registers, an Arithmetic Logic Unit (ALU), and a Control Unit. 
          To minimize memory access bottlenecks, the CPU uses an internal register file for temporary data storage.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            { title: 'Program Counter (PC)', text: 'Holds the memory address of the next instruction to be fetched.' },
            { title: 'Instruction Register (IR)', text: 'Holds the instruction currently being decoded or executed.' },
            { title: 'Memory Address Register (MAR)', text: 'Holds the address of the memory location being accessed.' },
            { title: 'Memory Buffer Register (MBR)', text: 'Holds the data being written to or read from memory.' }
          ].map((reg, idx) => (
             <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '8px', borderLeft: '3px solid var(--accent-primary)' }}>
               <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{reg.title}</h4>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{reg.text}</p>
             </div>
          ))}
        </div>
      </motion.div>

      {/* Instruction Cycle */}
      <motion.div custom={2} variants={fadeUp} style={{
        background: 'rgba(212,160,23,0.05)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-gold)',
      }}>
        <h2 style={{ ...sectionTitleStyle, color: 'var(--accent-tertiary)' }}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block' }} />
          The Fetch-Execute Cycle
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ background: 'var(--accent-tertiary)', color: '#000', width: 30, height: 30, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>1</div>
            <div><strong style={{color: 'var(--text-primary)'}}>Fetch:</strong> PC → MAR. Memory reads instruction at MAR and loads it into MBR, then transfer to IR. PC increments.</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ background: 'var(--accent-tertiary)', color: '#000', width: 30, height: 30, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>2</div>
            <div><strong style={{color: 'var(--text-primary)'}}>Decode:</strong> Control Unit decodes the instruction inside the IR to determine the operation.</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ background: 'var(--accent-tertiary)', color: '#000', width: 30, height: 30, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>3</div>
            <div><strong style={{color: 'var(--text-primary)'}}>Execute:</strong> Emits control signals to route data through the ALU or perform I/O operations.</div>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Unit1;
