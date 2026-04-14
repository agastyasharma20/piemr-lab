import { motion } from 'framer-motion';
import { Terminal, Cpu, HardDrive, Layers, Workflow, CheckCircle2, List, Activity, ShieldCheck, Box } from 'lucide-react';

const SectionTitle = ({ icon: Icon, title }: any) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', marginTop: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
     <Icon size={24} color="var(--accent-primary)" />
     <h2 style={{ fontSize: '1.5rem', color: 'white', margin: 0 }}>{title}</h2>
  </div>
);

const Step = ({ num, title, desc }: any) => (
  <motion.div whileHover={{ x: 5 }} style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1rem' }}>
    <div style={{ background: 'var(--accent-primary)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'black', flexShrink: 0, fontSize: '0.9rem' }}>
      {num}
    </div>
    <div>
      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--info)', fontSize: '1.1rem' }}>{title}</h4>
      <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5, fontSize: '0.95rem' }}>{desc}</p>
    </div>
  </motion.div>
);

const GanttBar = ({ pid, width, color, time }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: width }}>
    <div style={{ width: '100%', height: '40px', background: color, border: '1px solid rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 'bold', fontSize: '0.9rem' }}>
      {pid}
    </div>
    <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '4px' }}>{time}</div>
  </div>
);

export const renderOSExperimentTheory = (expId: string) => {

  // EXP 1-3: UNIX BASICS
  if (expId === 'exp-1' || expId === 'exp-2' || expId === 'exp-3') {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">System Architecture</span>
            <span className="badge badge-blue">Kernel Layer</span>
         </div>
         
         <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
            <div>
               <SectionTitle icon={Layers} title="Unix/Linux Stack" />
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid #ef4444', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>User Tools (Shell, Compilers, Browsers)</div>
                  <div style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid #2563eb', padding: '1.2rem', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>SYSTEM CALL INTERFACE</div>
                  <div style={{ background: 'rgba(57,255,20,0.15)', border: '1px solid #39ff14', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>KERNEL (Process & Memory Management)</div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed #4b5563', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>HARDWARE (CPU, RAM, DISK)</div>
               </div>
            </div>
            <div>
               <SectionTitle icon={Terminal} title="Key Utilities" />
               <Step num="1" title="File System" desc="ls, cd, pwd, mkdir - The fundamental commands for tree navigation." />
               <Step num="2" title="Permissions" desc="chmod, chown - Managing the triple-bit security model (r-w-x)." />
               <Step num="3" title="I/O Streams" desc="stdin (0), stdout (1), stderr (2) - Piping and redirection concepts." />
            </div>
         </div>
      </div>
    );
  }

  // EXP 4-7: DISK SCHEDULING
  if (expId.startsWith('exp-4') || expId.startsWith('exp-5') || expId.startsWith('exp-6') || expId.startsWith('exp-7')) {
    const isSSTF = expId === 'exp-5';
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">Mechanical Storage</span>
            <span className="badge badge-blue">Seek Time Optimization</span>
         </div>

         <SectionTitle icon={HardDrive} title="Head Movement Infographic" />
         <div style={{ background: '#0a0f1c', padding: '3rem 2rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ position: 'relative', height: '100px', borderBottom: '2px solid #4b5563' }}>
               {/* Track Indicators */}
               <div style={{ position: 'absolute', left: '0', bottom: '-25px', color: '#6b7280', fontSize: '0.8rem' }}>0</div>
               <div style={{ position: 'absolute', right: '0', bottom: '-25px', color: '#6b7280', fontSize: '0.8rem' }}>199</div>
               
               {/* Head Path Visualization */}
               <svg style={{ position: 'absolute', width: '100%', height: '100px', top: 0, left: 0 }}>
                  <path d="M 50 10 L 120 30 L 80 50 L 160 70 L 10 90" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="5" />
                  <circle cx="50" cy="10" r="4" fill="var(--accent-tertiary)" />
                  <circle cx="120" cy="30" r="3" fill="var(--info)" />
                  <circle cx="80" cy="50" r="3" fill="var(--info)" />
               </svg>
            </div>
            <p style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
               {isSSTF ? "SSTF logic: Always seeking the closest numerical track to minimize mechanical latency." : "Visualizing the traversal path of the actuator arm across the cylinder."}
            </p>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem' }}>
            <div style={{ background: 'rgba(212,160,23,0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--warning)' }}>
               <h3 style={{ color: 'white', marginBottom: '1rem' }}>Efficiency Metrics</h3>
               <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                  <li><strong>Latent Seek Time:</strong> Duration required for head positioning.</li>
                  <li><strong>Rotational Delay:</strong> Wait for sector alignment.</li>
                  <li><strong>Transfer Rate:</strong> Bits per second read speed.</li>
               </ul>
            </div>
            <div>
               <SectionTitle icon={Activity} title="Simulation Objective" />
               <Step num="1" title="Input Queue" desc="Define a set of track requests (e.g., 82, 170, 43, 140)." />
               <Step num="2" title="Calculate Step" desc="Verify the absolute distance for each jump: |Current - Target|." />
               <Step num="3" title="Benchmark" desc="Compare Total Head Movement against the theoretical minimum." />
            </div>
         </div>
      </div>
    );
  }

  // EXP 8-11: CPU SCHEDULING
  if (expId.startsWith('exp-8') || expId.startsWith('exp-9') || expId.startsWith('exp-10') || expId.startsWith('exp-11')) {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">Process Management</span>
            <span className="badge badge-blue">Time Quantum / Priority</span>
         </div>

         <SectionTitle icon={Cpu} title="Gantt Chart Visualization" />
         <div style={{ display: 'flex', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '3rem' }}>
            <GanttBar pid="P1" width={3} color="rgba(37,99,235,0.6)" time="0" />
            <GanttBar pid="P2" width={2} color="rgba(57,255,20,0.6)" time="3" />
            <GanttBar pid="P3" width={4} color="rgba(212,160,23,0.6)" time="5" />
            <GanttBar pid="P4" width={1} color="rgba(239,68,68,0.6)" time="9" />
            <div style={{ flex: 0.1, textAlign: 'right', color: '#9ca3af', fontSize: '0.75rem', marginTop: '45px' }}>10</div>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
               <SectionTitle icon={Workflow} title="Core Calculations" />
               <div style={{ background: '#111827', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '10px' }}>
                     <span style={{ color: '#9ca3af' }}>Turnaround Time (TAT)</span>
                     <span style={{ color: 'white', fontWeight: 'bold' }}>CT - AT</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '10px' }}>
                     <span style={{ color: '#9ca3af' }}>Waiting Time (WT)</span>
                     <span style={{ color: 'white', fontWeight: 'bold' }}>TAT - BT</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ color: '#9ca3af' }}>Response Time</span>
                     <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>First - AT</span>
                  </div>
               </div>
            </div>
            <div>
               <SectionTitle icon={ShieldCheck} title="Execution Rules" />
               <Step num="1" title="Arrival Check" desc="Only processes currently in the 'Ready Queue' are eligible for selection." />
               <Step num="2" title="Preemption" desc="In RR/SJF, check if a higher priority process interrupts the current one." />
               <Step num="3" title="Context Switch" desc="Account for the overhead when the kernel swaps CPU state between processes." />
            </div>
         </div>
      </div>
    );
  }

  // EXP 12-14: PAGE REPLACEMENT
  if (expId.startsWith('exp-12') || expId.startsWith('exp-13') || expId.startsWith('exp-14')) {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">Memory Management</span>
            <span className="badge badge-blue">Page Replacement Logic</span>
         </div>

         <SectionTitle icon={Layers} title="Paging Frame Simulation" />
         <div style={{ background: '#111827', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '8px', marginBottom: '1.5rem' }}>
               {[7, 0, 1, 2, 0, 3, 0, 4, 2, 3].map((v, i) => (
                 <div key={i} style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', textAlign: 'center', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af' }}>{v}</div>
               ))}
            </div>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ width: '60px', height: '60px', border: '2px solid #ef4444', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: 'bold' }}>PAGE</div>
                  <div style={{ width: '60px', height: '60px', border: '2px solid #ef4444', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: 'bold' }}>FAULT</div>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.3 }}>
                 <div style={{ width: '60px', height: '60px', border: '2px solid #39ff14', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#39ff14', fontWeight: 'bold' }}>PAGE</div>
                 <div style={{ width: '60px', height: '60px', border: '2px solid #39ff14', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#39ff14', fontWeight: 'bold' }}>HIT</div>
               </div>
            </div>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
            <div>
               <SectionTitle icon={List} title="Algorithm Objective" />
               <Step num="1" title="Reference String" desc="Process the stream of page requests one by one." />
               <Step num="2" title="Frame Check" desc="Verify if the requested page exists in main memory frames." />
               <Step num="3" title="Replacement" desc="If a fault occurs and frames are full, apply the selected policy (FIFO, LRU, or Optimal)." />
            </div>
            <div style={{ background: 'rgba(37,99,235,0.05)', padding: '2rem', borderRadius: '16px', border: '1px dashed var(--accent-primary)' }}>
               <h4 style={{ color: 'white', marginBottom: '1rem' }}>Replacement Policies</h4>
               <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Choosing which victim page to swap out of the hardware frames.</p>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ color: 'var(--accent-tertiary)' }}>• FIFO: First-In, First-Out queueing.</span>
                  <span style={{ color: 'var(--accent-primary)' }}>• LRU: Least Recently Used (History-based).</span>
                  <span style={{ color: 'var(--success)' }}>• Optimal: Future-predictive (Theoretical).</span>
               </div>
            </div>
         </div>
      </div>
    );
  }

  // EXP 15-18: IPC & BANKERS
  if (expId.startsWith('exp-15') || expId.startsWith('exp-16') || expId.startsWith('exp-17') || expId.startsWith('exp-18')) {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">Concurrency</span>
            <span className="badge badge-blue">Process Synchronization</span>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
               <SectionTitle icon={Workflow} title="Buffer Logic (Sync)" />
               <div style={{ background: '#0a0f1c', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                  <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>PRODUCER (In)</div>
                  <div style={{ border: '2px solid #4b5563', height: '40px', display: 'flex', margin: '0 2rem' }}>
                     <div style={{ flex: 1, background: 'var(--accent-primary)', opacity: 0.5, borderRight: '1px solid #4b5563' }} />
                     <div style={{ flex: 1, background: 'var(--accent-primary)', opacity: 0.5, borderRight: '1px solid #4b5563' }} />
                     <div style={{ flex: 2 }} />
                  </div>
                  <div style={{ color: 'var(--accent-tertiary)', marginTop: '1rem' }}>CONSUMER (Out)</div>
               </div>
               <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '1.5rem', lineHeight: 1.6 }}>
                  Synchronization ensures that the Producer does not over-fill the buffer and the Consumer does not attempt to read from an empty buffer.
               </p>
            </div>
            <div>
               <SectionTitle icon={CheckCircle2} title="Key Conditionals" />
               <Step num="1" title="Mutual Exclusion" desc="Only one process enters the critical section at a time using Mutex." />
               <Step num="2" title="Deadlock Avoidance" desc="Using Banker's Algorithm to check for 'Safe States' before resource grant." />
               <Step num="3" title="Signal/Wait" desc="Semaphores managing the discrete resource count (Full/Empty)." />
            </div>
         </div>
      </div>
    );
  }

  // DEFAULT
  return (
    <div className="glass-panel-md" style={{ padding: '2rem', textAlign: 'center' }}>
       <SectionTitle icon={Box} title="Lab Theory Engine" />
       <p style={{ color: 'var(--text-secondary)' }}>Click through the Simulation and Quiz tabs to complete the hands-on portion of this laboratory experiment.</p>
    </div>
  );
};
