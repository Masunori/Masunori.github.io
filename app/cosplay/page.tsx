"use client";

import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react';
import { Photos } from './Photos';
import { LegitimacyCheck } from './LegitimacyCheck';

type NavbarOption = "photos" | "legit";

export default function Page() {
    const [activeOption, setActiveOption] = useState<NavbarOption>("photos");

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1>Nori's Cosplay Profile</h1>
            </header>
            <main>
                <section className={styles.sidebar}>
                    <div className={styles.profileImage}>
                        <Image 
                            src="/cosplay/photos/waguri/waguri.jpg" 
                            alt="Profile Image" 
                            fill 
                            style={{ objectFit: "cover", objectPosition: "center" }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <p>
                        You can refer to me as Duc.
                    </p>
                    <p>
                        I mostly cosplay characters from Honkai Impact 3rd, sometimes other games or anime.
                    </p>
                </section>
                <nav className={styles.mininavbar}>
                    <button className={`${styles.navButton} ${activeOption === "photos" ? styles.active : ""}`}
                        onClick={() => setActiveOption("photos")}>
                        Photos
                    </button>
                    <button className={`${styles.navButton} ${activeOption === "legit" ? styles.active : ""}`}
                        onClick={() => setActiveOption("legit")}>
                        Legitimacy Check
                    </button>
                </nav>
                <section className={styles.content}>
                    {activeOption === "photos" && <Photos />}
                    {activeOption === "legit" && <LegitimacyCheck />}
                </section>
            </main>
        </div>
    )
}