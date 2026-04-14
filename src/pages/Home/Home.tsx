import { useNavigate } from 'react-router-dom';
import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { TerminalSquare, Cpu, Network, Boxes, Calculator, Database, Zap, Download, BookOpen, ChevronRight, Mail, Users, Globe, ExternalLink } from 'lucide-react';
import styles from './Home.module.css';
import { ParticleBackground, TiltCard } from '../../components/common/InteractiveEffects';


const subjects = [
  { 
    id: 'os', 
    title: 'Operating Systems (OS)', 
    desc: 'Deep dive into computer resource management, scheduling algorithms, concurrency, and file systems.', 
    icon: TerminalSquare, 
    color: 'var(--accent-primary)',
    path: '/os'
  },
  { 
    id: 'coa', 
    title: 'Computer Organization & Architecture', 
    desc: 'Explore the fundamental structure of computers, logic circuits, adders, and assembly language programming.', 
    icon: Cpu, 
    color: 'var(--accent-tertiary)',
    path: '/coa'
  },
  { 
    id: 'ada', 
    title: 'Analysis & Design of Algorithms', 
    desc: 'Master algorithm design techniques, time/space complexity, sorting, and graph algorithms.', 
    icon: Network, 
    color: 'var(--warning)',
    path: '/ada'
  },
  { 
    id: 'se', 
    title: 'Software Engineering', 
    desc: 'Learn about software development life cycles, agile methodologies, and testing principles.', 
    icon: Boxes, 
    color: 'var(--info)',
    path: '#',
    comingSoon: true
  },
  { 
    id: 'matlab', 
    title: 'Matlab Programming', 
    desc: 'Numerical computing, matrix manipulations, functions, and data visualization tools.', 
    icon: Calculator, 
    color: '#10b981',
    path: '#',
    comingSoon: true
  },
  { 
    id: 'dbms', 
    title: 'Database Management Systems', 
    desc: 'Study relational models, SQL queries, database design, and transaction management paradigms.', 
    icon: Database, 
    color: '#fbbf24',
    path: '#',
    comingSoon: true
  }
];

const features = [
  { title: "Real-Time Execution", desc: "Interact with live hardware simulation cycles instantly.", icon: Zap, color: "#39ff14" },
  { title: "PDF Report Engine", desc: "Export watermarked, professional lab reports directly.", icon: Download, color: "var(--accent-primary)" },
  { title: "Free-Form Sandbox", desc: "Unrestricted workspace to build any logic topology.", icon: Boxes, color: "var(--info)" },
];

