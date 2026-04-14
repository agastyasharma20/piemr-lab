import { motion } from 'framer-motion';
import { Network, Server, AlignEndHorizontal, Zap, Target, ExternalLink, HelpCircle } from 'lucide-react';
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

const Unit5 = () => {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      {/* Dynamic Header */}
      <motion.header style={headerStyle} custom={0} variants={fadeUp}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-blue">Advanced OS</span>
          <span className="badge badge-gold">Parallelism</span>
        </div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>Multiprocessors & Pipelining</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0, maxWidth: '800px', lineHeight: 1.6 }}>
          Transcend single-core limits. Analyze the synchronization of interconnected nodes, the speedup mathematics of instruction pipelines, and advanced vector hardware driving Intel & AMD.
        </p>
      </motion.header>

      {/* Multiprocessor Architectures */}
      <motion.div custom={1} variants={fadeUp} className="glass-panel-md" style={{ padding: '2.5rem' }}>
        <h2 style={sectionTitleStyle}>
          <Network color="var(--info)" /> Multiprocessor Characteristics
        </h2>
        <p style={{ color: 'var(--text-primary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
          A Multiprocessor system contains two or more integrated CPUs executing instructions concurrently. The architecture must heavily mitigate bus contention risks and maintain absolute memory coherence across disparate logic hubs.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', borderLeft: '3px solid var(--info)' }}>
             <h4 style={{ color: 'var(--info)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Tightly Coupled (Shared Memory)</h4>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
               All processors share an identical global Main Memory bank and operating system. Data transfers between CPUs are immediate. However, this creates intense bus <strong>Arbitration</strong> conflicts when multiple nodes access memory simultaneously.
             </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', borderLeft: '3px solid var(--accent-tertiary)' }}>
             <h4 style={{ color: 'var(--accent-tertiary)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Loosely Coupled (Distributed Memory)</h4>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
               Each processor possesses its own local memory module. CPUs do not share a bus; they interact exclusively via network message passing (LAN/WAN). This scales horizontally with zero bus arbitration limits, ideal for Supercomputers.
             </p>
          </div>
        </div>
      </motion.div>

      {/* RISC vs CISC */}
      <motion.div custom={2} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
         <div className="glass-panel-md" style={{ padding: '2rem', borderTop: '4px solid var(--success)' }}>
            <h3 style={{ color: 'var(--success)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={20} /> RISC Architecture
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              <strong>Reduced Instruction Set Computer</strong> utilizes a highly optimized, uniform instruction set where almost every task takes exactly 1 clock cycle to execute. Programs are longer, but pipelining runs flawlessly.
            </p>
            <div style={{ padding: '1rem', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', color: '#6ee7b7', fontSize: '0.85rem' }}>
                Used By: Apple M-Series (ARM), Mobile Processors.
            </div>
         </div>
         <div className="glass-panel-md" style={{ padding: '2rem', borderTop: '4px solid var(--danger)' }}>
            <h3 style={{ color: 'var(--danger)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Server size={20} /> CISC Architecture
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              <strong>Complex Instruction Set Computer</strong> allows a single instruction to encompass multiple execution levels (loading, adding, mapping). Minimizes code size dramatically but makes pipelining geometrically harder.
            </p>
            <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', color: '#fca5a5', fontSize: '0.85rem' }}>
                Used By: Intel Hardware (x86), AMD Ryzen Ecosystem.
            </div>
         </div>
      </motion.div>

      {/* Pipelining & Vectorization */}
      <motion.div custom={3} variants={fadeUp} style={{
        background: 'rgba(0,0,0,0.2)',
        padding: '2.5rem',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-glow)',
      }}>
        <h2 style={{ ...sectionTitleStyle, color: 'var(--accent-primary)', borderColor: 'rgba(37,99,235,0.2)' }}>
          <AlignEndHorizontal color="#3b82f6" /> Pipelining & Vector Processing
        </h2>
        
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem', marginBottom: '2rem' }}>
           To prevent the ALU from idling while Main Memory fetches an instruction, CPUs implement a layered factory line internally, exponentially boosting throughput without increasing raw clock frequencies.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          <div style={{ padding: '1.5rem', background: '#0a0f1c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <h3 style={{ color: '#60a5fa', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Instruction Pipeline</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
              Divides instruction execution into phases (Fetch, Decode, Execute, Write-Back). While Instruction-1 is Executing, the system is concurrently Decoding Instruction-2 and Fetching Instruction-3.
              <br/><br/>
              <em style={{color:'var(--danger)'}}>Hazard Risks:</em> Data dependencies and sudden Branch operations cause massive pipeline stalls ("Bubbles").
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: '#0a0f1c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--warning)', marginBottom: '0.75rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
               <Target size={16}/> Vector & Array Processing
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
              Unlike internal pipelines processing a single sequential stream, Array Processors apply exactly one mathematical instruction uniformly across massive 1D/2D arrays of data simultaneously (SIMD).
              <br/><br/>
              This forms the foundational backbone of massive GPU architectures rendering geometry globally or training modern Neural Network tensors efficiently.
            </p>
          </div>
        </div>
      </motion.div>

      {/* References */}
      <motion.div custom={4} variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {COA_VIDEOS['multiprocessors'].refs?.map((ref, i) => (
          <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 1.2rem', background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.18)', borderRadius: '12px', color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>
            <ExternalLink size={14} />{ref.label}
          </a>
        ))}
      </motion.div>

      {/* Interview Questions */}
      <motion.div custom={5} variants={fadeUp} className="glass-panel-md" style={{ padding: '2.5rem', borderTop: '4px solid var(--warning)' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <HelpCircle color="var(--warning)" size={22} /> Interview Questions
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Pipelining & multiprocessor questions from GATE & big-tech interviews.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {COA_VIDEOS['multiprocessors'].interviewQs?.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.2rem', background: 'rgba(245,158,11,0.05)', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.12)' }}>
              <span style={{ color: 'var(--warning)', fontWeight: 700, flexShrink: 0 }}>Q{i + 1}</span>
              <span style={{ color: '#e2e8f0', lineHeight: 1.6, fontSize: '0.92rem' }}>{q}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <YouTubePiP
        videoId={COA_VIDEOS['multiprocessors'].videoId}
        videoTitle={COA_VIDEOS['multiprocessors'].videoTitle}
        color="var(--success)"
      />

    </motion.div>
  );
};

export default Unit5;
