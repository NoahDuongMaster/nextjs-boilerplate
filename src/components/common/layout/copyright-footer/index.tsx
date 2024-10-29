import React from 'react';
import Link from 'next/link';

import styles from './copyright-footer.module.scss';

function CopyrightFooter() {
  return (
    <footer className={styles.footer}>
      NextJS Boilerplate &copy; {new Date().getFullYear()}. Created by{' '}
      <Link
        className={styles.footerLink}
        href="https://github.com/truongdn-it/nextjs-boilerplate"
        target="_blank"
      >
        truongdn-it
      </Link>
    </footer>
  );
}

export default CopyrightFooter;
