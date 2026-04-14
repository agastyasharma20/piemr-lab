import { motion } from 'framer-motion';

export const TopicVisualizer = ({ visualType, color }: { visualType: string, color: string }) => {
   
   switch(true) {
      // CLUSTER 1: Tree Structures & Branching Logic
      case ['recurrence_tree', 'avl_tree_visual', 'huffman_tree', 'binary_search_visual'].includes(visualType):
         return (
            <div style={{ textAlign: 'center' }}>
               <h3 style={{ color: 'white', marginBottom: '2rem' }}>Hierarchical Node Structuring Sandbox</h3>
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ padding: '1rem', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: color, borderRadius: '50%', color: 'black', fontWeight: 'bold', zIndex: 2 }}>Root</motion.div>
                  <div style={{ display: 'flex', gap: '8rem', position: 'relative' }}>
                     <svg style={{ position: 'absolute', top: -30, left: 0, width: '100%', height: '50px', zIndex: 1 }}>
                        <path d="M 120 0 L 30 50" stroke={color} strokeWidth="2" fill="none" />
                        <path d="M 120 0 L 210 50" stroke={color} strokeWidth="2" fill="none" />
                     </svg>
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} style={{ padding: '0.8rem', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', border: `2px solid ${color}`, borderRadius: '50%', color: 'white', zIndex: 2 }}>L1</motion.div>
                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} style={{ padding: '0.8rem', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', border: `2px solid ${color}`, borderRadius: '50%', color: 'white', zIndex: 2 }}>R1</motion.div>
                  </div>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                     {Array.from({ length: 4 }).map((_, i) => (
                        <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + (i*0.2) }} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', color: 'var(--text-muted)', fontSize: '0.8rem', border: '1px dashed rgba(255,255,255,0.2)' }}>Leaf</motion.div>
                     ))}
                  </div>
               </div>
               <p style={{ marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Analyzing depth and balance factors to guarantee O(log N) boundaries.</p>
            </div>
         );

      // CLUSTER 2: Arrays, Sorting, and Partitioning
      case ['quick_sort_visual', 'merge_sort_visual', 'bubble_sort_visual', 'search_array_visual'].includes(visualType):
         return (
            <div style={{ textAlign: 'center' }}>
               <h3 style={{ color: 'white', marginBottom: '2rem' }}>Linear Array Scanning & Partition Logic</h3>
               <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  {[12, 4, 8, 22, 19, 7, 3].map((num, i) => (
                     <motion.div 
                        key={i}
                        animate={{ 
                           y: num === 22 ? [-15, 0] : 0,
                           scale: num === 22 ? [1, 1.1, 1] : 1,
                           borderColor: num === 22 ? color : (num < 10 ? '#10b981' : 'rgba(255,255,255,0.1)')
                        }}
                        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
                        style={{ width: '50px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', border: '2px solid' }}
                     >
                        {num}
                     </motion.div>
                  ))}
               </div>
               <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <span><span style={{ color: '#10b981' }}>●</span> Sorted/Lower Zone</span>
                  <span><span style={{ color: color }}>●</span> Active Pointer / Pivot</span>
                  <span><span style={{ color: 'rgba(255,255,255,0.2)' }}>●</span> Unsorted Zone</span>
               </div>
            </div>
         );

      // CLUSTER 3: Graphs, Paths, Networks
      case ['graph_rep_visual', 'graph_traversal_visual', 'mst_visual', 'dijkstra_visual', 'dp_floyd_visual', 'dp_multistage_visual', 'hamiltonian_visual'].includes(visualType):
         return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
               <h3 style={{ color: 'white' }}>Weighted Graph & Network Extrapolation</h3>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '400px', height: '240px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: `1px solid ${color}40`, boxShadow: `0 0 50px ${color}10` }}>
                  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
                     <path d="M 200 40 L 90 120" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                     <path d="M 200 40 L 310 120" stroke={color} strokeWidth="3" strokeDasharray="5,5" />
                     <path d="M 90 120 L 200 200" stroke={color} strokeWidth="4" />
                     <path d="M 310 120 L 200 200" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                     <path d="M 90 120 L 310 120" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="8,8" />
                  </svg>
                  
                  {/* Vertices & Weights */}
                  <motion.div whileHover={{ scale: 1.1 }} className="glass-panel-sm" style={{ width: 45, height: 45, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 15, background: 'var(--accent-primary)', color: 'black', fontWeight: 'bold', zIndex: 1 }}>A</motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} className="glass-panel-sm" style={{ width: 45, height: 45, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 95, left: 65, background: 'rgba(0,0,0,0.8)', border: '2px solid white', zIndex: 1 }}>B</motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} className="glass-panel-sm" style={{ width: 45, height: 45, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 95, right: 65, background: 'rgba(0,0,0,0.8)', border: `2px solid ${color}`, zIndex: 1 }}>C</motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} className="glass-panel-sm" style={{ width: 45, height: 45, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 175, background: color, color: 'black', fontWeight: 'bold', zIndex: 1 }}>D</motion.div>
                  
                  <span style={{ position: 'absolute', top: 60, left: 120, color: 'white', fontSize: '0.8rem' }}>4</span>
                  <span style={{ position: 'absolute', top: 60, right: 120, color: color, fontSize: '0.8rem' }}>7</span>
                  <span style={{ position: 'absolute', bottom: 65, left: 120, color: color, fontSize: '0.8rem' }}>2</span>
               </div>
               <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: '1rem' }}>
                  <span style={{ color: color }}>● Optimal Path Calculation</span>
                  <span style={{ color: 'var(--accent-primary)' }}>● Relaxed Edges</span>
               </div>
            </div>
         );

      // CLUSTER 4: Backtracking Constraints Space
      case ['nqueens_visual', 'backtracking_intro_visual', 'branch_bound_visual'].includes(visualType):
         return (
            <div style={{ textAlign: 'center', maxWidth: '800px' }}>
               <h3 style={{ color: 'white', marginBottom: '2rem' }}>State-Space Bounding & Pruning Mechanics</h3>
               <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '2rem' }}>
                  {[1,2,3,4,5,6].map(v => (
                     <motion.div 
                        key={v}
                        animate={{ 
                           backgroundColor: v === 5 ? '#ef4444' : (v < 5 ? color : 'rgba(255,255,255,0.05)'),
                           scale: v === 5 ? [1, 1.2, 1] : 1
                        }}
                        transition={{ delay: v * 0.4, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        style={{ width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: `2px solid ${v===5?'#ef4444':color}`, color: v === 5 ? 'white' : (v < 5 ? 'black' : '#9ca3af') }}
                     >
                        S{v}
                     </motion.div>
                  ))}
               </div>
               <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                  Dynamically mapping valid constraints. The highlighted node indicates a constraint violation (e.g. Queen Conflict, or sub-optimal limit reached). The branch evaluator immediately terminates the path and <b>backtracks</b>!
               </p>
            </div>
         );

      // CLUSTER 5: Optimization & Memory Arrays (Knapsack, Matrices)
      case ['fractional_knapsack_visual', 'dp_knapsack_visual', 'dp_reliability_visual', 'divide_conquer_flow', 'greedy_intro_visual'].includes(visualType):
         return (
            <div style={{ textAlign: 'center' }}>
               <h3 style={{ color: 'white', marginBottom: '2rem' }}>Capacity & Density Optimization Modeling</h3>
               <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'flex-end', height: '120px' }}>
                  {[{h: 40, w: 2}, {h: 90, w: 5, active: true}, {h: 60, w: 3}, {h: 110, w: 4, active: true}, {h: 30, w: 2}].map((item, i) => (
                     <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'white', fontSize: '0.8rem' }}>${item.h}</span>
                        <motion.div 
                           animate={{ 
                              y: item.active ? [-5, 0] : 0,
                              boxShadow: item.active ? `0 0 20px ${color}50` : 'none'
                           }}
                           transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
                           style={{ width: '50px', height: item.h, background: item.active ? color : 'rgba(255,255,255,0.05)', borderRadius: '4px', border: item.active ? `1px solid white` : '1px solid rgba(255,255,255,0.1)' }}
                        />
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{item.w}kg</span>
                     </div>
                  ))}
               </div>
               <p style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>Comparing Value vs Weight coefficients. Dynamic matrices track maximum density accumulation without breaching total structural capacities.</p>
            </div>
         );

      // CLUSTER 6: Equations & Asymptotics
      case ['time_complexity_graph', 'asymptotic_bounds', 'complexity_matrix', 'np_theory_visual'].includes(visualType):
         return (
            <div style={{ textAlign: 'center' }}>
               <h3 style={{ color: 'white', marginBottom: '2rem' }}>Mathematical Bounding (O, Ω, Θ) Analysis</h3>
               <div style={{ position: 'relative', width: '400px', height: '220px', margin: '0 auto', background: 'rgba(0,0,0,0.3)', borderLeft: '2px solid rgba(255,255,255,0.2)', borderBottom: '2px solid rgba(255,255,255,0.2)', overflow: 'hidden' }}>
                  <svg width="100%" height="100%" style={{ position: 'absolute', bottom: 0, left: 0 }}>
                     <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} d="M 0 220 Q 200 200 400 0" stroke={color} strokeWidth="3" fill="none" />
                     <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} d="M 0 220 L 400 20" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                     <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }} d="M 0 220 Q 300 210 400 150" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                  </svg>
                  <span style={{ position: 'absolute', right: 20, top: 40, color: color, fontSize: '0.9rem', fontWeight: 'bold' }}>Algorithms T(n)</span>
                  <span style={{ position: 'absolute', right: 20, top: 10, color: '#ef4444', fontSize: '0.8rem' }}>Upper Bound O(g(n))</span>
                  <span style={{ position: 'absolute', right: 20, top: 160, color: '#10b981', fontSize: '0.8rem' }}>Lower Bound Ω(g(n))</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                  <span>X-Axis: Input Size (N)</span>
                  <span>Y-Axis: Processing Timeline / Resources</span>
               </div>
            </div>
         );

      default:
         return (
            <div style={{ textAlign: 'center' }}>
               <h3 style={{ color: 'white', marginBottom: '1rem' }}>Interactive Sandbox Logic</h3>
               <p style={{ color: 'var(--text-muted)' }}>Executing pedagogical rendering payload for {visualType}. Expand the code algorithms below to dive deeper into the structure implementation.</p>
               <div style={{ marginTop: '2rem', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <motion.div animate={{ height: [20, 60, 20] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '10px', background: color, borderRadius: '5px' }} />
                  <motion.div animate={{ height: [20, 40, 20] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: '10px', background: color, borderRadius: '5px', opacity: 0.7 }} />
                  <motion.div animate={{ height: [20, 80, 20] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: '10px', background: color, borderRadius: '5px', opacity: 0.4 }} />
               </div>
            </div>
         );
   }
};
