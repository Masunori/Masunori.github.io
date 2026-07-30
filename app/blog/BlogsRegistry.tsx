import { ReactNode } from "react"
import Blog_20260731 from "./content/Blog20263107"

type Blog = {
    title: string;
    date: string;
    summary: string;
    content: ReactNode;
    image: string;
}

const BLOGS: Record<string, Blog> = {
    "the-melbourne-exchange-retrospect": {
        title: "The Melbourne Exchange Retrospect",
        date: "2026-07-31",
        summary: "A retrospective of my Melbourne Exchange experience.",
        content: <Blog_20260731 />,
        image: "/blogs/melbourne/thumbnail.jpg",
    }
}

export default BLOGS;