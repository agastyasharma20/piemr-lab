import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  // Fix: Force scroll to top inside the scrollable container whenever pathname changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.contentWrapper}>
        <main ref={mainRef} className={styles.mainArea}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
