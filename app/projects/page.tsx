import styles from "./page.module.css";

type ProjectProps = {
    name: string;
    descriptions: string[];
    link: string;
    image?: string;
}

function Project({ name, descriptions, link, image }: ProjectProps) {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <div className={styles.project}>
                <img src={image || "/favicon.ico"} alt={name} className={styles.projectImage} />
                <div>
                    <h2>{name}</h2>
                    {descriptions.map((description, index) => (
                        <p key={index}>{description}</p>
                    ))}
                    <p className={styles.link}>Link: <span>{link}</span></p>
                </div>
            </div>
        </a>
    );
}

export default function Page() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Random stuff that I do</h1>
                <a href="/Duong_Minh_Duc_Resume.pdf" target="_blank" rel="noopener noreferrer">View my resume</a>
            </div>
            <ul>
                <li>
                    <Project
                        name="DuckCode"
                        descriptions={[
                            "A multiplayer competitive programming game where you compete against other players to solve coding challenges.",
                            "This implementation only includes the frontend, which is built with Next.js and TypeScript.",
                            "The backend is built by another developer."
                        ]}
                        link="https://duck-code.vercel.app/"
                    />
                </li>
                <li>
                    <Project
                        name="Automated Newsletter Generator"
                        descriptions={[
                            "A tool that automatically fetches the latest articles and research papers from various sources and generates a newsletter.",
                            "This implementation includes:",
                            "- Specific scrapers for different sources that cleanly extract the relevant information",
                            "- Filter layers that (1) remove old articles and duplicates, (2) remove irrelevant articles, and (3) rank the articles based on relevance and importance",
                            "- A newsletter generator that reads the filtered articles and generates a newsletter in a clean and readable format",
                            "Technologies used: Python, LangGraph, OpenAI API, SQLite, BeautifulSoup, Selenium, feedparser, arXiV API."
                        ]}
                        link="https://github.com/Masunori/AI-Agents---FCI-Internship-2025-Summer"
                    />
                </li>
                <li>
                    <Project
                        name="Beyond Brainstorming: What Drives High-Quality Scientific Ideas? Lessons from Multi-Agent Collaboration"
                        descriptions={[
                            "A research paper which I co-authored that investigates how multi-agent collaboration can enhance the quality of automated scientific proposals compared to single-agent brainstorming.",
                            "The paper also investigates how different multi-agent collaboration configurations affect the quality of the generated ideas.",
                            "Accepted for AI4Research 2025",
                        ]}
                        link="https://arxiv.org/abs/2508.04575"
                        image="/arxiv.svg"
                    />
                </li>
                <li>
                    <Project
                        name="Taiko no Tatsujin"
                        descriptions={[
                            "A rhythm game where you hit notes in time with the music.",
                            "This implementation includes:",
                            "- A custom .tja file parser into a chart",
                            "- A note scheduler (game engine) that spawns and judges notes",
                            "- A simple UI to display the game state"
                        ]}
                        link="/taiko"
                        image="/taiko/assets/don-icon.webp"
                    />
                </li>
            </ul>
        </div>
    )
}