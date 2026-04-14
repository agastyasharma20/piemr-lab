import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Activity, 
  Grid, 
  Layers, 
  ChevronRight, 
  Search, 
  Hash, 
  GitBranch,
  ShieldCheck,
  Cpu,
  Database,
  Network
} from 'lucide-react';

import { TiltCard, ParticleBackground } from '../../components/common/InteractiveEffects';

const adaTopics = [
  {
    id: 'fundamentals',
    title: 'Algorithm Fundamentals',
    desc: 'Asymptotic Notations, Recurrence Relations & Divide and Conquer.',
    icon: Search,
    color: '#3b82f6',
    topics: ['Big O Notations', 'Master Theorem', 'Recursive Logic'],
    path: '/ada/fundamentals'
  },
  {
    id: 'divide-conquer',
    title: 'Divide & Conquer',
    desc: 'Solving problems using recursive logic and complex recurrences.',
    icon: Network,
    color: '#0ea5e9',
    topics: ['Quick Sort', 'Merge Sort', 'Binary Search'],
    path: '/ada/divide-conquer'
  },
  {
    id: 'search-sort',
    title: 'Searching & Sorting',
    desc: 'Linear/Binary Search and All Major Sorting Algorithms.',
    icon: Layers,
    color: '#8b5cf6',
    topics: ['Recursive Sorts', 'Heap Sort', 'Visual Logic'],
    path: '/ada/search-sort'
  },
  {
    id: 'greedy',
    title: 'Greedy Strategy',
    desc: 'Optimization, Huffman Coding, MST (Prim/Kruskal) & Dijkstra.',
    icon: GitBranch,
    color: '#10b981',
    topics: ['Greedy Choice', 'MST Algorithms', 'Knapsack'],
    path: '/ada/greedy'
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    desc: 'Overlapping Sub-problems, Knapsack, Multistage & Floyd-Warshall.',
    icon: Hash,
    color: '#f59e0b',
    topics: ['Memoization', 'Optimal Path', 'Table Method'],
    path: '/ada/dp'
  },
  {
    id: 'backtracking',
    title: 'Backtracking & B&B',
    desc: '8-Queens, Hamiltonian Cycles & Optimization Bounds.',
    icon: Activity,
    color: '#ef4444',
    topics: ['State Space Tree', 'Pruning', 'Branch & Bound'],
    path: '/ada/backtracking'
  },
  {
    id: 'advanced-structures',
    title: 'Advanced Structures',
    desc: 'Hierarchical Trees (AVL, B-Tree) and Graph Complexity.',
    icon: Database,
    color: '#ec4899',
    topics: ['AVL Rotations', 'DFS/BFS', 'NP-Completeness'],
    path: '/ada/advanced-structures'
  }
];


const stats = [
  { label: 'Complexity Analysis', value: 'High', icon: Cpu, color: '#3b82f6' },
  { label: 'Lab Experiments', value: '26', icon: Grid, color: '#10b981' },
  { label: 'Sandbox Compiler', value: 'Live', icon: ShieldCheck, color: '#f59e0b' }
];

const ADADashboard = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '3rem', paddingBottom: '4rem' }}
    >
      <ParticleBackground count={15} color="var(--warning)" />

      {/* Hero Section */}
      <header style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
        <div className="badge badge-gold">PIEMR Digital Laboratory</div>
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Algorithm Hub
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px' }}>
          Explore the mathematical foundation of computation. Master Efficiency through 
          detailed asymptotic analysis and secure code execution.
        </p>
        
        <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel-sm"
              style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: `4px solid ${stat.color}` }}
            >
              <stat.icon size={24} color={stat.color} />
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{stat.label}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </header>

      {/* Main Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        {/* Course Units */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Layers size={28} color="var(--accent-primary)" />
            Subject Topics
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {adaTopics.map((topic) => (
                <TiltCard 
                  key={topic.id}
                  className="glass-panel-md"
                  style={{ borderLeft: `4px solid ${topic.color}`, padding: '2rem', cursor: 'pointer' }}
                  onClick={() => navigate(topic.path)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ background: `${topic.color}20`, padding: '12px', borderRadius: '12px' }}>
                      <topic.icon size={28} color={topic.color} />
                    </div>
                    <ChevronRight size={20} color="rgba(255,255,255,0.2)" />
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{topic.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{topic.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {topic.topics.slice(0, 2).map((subTopic, j) => (
                      <span key={j} style={{ fontSize: '0.7rem', color: topic.color, background: `${topic.color}10`, padding: '4px 10px', borderRadius: '20px', border: `1px solid ${topic.color}30` }}>
                        {subTopic}
                      </span>
                    ))}
                  </div>
                </TiltCard>
            ))}
          </div>

        </div>

        {/* Lab Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Zap size={28} color="var(--warning)" />
            Experiments
          </h2>
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel-lg"
            style={{ 
              background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(30,58,138,0.2) 100%)',
              padding: '2.5rem',
              border: '2px solid rgba(245,158,11,0.3)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
            onClick={() => navigate('/ada/experiments')}
          >
            <div style={{ background: 'var(--warning)', color: 'black', padding: '1rem', borderRadius: '12px', width: 'fit-content', fontWeight: 'bold' }}>
              SECURE LABORATORY
            </div>
            <h3 style={{ fontSize: '1.8rem', color: 'white', margin: 0 }}>Open ADA Compiler</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Execute complexity analysis on 26 practical labs. Integrated Lockdown Mode prevents code plagiarism.
            </p>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '1rem' }}>
              <li>• Real-time C++ Sandbox</li>
              <li>• Automated Time Profiling</li>
              <li>• Anti-Copy Protection</li>
            </ul>
            <button className="btn-modern-primary" style={{ marginTop: '1rem', width: '100%', padding: '1.2rem 0' }}>
              START LABORATORIES
            </button>
          </motion.div>
          
          {/* Complexity Hub Link */}
          <motion.div 
            whileHover={{ x: 10 }}
            className="glass-panel-sm"
            style={{ padding: '1.5rem', cursor: 'pointer', borderLeft: '4px solid #8b5cf6' }}
            onClick={() => navigate('/ada/complexity')}
          >
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Activity size={24} color="#8b5cf6" />
                <div style={{ flex: 1 }}>
                   <div style={{ color: 'white', fontWeight: 'bold' }}>Complexity Visualizer</div>
                   <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Learn Asymptotic Growth Rates</div>
                </div>
                <ChevronRight size={20} color="#8b5cf6" />
             </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ADADashboard;
