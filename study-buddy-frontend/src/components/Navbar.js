
import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <div className={styles.nav}>
            <h3>Logo</h3>
            <h3>Study Buddies</h3>
            <h3>Login</h3>
        </div>
    );
}
