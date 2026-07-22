"use client";

import { useEffect, useState } from "react";
import { LegitimacyCheckData, LEGITIMACY_CHECKS } from "./cosplay_data";
import styles from './page.module.css';
import Image from "next/image";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function LegitimacyCheckComponent({ lc }: { lc: LegitimacyCheckData }) {
    const [showPhotos, setShowPhotos] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <div className={styles.legitimacyCheck} onClick={() => setShowPhotos(prev => !prev)}>
            <h2>{lc.transaction_content}</h2>
            <p style={{ textTransform: "capitalize" }}><b>Transaction Format: </b>{lc.transaction_format}</p>
            <p><b>Transaction Date: </b>{formatDate(lc.transaction_date)}</p>
            <p><b>Transaction Amount: </b>{`${lc.transaction_currency} ${lc.transaction_amount.toLocaleString()}`}</p>
            {
                !isMobile && (
                    <table>
                        <thead>
                            <tr>
                                <th>Second Party Name</th>
                                <th>Role</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lc.second_party_names.map((party, index) => (
                                <tr key={index}>
                                    <td>{party.name}</td>
                                    <td style={{ textTransform: "capitalize" }}>{party.role}</td>
                                    <td>
                                        {party.url && (
                                            <a href={party.url} target="_blank" rel="noopener noreferrer">
                                                {party.url}
                                            </a>
                                        )}
                                        {!party.url && (
                                            <p>No link available</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
            {
                isMobile && (
                    <ol>
                        <b>Second Party Names:</b>
                        {lc.second_party_names.map((party, index) => (
                            <li key={index}>
                                {party.url && (
                                    <a href={party.url} target="_blank" rel="noopener noreferrer">
                                        <p><strong>{party.name}</strong> - {party.role}</p>
                                    </a>
                                )}
                                {!party.url && (
                                    <p><strong>{party.name}</strong> - {party.role} (no Facebook profile)</p>
                                )}
                            </li>
                        ))}
                    </ol>
                )
            }
            <div className={`${styles.images} ${showPhotos ? styles.show : styles.hide}`}>
                {lc.proof_images.map((image, index) => (
                    <div key={index} className={styles.imageWrapper}>
                        <Image 
                            src={image.link}
                            alt={`${image.description}`}
                            fill
                            style={{ objectFit: "cover", objectPosition: "center" }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export function LegitimacyCheck() {
    return (
        <div className={styles.photos}>
            <h2 className={styles.photosHeader}>
                Click on each transaction to view the screenshot proofs.
            </h2>
            {LEGITIMACY_CHECKS.map((lc, index) => (
                <LegitimacyCheckComponent key={index} lc={lc} />
            ))}
        </div>
    )
}