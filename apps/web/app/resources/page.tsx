import { AcademicSyllabus } from "../../components/resources/AcademicSyllabus";
import { TechSkills } from "../../components/resources/TechSkills";
import { getMockResourcesData } from "../../lib/mock-resources-data";

export default async function ResourcesPage() {
    // Simulate backend fetch
    const data = await getMockResourcesData();

    return (
        <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-6 lg:p-10">
                <header className="mb-10 animate-fade-in">
                    <h1 className="text-4xl font-bold mb-2 font-display text-white">
                        Resources
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Everything you need to excel in your degree and master the industry.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Left Column: Academics */}
                    <section className="lg:col-span-7 space-y-8 animate-slide-up">
                        <AcademicSyllabus initialData={data.academicSyllabus} />
                    </section>

                    {/* Right Column: Tech Skills & Industry */}
                    <section className="lg:col-span-5 space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <TechSkills categories={data.techSkills} />
                    </section>
                </div>
            </div>
        </main>
    );
}
