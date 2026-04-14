import { motion } from 'framer-motion';
import styles from './Developer.module.css';
import { Target, Eye, Award } from 'lucide-react';

const VisionPillar = ({ icon: Icon, title, desc }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-panel" 
    style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}
  >
    <div style={{ background: 'rgba(212,160,23,0.1)', padding: '0.75rem', borderRadius: '12px', width: 'fit-content' }}>
      <Icon size={24} color="var(--warning)" />
    </div>
    <h3 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>{desc}</p>
  </motion.div>
);

const Developer = () => {

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.introText}>
        <h1 className="text-gradient" style={{fontSize: '3rem', marginBottom: '1rem'}}>
          Meet the Team
        </h1>
        <p style={{color: 'var(--text-secondary)', fontSize: '1.2rem'}}>
          The minds behind the PIEMR Virtual OS Laboratory.
        </p>
      </div>

      <div className={styles.teamGrid}>
        {/* Profile Cards logic remains same but I'll add hover state here directly */}
        <motion.div 
          className={`glass-panel ${styles.profileCard}`}
          whileHover={{ y: -10, borderColor: 'var(--accent-primary)', boxShadow: '0 20px 40px -20px rgba(37,99,235,0.4)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className={styles.avatarContainer}>
            <img src="https://media.licdn.com/dms/image/v2/D5603AQHVB2WDhNMBIg/profile-displayphoto-scale_400_400/B56Zxmh811KAAg-/0/1771246709946?e=1777507200&v=beta&t=FjcMd-bIZTi_fiUauL3SpkYU8sCSSeSNf1PEt4S3j2I" alt="Agastya Sharma" className={styles.avatar} />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h2 style={{fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0.5rem 0'}}>Mr. Agastya Sharma</h2>
          </div>
          <span className={styles.roleBadge}>Project Developer</span>
          
          <div className={styles.detailsGrid} style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Email</span>
              <a href="mailto:work.agastya20@gmail.com" className={`${styles.value} ${styles.link}`}>
                work.agastya20@gmail.com
              </a>
            </div>
            
            <div className={styles.detailItem}>
              <span className={styles.label}>LinkedIn</span>
              <a href="https://www.linkedin.com/in/agastya20/" target="_blank" rel="noopener noreferrer" className={`${styles.value} ${styles.link}`}>
                linkedin.com/in/agastya20
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={`glass-panel ${styles.profileCard}`}
          whileHover={{ y: -10, borderColor: 'var(--warning)', boxShadow: '0 20px 40px -20px rgba(212,160,23,0.4)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={`${styles.avatarContainer}`} style={{background: 'linear-gradient(135deg, var(--warning), var(--accent-tertiary))'}}>
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQGvFDOEX6xhsw/profile-displayphoto-crop_800_800/B4DZngZz15IgAI-/0/1760406490882?e=1777507200&v=beta&t=wNUR_wrH4pKP2KYeUpocR08a7lS70EU-oPIlhkYjPuo" alt="Atul Barve" className={styles.avatar} />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h2 style={{fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0.5rem 0'}}>Mr. Atul Barve Sir</h2>
          </div>
          <span className={`${styles.roleBadge} ${styles.mentorBadge}`}>Project Mentor</span>

          <div className={styles.detailsGrid} style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Email</span>
              <a href="mailto:abarve@piemr.edu.in" className={`${styles.value} ${styles.link}`}>
                abarve@piemr.edu.in
              </a>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.label}>LinkedIn</span>
              <a href="https://www.linkedin.com/in/atulbarve/" target="_blank" rel="noopener noreferrer" className={`${styles.value} ${styles.link}`}>
                linkedin.com/in/atulbarve
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mission & Vision Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ marginTop: '6rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '3rem' }}
      >
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Platform Philosophy</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
            The PIEMR Virtual Lab was founded on the principle that academic rigor should be matched with cutting-edge technical execution. We bridge the gap between theoretical computer science and interactive digital experimentation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <VisionPillar 
            icon={Target} 
            title="Precision Simulation" 
            desc="Our bit-level logic engines ensure every gate connection follows standard Boolean postulates with 100% accuracy." 
          />
          <VisionPillar 
            icon={Eye} 
            title="Visual Pedagogy" 
            desc="Moving beyond textbook diagrams to interactive infographics that react to student input in real-time." 
          />
          <VisionPillar 
            icon={Award} 
            title="Academic Standard" 
            desc="Tailored specifically to the university curriculum under expert mentorship to ensure meaningful outcomes." 
          />
        </div>
      </motion.div>

      <motion.a 
        href="https://piemr.edu.in" 
        target="_blank" 
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <img 
          src="https://accsoft.piemr.edu.in/accsoft_piemr/Upload/Inst_Logo_6632bdd9196946f7b839740c8b2ce366_piemr_logo.png" 
          alt="PIEMR Logo" 
          className={styles.instLogo} 
        />
      </motion.a>

    </motion.div>
  );
};

export default Developer;
