import { motion } from 'framer-motion';
import { Cpu, TerminalSquare, RefreshCw, Layers, Binary, Workflow, CheckCircle2 } from 'lucide-react';

export const renderExperimentTheory = (expId: string) => {

  const SectionTitle = ({ icon: Icon, title }: any) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', marginTop: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
       <Icon size={24} color="var(--accent-primary)" />
       <h2 style={{ fontSize: '1.5rem', color: 'white', margin: 0 }}>{title}</h2>
    </div>
  );

  const Step = ({ num, title, desc }: any) => (
    <motion.div whileHover={{ x: 5 }} style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1rem' }}>
      <div style={{ background: 'var(--accent-primary)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'black', flexShrink: 0 }}>
        {num}
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--info)', fontSize: '1.2rem' }}>{title}</h4>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </motion.div>
  );

  const TruthTable = ({ headers, rows }: any) => (
    <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--border-glow)', background: '#0a0f1c' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', color: 'white', fontFamily: 'monospace' }}>
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--accent-tertiary)' }}>
            {headers.map((h: string, i: number) => <th key={i} style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any[], i: number) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {row.map((cell: any, j: number) => <td key={j} style={{ padding: '0.75rem', color: j >= headers.length-2 ? '#39ff14' : '#e5e7eb', fontWeight: j >= headers.length-2 ? 'bold' : 'normal' }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // LOGIC: MULTIPLEXER
  if (expId === 'logic-mux') {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">Combinational Logic</span>
            <span className="badge badge-blue">Data Selector</span>
         </div>
         
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2rem' }}>
           A <strong>Multiplexer (MUX)</strong> is a combinational logic circuit designed to switch one of several input lines through to a single common output line by the application of a control signal. It acts fundamentally as a digital switch.
         </p>

         <SectionTitle icon={Workflow} title="Core Infographic Architecture" />
         <div style={{ background: '#111827', padding: '2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', border: '1px dashed #374151', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
               <span style={{ color: '#9ca3af' }}>D0 (Input 0)</span>
               <span style={{ color: '#9ca3af' }}>D1 (Input 1)</span>
            </div>
            <div style={{ padding: '2rem 1.5rem', background: 'rgba(8,145,178,0.2)', border: '2px solid rgba(8,145,178,0.8)', clipPath: 'polygon(0 0, 100% 20%, 100% 80%, 0 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <span style={{ color: '#22d3ee', fontWeight: 'bold' }}>2:1 MUX</span>
               <span style={{ color: '#ec4899', fontSize: '0.8rem', marginTop: '1rem' }}>SEL</span>
            </div>
            <div style={{ color: '#39ff14', fontWeight: 'bold' }}>Y (Output)</div>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
           <div>
             <SectionTitle icon={Binary} title="Truth Table (2:1 MUX)" />
             <TruthTable 
                headers={['SEL', 'D1', 'D0', 'Y']}
                rows={[[0, 'X', 0, 0], [0, 'X', 1, 1], [1, 0, 'X', 0], [1, 1, 'X', 1]]}
             />
             <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ec4899' }}>
               <h5 style={{ margin: '0 0 0.5rem 0', color: '#fbcfe8' }}>Boolean Expression</h5>
               <code style={{ color: '#f9a8d4', fontSize: '1.1rem' }}>Y = (S' • D0) + (S • D1)</code>
             </div>
           </div>

           <div>
             <SectionTitle icon={Layers} title="Experiment Workflow" />
             <Step num="1" title="Boot the Simulator" desc="Switch to the Simulation Tab to open the open-canvas CircuitVerse engine." />
             <Step num="2" title="Wire the Inputs" desc="Drag two generic toggles for D0/D1 and one for the SEL switch." />
             <Step num="3" title="Test Combinations" desc="Toggle SEL to 0 and verify that modifying D0 directly mutates Y, while D1 is totally ignored." />
           </div>
         </div>
      </div>
    );
  }

  // ASSEMBLY: 8-BIT ADDITION
  if (expId === 'asm-add-8bit') {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">8085 Microprocessor</span>
            <span className="badge badge-blue">Arithmetic Instructions</span>
         </div>
         
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2rem' }}>
           The Intel 8085 features an 8-bit ALU and an Accumulator (Register A). Addition is fundamentally executed directly inside the Accumulator, combining existing A data with incoming Memory or Register data.
         </p>

         <SectionTitle icon={Cpu} title="Instruction Execution Pipeline Timeline" />
         
         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '3rem' }}>
            {['LXI H, 2000H ➜ Initialization (Load 2000H pointer into H-L pair)', 
              'MOV A, M ➜ Data Fetch (Transfer contents of memory [2000H] to Accumulator)', 
              'INX H ➜ Pointer Shift (Increment H-L to point to 2001H)', 
              'ADD M ➜ ALU Execution (Add contents of [2001H] to Accumulator)', 
              'STA 2002H ➜ Memory Write (Store Accumulator result physically into 2002H)'
            ].map((step, idx) => (
              <motion.div key={idx} initial={{x: -10}} animate={{x: 0}} style={{ padding: '1rem', background: '#111827', borderRadius: '8px', borderLeft: '4px solid var(--info)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                 <CheckCircle2 color="var(--success)" size={20} />
                 <span style={{ color: '#e5e7eb', fontFamily: 'monospace' }}>{step}</span>
              </motion.div>
            ))}
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '3rem' }}>
           <div>
             <SectionTitle icon={TerminalSquare} title="Memory Allocation Table" />
             <div style={{ background: 'rgba(15,158,110,0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--success)' }}>
               <h4 style={{ color: 'var(--success)', marginTop: 0 }}>Input State:</h4>
               <p style={{ color: 'white', margin: '0.5rem 0' }}>Address <code>2000H</code> = <code>04H</code> (First Operand)</p>
               <p style={{ color: 'white', margin: '0 0' }}>Address <code>2001H</code> = <code>03H</code> (Second Operand)</p>
               <br/>
               <h4 style={{ color: 'var(--success)', marginTop: 0 }}>Output State:</h4>
               <p style={{ color: '#39ff14', margin: '0', fontWeight: 'bold' }}>Address <code>2002H</code> = <code>07H</code> (Result)</p>
             </div>
           </div>

           <div>
             <SectionTitle icon={RefreshCw} title="Testing Methodology" />
             <Step num="1" title="Initialize Memory" desc="Ensure the target addresses 2000H and 2001H are pre-loaded with valid 8-bit hex codes." />
             <Step num="2" title="Compile & Step" desc="Click the Execute button. The internal instruction decoder will step through the pipeline." />
             <Step num="3" title="Verify Registers" desc="Observe the Hardware Matrix array changing. Watch the 'A' register update live." />
           </div>
         </div>
      </div>
    );
  }

  // LOGIC: HALF ADDER
  if (expId === 'logic-half-adder') {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">Combinational Logic</span>
            <span className="badge badge-blue">Binary Arithmetic</span>
         </div>
         
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2rem' }}>
           A <strong>Half Adder</strong> is a combinational circuit that performs the addition of two binary digits (A and B). It produces two outputs: <strong>Sum (S)</strong> and <strong>Carry (C)</strong>.
         </p>

         <SectionTitle icon={Workflow} title="Logical Diagram & Gate Interaction" />
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', padding: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>Input A</span>
                  <div style={{ width: '40px', height: '2px', background: 'var(--info)' }}></div>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>Input B</span>
                  <div style={{ width: '40px', height: '2px', background: 'var(--info)' }}></div>
               </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div style={{ padding: '1rem 2rem', background: 'rgba(57, 255, 20, 0.1)', border: '2px solid #39ff14', borderRadius: '12px', color: '#39ff14', fontWeight: 'bold', textAlign: 'center' }}>XOR GATE (SUM)</div>
               <div style={{ padding: '1rem 2rem', background: 'rgba(37, 99, 235, 0.1)', border: '2px solid #3b82f6', borderRadius: '12px', color: '#3b82f6', fontWeight: 'bold', textAlign: 'center' }}>AND GATE (CARRY)</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '2px', background: '#39ff14' }}></div>
                  <span style={{ color: '#39ff14', fontWeight: 'bold' }}>Sum (S)</span>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '2px', background: '#3b82f6' }}></div>
                  <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>Carry (C)</span>
               </div>
            </div>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
           <div>
             <SectionTitle icon={Binary} title="Half Adder Truth Table" />
             <TruthTable 
                headers={['A', 'B', 'Sum (S)', 'Carry (C)']}
                rows={[[0, 0, 0, 0], [0, 1, 1, 0], [1, 0, 1, 0], [1, 1, 0, 1]]}
             />
             <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(57, 255, 20, 0.05)', borderRadius: '8px', borderLeft: '4px solid #39ff14' }}>
                   <code style={{ color: '#39ff14' }}>Sum (S) = A ⊕ B</code>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                   <code style={{ color: '#3b82f6' }}>Carry (C) = A • B</code>
                </div>
             </div>
           </div>

           <div>
             <SectionTitle icon={Layers} title="Experiment Methodology" />
             <Step num="1" title="Initialize the Circuit" desc="Place an XOR gate and an AND gate on your logic canvas." />
             <Step num="2" title="Parallel Input Binding" desc="Connect Input A to both XOR input-1 and AND input-1. Repeat for Input B." />
             <Step num="3" title="Verify State 1+1" desc="Observe that when both inputs are High (1), the Sum drops to 0 while the Carry activates." />
           </div>
         </div>
      </div>
    );
  }

  // LOGIC: FULL ADDER
  if (expId === 'logic-full-adder') {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">Combinational Logic</span>
            <span className="badge badge-blue">3-Bit Adder</span>
         </div>
         
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2rem' }}>
           A <strong>Full Adder</strong> adds three binary bits: A, B, and a Carry-In (Cin) from a previous stage, producing Sum and Carry-Out.
         </p>

         <SectionTitle icon={Workflow} title="Internal Pipelining Representation" />
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
            {[
              "Input Stage: Capture A, B, and Carry-In (Cin)",
              "Intermediate Stage: Combine A ⊕ B to generate Preliminary Sum",
              "Execution Stage: Combine Preliminary Sum ⊕ Cin for Final Sum (S)",
              "Look-Ahead Stage: Resolve Carry-Out logic paths via ORing logic"
            ].map((text, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ padding: '1rem 1.5rem', background: '#111827', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ background: 'var(--accent-tertiary)', width: '8px', height: '8px', borderRadius: '50%' }}></div>
                 <span style={{ color: 'white' }}>{text}</span>
              </motion.div>
            ))}
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 1.2fr', gap: '3rem' }}>
           <div>
             <SectionTitle icon={Binary} title="Full Adder Logic Matrix" />
             <TruthTable 
                headers={['A', 'B', 'Cin', 'S', 'Cout']}
                rows={[[0,0,0,0,0], [0,0,1,1,0], [0,1,0,1,0], [0,1,1,0,1], [1,0,0,1,0], [1,0,1,0,1], [1,1,0,0,1], [1,1,1,1,1]]}
             />
           </div>

           <div>
             <SectionTitle icon={Layers} title="Theoretical Formulae" />
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(212, 160, 23, 0.05)', borderRadius: '12px', borderLeft: '4px solid var(--accent-tertiary)' }}>
                   <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-tertiary)' }}>Sum Output (S)</h5>
                   <code style={{ fontSize: '1.1rem', color: 'white' }}>(A ⊕ B) ⊕ Cin</code>
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(34, 211, 238, 0.05)', borderRadius: '12px', borderLeft: '4px solid var(--info)' }}>
                   <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--info)' }}>Carry-Out (Cout)</h5>
                   <code style={{ fontSize: '1.1rem', color: 'white' }}>(A • B) + (Cin • (A ⊕ B))</code>
                </div>
             </div>
             <div style={{ marginTop: '2rem' }}>
                <SectionTitle icon={Cpu} title="System Implementation" />
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Full adders are cascaded in series to form Ripple Carry Adders (RCA), enabling the processing of 8-bit, 16-bit, and 32-bit arithmetic inside modern CPUs.</p>
             </div>
           </div>
         </div>
      </div>
    );
  }

  // ASSEMBLY: 8-BIT MULTIPLICATION
  if (expId === 'asm-mul-8bit') {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">8085 Assembler</span>
            <span className="badge badge-blue">Repetitive Addition</span>
         </div>
         
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2rem' }}>
           Modern 8085 hardware lacks a native <code>MUL</code> instruction. Multiplication is achieved by adding the multiplicand to itself <strong>N</strong> times, where <strong>N</strong> is the multiplier.
         </p>

         <SectionTitle icon={Workflow} title="Multiplication Logic Flowchart" />
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem', background: '#0a0f1c', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid var(--info)', borderRadius: '8px' }}>LOAD Multiplier into Register C</div>
            <div style={{ color: 'var(--text-muted)' }}>➔</div>
            <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid var(--accent-tertiary)', borderRadius: '8px' }}>LOOP: ADD Multiplicand</div>
            <div style={{ color: 'var(--text-muted)' }}>➔</div>
            <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid var(--info)', borderRadius: '8px' }}>DECREMENT C</div>
            <div style={{ color: 'var(--text-muted)' }}>➔</div>
            <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444' }}>C = 0 ? EXIT : LOOP</div>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', gap: '3rem' }}>
           <div>
             <SectionTitle icon={Binary} title="Mnemonic Execution" />
             <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace' }}>
                <p style={{ color: 'var(--accent-tertiary)', margin: '4px 0' }}>MVI A, 00H ; Reset Sum</p>
                <p style={{ color: 'var(--info)', margin: '4px 0' }}>LDA 2000H ; Get Multiplicand</p>
                <p style={{ color: 'var(--accent-primary)', margin: '4px 0' }}>MOV B, A ; Store in B</p>
                <p style={{ color: 'var(--info)', margin: '4px 0' }}>LDA 2001H ; Get Multiplier</p>
                <p style={{ color: 'var(--accent-primary)', margin: '4px 0' }}>MOV C, A ; Store in C</p>
                <p style={{ color: 'var(--accent-tertiary)', margin: '14px 0 4px' }}>LOOP: ADD B ; Add multiplicand</p>
                <p style={{ color: 'var(--accent-tertiary)', margin: '4px 0' }}>DCR C ; Decr counter</p>
                <p style={{ color: 'var(--accent-tertiary)', margin: '4px 0' }}>JNZ LOOP ; Jump if not zero</p>
                <p style={{ color: 'var(--success)', margin: '14px 0 4px' }}>STA 2002H ; Save result</p>
             </div>
           </div>

           <div>
             <SectionTitle icon={Layers} title="Experiment Parameters" />
             <Step num="1" title="Memory Allocation" desc="Load 2000H with 05H and 2001H with 03H (Target Result: 0FH)." />
             <Step num="2" title="Zeroing the Accumulator" desc="Crucial: Start with 00H in A to prevent residue data from corrupting the sum." />
             <Step num="3" title="Condition Loop Tracking" desc="Monitor the 'Zero Flag' in the register bank. The loop breaks only when C reaches zero." />
           </div>
         </div>
      </div>
    );
  }

  // ASSEMBLY: BIT TESTING
  if (expId === 'asm-test-bit') {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">8085 Assembler</span>
            <span className="badge badge-blue">Bit-wise Logic</span>
         </div>
         
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2rem' }}>
           Testing bits involves the use of <strong>Logical Masks</strong>. To check if a specific bit is '0' or '1', we use the <code>ANI</code> (AND Immediate) instruction to isolate the target bit.
         </p>

         <SectionTitle icon={Binary} title="Bit-Masking Infographic" />
         <div style={{ background: '#111827', padding: '2rem', borderRadius: '16px', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
               <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Data Byte (2000H)</span>
               <div style={{ display: 'flex', gap: '4px' }}>
                 {[1,0,1,1,0,1,0,1].map((b, i) => <div key={i} style={{ width: 25, height: 25, border: '1px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 4 ? '#39ff14' : 'white', fontWeight: i === 4 ? 'bold' : 'normal' }}>{b}</div>)}
               </div>
            </div>
            <div style={{ alignSelf: 'center', color: 'var(--info)', fontSize: '1.5rem' }}>&</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
               <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Mask (08H for Bit 3)</span>
               <div style={{ display: 'flex', gap: '4px' }}>
                 {[0,0,0,0,1,0,0,0].map((b, i) => <div key={i} style={{ width: 25, height: 25, border: '1px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 4 ? '#39ff14' : 'white', fontWeight: i === 4 ? 'bold' : 'normal' }}>{b}</div>)}
               </div>
            </div>
            <div style={{ alignSelf: 'center', color: 'var(--success)', fontSize: '1.5rem' }}>=</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
               <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Resulting Flag</span>
               <div style={{ padding: '0.5rem 1rem', background: 'rgba(57, 255, 20, 0.1)', border: '1px solid #39ff14', borderRadius: '8px', color: '#39ff14' }}>ZERO / NON-ZERO</div>
            </div>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', gap: '3rem' }}>
           <div>
             <SectionTitle icon={Workflow} title="Logical Execution Flow" />
             <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace' }}>
                <p style={{ color: 'var(--info)' }}>LDA 2000H ; Fetch Byte</p>
                <p style={{ color: 'var(--accent-tertiary)' }}>ANI 08H ; Mask with 0000 1000</p>
                <p style={{ color: 'var(--warning)' }}>JZ IS_ZERO ; If byte & 08H == 0, jump</p>
                <p style={{ color: '#9ca3af' }}>; ... Handle bit is 1</p>
                <p style={{ color: '#ef4444' }}>HLT</p>
             </div>
           </div>

           <div>
             <SectionTitle icon={Layers} title="Experiment Core Steps" />
             <Step num="1" title="Data Insertion" desc="Set address 2000H to E7H (1110 0111) to test different bits." />
             <Step num="2" title="Flag Monitoring" desc="The 'Z' (Zero Flag) in your simulator is the primary indicator of bit state." />
             <Step num="3" title="Conditional Jump" desc="Verify that JZ triggers only when the resulting AND operation yields 0." />
           </div>
         </div>
      </div>
    );
  }

  // ASSEMBLY: LOAD REGISTERS
  if (expId === 'asm-load-regs') {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">8085 Assembler</span>
            <span className="badge badge-blue">Memory Mapping</span>
         </div>
         
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2rem' }}>
           Loading consecutive memory addresses into internal registers is a fundamental requirement for <strong>Block Data Transfer</strong> and complex data structure processing.
         </p>

         <SectionTitle icon={Cpu} title="Memory to Register Pipeline" />
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {['[2000H]', '[2001H]', '[2002H]', '[2003H]'].map((mem, i) => (
               <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--info)', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--info)' }}>{mem}</div>
                  <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }} style={{ color: 'var(--accent-tertiary)' }}>⬇</motion.div>
                  <div style={{ padding: '1rem', background: 'rgba(212, 160, 23, 0.1)', border: '1px solid var(--accent-tertiary)', borderRadius: '6px', fontWeight: 'bold' }}>Reg {['C', 'D', 'E', 'A'][i]}</div>
               </div>
            ))}
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
           <div>
             <SectionTitle icon={Layers} title="Mnemonic Sequence" />
             <div style={{ padding: '1.5rem', background: '#0a0f1c', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace' }}>
                <p style={{ color: 'var(--info)' }}>LXI H, 2000H ; HL points to Start</p>
                <p style={{ color: 'white' }}>MOV C, M ; Reg C &larr; [HL]</p>
                <p style={{ color: 'var(--accent-tertiary)' }}>INX H ; HL points to 2001H</p>
                <p style={{ color: 'white' }}>MOV D, M ; Reg D &larr; [HL]</p>
                <p style={{ color: 'var(--accent-tertiary)' }}>INX H ; HL points to 2002H</p>
                <p style={{ color: 'white' }}>MOV E, M ; Reg E &larr; [HL]</p>
             </div>
           </div>

           <div>
             <SectionTitle icon={RefreshCw} title="Testing Procedure" />
             <Step num="1" title="Pointer Management" desc="The HL register pair acts as your memory crawler throughout the experiment." />
             <Step num="2" title="Direct Verification" desc="Observe the Hardware Matrix in the simulator after each MOV execution." />
             <Step num="3" title="Endian Check" desc="Ensure you are loading data in the correct sequential order as per the syllabus." />
           </div>
         </div>
      </div>
    );
  }

  // ASSEMBLY: INCREMENT ARRAY
  if (expId === 'asm-inc-array') {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">8085 Assembler</span>
            <span className="badge badge-blue">Mass Data Processing</span>
         </div>
         
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2rem' }}>
           Incrementing an array demonstrates <strong>Loop Control</strong>. We utilize a counter register (Reg C) to manage the precisely 16 iterations required for the block.
         </p>

         <SectionTitle icon={Workflow} title="Iterative Transformation Logic" />
         <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '3rem' }}>
            {[1, 2, 3, '...', 16].map((n, i) => (
               <div key={i} style={{ minWidth: '80px', padding: '1rem', background: '#111827', border: '1px dashed #374151', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.5rem' }}>Iter {n}</div>
                  <div style={{ color: '#39ff14', fontSize: '1.1rem', fontWeight: 'bold' }}>M++</div>
               </div>
            ))}
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', gap: '3rem' }}>
           <div>
             <SectionTitle icon={Binary} title="Conditional Loop Branching" />
             <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace' }}>
                <p style={{ color: 'var(--info)' }}>MVI C, 10H ; Load counter (16 dec)</p>
                <p style={{ color: 'var(--info)' }}>LXI H, 2000H ; Source pointer</p>
                <p style={{ color: 'white', borderLeft: '3px solid var(--accent-tertiary)', paddingLeft: '0.5rem' }}>LOOP: INR M ; Incr memory contents</p>
                <p style={{ color: 'white', borderLeft: '3px solid var(--accent-tertiary)', paddingLeft: '0.5rem' }}>INX H ; Point to next byte</p>
                <p style={{ color: 'white', borderLeft: '3px solid var(--accent-tertiary)', paddingLeft: '0.5rem' }}>DCR C ; Decrement counter</p>
                <p style={{ color: 'var(--warning)', borderLeft: '3px solid var(--accent-tertiary)', paddingLeft: '0.5rem' }}>JNZ LOOP ; Final check</p>
             </div>
           </div>

           <div>
             <SectionTitle icon={RefreshCw} title="Experimental Checks" />
             <Step num="1" title="Data Pre-load" desc="In the emulator, manually populate memory from 2000H to 200FH with dummy data (e.g. 05H)." />
             <Step num="2" title="Zero Flag Audit" desc="The JNZ instruction works by checking the Z-flag. DCR C affects this flag." />
             <Step num="3" title="Boundary Testing" desc="Ensure the loop halts exactly after 16 iterations to avoid memory overflow." />
           </div>
         </div>
      </div>
    );
  }

  // ASSEMBLY: SUM ARRAY
  if (expId === 'asm-sum-array') {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">8085 Assembler</span>
            <span className="badge badge-blue">Aggregate Processing</span>
         </div>
         
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2rem' }}>
           Summing an array is the classic implementation of <strong>Accumulation Strategy</strong>. We must handle potential 16-bit sums using a generic carry counter if required, or simply 8-bit wrap-around as per basic lab standards.
         </p>

         <SectionTitle icon={Cpu} title="The Accumulator Lifecycle" />
         <div style={{ position: 'relative', background: '#0a0f1c', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-glow)', marginBottom: '3rem', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} style={{ padding: '1rem 2rem', background: 'rgba(34, 211, 238, 0.2)', border: '2px solid var(--info)', borderRadius: '12px', color: 'white', fontWeight: 'bold', fontSize: '1.3rem', zIndex: 1 }}>ACCUMULATOR (A)</motion.div>
            <div style={{ position: 'absolute', right: '10%', top: '30%', color: 'var(--accent-tertiary)', fontSize: '0.8rem' }}>Array Data Stream ➔</div>
            <div style={{ position: 'absolute', left: '10%', bottom: '30%', color: 'var(--success)', fontSize: '0.8rem' }}>➔ Running Total</div>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 1fr', gap: '3rem' }}>
           <div>
             <SectionTitle icon={Binary} title="Program Logic Architecture" />
             <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace' }}>
                <p style={{ color: 'var(--info)' }}>MVI C, 0AH ; 10 items to sum</p>
                <p style={{ color: 'var(--accent-tertiary)' }}>MVI A, 00H ; Initial sum = 0</p>
                <p style={{ color: 'var(--info)' }}>LXI H, 3000H ; Start of array</p>
                <p style={{ color: 'white', paddingLeft: '0.5rem' }}>L: ADD M ; Accumulate byte</p>
                <p style={{ color: 'white', paddingLeft: '0.5rem' }}>INX H ; Fetch next</p>
                <p style={{ color: 'white', paddingLeft: '0.5rem' }}>DCR C ; Decr counter</p>
                <p style={{ color: 'var(--warning)', paddingLeft: '0.5rem' }}>JNZ L ; Repeat until done</p>
                <p style={{ color: 'var(--success)' }}>STA 300AH ; Save final result</p>
             </div>
           </div>

           <div>
             <SectionTitle icon={Layers} title="Experiment Validation" />
             <Step num="1" title="Memory Prep" desc="Load addresses 3000H to 3009H with values like 01H, 02H... for easy mental sum verification." />
             <Step num="2" title="Carry Consideration" desc="Note: Simple ADD does not handle sums exceeding FFH. This experiment focuses on basic accumulation logic." />
             <Step num="3" title="Result Audit" desc="Final sum should appear at exactly 300AH. Verify after hitting 'Execute'." />
           </div>
         </div>
      </div>
    );
  }

  // ASSEMBLY: 16-BIT ADDITION
  if (expId === 'asm-add-16bit') {
    return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">8085 Assembler</span>
            <span className="badge badge-blue">Register Pairs</span>
         </div>
         
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2rem' }}>
           16-bit operations are conducted using Register Pairs (HL and DE) and the <code>DAD</code> (Double Add) instruction which adds the contents of a register pair to HL.
         </p>

         <SectionTitle icon={Workflow} title="16-Bit Processing Chain" />
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
            {[
              "Load first 16-bit number into HL register pair (LHLD 2000H)",
              "Load second 16-bit number into DE register pair (XCHG then LHLD ...)",
              "Execute DAD D ➜ adds DE contents to HL pair",
              "Transfer resulting 16-bit HL contents to memory (SHLD 2004H)"
            ].map((text, i) => (
              <motion.div key={i} whileHover={{ x: 10 }} style={{ padding: '1.2rem', background: 'rgba(57, 255, 20, 0.05)', borderRadius: '12px', border: '1px solid rgba(57, 255, 20, 0.2)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                 <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#39ff14' }}>0{i+1}</div>
                 <span style={{ color: 'white', fontWeight: 500 }}>{text}</span>
              </motion.div>
            ))}
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
           <div>
             <SectionTitle icon={Binary} title="Instruction Specifics" />
             <div style={{ background: '#0a0f1c', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-glow)' }}>
                <h5 style={{ color: 'var(--info)', margin: '0 0 1rem 0' }}>Instruction: DAD D</h5>
                <p style={{ color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>
                  This instruction adds the 16-bit data in register pair <strong>D (DE)</strong> to the data in register pair <strong>H (HL)</strong>. The result is stored in <strong>HL</strong>. 
                  <br/><br/>
                  Only the **Carry Flag** is affected by this instruction.
                </p>
             </div>
           </div>

           <div>
             <SectionTitle icon={Layers} title="Lab Step-by-Step" />
             <Step num="1" title="Initialize Pointers" desc="Assign 2000H-2001H for the first 16-bit value and 2002H-2003H for the second." />
             <Step num="2" title="Load Direct" desc="Use LHLD to pull the full 16-bit word straight into HL in one cycle." />
             <Step num="3" title="Verify Storage" desc="Check locations 2004H (Low Byte) and 2005H (High Byte) for the final aggregate sum." />
           </div>
         </div>
      </div>
    );
  }

  // FALLBACK GENERIC CONTENT FOR OTHERS
  return (
      <div className="glass-panel-md" style={{ padding: '2.5rem', fontFamily: "'Inter', sans-serif" }}>
         <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span className="badge badge-gold">Advanced Topology</span>
            <span className="badge badge-blue">Circuit/ALU Design</span>
         </div>
         
         <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.7, marginBottom: '2rem' }}>
           This experimental module requires the careful bridging of theoretical boolean postulates and physical semiconductor behavior. Proceed to the Interactive Workbench to physically manipulate the testbed.
         </p>

         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }}>
           <div>
             <SectionTitle icon={Binary} title="Universal Truth Matrix" />
             <TruthTable 
                headers={['Input A', 'Input B', 'Opcode Target', 'Result Output']}
                rows={[[0, 0, 'Eval', 0], [0, 1, 'Eval', 1], [1, 0, 'Eval', 1], [1, 1, 'Eval', 'CARRY']]}
             />
           </div>

           <div>
             <SectionTitle icon={Layers} title="Experiment Workflow" />
             <Step num="1" title="Hardware Boot" desc="Tap into the primary simulation tab. Await the virtual engine preloader sequence." />
             <Step num="2" title="Configure Registers" desc="Depending on the architecture mode (Assembly vs Logic), load your initial operand states." />
             <Step num="3" title="Execution & Logging" desc="Trigger the clock cycle evaluate event. Ensure you stamp your name for final export verification." />
           </div>
         </div>
      </div>
  );

};
