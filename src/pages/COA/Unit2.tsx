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

const Unit2 = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header style={headerStyle} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>

          <span className="badge badge-blue">ALU Core</span>
        </div>
        <h1 className="text-gradient">Computer Arithmetic</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.5rem 0 0', maxWidth: '650px' }}>
          Deep dive into the inner workings of the ALU. Learn how hardware performs addition, subtraction, multiplication, and floating-point logic.
        </p>
      </motion.header>

      {/* Numerical Representations */}
      <motion.div custom={1} variants={fadeUp}
        className="glass-panel-md"
        style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}
      >
        <h2 style={sectionTitleStyle}>
          <span style={{ width: 4, height: '1.2em', background: 'var(--accent-tertiary)', borderRadius: 4, display: 'inline-block' }} />
          Signed & 2's Complement Representation
        </h2>
        <p style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1.02rem', marginBottom: '1.5rem' }}>
          To perform subtraction efficiently, modern computers use <strong>2's Complement Representation</strong>. 
          This allows the ALU to perform subtraction simply by adding the negative equivalent of a number!
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '8px', borderLeft: '3px solid var(--info)' }}>
             <h4 style={{ color: 'var(--info)', marginBottom: '0.5rem' }}>1. Find 1's Complement</h4>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
               Invert all the bits. Change every 0 to a 1, and every 1 to a 0.
               <br /><br />
               <code style={{ background: '#000', padding: '2px 6px', borderRadius: 4 }}>0101 (5) → 1010</code>
             </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '8px', borderLeft: '3px solid var(--accent-tertiary)' }}>
             <h4 style={{ color: 'var(--accent-tertiary)', marginBottom: '0.5rem' }}>2. Find 2's Complement</h4>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
               Add 1 to the 1's complement. This represents the negative number.
               <br /><br />
               <code style={{ background: '#000', padding: '2px 6px', borderRadius: 4 }}>1010 + 1 = 1011 (-5)</code>
             </p>
          </div>
        </div>
      </motion.div>

      {/* Advanced Algorithms */}
      <motion.div custom={2} variants={fadeUp} style={{
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <h2 style={{ ...sectionTitleStyle, color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>
          Hardware Algorithms
        </h2>
        
        <div style={{ padding: '1.5rem', background: 'rgba(15, 158, 110, 0.1)', border: '1px solid rgba(15, 158, 110, 0.3)', borderRadius: 'var(--border-radius-md)', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Booth's Algorithm (Multiplication)</h3>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Booth's algorithm allows the ALU to multiply signed binary numbers in 2's complement notation efficiently. 
            Unlike basic sequential addition, Booth's algorithm shifts and adds based on the bit-pair transitions (01, 10, 00, 11) of the multiplier.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'rgba(212, 160, 23, 0.1)', border: '1px solid rgba(212, 160, 23, 0.3)', borderRadius: 'var(--border-radius-md)' }}>
          <h3 style={{ color: 'var(--warning)', marginBottom: '0.5rem' }}>Restoring Division Operation</h3>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            A hardware division algorithm where the divisor is subtracted from the partial remainder. If the result is negative, the original value is "restored" and a 0 is added to the quotient. If positive, a 1 is added to the quotient.
          </p>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Unit2;