const Home = () => {
  const navigate = useNavigate();

  // Parallax Physics System
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x1 = useTransform(mouseX, [-1000, 1000], [-50, 50]);
  const y1 = useTransform(mouseY, [-1000, 1000], [-50, 50]);
  
  const x2 = useTransform(mouseX, [-1000, 1000], [40, -40]);
  const y2 = useTransform(mouseY, [-1000, 1000], [40, -40]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate distance from center of window
    const rect = document.body.getBoundingClientRect();
    mouseX.set(e.clientX - rect.width / 2);
    mouseY.set(e.clientY - rect.height / 2);
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <motion.div 
      className={styles.home}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '5rem', position: 'relative' }}
    >
      <ParticleBackground />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")', opacity: 0.03, pointerEvents: 'none', zIndex: -1 }} />
      {/* MASSIVE INTERACTIVE HERO SECTION */}
      <section 
        onMouseMove={handleMouseMove}
        style={{ 
          position: 'relative', 
          padding: '8rem 2rem', 
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(16,24,39,0) 0%, rgba(13,25,48,0.8) 100%)',
          borderRadius: '32px',
          border: '1px solid var(--border-glow)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '600px'
        }}
      >
        {/* Deep Parallax Grid Elements */}
        <motion.div 
           style={{ position: 'absolute', width: '100vw', height: '100vw', background: 'radial-gradient(ellipse at center, rgba(26,92,190,0.15) 0%, transparent 50%)', top: '50%', left: '50%', x: '-50%', y: '-50%', zIndex: 0 }}
        />
        
        {/* Floating Geometry 1 */}
        <motion.div 
           style={{ position: 'absolute', top: '15%', left: '10%', x: x1, y: y1, opacity: 0.5, zIndex: 1 }}
           animate={{ rotate: 360 }}
           transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
           <Boxes size={120} color="var(--accent-primary)" strokeWidth={0.5} />
        </motion.div>

        {/* Floating Geometry 2 */}
        <motion.div 
           style={{ position: 'absolute', bottom: '15%', right: '10%', x: x2, y: y2, opacity: 0.3, zIndex: 1 }}
           animate={{ rotate: -360 }}
           transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
           <Cpu size={150} color="var(--accent-tertiary)" strokeWidth={0.5} />
        </motion.div>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div 
             initial={{ scale: 0.8, opacity: 0, y: -20 }} 
             animate={{ scale: 1, opacity: 1, y: 0 }} 
             transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
             style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center' }}
          >
             <span className="badge badge-gold" style={{ padding: '8px 24px', fontSize: '1rem', backdropFilter: 'blur(10px)' }}>
                <BookOpen size={18} style={{marginRight: 8}}/> Enterprise Educational Platform
             </span>
          </motion.div>
          
          <motion.h1 
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
             style={{ fontSize: '5rem', margin: '0.5rem 0', fontFamily: 'var(--font-heading)', background: 'linear-gradient(to right, #ffffff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}
          >
             PIEMR Virtual Lab
          </motion.h1>
          
          <motion.p 
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3, duration: 0.8 }}
             style={{ color: '#9ca3af', fontSize: '1.3rem', maxWidth: '800px', margin: '1rem auto 3rem auto', lineHeight: 1.6 }}
          >
            Experience next-generation academic hardware simulations. Drag and drop physical circuits or execute precise 8085 Assembly timelines completely locally.
          </motion.p>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.6 }}
             style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}
          >
             <button 
                onClick={() => navigate('/coa/circuit-simulator')}
                style={{ cursor: 'pointer', background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '1.2rem 2.5rem', borderRadius: '100px', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 30px -10px var(--accent-primary)', transition: 'all 0.3s transform' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
             >
                <Zap size={20} /> Enter Sandbox
             </button>
             <button 
                onClick={() => { navigate('/#subjects'); }}
                style={{ cursor: 'pointer', background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.2)', padding: '1.2rem 2.5rem', borderRadius: '100px', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
             >
                <BookOpen size={20} /> Explore Syllabus
             </button>
             <motion.p 
               onClick={() => navigate('/about')}
               whileHover={{ color: 'var(--accent-tertiary)', x: 5 }}
               style={{ color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1rem', fontWeight: 500, borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem', marginLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
             >
               Meet the Mentors <ChevronRight size={16} />
             </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section id="subjects">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'white', fontFamily: 'var(--font-heading)' }}>Interactive Modules</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 100%)' }} />
        </div>
        <div className={styles.grid}>
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <TiltCard key={subject.id} color={subject.color}>
              <motion.div
                className={`glass-panel-md ${styles.card}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
                onClick={() => !subject.comingSoon && navigate(subject.path)}
                whileHover={!subject.comingSoon ? { y: -8, scale: 1.02, boxShadow: `0 20px 40px -10px ${subject.color}60`, borderColor: subject.color } : { x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } }}
                whileTap={!subject.comingSoon ? { scale: 0.98 } : {}}
                style={{ 
                  padding: '2.5rem', 
                  borderTop: `4px solid ${subject.comingSoon ? 'rgba(255,255,255,0.1)' : subject.color}`, 
                  cursor: subject.comingSoon ? 'not-allowed' : 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {!subject.comingSoon && (
                  <motion.div 
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: `radial-gradient(circle at 50% 0%, ${subject.color}15 0%, transparent 70%)`, opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {subject.comingSoon && (
                  <div className={styles.comingSoonOverlay}>
                     <div style={{ background: 'rgba(0,0,0,0.8)', padding: '0.5rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                        Coming Soon...
                     </div>
                  </div>
                )}
                
                <div className={styles.cardHeader} style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className={styles.iconBox} style={{ backgroundColor: subject.comingSoon ? 'rgba(255,255,255,0.05)' : `${subject.color}15`, border: `1px solid ${subject.comingSoon ? 'rgba(255,255,255,0.1)' : `${subject.color}30`}`, color: subject.comingSoon ? '#888' : subject.color, width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                      <Icon size={32} />
                    </div>
                  </div>
                  {!subject.comingSoon && (
                    <motion.div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '50%' }} whileHover={{ x: 5, background: 'rgba(255,255,255,0.1)' }}>
                      <ChevronRight size={24} color={subject.color} />
                    </motion.div>
                  )}
                </div>
                
                <h2 className={styles.cardTitle} style={{ fontSize: '1.8rem', marginTop: '1.5rem', fontFamily: 'var(--font-heading)', color: subject.comingSoon ? '#888' : 'white', position: 'relative', zIndex: 1, fontWeight: 600 }}>
                   {subject.title}
                </h2>
                <p className={styles.cardDesc} style={{ fontSize: '1.1rem', marginTop: '1rem', opacity: subject.comingSoon ? 0.4 : 0.8, lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
                   {subject.desc}
                </p>
              </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* NEW FEATURES SECTION */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'white', fontFamily: 'var(--font-heading)' }}>Platform Intelligence</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 100%)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
           {features.map((feat, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               style={{ background: '#111827', padding: '2rem', borderRadius: '16px', border: `1px solid ${feat.color}40`, display: 'flex', gap: '1.5rem', alignItems: 'center' }}
             >
                <div style={{ background: `${feat.color}20`, color: feat.color, padding: '1rem', borderRadius: '12px', flexShrink: 0 }}>
                  <feat.icon size={28} />
                </div>
                <div>
                   <h3 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '1.3rem' }}>{feat.title}</h3>
                   <p style={{ margin: 0, color: '#9ca3af', lineHeight: 1.6 }}>{feat.desc}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* NEW MENTORSHIP SPOTLIGHT */}
      <motion.section 
         initial={{ opacity: 0, filter: 'blur(10px)' }}
         whileInView={{ opacity: 1, filter: 'blur(0px)' }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
         style={{ background: 'linear-gradient(135deg, rgba(212,160,23,0.1) 0%, rgba(13,25,48,0.8) 100%)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(212,160,23,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', marginTop: '2rem' }}
      >
         <div style={{ background: 'rgba(212,160,23,0.2)', color: 'var(--warning)', padding: '0.5rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.9rem', border: '1px solid var(--warning)' }}>
           ACADEMIC SUPERVISION
         </div>
         <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'white' }}>Project Mentorship</h2>
         <p style={{ color: '#d1d5db', maxWidth: '700px', fontSize: '1.2rem', lineHeight: 1.6, margin: 0 }}>
           The PIEMR Virtual Lab was architected and deployed under the expert guidance and rigorous academic standardization of <strong>Mr. Atul Barve Sir</strong>. This platform ensures alignment with modern university curriculums.
         </p>
         <button 
            onClick={() => navigate('/about')}
            style={{ marginTop: '1rem', cursor: 'pointer', background: 'transparent', color: 'var(--warning)', border: '2px solid var(--warning)', padding: '0.8rem 2rem', borderRadius: '100px', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--warning)'; e.currentTarget.style.color = 'black'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--warning)'; }}
         >
            Meet the Developers
         </button>
      </motion.section>

      {/* Enhanced Contact Section */}
      <motion.section 
         id="contact"
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.6 }}
         style={{ 
           background: 'linear-gradient(135deg, #0a0f1c 0%, #111827 100%)', 
           padding: '4rem 3rem', 
           borderRadius: '24px', 
           border: '1px solid var(--border-glow)',
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           textAlign: 'center',
           marginTop: '2rem',
           boxShadow: '0 20px 50px -20px rgba(0,0,0,0.5)'
         }}
      >
         <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', color: 'white' }}>Let's Connect</h2>
         <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
           Have questions, feedback, or want to contribute to the PIEMR Virtual Lab? Reach out directly using the platforms below.
         </p>
         
         <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <motion.div 
               onClick={() => openLink('mailto:work.agastya20@gmail.com')}
               whileHover={{ y: -5, background: 'rgba(37,99,235,0.15)', borderColor: '#3b82f6', cursor: 'pointer' }}
               style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', color: 'white', fontWeight: 600, transition: 'all 0.3s' }}
            >
               <Mail size={18} color="#3b82f6" /> 
               <span>Email Developer</span>
               <ExternalLink size={14} color="rgba(255,255,255,0.3)" />
            </motion.div>
            
            <motion.div 
               onClick={() => openLink('https://linkedin.com/in/agastya20')}
               whileHover={{ y: -5, background: 'rgba(16,185,129,0.15)', borderColor: '#10b981', cursor: 'pointer' }}
               style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', color: 'white', fontWeight: 600, transition: 'all 0.3s' }}
            >
               <Users size={18} color="#10b981" /> 
               <span>LinkedIn Profile</span>
               <ExternalLink size={14} color="rgba(255,255,255,0.3)" />
            </motion.div>

            <motion.div 
               onClick={() => openLink('https://github.com/agastyasharma20')}
               whileHover={{ y: -5, background: 'rgba(255,255,255,0.1)', borderColor: 'white', cursor: 'pointer' }}
               style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', color: 'white', fontWeight: 600, transition: 'all 0.3s' }}
            >
               <Globe size={18} /> 
               <span>GitHub Org</span>
               <ExternalLink size={14} color="rgba(255,255,255,0.3)" />
            </motion.div>
         </div>

         <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', width: '100%' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              &copy; {new Date().getFullYear()} Designed and Developed by <strong>Agastya Sharma</strong>
            </p>
         </div>
      </motion.section>

    </motion.div>
  );
};

export default Home;
