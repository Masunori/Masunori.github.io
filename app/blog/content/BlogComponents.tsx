"use client";
import { useState } from 'react';
import styles from './blogContent.module.css';

export function ImageWithCaption({ src, alt, caption }: { src: string; alt: string; caption: string }) {
    return (
        <figure className={styles.imageWithCaption}>
            <img src={src} alt={alt} className={styles.image} />
            <figcaption className={styles.caption}>{caption}</figcaption>
        </figure>
    )
}

export function VideoWithCaption({ src, caption }: { src: string; caption: string }) {
    return (
        <figure className={styles.videoWithCaption}>
            <video controls className={styles.video}>
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <figcaption className={styles.caption}>{caption}</figcaption>
        </figure>
    )
}

export function CollapsibleImageGallery({ images }: { images: { src: string; alt: string }[] }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleGallery = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.collapsibleImageGallery}>
            <button onClick={toggleGallery} className={styles.toggleButton}>
                {isOpen ? 'Hide Gallery' : 'Show Gallery'}
            </button>
            {isOpen && (
                <div className={styles.imageGrid}>
                    {images.map((image, index) => (
                        <img key={index} src={image.src} alt={image.alt} className={styles.galleryImage} />
                    ))}
                </div>
            )}
        </div>
    )
}