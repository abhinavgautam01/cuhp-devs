import { MdSend, MdGroups, MdOpenInNew } from "react-icons/md";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const groups = [
    { name: "CBOX: CyberSecurity", members: "120 members", link: "https://t.me/cbox_backup" },
    { name: "Web3 Jobs", members: "5k members", link: "https://t.me/web3hiring" },
    { name: "DeepCore Security", members: "2.4k members", link: "https://t.me/deepcoresec" },
];

export function TelegramLinks() {
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
                <div className="text-primary-custom p-2 bg-primary-custom/10 rounded-lg">
                    <MdSend size={24} />
                </div>
                <h2 className="text-2xl font-bold text-foreground font-display">Community Groups</h2>
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-4">
                <h2 className="font-bold text-red-500">Engage in groups on your own risk..!</h2>
                {groups.map((group) => (
                    <motion.a
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        key={group.name}
                        href={group.link}
                        target="_blank"
                        rel="noopener noreferrer" // <--- This fixes the ESLint error
                        className="flex items-center justify-between p-5 bg-background/60 rounded-2xl transition-all group relative overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-md"
                    >
                        {/* Subtle background glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-custom/0 to-primary-custom/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3 bg-primary-custom/10 rounded-full text-primary-custom group-hover:scale-110 transition-transform">
                                <MdGroups size={24} />
                            </div>
                            <div>
                                <h3 className="text-foreground font-bold tracking-tight">{group.name}</h3>
                                <p className="text-xs text-slate-500 font-medium">{group.members}</p>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center gap-2 text-slate-600 group-hover:text-primary-custom transition-colors text-xs font-bold uppercase tracking-widest">
                            Join
                            <MdOpenInNew size={18} />
                        </div>
                    </motion.a>
                ))}
            </motion.div>
        </div>
    );
}