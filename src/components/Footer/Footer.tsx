import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        Designed and developed with <span className={styles.heart}>❤️</span> by 
        <a 
          href="https://www.linkedin.com/in/agastya20/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.developerLink}
        >
          Agastya Sharma
        </a>
      </div>
    </footer>
  );
};

export default Footer;
