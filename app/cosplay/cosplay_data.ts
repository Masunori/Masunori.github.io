export type ProjectData = {
    character: string;
    series: string;
    description?: string;
    images: string[];
    colorScheme?: {
        borderColor?: string;
        backgroundColor?: string;
        glowColor?: string;
    }
}

export type LegitimacyCheckData = {
    transaction_content: string;
    transaction_format: "rent" | "purchase";
    transaction_date: string;
    transaction_amount: number;
    transaction_currency: string;
    second_party_names: { name: string; role: string, url?: string; }[];
    proof_images: { link: string; description?: string; }[];
}

export const PROJECTS: ProjectData[] = [
    {
        character: "Seele (Stygian Nymph)",
        series: "Honkai Impact 3rd",
        images: [
            "/cosplay/photos/seele_stygian_nymph/seele_1.jpg",
            "/cosplay/photos/seele_stygian_nymph/seele_2.jpeg",
        ],
        colorScheme: {
            borderColor: "#242424",
            backgroundColor: "#0b0b76",
            glowColor: "#adc5f6"
        }
    },
    {
        character: "Dreamseeker",
        series: "Honkai Impact 3rd",
        images: [
            "/cosplay/photos/dreamseeker/ds1.jpeg",
            "/cosplay/photos/dreamseeker/ds2.jpeg",
        ],
        colorScheme: {
            borderColor: "#8d394d",
            backgroundColor: "#892c42",
            glowColor: "#ffa1b7"
        }
    },
    {
        character: "Thelema",
        series: "Honkai Impact 3rd",
        images: [
            "/cosplay/photos/thelema/thelema.jpg",
        ],
        colorScheme: {
            borderColor: "#8d394d",
            backgroundColor: "#892c42",
            glowColor: "#ffa1b7"
        }
    },
    {
        character: "Kaoruko Waguri",
        series: "The Fragrant Flower Blooms with Dignity",
        images: [
            "/cosplay/photos/waguri/waguri.jpg",
        ],
        colorScheme: {
            borderColor: "#8d394d",
            backgroundColor: "#892c42",
            glowColor: "#ffa1b7"
        }
    }
];

export const LEGITIMACY_CHECKS: LegitimacyCheckData[] = [
    {
        transaction_content: "Rintaro Tsumugi's costume (Hobby Horizon Beyond 2026)",
        transaction_format: "rent",
        transaction_date: "2026-07-16",
        transaction_amount: 370000,
        transaction_currency: "VND",
        second_party_names: [
            {
                name: "Veronica Quinn",
                role: "collaborator",
                url: "https://www.facebook.com/veronica.quinn.465700",
            },
            {
                name: "Thuy Tien",
                role: "costume owner",
            }
        ],
        proof_images: [
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/VQ_1.jpg",
                description: "Conversation with collaborator on Messenger (1)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/VQ_2.jpg",
                description: "Conversation with collaborator on Messenger (2)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/VQ_3.jpg",
                description: "Conversation with collaborator on Messenger (3)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/VQ_4.jpg",
                description: "Conversation with collaborator on Messenger (4)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/VQ_5.jpg",
                description: "Conversation with collaborator on Messenger (5)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/VQ_6.jpg",
                description: "Conversation with collaborator on Messenger (6)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/VQ_7.jpg",
                description: "Conversation with collaborator on Messenger (7)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_1.jpg",
                description: "Conversation with costume owner on Zalo (1)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_2.jpg",
                description: "Conversation with costume owner on Zalo (2)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_3.jpg",
                description: "Conversation with costume owner on Zalo (3)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_4.jpg",
                description: "Conversation with costume owner on Zalo (4)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_5.jpg",
                description: "Conversation with costume owner on Zalo (5)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_6.jpg",
                description: "Conversation with costume owner on Zalo (6)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_7.jpg",
                description: "Conversation with costume owner on Zalo (7)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_8.jpg",
                description: "Conversation with costume owner on Zalo (8)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_9.jpg",
                description: "Conversation with costume owner on Zalo (9)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_10.jpg",
                description: "Conversation with costume owner on Zalo (10)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_11.jpg",
                description: "Conversation with costume owner on Zalo (11)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_12.jpg",
                description: "Conversation with costume owner on Zalo (12)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_13.jpg",
                description: "Conversation with costume owner on Zalo (13)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_14.jpg",
                description: "Conversation with costume owner on Zalo (14)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_15.jpg",
                description: "Conversation with costume owner on Zalo (15)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_16.jpg",
                description: "Conversation with costume owner on Zalo (16)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_17.jpg",
                description: "Conversation with costume owner on Zalo (17)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_18.jpg",
                description: "Conversation with costume owner on Zalo (18)"
            },
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/TT_19.jpg",
                description: "Conversation with costume owner on Zalo (19)"
            },
        ]
    },
    {
        transaction_content: "Kaoruko Waguri's wig (Hobby Horizon Beyond 2026)",
        transaction_date: "2026-07-17",
        transaction_amount: 100000,
        transaction_currency: "VND",
        transaction_format: "rent",
        second_party_names: [
            {
                name: "Di Di",
                role: "costume owner",
                url: "https://www.facebook.com/profile.php?id=61573066479565",
            }
        ],
        proof_images: [
            {
                link: "/cosplay/photos/check_legit/20260717-hhb26/DD_Wig_Waguri.jpg",
                description: "Transaction with costume owner on Messenger"
            }
        ]
    },
    {
        transaction_content: "Contact Lens",
        transaction_date: "2026-07-08",
        transaction_amount: 446000,
        transaction_currency: "VND",
        transaction_format: "purchase",
        second_party_names: [
            {
                name: "Huong Tu",
                role: "lens seller",
                url: "https://www.facebook.com/tixi.bui.7",
            }
        ],
        proof_images: [
            {
                link: "/cosplay/photos/check_legit/20260708-lens/1.jpg",
                description: "Transaction with lens seller on Messenger (1)"
            },
            {
                link: "/cosplay/photos/check_legit/20260708-lens/2.jpg",
                description: "Transaction with lens seller on Messenger (2)"
            }
        ]
    },
    {
        transaction_content: "Furina - witch version, Akimitsu 28 June 2026",
        transaction_date: "2026-06-28",
        transaction_amount: 450000,
        transaction_currency: "VND",
        transaction_format: "rent",
        second_party_names: [
            {
                name: "Ngoc Diep Ngg",
                role: "costume owner",
                url: "https://www.facebook.com/ngoc.diep.ngg.2025#",
            }
        ],
        proof_images: [
            {
                link: "/cosplay/photos/check_legit/20260628-aki/1.jpg",
                description: "Conversation with costume owner on Messenger"
            },
            {
                link: "/cosplay/photos/check_legit/20260628-aki/2.jpg",
                description: "Transaction with costume owner on Messenger"
            },
            {
                link: "/cosplay/photos/check_legit/20260628-aki/3.jpg",
                description: "Deposit refund by costume owner on Messenger"
            },

        ]
    },
];