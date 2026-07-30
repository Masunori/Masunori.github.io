import styles from './blogContent.module.css';

export function ImageWithCaption({ src, alt, caption }: { src: string; alt: string; caption: string }) {
    return (
        <figure className={styles.imageWithCaption}>
            <img src={src} alt={alt} className={styles.image} />
            <figcaption className={styles.caption}>{caption}</figcaption>
        </figure>
    )
}