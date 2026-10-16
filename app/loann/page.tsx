"use client";

import { CSSProperties, useState } from 'react';
import styles from './page.module.css'
import Image from 'next/image';

type Category = "Food" | "Places to Visit (Great for Photos)" | "Shopping" | "Special";

type Activity = {
    name: string;
    description: string;
    price?: string;
    url: string;
    imageUrl?: string;
}

const MELBOURNE_ACTIVITIES: Record<Category, Activity[]> = {
    "Food": [
        {
            name: "Gourmet Pies QVM",
            description: "A food truck that sells delicious Australian pies in Queen Victoria's Market. It is usually located in Shed C, and they will normally leave before 4, so try to come early in the day.",
            price: "$9 per pie, if you are lucky, near the end of the day they will offer buy-1-get-1-free deals.",
            url: "https://qvm.com.au/shops-stalls/gourmet-pies/",
            imageUrl: "/loann/aussie-pie.png"
        },
        {
            name: "Jalan Alor Franklin Street",
            description: "A place with affordable food of Singapore and Malaysia cuisine.",
            price: "$10-$15 per dish",
            url: "https://maps.app.goo.gl/7tdgQPYaRKLW3VJw5",
            imageUrl: "/loann/jalan-alor.png"
        },
        {
            name: "Good Measure",
            description: "A cafe on Lygon Street that serves good coffee and desserts. Their Mont Blanc is a must-try.",
            price: "$5-$20 per item, should be around $10-15 for a coffee and dessert.",
            url: "https://maps.app.goo.gl/b8wdpFGgdbmwUErz8",
            imageUrl: "/loann/good-measure.png"
        },
        {
            name: "Hector's Deli (Lygon Street)",
            description: "A place that has extremely good sandwiches. But I think they only open for lunch...",
            price: "$15-$20 per sandwich",
            url: "https://maps.app.goo.gl/dvbQXkBzV1gCqx4t9",
            imageUrl: "/loann/hectors-deli-lygon-st.png"
        },
        {
            name: "Hector's Deli (Richmond)",
            description: "Also Hector's Deli but they have amazing, mindblowing donuts! But it's a bit far from the city centre.",
            price: "$5-$10 per donut",
            url: "https://maps.app.goo.gl/BevoZEAZXmzBirrZ9",
            imageUrl: "/loann/hectors-deli-richmond.png"
        },
        {
            name: "Yo-Chi (QV Melbourne)",
            description: "A frozen yogurt place where you serve the yogurt yourself and pay by weight. Highly recommend!",
            price: "~$4.20 per 100g, definitely can do below $10 if you are careful",
            url: "https://maps.app.goo.gl/mAdXuV6sxTmXXhnE6",
            imageUrl: "/loann/yochi.png"
        },
        {
            name: "Universal (Lygon Street)",
            description: "An Italian restaurant with very, very big portions, very budget friendly to university students.",
            price: "$20-$40 per dish",
            url: "https://maps.app.goo.gl/8v7h9k2m3n4p5q6r7s8t9u0v1w2x3y4z5",
            imageUrl: "/loann/universal.png"
        },
        {
            name: "Kamakura Warabi-Mochi (Melbourne)",
            description: "They have a very 'unique' shaved ice dessert, and people also highly recommend this place.",
            price: "$15-$20 per (huge) dessert",
            url: "https://maps.app.goo.gl/V5CNsxdQQDSXjbqXA",
            imageUrl: "/loann/kamakura-warabi-mochi.png"
        }
    ],
    "Places to Visit (Great for Photos)": [
        {
            name: "State Library Victoria",
            description: "A huge library in the heart of Melbourne. A beautiful place to take photos. You might also catch some protests or rallies every weekend (a unique Melbourne experience)!",
            price: "Free to enter",
            url: "https://maps.app.goo.gl/EfM85vBCeiiNzLqJ9",
            imageUrl: "/loann/state-library-victoria.png"
        },
        {
            name: "Yarra Chocolate Factory",
            description: "It's very far from the city centre, but if you can go here, I highly recommend this place. They have a lot of chocolate and desserts that you can buy as souvenirs. Highy recommend the ice cream!",
            price: "Items vary in price",
            url: "https://maps.app.goo.gl/FdBka1hYoheUC6jk9",
            imageUrl: "/loann/yarra-chocolate-factory.png"
        },
        {
            name: "Yarra Glen",
            description: "A small town in the Yarra Valley with a lot of vineyards. Even if you do not drink wine, it makes a great souvenir, and the scenery is very, very beautiful.",
            price: "Wine is generally expensive, but the scenery is free to enjoy",
            url: "https://maps.app.goo.gl/H3GNmCvxuYec11m77",
            imageUrl: "/loann/grape-yard.jpg"
        },
        {
            name: "RMIT Melbourne",
            description: "Trust me, RMIT Melbourne is a very, very photogenic place. They have a huge campus.",
            price: "Wine is generally expensive, but the scenery is free to enjoy",
            url: "https://maps.app.goo.gl/H3GNmCvxuYec11m77",
            imageUrl: "/loann/rmit.png"
        }
    ],
    "Shopping": [
        {
            name: "Queen Victoria Market",
            description: "A historic market in Melbourne. Local produces aside, it is a great place to buy souvenirs and gifts!",
            price: "Free to enter, but items vary in price",
            url: "https://qvm.com.au/",
            imageUrl: "/loann/qvm.png"
        },
        {
            name: "Melbourne Central",
            description: "A big shopping centre in the heart of Melbourne. Remember to observe the clock at the centre of the shopping centre which will perform a show every hour.",
            price: "Free to enter, but items vary in price",
            url: "https://www.melbournecentral.com.au/",
            imageUrl: "/loann/melbourne-central.png"
        },
        {
            name: "W Cosmetics",
            description: "A lot of well-known cheap brands from China, Korea and Japan are sold here. I have bought quite a few items from here, you might like it!",
            price: "Items vary in price",
            url: "https://maps.app.goo.gl/32UAMYj8opCZrYKh9",
            imageUrl: "/loann/w-cosmetics.png"
        }
    ],
    "Special": [
        {
            name: "IN.CUBE8R (Melbourne Central)",
            description: "Remember the keychain-hairclip I bought from an anime convention and gifted you? The artist that makes the hairclip-keychain I gifted you is also at this place! This place sells handmade accessories and artworks.",
            price: "Items vary in price",
            url: "https://maps.app.goo.gl/J5ShhBTF1g9WcDdo8",
            imageUrl: "/loann/incube8r.jpg"
        },
        {
            name: "Dannie Tote Bag",
            description: "Here is where I got you the tote bag!",
            price: "Items vary in price",
            url: "https://maps.app.goo.gl/FR3duu7Vsv7kxmdN8",
            imageUrl: "/loann/dannie-tote-bag.png"
        }
    ]
}

