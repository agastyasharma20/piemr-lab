import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <main className={styles.pageContainer}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
