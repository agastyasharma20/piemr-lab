import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Activity, ChevronRight, Binary } from 'lucide-react';
import styles from '../Experiments/Experiments.module.css';

const coaPracticals = [
  { id: 'logic-mux', type: 'logic', title: "Study of Multiplexer and Demultiplexer", aim: "Analyze the truth table and simulate a physical Mux/Demux using interactive generic Logic Gates." },
  { id: 'logic-half-adder', type: 'logic', title: "Study of Half Adder and Subtractor", aim: "Construct basic addition and subtraction logic circuits using XOR, AND, and NOT configurations." },
  { id: 'logic-full-adder', type: 'logic', title: "Study of Full Adder and Subtractor", aim: "Simulate a complete ALU circuit module including Carry-In and Carry-Out transmission bits." },
  { id: 'asm-add-8bit', type: 'asm', title: "WAP to add two 8 bit numbers and store the result at memory location 2000", aim: "Learn basic 8085 Accumulator addition and memory loading instructions (LDA, ADD, STA)." },
  { id: 'asm-mul-8bit', type: 'asm', title: "WAP to multiply two 8 bit numbers stored at memory location 2000 and 2001", aim: "Implement software multiplication using repetitive addition or shifting loops in assembly." },
  { id: 'asm-add-16bit', type: 'asm', title: "WAP to add two 16-bit numbers. Store the result starting from 2000", aim: "Handle 16-bit payload arithmetic using register pairs (HL) and DAD commands." },
  { id: 'asm-test-bit', type: 'asm', title: "WAP which tests if any bit is '0' in a data byte specified at 2000", aim: "Master bit-wise logic, masking (ANI), and conditional jumping (CPI, JZ, JNZ) in 8085." },
  { id: 'asm-load-regs', type: 'asm', title: "Load Registers C, D, E, A with consecutive memory starting at 2000", aim: "Comprehend sequential memory pointer incrementing (INX H) and MOV operations." },
  { id: 'asm-inc-array', type: 'asm', title: "Increment all sixteen bytes of data starting at 2000 by 01", aim: "Develop looping architectures using counter registers (MVI C, 10H) and DCR evaluation." },
  { id: 'asm-sum-array', type: 'asm', title: "WAP to add 10 bytes starting from 3000. Store the result at 300A", aim: "Aggregate an array sequence while precisely maintaining Carry logs and conditional looping." }
];

const COAExperiments = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className={styles.header}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge badge-gold">Interactive Platform</span>
          <span className="badge badge-blue">List of Practicals</span>
        </div>
        <h1 className="text-gradient">Logic & Assembly Labs</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.5rem 0 0', maxWidth: '650px' }}>
          Explore digital logic circuits visually and write dynamic 8085 assembly code using our powerful academic simulators. Select an experiment below to launch its workbench.
        </p>
      </header>

      <div className={styles.grid}>
        {coaPracticals.map((exp, index) => {
          const isLogic = exp.type === 'logic';
          const Icon = isLogic ? Activity : Binary;
          const colorTheme = isLogic ? 'var(--info)' : 'var(--accent-tertiary)';
          
          return (
            <motion.div
              key={exp.id}
              className={`glass-panel-md ${styles.card}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/coa/experiments/${exp.id}`)}
              whileHover={{ y: -5, borderColor: colorTheme, boxShadow: `0 10px 25px -10px ${colorTheme}40` }}
              style={{ borderTop: `3px solid ${colorTheme}`, cursor: 'pointer' }}
            >
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className={styles.iconBox} style={{ backgroundColor: `${colorTheme}15`, color: colorTheme, border: `1px solid ${colorTheme}30` }}>
                    <Icon size={20} />
                  </div>
                  <span className={styles.expNum}>Experiment {index + 1}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '50%' }}>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </div>
              </div>
              
              <h3 className={styles.cardTitle}>{exp.title}</h3>
              <p className={styles.cardAim}>{exp.aim}</p>
              
              <div className={styles.cardFooter}>
                <span className="badge" style={{ background: `${colorTheme}15`, color: colorTheme, border: `1px solid ${colorTheme}30` }}>
                  {isLogic ? 'Digital Logic Workbench' : '8085 CPU Emulator'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                   <Zap size={10} color={colorTheme} /> Web Engine
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default COAExperiments;
