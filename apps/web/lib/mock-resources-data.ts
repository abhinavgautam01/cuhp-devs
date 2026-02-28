export type Educator = {
    name: string;
    avatar: string;
    rating: number;
    platform: string;
};

export type Course = {
    code: string;
    title: string;
    syllabusUrl: string;
    educators: Educator[];
};

export type SemesterData = Record<string, Course[]>;

export type ResourceLink = {
    name: string;
    url: string;
    type: 'FREE' | 'PAID';
    platformIcon: string; // Material Icon string
};

export type SkillCategory = {
    title: string;
    icon: string; // Material icon string
    tag?: string;
    resources: ResourceLink[];
};

export type ResourcesDataResponse = {
    academicSyllabus: SemesterData;
    techSkills: SkillCategory[];
};

// Simulated Database Fetch
export async function getMockResourcesData(): Promise<ResourcesDataResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
        academicSyllabus: {
            "S1": [
                {
                    code: "CS101",
                    title: "Introduction to Programming",
                    syllabusUrl: "#",
                    educators: [
                        { name: "Codevolution", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=codevolution", rating: 4.8, platform: "YouTube" }
                    ]
                }
            ],
            "S4": [
                {
                    code: "CS402",
                    title: "Design and Analysis of Algorithms",
                    syllabusUrl: "#",
                    educators: [
                        {
                            name: "Dr. Elena Volkov",
                            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjAahJpMOifd69890U2mBMUN7SCNqqUtiskribrxtD-UCMHU-wVsXroaWupO75AbDPkNI-ZFwCzzgBm0qJiW2MfV65f8UxBBZcQBOGGxTm_Yyrm1aaFDHRQq0ya4hEWXlh7_PHb9dp6MxqfO7z8zNKWUb5Zvu-gTtNEK3FaKIaPVZFGKsd2KupqdFap9KTr5Rrlp4o2Q6okVRFbvMAynFy2JkiSBxMSTG9GKdPiS9H2LbXMe9gZd2qnCeRDAScz2dIwthxIW7fyY0f",
                            rating: 4.9,
                            platform: "MIT OpenCourseWare"
                        },
                        {
                            name: "Abdul Bari",
                            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBapf8EInnNKWd-E8MKgI6tpnHffcrIheLz0kWqbsZUk_QgBKmHg3ZANqkzPeJoMTOae6Ao6FmqWkmY8sw6km2aJ-1jCF3LqlLSq1KiJwoDtCgiyjXPr_MAAQmN6BzDEv7svOhGc9aFMKc5hoBpA3gJe7RRGegKjl4t8dGxbbBJ2LSsearQ7lNsDsOmAIkcFad2eVuWlu-FpcRbj8BFC6CMiwqePCZwXX8ZPIsPjObZC5sqDg_-aSoNVR9aod57fJRzLmPqCmuuUe9Z",
                            rating: 5.0,
                            platform: "Algorithm Guru"
                        }
                    ]
                },
                {
                    code: "CS405",
                    title: "Operating Systems",
                    syllabusUrl: "#",
                    educators: [
                        {
                            name: "Neso Academy",
                            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nesoacademy",
                            rating: 4.8,
                            platform: "YouTube Education"
                        }
                    ]
                }
            ],
            "S5": [
                {
                    code: "CS501",
                    title: "Database Management Systems",
                    syllabusUrl: "#",
                    educators: [
                        { name: "Navin Reddy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=telusko", rating: 4.7, platform: "Telusko" }
                    ]
                }
            ]
        },
        techSkills: [
            {
                title: "Web Development",
                icon: "html",
                tag: "Trending",
                resources: [
                    { name: "The Odin Project", url: "#", type: "FREE", platformIcon: "language" },
                    { name: "Epic Web Dev - Kent C. Dodds", url: "#", type: "PAID", platformIcon: "school" }
                ]
            },
            {
                title: "Machine Learning",
                icon: "psychology",
                resources: [
                    { name: "Fast.ai Deep Learning", url: "#", type: "FREE", platformIcon: "bolt" },
                    { name: "Andrew Ng's Specialization", url: "#", type: "PAID", platformIcon: "model_training" }
                ]
            },
            {
                title: "DevOps & Cloud",
                icon: "cloud_done",
                resources: [
                    { name: "Roadmap.sh DevOps Path", url: "#", type: "FREE", platformIcon: "terminal" },
                    { name: "KodeKloud Premium", url: "#", type: "PAID", platformIcon: "category" }
                ]
            }
        ]
    };
}
