"use client";

import { useState } from "react";
import { ProjectData, PROJECTS } from "./cosplay_data";
import styles from './page.module.css';
import Image from "next/image";

function ProjectComponent({ project }: { project: ProjectData }) {
    const [showPhotos, setShowPhotos] = useState(false);

    return (
        <div 
            className={styles.project} 
            onClick={() => setShowPhotos(prev => !prev)}
        >
            <h2>{project.character}</h2>
            <p>Game/Series: <b>{project.series}</b></p>
            {project.description && <p>{project.description}</p>}
            <div className={`${styles.images} ${showPhotos ? styles.show : styles.hide}`}>
                {project.images.map((image, index) => (
                    <div key={index} className={styles.imageWrapper}>
                        <Image 
                            src={image}
                            alt={`${project.character} - ${index + 1}`}
                            fill
                            style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export function Photos() {
    return (
        <div className={styles.photos}>
            <h2 className={styles.photosHeader}>
                Click on each project to toggle the photos!
            </h2>
            {PROJECTS.map((project, index) => (
                <ProjectComponent key={index} project={project} />
            ))}
        </div>
    )
}