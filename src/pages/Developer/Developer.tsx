import React from 'react';
import { motion } from 'framer-motion';
import styles from './Developer.module.css';

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
        
        {/* Developer Card */}
        <motion.div 
          className={`glass-panel ${styles.profileCard}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className={styles.avatarContainer}>
            <img src="https://media.licdn.com/dms/image/v2/D5603AQHVB2WDhNMBIg/profile-displayphoto-scale_400_400/B56Zxmh811KAAg-/0/1771246709946?e=1777507200&v=beta&t=FjcMd-bIZTi_fiUauL3SpkYU8sCSSeSNf1PEt4S3j2I" alt="Agastya Sharma" className={styles.avatar} />
          </div>
          
          <div>
            <h2 style={{fontSize: '1.8rem', color: 'var(--text-primary)'}}>Mr. Agastya Sharma</h2>
          </div>
          <span className={styles.roleBadge}>Lead Developer & OS Architect</span>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Email</span>
              <a href="mailto:work.agastya20@gmail.com" className={`${styles.value} ${styles.link}`}>
                work.agastya20@gmail.com
              </a>
            </div>
            
            <div className={styles.detailItem}>
              <span className={styles.label}>LinkedIn</span>
              <a href="https://www.linkedin.com/in/agastya20/" target="_blank" rel="noopener noreferrer" className={`${styles.value} ${styles.link}`}>
                in/agastya20
              </a>
            </div>
          </div>
        </motion.div>

        {/* Mentor Card */}
        <motion.div 
          className={`glass-panel ${styles.profileCard}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={`${styles.avatarContainer}`} style={{background: 'linear-gradient(135deg, var(--warning), var(--accent-tertiary))'}}>
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQGvFDOEX6xhsw/profile-displayphoto-crop_800_800/B4DZngZz15IgAI-/0/1760406490882?e=1777507200&v=beta&t=wNUR_wrH4pKP2KYeUpocR08a7lS70EU-oPIlhkYjPuo" alt="Atul Barve" className={styles.avatar} />
          </div>
          
          <div>
            <h2 style={{fontSize: '1.8rem', color: 'var(--text-primary)'}}>Mr. Atul Barve Sir</h2>
          </div>
          <span className={`${styles.roleBadge} ${styles.mentorBadge}`}>Project Mentor</span>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Institution</span>
              <span className={styles.value} style={{color: 'var(--text-primary)'}}>
                Prestige Institute of Engineering Management & Research
              </span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.label}>Guidance</span>
              <span className={styles.value} style={{color: 'var(--text-secondary)'}}>
                Provided expert supervision and curriculum mapping for the OS Virtual Lab.
              </span>
            </div>
          </div>
        </motion.div>

      </div>

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
