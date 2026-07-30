import BLOGS from "../BlogsRegistry";
import styles from './page.module.css'

type BlogProps = {
    params: Promise<{ title: string }>;
}

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

export default async function BlogPage({ params }: BlogProps) {
    const { title } = await params;

    const blog = BLOGS[title];

    if (!blog) {
        return <div className={styles.blogNotFound}>
            <h1>Blog not found</h1>
            <button>
                <a href="/blog">Back to Blog List</a>
            </button>
        </div>;
    }

    return (
        <div className={styles.blogPage}>
            <h1>{blog.title}</h1>
            <h3>Date: {formatArticleDatetimeString(blog.date)}</h3>
            {blog.content}
        </div>
    );
}

