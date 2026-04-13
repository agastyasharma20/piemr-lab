import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" } as any
  })
};

type Scenario = {
  id: number;
  title: string;
  description: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Mission Critical: Pacemaker",
    description: "You are designing the software for a localized heart pacemaker. The system must process heart rhythm signals and deliver a shock within strictly 10 milliseconds if an arrhythmia is detected. A missed deadline could be fatal.",
    options: ["Linux (Monolithic)", "Windows NT (Hybrid)", "VxWorks (RTOS)", "macOS"],
    correctAnswer: "VxWorks (RTOS)",
    explanation: "A Real-Time Operating System (RTOS) like VxWorks is required. RTOS guarantees deterministic execution times — meaning it promises the shock will be delivered in exactly 10ms without being interrupted by other non-critical processes."
  },
  {
    id: 2,
    title: "High-Performance Data Center",
    description: "Your company is deploying a fleet of web servers to handle millions of requests per second. The primary goal is raw throughput and bare-metal performance. UI and consumer applications are not needed.",
    options: ["Linux (Monolithic)", "Microkernel", "RTOS", "macOS"],
    correctAnswer: "Linux (Monolithic)",
    explanation: "Monolithic kernels like Linux dominate servers because all core services (Drivers, File System, Network Stack) run in kernel space. This avoids the overhead of context switching between user/kernel space, providing maximum raw performance."
  },
  {
    id: 3,
    title: "Ultra-Secure IoT Smart Lock",
    description: "You are building a smart door lock. The code controlling the motor and the code handling the network (WiFi) must be strictly isolated. If hackers compromise the WiFi driver, they must not be able to crash the whole OS or open the door.",
    options: ["Monolithic Kernel", "Microkernel", "Windows", "Batch OS"],
    correctAnswer: "Microkernel",
    explanation: "In a Microkernel architecture, drivers like the WiFi network stack run in user space instead of kernel space. If the network driver crashes or gets hacked, it doesn't bring down the core OS or the motor controller."
  }
];

const StrategyPlan = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleOptionSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setCurrentScenario(0);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '4rem' }}
      initial="hidden"
      animate="visible"
    >
      <motion.header custom={0} variants={fadeUp} style={{
        padding: '2rem 2.5rem',
        background: 'linear-gradient(135deg, rgba(212,160,23,0.15) 0%, rgba(26,92,190,0.1) 100%)',
        borderRadius: 'var(--border-radius-xl)',
        border: '1px solid var(--border-gold)',
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-gold">Interactive Exercise</span>
        </div>
        <h1 className="text-gradient">OS Strategy Plan</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.5rem 0 0', maxWidth: '750px' }}>
          Put your architectural knowledge to the test. Read the scenario and select the most appropriate Operating System architecture to fulfill the requirements.
        </p>
      </motion.header>

      <motion.div custom={1} variants={fadeUp} className="glass-panel-md" style={{ padding: '2.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -15, left: 30, background: 'var(--accent-tertiary)', color: 'white', padding: '4px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px' }}>
          SCENARIO {currentScenario + 1} OF {scenarios.length}
        </div>
        
        <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1rem', marginTop: '0.5rem' }}>
          {scenario.title}
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
          {scenario.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {scenario.options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === scenario.correctAnswer;
            let bgColor = 'rgba(255,255,255,0.05)';
            let borderColor = 'var(--border-light)';

            if (showResult) {
              if (isCorrect) {
                bgColor = 'rgba(16,185,129,0.2)';
                borderColor = 'var(--success)';
              } else if (isSelected && !isCorrect) {
                bgColor = 'rgba(239,68,68,0.2)';
                borderColor = 'var(--danger)';
              }
            } else if (isSelected) {
              bgColor = 'rgba(37,99,235,0.2)';
              borderColor = '#3b82f6';
            }

            return (
              <motion.button
                key={opt}
                whileHover={!showResult ? { scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                onClick={() => handleOptionSelect(opt)}
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  background: bgColor,
                  border: `2px solid ${borderColor}`,
                  color: 'var(--text-primary)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  cursor: showResult ? 'default' : 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ marginTop: '2rem', overflow: 'hidden' }}
            >
              <div style={{
                padding: '1.5rem',
                borderRadius: '12px',
                background: selectedOption === scenario.correctAnswer ? 'linear-gradient(135deg, rgba(16,185,129,0.1), transparent)' : 'linear-gradient(135deg, rgba(239,68,68,0.1), transparent)',
                borderLeft: `4px solid ${selectedOption === scenario.correctAnswer ? 'var(--success)' : 'var(--danger)'}`,
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: selectedOption === scenario.correctAnswer ? 'var(--success)' : 'var(--danger)' }}>
                  {selectedOption === scenario.correctAnswer ? '✅ Correct Decision!' : '❌ Suboptimal Choice.'}
                </h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {scenario.explanation}
                </p>

                <button
                  onClick={nextScenario}
                  className="btn btn-primary"
                  style={{ marginTop: '1.5rem', padding: '0.5rem 1.5rem' }}
                >
                  {currentScenario < scenarios.length - 1 ? 'Next Scenario ➔' : 'Restart Scenarios ↻'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default StrategyPlan;
