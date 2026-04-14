import { motion } from 'framer-motion';
import { Calculator, Cpu, Sigma, Hash } from 'lucide-react';

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

const Unit2 = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      {/* Dynamic Header */}
      <motion.header style={headerStyle} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-blue">ALU Core</span>
          <span className="badge badge-gold">Mathematics</span>
        </div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>Computer Arithmetic</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0, maxWidth: '800px', lineHeight: 1.6 }}>
          Deep dive into the Arithmetic Logic Unit (ALU). Learn how logic gates dynamically perform addition, subtraction, binary multiplication, and floating-point computations at the hardware level.
        </p>
      </motion.header>

      {/* Numeric Representation */}
      <motion.div custom={1} variants={fadeUp} className="glass-panel-md" style={{ padding: '2.5rem' }}>
        <h2 style={sectionTitleStyle}>
          <Hash color="var(--accent-tertiary)" /> Signed & 2's Complement Representation
        </h2>
        <p style={{ color: 'var(--text-primary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
          ALUs do not possess absolute "subtraction circuitry" because it requires duplicate hardware. Instead, all modern computers use <strong>2's Complement Hardware</strong> to transmute subtraction into an addition problem: <code style={{color: 'var(--success)', background: 'transparent'}}>A - B = A + (-B)</code>.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', borderLeft: '3px solid var(--info)' }}>
             <h4 style={{ color: 'var(--info)', marginBottom: '0.75rem', fontSize: '1.05rem' }}>1. Find 1's Complement</h4>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
               Pass the binary signal through a set of <strong style={{color:'white'}}>NOT Gates</strong>. Change every strictly 0 to a 1, and every 1 to a 0.
             </p>
             <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '1rem', marginTop: '1rem', color: '#60a5fa' }}>
               0101 (5) → 1010
             </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', borderLeft: '3px solid var(--accent-tertiary)' }}>
             <h4 style={{ color: 'var(--accent-tertiary)', marginBottom: '0.75rem', fontSize: '1.05rem' }}>2. Find 2's Complement</h4>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
               Pass the result into an <strong style={{color:'white'}}>Adder</strong> and physically add 1 bit. This produces the definitive negative binary integer.
             </p>
             <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontFamily: 'monospace', fontSize: '1rem', marginTop: '1rem', color: '#fcd34d' }}>
               1010 + 1 = 1011 (-5)
             </div>
          </div>
        </div>
      </motion.div>

      {/* Addition and Subtraction Logic Circuits */}
      <motion.div custom={2} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
         <div className="glass-panel-md" style={{ padding: '2rem', borderTop: '4px solid var(--success)' }}>
            <h3 style={{ color: 'var(--success)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sigma size={20} /> Addition (Adders)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Half-Adders process exclusively two binary digits yielding a Sum and a Carry. However, <strong>Full-Adders</strong> scale up by accepting a third "Carry-In" bit, allowing them to be chained indefinitely to process 8-bit, 16-bit, or 64-bit strings via a Ripple Carry Adder.
            </p>
            <div style={{ padding: '1rem', background: 'rgba(16,185,129,0.1)', borderRadius: '8px' }}>
                <code style={{ color: '#6ee7b7', fontSize: '0.9rem' }}>Sum = A ⊕ B ⊕ Cin<br/>Cout = (A·B) + (Cin·(A ⊕ B))</code>
            </div>
         </div>
         <div className="glass-panel-md" style={{ padding: '2rem', borderTop: '4px solid var(--danger)' }}>
            <h3 style={{ color: 'var(--danger)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calculator size={20} /> Subtraction Architectures
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Instead of using pure subtractor circuits (Borrow-In/Out), hardware toggles an <strong style={{color:'white'}}>XOR Gate</strong> on the B input. If the operation mode is "Subtract", the XOR forcefully inverts B (1's complement) and asserts an initial Carry-In of 1 (2's complement).
            </p>
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                <code style={{ color: '#fca5a5', fontSize: '0.9rem' }}>Add/Sub Control Signal (M):<br/>If M=0: Sum (A+B)<br/>If M=1: Subtract A + (~B) + 1</code>
            </div>
         </div>
      </motion.div>

      {/* Advanced Algorithms */}
      <motion.div custom={3} variants={fadeUp} style={{
        background: 'rgba(0,0,0,0.2)',
        padding: '2.5rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <h2 style={{ ...sectionTitleStyle, color: 'var(--accent-primary)', borderColor: 'rgba(37,99,235,0.2)' }}>
          <Cpu color="#3b82f6" /> Hardware Multiplication & Division Algorithms
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          <div style={{ padding: '1.5rem', background: '#0a0f1c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <h3 style={{ color: '#60a5fa', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Booth's Multiplication Algorithm</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
              A highly-optimized logic matrix that permits the multiplication of signed binary integers without preliminary negation. 
              Instead of executing pure binary Add-and-Shift continuously, it operates on transitional bit pairs <code style={{color:'white'}}>(01, 10, 00, 11)</code> in the multiplier.
              <br/><br/>If pair is <code style={{color:'#f87171'}}>10</code>: Subtract Multiplicand.<br/>
              If pair is <code style={{color:'#4ade80'}}>01</code>: Add Multiplicand.<br/>
              Then perform an Arithmetic Right Shift.
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: '#0a0f1c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--warning)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Restoring Division Algorithm</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
              A hardware array technique for calculating quotients. The Divisor is subtracted mechanically from an accumulating partial Remainder. 
              <br/><br/>
              If the Subtraction guarantees a negative bound drop, the Remainder is strictly "restored" to its previous state (Quotient bit = 0). 
              If positive drops occur, it isn't restored (Quotient bit = 1), ultimately delivering exact division scaling.
            </p>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Unit2;
