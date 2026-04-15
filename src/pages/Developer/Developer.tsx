import { motion } from 'framer-motion';
import styles from './Developer.module.css';
import { Target, Eye, Award, Mail, Shield, Zap, Star, Users } from 'lucide-react';

// ── LinkedIn SVG Icon ──
const LinkedInIcon = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ── PIEMR Logo SVG ──
const PiemrIcon = () => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 12h8M12 8v8" />
  </svg>
);

// ── Animate wrapper ──
const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const }
});

const Developer = () => {
  return (
    <div className={styles.pageWrapper}>

      {/* ════════ PAGE HEADER ════════ */}
      <motion.header className={styles.pageHeader} {...fadeUp(0)}>
        <div className={styles.pageBadge}>
          <PiemrIcon /> PIEMR Virtual Lab
        </div>
        <h1 className={styles.pageTitle}>Project Leadership</h1>
        <p className={styles.pageSubtitle}>
          The architecture, strategy, and academic mentorship behind PIEMR's next-generation virtual laboratory platform.
        </p>
      </motion.header>

      {/* ════════ SECTION: LEAD ARCHITECT ════════ */}
      <motion.section className={styles.leadSection} {...fadeUp(0.08)}>
        <div className={styles.sectionLabel}>
          <h2><Shield size={16} style={{ opacity: 0.5 }} /> Lead Architect</h2>
        </div>

        <div className={styles.leadCard}>
          <div className={styles.leadAvatarWrap}>
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQHVB2WDhNMBIg/profile-displayphoto-scale_400_400/B56Zxmh811KAAg-/0/1771246709946?e=1777507200&v=beta&t=FjcMd-bIZTi_fiUauL3SpkYU8sCSSeSNf1PEt4S3j2I"
              alt="Agastya Sharma"
              className={styles.leadAvatar}
            />
          </div>
          <div className={styles.leadInfo}>
            <h2 className={styles.leadName}>Agastya Sharma</h2>
            <p className={styles.leadRole}>Lead Portfolio Architect</p>
            <div className={styles.leadBadges}>
              <span className={`${styles.badge} ${styles.badgeVerified}`}>
                <Shield size={9} /> Lead Developer
              </span>
              <span className={styles.badge}>
                <Zap size={9} /> System Architect
              </span>
            </div>
            <div className={styles.leadLinks}>
              <a href="mailto:work.agastya20@gmail.com" className={styles.linkPill}>
                <Mail size={11} /> work.agastya20@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/agastya20/" target="_blank" rel="noopener noreferrer" className={styles.linkPill}>
                <LinkedInIcon size={11} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ════════ SECTION: ASSOCIATE ════════ */}
      <motion.section className={styles.associateSection} {...fadeUp(0.14)}>
        <div className={styles.sectionLabel}>
          <h2><Users size={16} style={{ opacity: 0.5 }} /> Project Associate</h2>
        </div>

        <div className={styles.associateCard}>
          <div className={styles.assocAvatarWrap}>
            <img
              src="https://avatars.githubusercontent.com/u/191674211?v=4"
              alt="Pralambika Soni"
              className={styles.assocAvatar}
            />
          </div>
          <div className={styles.assocInfo}>
            <h3 className={styles.assocName}>Pralambika Soni</h3>
            <p className={styles.assocRole}>Project Associate</p>
            <div className={styles.leadBadges}>
              <span className={styles.badge}>
                <Star size={9} /> Project Strategy
              </span>
            </div>
            <div className={styles.assocLinks}>
              <a href="https://www.linkedin.com/in/pralambika-soni-p011105/" target="_blank" rel="noopener noreferrer" className={styles.linkPill}>
                <LinkedInIcon size={11} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ════════ CONNECTOR ════════ */}
      <motion.div className={styles.connector} {...fadeUp(0.18)}>
        <svg width="160" height="50" viewBox="0 0 160 50" fill="none">
          <line x1="80" y1="0" x2="30" y2="50" stroke="rgba(99,102,241,0.2)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="80" y1="0" x2="130" y2="50" stroke="rgba(99,102,241,0.2)" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="80" cy="0" r="2.5" fill="rgba(99,102,241,0.4)" />
          <circle cx="30" cy="50" r="2" fill="rgba(251,191,36,0.4)" />
          <circle cx="130" cy="50" r="2" fill="rgba(251,191,36,0.4)" />
        </svg>
      </motion.div>

      {/* ════════ SECTION: MENTORSHIP ════════ */}
      <motion.section className={styles.mentorSection} {...fadeUp(0.22)}>
        <div className={styles.sectionLabel}>
          <h2><Award size={16} style={{ opacity: 0.5 }} /> Expert Mentorship</h2>
        </div>

        <div className={styles.mentorGrid}>
          {/* Dr. Dinesh C Jain */}
          <div className={styles.mentorCard}>
            <div className={styles.mentorAvatarWrap}>
              <img
                src="https://d3md8ar2i5icyz.cloudfront.net/wp-content/uploads/2026/03/Dinesh-Kumar-Jain-300x300.jpg"
                alt="Dr. Dinesh C Jain"
                className={styles.mentorAvatar}
              />
            </div>
            <div className={styles.mentorInfo}>
              <h3 className={styles.mentorName}>Dr. Dinesh C Jain</h3>
              <p className={styles.mentorRole}>Project Mentor</p>
              <div className={styles.mentorLinks}>
                <a href="mailto:djain@piemr.edu.in" className={styles.linkPill}>
                  <Mail size={10} /> djain@piemr.edu.in
                </a>
                <a href="https://www.linkedin.com/in/dr-dinesh-jain-59b9ab15/" target="_blank" rel="noopener noreferrer" className={styles.linkPill}>
                  <LinkedInIcon size={10} /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Atul Barve Sir */}
          <div className={styles.mentorCard}>
            <div className={styles.mentorAvatarWrap}>
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQGvFDOEX6xhsw/profile-displayphoto-crop_800_800/B4DZngZz15IgAI-/0/1760406490882?e=1777507200&v=beta&t=wNUR_wrH4pKP2KYeUpocR08a7lS70EU-oPIlhkYjPuo"
                alt="Atul Barve Sir"
                className={styles.mentorAvatar}
              />
            </div>
            <div className={styles.mentorInfo}>
              <h3 className={styles.mentorName}>Atul Barve Sir</h3>
              <p className={styles.mentorRole}>Project Mentor</p>
              <div className={styles.mentorLinks}>
                <a href="mailto:abarve@piemr.edu.in" className={styles.linkPill}>
                  <Mail size={10} /> abarve@piemr.edu.in
                </a>
                <a href="https://www.linkedin.com/in/atulbarve/" target="_blank" rel="noopener noreferrer" className={styles.linkPill}>
                  <LinkedInIcon size={10} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ════════ SECTION: LABORATORY VISION ════════ */}
      <motion.section className={styles.visionSection} {...fadeUp(0.28)}>
        <div className={styles.sectionLabel}>
          <h2><Eye size={16} style={{ opacity: 0.5 }} /> Laboratory Vision</h2>
        </div>

        <div className={styles.visionGrid}>
          <div className={styles.visionCard}>
            <div className={styles.visionIcon}>
              <Target size={20} color="#818cf8" />
            </div>
            <h3 className={styles.visionTitle}>Symmetrical Architecture</h3>
            <p className={styles.visionDesc}>Balanced UI/UX design ensuring zero cognitive load for students during complex algorithm exploration.</p>
          </div>
          <div className={styles.visionCard}>
            <div className={styles.visionIcon}>
              <Eye size={20} color="#818cf8" />
            </div>
            <h3 className={styles.visionTitle}>Pedagogical Precision</h3>
            <p className={styles.visionDesc}>Real-time bit-level logic simulation with zero delay, powered by advanced SVG rendering techniques.</p>
          </div>
          <div className={styles.visionCard}>
            <div className={styles.visionIcon}>
              <Award size={20} color="#818cf8" />
            </div>
            <h3 className={styles.visionTitle}>Standard Certification</h3>
            <p className={styles.visionDesc}>Curriculum-aligned experiments vetted by leading academic mentors to ensure university-grade results.</p>
          </div>
        </div>
      </motion.section>

      {/* ════════ FOOTER ════════ */}
      <motion.div className={styles.footerLogo} {...fadeUp(0.32)}>
        <span className={styles.footerText}>Developed at</span>
        <a href="https://piemr.edu.in" target="_blank" rel="noopener noreferrer">
          <img
            src="https://accsoft.piemr.edu.in/accsoft_piemr/Upload/Inst_Logo_6632bdd9196946f7b839740c8b2ce366_piemr_logo.png"
            alt="PIEMR Logo"
            className={styles.instLogo}
          />
        </a>
      </motion.div>

    </div>
  );
};

export default Developer;
