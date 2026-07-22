"use client";

import { useEffect, useState } from 'react';
import styles from './navbar.module.css';

type NavbarOption = "home" | "projects" | "taiko" | "cosplay" | "blog";
type MenuProps = {
    activeOption: NavbarOption;
};

function DropdownMenu({ activeOption }: MenuProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <button className={styles.dropdownButton} onClick={toggleDropdown}>
                Menu
            </button>
            <ul className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.show : ''}`}>
                <li className={activeOption === "home" ? styles.active : ""}>
                    <a href="/">Home</a>
                </li>
                <li className={activeOption === "blog" ? styles.active : ""}>
                    <a href="/blog">Blog</a>
                </li>
                <li className={activeOption === "cosplay" ? styles.active : ""}>
                    <a href="/cosplay">Cosplay</a>
                </li>
                <li className={activeOption === "projects" ? styles.active : ""}>
                    <a href="/projects">Projects & Random Stuff</a>
                </li>
                <li className={activeOption === "taiko" ? styles.active : ""}>
                    <a href="/taiko">Taiko</a>
                </li>
            </ul>
        </>
    )
}

function ExpandedMenu({ activeOption }: MenuProps) {
    return <ul className={styles.navLinks}>
        <li className={activeOption === "home" ? styles.active : ""}>
            <a href="/">Home</a>
        </li>
        <li className={activeOption === "blog" ? styles.active : ""}>
            <a href="/blog">Blog</a>
        </li>
        <li className={activeOption === "cosplay" ? styles.active : ""}>
            <a href="/cosplay">Cosplay</a>
        </li>
        <li className={activeOption === "projects" ? styles.active : ""}>
            <a href="/projects">Projects & Random Stuff</a>
        </li>
        <li className={activeOption === "taiko" ? styles.active : ""}>
            <a href="/taiko">Taiko</a>
        </li>
    </ul>
}

export default function Navbar({ activeOption }: { activeOption: NavbarOption }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();

        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [setIsMobile]);

    return (
        <nav className={`${styles.navbar} ${activeOption === 'cosplay' ? styles.pink : ''}`}>
            <div className={styles.logo}>Nori</div>
            {
                isMobile 
                    ? <DropdownMenu activeOption={activeOption} /> 
                    : <ExpandedMenu activeOption={activeOption} />
            }
        </nav>
    )
}