function ActivityCard({ activity }: { activity: Activity }) {
    return (
        <li className={styles.activityCard}>
            <Image src={activity.imageUrl || "/images/loann/melbourne.png"}
                alt={activity.name}
                fill
                className={styles.activityImage}
                style={{ objectFit: 'cover' }}
            />

            <div className={styles.activityInfo}>
                <h3>{activity.name}</h3>
                <p><span>{activity.description}</span></p>
                <p><b>Price:</b> <span>{activity.price}</span></p>
                <a href={activity.url} target="_blank" rel="noopener noreferrer">
                    Click here for more information!
                </a>
            </div>
        </li>
    )
}

function ActivityList({ category, activities }: { category: Category, activities: Activity[] }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(prev => !prev);
    };

    // for each subsequent activity, the transition duration decays by 10%, starting from 0.2s for the first action
    const duration = Math.trunc(2 * (1 - 0.9 ** activities.length) * 100) / 100;

    return (
        <section className={`${styles.activityList} ${isExpanded ? styles.expanded : ''}`}>
            <div className={styles.categoryHeaderContainer} onClick={toggleExpanded}>
                <h2 className={styles.categoryHeader}>
                    {category}
                </h2>
                <div className={styles.categoryHeaderIcon}>
                    ▼
                </div>
            </div>
            <div 
                inert={!isExpanded} 
                className={styles.activityListContent}
                style={{
                    "--activity-transition-duration": `${duration}s`,
                } as CSSProperties}
            >
                <ul style={{ minHeight: 0, overflow: 'hidden' }}>
                    {activities.map((activity, index) => (
                        <ActivityCard key={index} activity={activity} />
                    ))}
                </ul>
            </div>
        </section>
    )
}   

export default function Page() {
    return (
        <div className={styles.page}>
            <div className={styles.scrollContainer}>
                <div className={styles.header}>
                    <h1>The hidden corner of Nori's blog!</h1>
                    <h3>
                        Chúc em một kì trao đổi ở Melbourne thật nhiều niềm vui và kỉ niệm đẹp nhé! Danh sách này có cả những chỗ để chụp ảnh đó.
                    </h3>
                    <h3>🥰🥰🥰</h3>
                    <h3>By the way, you cannot navigate to this page directly :)</h3>
                    <h3>And most of these pictures are from my exchange semester!</h3>
                </div>

                {Object.entries(MELBOURNE_ACTIVITIES).map(([category, activities]) => (
                    <ActivityList key={category} category={category as Category} activities={activities} />
                ))}
            </div>
        </div>
    )
}