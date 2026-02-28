import { SkillCategory } from "../../lib/mock-resources-data";
import {
    MdCode,
    MdPsychology,
    MdCloudDone,
    MdLanguage,
    MdSchool,
    MdBolt,
    MdModelTraining,
    MdTerminal,
    MdCategory,
    MdMoreHoriz
} from "react-icons/md";

// Map string identifiers from mock data to actual React components
const IconMap: Record<string, React.ElementType> = {
    "html": MdCode,
    "psychology": MdPsychology,
    "cloud_done": MdCloudDone,
    "language": MdLanguage,
    "school": MdSchool,
    "bolt": MdBolt,
    "model_training": MdModelTraining,
    "terminal": MdTerminal,
    "category": MdCategory,
};

function getIcon(name: string, className: string) {
    const IconComponent = IconMap[name] || MdMoreHoriz;
    return <IconComponent className={className} size={24} />;
}

export function TechSkills({ categories }: { categories: SkillCategory[] }) {
    return (
        <>
            <div className="flex items-center gap-3">
                <div className="text-[#00f2ff] p-2 bg-[#00f2ff]/10 rounded-lg flex items-center justify-center">
                    <MdTerminal size={24} />
                </div>
                <h2 className="text-2xl font-bold font-display text-white">Tech Skills</h2>
            </div>

            <div className="grid gap-6">
                {categories.map((category) => (
                    <div key={category.title} className="bg-slate-900 border border-[#1337ec]/10 rounded-2xl p-6 overflow-hidden relative group">
                        {/* Subtle glow effect on hover via Tailwind */}
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#1337ec]/5 rounded-full blur-3xl group-hover:bg-[#1337ec]/10 transition-colors pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 font-display text-white">
                                    {getIcon(category.icon, "text-[#1337ec]")}
                                    {category.title}
                                </h3>
                                {category.tag && (
                                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded uppercase">
                                        {category.tag}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Top Resources</p>
                                {category.resources.map((res) => (
                                    <a
                                        key={res.name}
                                        href={res.url}
                                        className="flex items-center justify-between p-3 bg-slate-800 rounded-xl hover:translate-x-1 transition-transform group/item border border-transparent hover:border-[#1337ec]/20"
                                    >
                                        <div className="flex items-center gap-3">
                                            {getIcon(res.platformIcon, "text-slate-400 group-hover/item:text-[#1337ec] transition-colors")}
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{res.name}</span>
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${res.type === 'FREE' ? 'bg-green-500/10 text-green-600' : 'bg-[#1337ec]/10 text-[#1337ec]'
                                            }`}>
                                            {res.type}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
