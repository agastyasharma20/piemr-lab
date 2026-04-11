import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, HardDrive, Cpu, Network, BookOpen, User, Menu, X, GraduationCap } from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home, section: null },
  { path: '/experiments', label: 'Laboratory Experiments', icon: GraduationCap, section: 'Lab' },
  { path: '/unit-1', label: 'Unit 1: Intro to OS', icon: BookOpen, section: 'Syllabus' },
  { path: '/unit-2', label: 'Unit 2: Disk Scheduling', icon: HardDrive, section: null },
  { path: '/unit-3', label: 'Unit 3: CPU & Memory', icon: Cpu, section: null },
  { path: '/unit-4', label: 'Unit 4: Concurrency', icon: Network, section: null },
  { path: '/unit-5', label: 'Unit 5: Advanced OS', icon: BookOpen, section: null },
  { path: '/developer', label: 'About', icon: User, section: 'Info' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className={styles.mobileHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img
            src="https://accsoft.piemr.edu.in/accsoft_piemr/Upload/Inst_Logo_6632bdd9196946f7b839740c8b2ce366_piemr_logo.png"
            alt="PIEMR"
            className={styles.mobileLogo}
          />
          <div>
            <h2 style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              PIEMR Virtual Lab
            </h2>
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              OS Learning Platform
            </p>
          </div>
        </div>
        <button className={styles.menuBtn} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* Logo / Branding */}
        <div className={styles.logoContainer}>
          <a href="https://piemr.edu.in" target="_blank" rel="noopener noreferrer">
            <img
              src="https://accsoft.piemr.edu.in/accsoft_piemr/Upload/Inst_Logo_6632bdd9196946f7b839740c8b2ce366_piemr_logo.png"
              alt="PIEMR Logo"
              className={styles.logo}
            />
          </a>
          <div className={styles.logoTitle}>Virtual OS Laboratory</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '0.72rem', color: 'var(--accent-tertiary)',
            background: 'rgba(212,160,23,0.12)', padding: '3px 10px',
            borderRadius: '20px', border: '1px solid rgba(212,160,23,0.25)'
          }}>
            <GraduationCap size={12} />
            <span>PIEMR, Indore</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {(() => {
            let lastSection: string | null = undefined as any;
            return navItems.map((item) => {
              const Icon = item.icon;
              const showSection = item.section !== lastSection;
              lastSection = item.section;
              return (
                <React.Fragment key={item.path}>
                  {showSection && item.section && (
                    <div className={styles.navSection}>{item.section}</div>
                  )}
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                    }
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                </React.Fragment>
              );
            });
          })()}
        </nav>

        {/* Sidebar Footer */}
        <div className={styles.sidebarFooter}>
          <span>PIEMR Virtual Lab</span>
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', marginTop: '2px' }}>
            &copy; {new Date().getFullYear()} Agastya Sharma
          </span>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
