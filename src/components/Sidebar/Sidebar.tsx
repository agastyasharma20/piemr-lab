import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, HardDrive, Cpu, Network, BookOpen, User, Menu, X, GraduationCap, TerminalSquare, Zap } from 'lucide-react';
import styles from './Sidebar.module.css';

const osNavItems = [
  { path: '/os', label: 'OS Dashboard', icon: Home, section: null },
  { path: '/os/intro', label: 'Intro to OS', icon: BookOpen, section: 'Syllabus' },
  { path: '/os/disk-scheduling', label: 'Disk Scheduling', icon: HardDrive, section: null },
  { path: '/os/cpu-memory', label: 'CPU & Memory', icon: Cpu, section: null },
  { path: '/os/concurrency', label: 'Concurrency', icon: Network, section: null },
  { path: '/os/advanced-os', label: 'Advanced Concepts', icon: BookOpen, section: null },
  { path: '/os/experiments', label: 'Interactive Simulations', icon: TerminalSquare, section: 'Lab' },
  { path: '/os/developer', label: 'About & Mentors', icon: User, section: 'Info' },
];

const coaNavItems = [
  { path: '/coa', label: 'COA Dashboard', icon: Home, section: null },
  { path: '/coa/basic-structure', label: 'Basic Structure', icon: BookOpen, section: 'Syllabus' },
  { path: '/coa/computer-arithmetic', label: 'Computer Arithmetic', icon: Cpu, section: null },
  { path: '/coa/io-organization', label: 'I/O Organization', icon: HardDrive, section: null },
  { path: '/coa/memory-organization', label: 'Memory Organization', icon: BookOpen, section: null },
  { path: '/coa/multiprocessors', label: 'Multiprocessors', icon: Network, section: null },
  { path: '/coa/experiments', label: 'Logic & Assembly Labs', icon: Zap, section: 'Lab' },
  { path: '/coa/developer', label: 'About & Mentors', icon: User, section: 'Info' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isCOA = location.pathname.startsWith('/coa');
  const activeNavItems = isCOA ? coaNavItems : osNavItems;
  const moduleTitle = isCOA ? 'COA Laboratory' : 'OS Laboratory';

  return (
    <>
      {/* Mobile Top Bar */}
      <div className={styles.mobileHeader}>
        <div className={styles.mobileBranding}>
          <img
            src="https://accsoft.piemr.edu.in/accsoft_piemr/Upload/Inst_Logo_6632bdd9196946f7b839740c8b2ce366_piemr_logo.png"
            alt="PIEMR"
            className={styles.mobileLogo}
          />
          <div className={styles.mobileHeaderText}>
            <h2 className={styles.mobileTitle}>PIEMR Virtual Lab</h2>
            <p className={styles.mobileSubtitle}>OS Learning Platform</p>
          </div>
        </div>
        <button className={styles.menuBtn} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
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
          <div className={styles.logoTitle}>PIEMR Virtual Lab</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '0.72rem', color: 'var(--accent-tertiary)',
            background: 'rgba(212,160,23,0.12)', padding: '3px 10px',
            borderRadius: '20px', border: '1px solid rgba(212,160,23,0.25)',
            marginTop: '4px'
          }}>
            <GraduationCap size={12} />
            <span>{moduleTitle}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {(() => {
            let lastSection: string | null = undefined as any;
            return activeNavItems.map((item) => {
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
