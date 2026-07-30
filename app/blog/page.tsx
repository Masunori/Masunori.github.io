import Image from 'next/image';
import BLOGS from './BlogsRegistry';
import styles from './page.module.css'

function formatArticleDatetimeString(datetime: string) {
    const monthMap: Record<string, string> = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December",
    };

    const [year, month, day] = datetime.split("-");
    return `${day} ${monthMap[month]}, ${year}`
}

export default function Page() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Welcome to Nori's blog!</h1>
            </div>

            <ul className={styles.blogs}>
                {
                    Object.entries(BLOGS).map(([key, blog]) => (
                        <li key={key} className={styles.blog}>
                            <a href={`/blog/${key}`} className={styles.blogLink}>
                                <div className={styles.blogImageContainer}>
                                    <Image 
                                        src={blog.image} 
                                        alt={blog.title} 
                                        className={styles.blogImage} 
                                        fill 
                                        style={{ objectFit: "cover", objectPosition: "center" }}
                                    />
                                </div>
                                <div className={styles.blogMetadata}>
                                    <h2 className={styles.blogTitle}>{blog.title}</h2>
                                    <p className={styles.blogDate}>{formatArticleDatetimeString(blog.date)}</p>
                                    <p className={styles.blogSummary}>{blog.summary}</p>
                                </div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}